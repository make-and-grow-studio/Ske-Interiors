/**
 * Step 3 of the image scrape: open every real URL in Chromium and collect
 * every image URL, recording which page it came from.
 *
 * Also saves each page's rendered text to scrape/pages/<slug>.md and a
 * full-page screenshot to scrape/pages/<slug>.png.
 *
 * Run from the repo root:
 *   node scripts/scrape/02-crawl-pages.mjs
 */
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { X509Certificate, createHash } from 'node:crypto';
import path from 'node:path';

// Use the project's playwright if installed, otherwise the global one
const require = createRequire(import.meta.url);
let pw;
try { pw = require('playwright'); } catch { pw = require(execSync('npm root -g').toString().trim() + '/playwright'); }
const { chromium } = pw;

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const SCRAPE = path.join(ROOT, 'scrape');
const PAGES = path.join(SCRAPE, 'pages');
fs.mkdirSync(PAGES, { recursive: true });

const urls = fs
  .readFileSync(path.join(SCRAPE, 'urls.txt'), 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter((l) => l.startsWith('https://') && !l.includes('/category/'));

const slugOf = (u) => new URL(u).pathname.replace(/^\/|\/$/g, '') || 'home';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Runs inside the page: gather image URLs from every source we care about.
function collectInPage() {
  const found = [];
  const add = (url, source) => {
    if (!url) return;
    url = url.trim().replace(/^url\(["']?|["']?\)$/g, '');
    if (!url || url.startsWith('data:')) return;
    try { found.push({ url: new URL(url, location.href).href, source }); } catch {}
  };
  // srcset: keep every candidate; the downloader picks the original anyway
  const addSrcset = (set, source) => {
    if (!set) return;
    set.split(',').map((s) => s.trim().split(/\s+/)[0]).forEach((u) => add(u, source));
  };
  document.querySelectorAll('img').forEach((img) => {
    add(img.getAttribute('src'), 'img-src');
    add(img.currentSrc, 'img-currentSrc');
    addSrcset(img.getAttribute('srcset'), 'img-srcset');
    ['data-src', 'data-lazy-src', 'data-bg', 'data-original', 'data-large_image'].forEach((a) =>
      add(img.getAttribute(a), a)
    );
    addSrcset(img.getAttribute('data-srcset'), 'data-srcset');
    addSrcset(img.getAttribute('data-lazy-srcset'), 'data-lazy-srcset');
  });
  document.querySelectorAll('source').forEach((s) => addSrcset(s.getAttribute('srcset'), 'source-srcset'));
  document.querySelectorAll('[data-bg],[data-src],[data-background],[data-image]').forEach((el) => {
    ['data-bg', 'data-src', 'data-background', 'data-image'].forEach((a) => add(el.getAttribute(a), a));
  });
  document.querySelectorAll('[style*="background"]').forEach((el) => {
    const m = el.getAttribute('style').match(/url\(([^)]+)\)/g) || [];
    m.forEach((u) => add(u, 'inline-bg'));
  });
  document.querySelectorAll('*').forEach((el) => {
    for (const pseudo of [null, '::before', '::after']) {
      const bg = getComputedStyle(el, pseudo).backgroundImage;
      if (bg && bg !== 'none') (bg.match(/url\([^)]+\)/g) || []).forEach((u) => add(u, 'computed-bg'));
    }
  });
  document.querySelectorAll('a[href]').forEach((a) => {
    if (/\.(jpe?g|png|webp|gif)(\?|$)/i.test(a.getAttribute('href'))) add(a.getAttribute('href'), 'a-href');
  });
  document.querySelectorAll('meta[property="og:image"],meta[name="twitter:image"]').forEach((m) =>
    add(m.getAttribute('content'), 'og-image')
  );
  document.querySelectorAll('link[rel*="icon"]').forEach((l) => add(l.getAttribute('href'), 'icon'));
  return found;
}

// In a sandbox with a TLS-inspecting proxy, Chromium ignores the extra CA
// bundle that curl/node use. Trust exactly the CAs in that bundle (by public
// key hash) so the browser trusts what the rest of the environment trusts.
// On a normal machine NODE_EXTRA_CA_CERTS is unset and this does nothing.
function extraCaSpkiHashes() {
  const file = process.env.NODE_EXTRA_CA_CERTS;
  if (!file || !fs.existsSync(file)) return [];
  const pems = fs.readFileSync(file, 'utf8').match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) || [];
  return pems.map((pem) => {
    const spki = new X509Certificate(pem).publicKey.export({ type: 'spki', format: 'der' });
    return createHash('sha256').update(spki).digest('base64');
  });
}
const spki = extraCaSpkiHashes();
const browser = await chromium.launch({
  proxy: process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
  args: spki.length ? [`--ignore-certificate-errors-spki-list=${spki.join(',')}`] : [],
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const results = {};
const failed = [];
const networkImages = {};

for (const url of urls) {
  const slug = slugOf(url);
  const page = await context.newPage();
  const seen = new Set();
  // Also record every image the browser actually downloaded (catches JS sliders)
  page.on('response', (res) => {
    if (res.request().resourceType() === 'image') seen.add(res.url());
  });
  try {
    const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    const status = res ? res.status() : 0;
    // Scroll slowly to the bottom so lazy images and sliders load
    let last = -1;
    for (let i = 0; i < 80; i++) {
      const y = await page.evaluate(() => { window.scrollBy(0, 400); return window.scrollY; });
      await sleep(250);
      if (y === last) break;
      last = y;
    }
    // Click any slider / gallery arrows a few times so every slide loads
    const arrowSel = [
      '.owl-next', '.slick-next', '.swiper-button-next', '.flex-next', '.nivo-nextNav',
      '.carousel-control-next', '.next', '[class*="arrow-right"]', '[aria-label*="Next" i]',
    ].join(',');
    const arrows = await page.$$(arrowSel);
    for (const a of arrows) {
      for (let i = 0; i < 12; i++) {
        try { await a.click({ timeout: 1000, force: true }); } catch { break; }
        await sleep(400);
      }
    }
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    const found = await page.evaluate(collectInPage);
    for (const u of seen) found.push({ url: u, source: 'network' });
    results[url] = { slug, status, images: found };
    // Save rendered text for later content comparison
    const text = await page.evaluate(() => document.body.innerText);
    const title = await page.title();
    fs.writeFileSync(path.join(PAGES, `${slug.replace(/\//g, '_')}.md`), `# ${title}\n\nURL: ${url}\n\n${text}\n`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(PAGES, `${slug.replace(/\//g, '_')}.png`), fullPage: true });
    console.log(`OK   ${status} ${url}  (${found.length} image refs, ${arrows.length} arrows)`);
    if (status >= 400) failed.push({ url, status });
  } catch (e) {
    console.log(`FAIL ${url}: ${e.message}`);
    failed.push({ url, error: e.message });
  }
  await page.close();
  await sleep(500);
}

await browser.close();
fs.writeFileSync(path.join(SCRAPE, 'api', 'crawl-results.json'), JSON.stringify({ results, failed }, null, 2));
console.log(`Crawled ${urls.length} URLs, ${failed.length} failed.`);

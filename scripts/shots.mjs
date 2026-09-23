/**
 * Screenshot any URL at 375, 768 and 1440px wide (full page) into /screenshots.
 *
 *   npm run shots -- http://localhost:4321/            -> screenshots/home-375.png …
 *   npm run shots -- http://localhost:4321/about-us/ about
 *                                                      -> screenshots/about-375.png …
 *
 * Optional second argument: the file name prefix (defaults to the URL path).
 * Motion is reduced so screenshots show the final state of animations.
 */
import { chromium } from 'playwright';
import { X509Certificate, createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const WIDTHS = [375, 768, 1440];
const [url, nameArg] = process.argv.slice(2);

if (!url) {
  console.error('Usage: npm run shots -- <url> [name]');
  process.exit(1);
}

const name =
  nameArg ||
  new URL(url).pathname.replace(/^\/|\/$/g, '').replace(/\//g, '_') ||
  'home';
const outDir = path.resolve('screenshots');
fs.mkdirSync(outDir, { recursive: true });

// Only matters inside a sandbox with a TLS-inspecting proxy: trust the same
// extra CAs as Node does. On a normal machine this is empty and does nothing.
function extraCaSpkiHashes() {
  const file = process.env.NODE_EXTRA_CA_CERTS;
  if (!file || !fs.existsSync(file)) return [];
  const pems = fs.readFileSync(file, 'utf8').match(/-----BEGIN CERTIFICATE-----[\s\S]+?-----END CERTIFICATE-----/g) || [];
  return pems.map((pem) =>
    createHash('sha256')
      .update(new X509Certificate(pem).publicKey.export({ type: 'spki', format: 'der' }))
      .digest('base64')
  );
}
const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)/.test(url);
const spki = isLocal ? [] : extraCaSpkiHashes();

const browser = await chromium.launch({
  proxy: !isLocal && process.env.HTTPS_PROXY ? { server: process.env.HTTPS_PROXY } : undefined,
  args: spki.length ? [`--ignore-certificate-errors-spki-list=${spki.join(',')}`] : [],
});

for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  // Hide Astro's dev toolbar so it doesn't appear in screenshots
  await page.addStyleTag({ content: 'astro-dev-toolbar { display: none !important; }' });
  // Scroll through once so lazy-loaded images appear, then back to the top
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle');
  const file = path.join(outDir, `${name}-${width}.png`);
  await page.screenshot({ path: file, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  console.log(`${file}${overflow > 0 ? `  ⚠ horizontal overflow: ${overflow}px` : ''}`);
  await page.close();
}

await browser.close();

/**
 * Measures the footer wordmark ("SKE" in Bodoni Moda) so the footer can size
 * it to fill the container width exactly. Prints the text-box width ÷
 * font-size ratio. The footer uses the INK width instead (the letters
 * without their side spacing): 1.7038, with a 0.0445em left bearing, found by
 * screenshotting the wordmark and finding the first and last inked columns.
 * Re-check both values if the font or letter-spacing changes.
 * Needs a running server:  npm run preview  →  node scripts/measure-wordmark.mjs [url]
 */
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:4321/';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url, { waitUntil: 'networkidle' });
// Measure the real footer wordmark once its font has loaded
const ratio = await page.evaluate(async () => {
  const el = document.querySelector('.site-footer__wordmark span');
  el.scrollIntoView();
  await document.fonts.ready;
  await new Promise((r) => setTimeout(r, 300));
  const fam = getComputedStyle(el).fontFamily;
  const loaded = [...document.fonts].some((f) => f.family.startsWith('Bodoni Moda') && f.status === 'loaded');
  if (!loaded) throw new Error('Bodoni Moda not loaded: ' + fam);
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width / parseFloat(getComputedStyle(el).fontSize);
});
console.log(`--wordmark-ratio: ${ratio.toFixed(4)};`);
await browser.close();

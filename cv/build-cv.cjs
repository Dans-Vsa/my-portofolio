// Renders cv/cv.html to public/cv/Danish-Vesa-CV-{EN,ID}.pdf (A4, one page) with Playwright.
// Usage: node cv/build-cv.cjs "$(npm root -g)"   (Playwright is used from the global install)
const path = require('path');
const fs = require('fs');
const { pathToFileURL } = require('url');
const { chromium } = require(path.join(process.argv[2] || '', 'playwright'));

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'public', 'cv');
const source = pathToFileURL(path.join(__dirname, 'cv.html')).href;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  for (const lang of ['en', 'id']) {
    await page.goto(`${source}?lang=${lang}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Overflow check: the lowest bottom edge of any block must stay inside the page.
    const height = await page.evaluate(() => Math.max(...[...document.querySelectorAll('main > *, aside > *')].map((e) => e.getBoundingClientRect().bottom)));
    const a4 = (297 / 25.4) * 96;
    if (height > a4 + 2) console.warn(`[${lang}] content is ${Math.round(height)}px tall, more than one A4 page (${Math.round(a4)}px)`);
    const file = path.join(outDir, `Danish-Vesa-CV-${lang.toUpperCase()}.pdf`);
    await page.pdf({ path: file, format: 'A4', printBackground: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    await page.screenshot({ path: path.join(__dirname, `preview-${lang}.png`), fullPage: true });
    console.log(`${lang}: ${path.relative(root, file)} (${(fs.statSync(file).size / 1024).toFixed(0)} KB)`);
  }
  await browser.close();
})();

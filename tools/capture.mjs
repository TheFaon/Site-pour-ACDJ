// Capture full-page screenshots of a URL at the three Framer breakpoints,
// plus a JSON dump of section geometry and computed styles.
// usage: node tools/capture.mjs <url> <outPrefix>
import { chromium } from 'playwright';
import fs from 'fs';

const url = process.argv[2] || 'https://www.acdj-informatique.com/';
const outPrefix = process.argv[3] || 'reference/original';

fs.mkdirSync(outPrefix.split('/').slice(0, -1).join('/') || '.', { recursive: true });

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 1024, height: 800 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  // Scroll through the page to trigger lazy loading / appear animations
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 800));
  });
  await page.addStyleTag({ content: '*, *::before, *::after { transition: none !important; animation: none !important; } .reveal, [data-reveal] { opacity: 1 !important; transform: none !important; }' });
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${outPrefix}-${vp.name}.png`, fullPage: true });

  if (vp.name === 'desktop') {
    const data = await page.evaluate(() => {
      const sections = [...document.querySelectorAll('[data-framer-name]')]
        .filter(n => {
          const r = n.getBoundingClientRect();
          return r.height > 150 && r.width > innerWidth * 0.7;
        })
        .map(n => {
          const r = n.getBoundingClientRect();
          const cs = getComputedStyle(n);
          return {
            name: n.getAttribute('data-framer-name'),
            y: Math.round(r.top + scrollY),
            h: Math.round(r.height),
            bg: cs.backgroundColor,
          };
        })
        .sort((a, b) => a.y - b.y);
      const texts = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6,p')]
        .filter(el => el.offsetParent !== null && el.textContent.trim())
        .map(el => {
          const cs = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName,
            text: el.textContent.trim().slice(0, 90),
            font: cs.fontFamily.split(',')[0],
            size: cs.fontSize,
            weight: cs.fontWeight,
            lh: cs.lineHeight,
            ls: cs.letterSpacing,
            color: cs.color,
            y: Math.round(r.top + scrollY),
          };
        });
      return { pageH: document.body.scrollHeight, sections, texts };
    });
    fs.writeFileSync(`${outPrefix}-data.json`, JSON.stringify(data, null, 2));
  }
  await page.close();
}
await browser.close();
console.log('done');

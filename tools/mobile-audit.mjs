import { chromium } from 'playwright';

// usage: node tools/mobile-audit.mjs <url> <width> <outdir>
const url = process.argv[2] || `file://${process.cwd()}/index.html`;
const width = parseInt(process.argv[3] || '390', 10);
const height = 844;

const b = await chromium.launch();
const p = await b.newPage({
  viewport: { width, height },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
  userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
});

await p.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 40));
  }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(700);

const report = await p.evaluate((vw) => {
  const docW = document.documentElement.scrollWidth;
  const offenders = [];
  const all = document.querySelectorAll('body *');
  for (const el of all) {
    const r = el.getBoundingClientRect();
    const style = getComputedStyle(el);
    if (style.display === 'none' || style.visibility === 'hidden') continue;
    if (r.right > vw + 1 && r.width > 4) {
      offenders.push({
        sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).join('.') : ''),
        right: Math.round(r.right),
        left: Math.round(r.left),
        width: Math.round(r.width),
      });
    }
  }
  const seen = new Set();
  const top = offenders
    .sort((a, b) => b.right - a.right)
    .filter(o => { if (seen.has(o.sel)) return false; seen.add(o.sel); return true; })
    .slice(0, 40);
  return { docW, vw, hasOverflow: docW > vw + 1, offenders: top };
}, width);

console.log(JSON.stringify(report, null, 2));
await b.close();

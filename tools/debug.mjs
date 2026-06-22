// Console errors + image/font load check for the local reconstruction.
import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('console', m => console.log('CONSOLE:', m.type(), m.text()));
p.on('pageerror', e => console.log('PAGEERROR:', e.message));
await p.goto(process.argv[2] || `file://${process.cwd()}/index.html`, { waitUntil: 'networkidle' }).catch(() => {});
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } await new Promise(r => setTimeout(r, 800)); });
const out = await p.evaluate(() => {
  return {
    imgsBroken: [...document.querySelectorAll('img')].filter(i => !(i.complete && i.naturalWidth > 0)).map(i => i.getAttribute('src')),
    imgCount: document.querySelectorAll('img').length,
    h1Count: document.querySelectorAll('h1').length,
    fonts: [...document.fonts].map(f => `${f.family} ${f.weight} ${f.status}`),
    pageH: document.body.scrollHeight,
  };
});
console.log(JSON.stringify(out, null, 1));
await b.close();

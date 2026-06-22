// Full-resolution band captures of a page.
// usage: node tools/shot-region.mjs <url> <outDir> <width> <bandHeight>
import { chromium } from 'playwright';
import fs from 'fs';
const url = process.argv[2];
const outDir = process.argv[3] || 'reference/crops';
const width = parseInt(process.argv[4] || '1440', 10);
const band = parseInt(process.argv[5] || '1200', 10);
fs.mkdirSync(outDir, { recursive: true });
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 600)); });
await p.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });
const total = await p.evaluate(() => document.body.scrollHeight);
let i = 0;
for (let y = 0; y < total; y += band) {
  const h = Math.min(band, total - y);
  await p.screenshot({ path: `${outDir}/band_${String(i).padStart(2, '0')}.png`, fullPage: true, clip: { x: 0, y, width, height: h } });
  i++;
}
console.log('bands', i, 'total', total);
await b.close();

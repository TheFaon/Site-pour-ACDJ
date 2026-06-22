import { chromium } from 'playwright';

// usage: node tools/shot-sections.mjs <url> <outPrefix> <width> <sel1,sel2,...>
const url = process.argv[2];
const prefix = process.argv[3];
const width = parseInt(process.argv[4] || '1440', 10);
const sels = (process.argv[5] || '').split(',').filter(Boolean);

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width, height: 900 } });
await p.goto(url, { waitUntil: 'domcontentloaded' }).catch(() => {});
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y);
    await new Promise(r => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(600);

for (const sel of sels) {
  const el = await p.$(sel);
  if (!el) { console.log('MISS', sel); continue; }
  await el.scrollIntoViewIfNeeded().catch(() => {});
  await p.waitForTimeout(400);
  const safe = sel.replace(/[^a-z0-9]/gi, '_');
  await el.screenshot({ path: `${prefix}-${safe}.png` }).catch(e => console.log('ERR', sel, e.message));
  console.log('OK', sel);
}
await b.close();

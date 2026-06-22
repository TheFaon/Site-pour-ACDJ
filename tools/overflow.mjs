// Check horizontal overflow of the local reconstruction at several widths.
import { chromium } from 'playwright';
const file = process.argv[2] || `file://${process.cwd()}/index.html`;
const b = await chromium.launch();
for (const w of [1440, 1280, 1100, 1024, 768, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  await p.goto(file, { waitUntil: 'domcontentloaded' }).catch(() => {});
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 25)); } window.scrollTo(0, 0); });
  await p.waitForTimeout(200);
  const r = await p.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
  console.log(`vw=${w}  scrollWidth=${r.sw}  overflow=${r.sw > r.iw ? 'YES +' + (r.sw - r.iw) : 'no'}`);
  await p.close();
}
await b.close();

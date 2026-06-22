// Extract @font-face rules (family/weight/style/src) from the original page.
import { chromium } from 'playwright';
import fs from 'fs';
const url = process.argv[2] || 'https://www.acdj-informatique.com/';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
const faces = await p.evaluate(() => {
  const out = [];
  for (const sheet of document.styleSheets) {
    let rules;
    try { rules = sheet.cssRules; } catch { continue; }
    if (!rules) continue;
    for (const r of rules) {
      if (r.constructor.name === 'CSSFontFaceRule' || r.type === 5) {
        out.push({
          family: r.style.getPropertyValue('font-family').replace(/["']/g, ''),
          weight: r.style.getPropertyValue('font-weight'),
          style: r.style.getPropertyValue('font-style'),
          stretch: r.style.getPropertyValue('font-stretch'),
          unicodeRange: r.style.getPropertyValue('unicode-range'),
          src: r.style.getPropertyValue('src'),
        });
      }
    }
  }
  return out;
});
fs.writeFileSync('reference/fontfaces.json', JSON.stringify(faces, null, 2));
console.log('fontfaces', faces.length);
const fams = {};
faces.forEach(f => { fams[f.family] = (fams[f.family] || 0) + 1; });
console.log(fams);
await b.close();

// Download the Latin-subset normal woff2 for the families/weights actually used,
// save to assets/fonts/, and generate assets/fonts/fonts.css.
import fs from 'fs';
const faces = JSON.parse(fs.readFileSync('reference/fontfaces.json', 'utf8'));

// family -> weights needed
const need = {
  'Be Vietnam Pro': ['400', '500', '600', '700', '800'],
  'Inter': ['400', '500', '600', '700'],
  'Inter Tight': ['600'],
  'IBM Plex Mono': ['500', '600'],
  'Satoshi': ['700'],
};
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const isLatin = u => !u || u.replace(/\s/g, '').toUpperCase().startsWith('U+0-FF');

fs.mkdirSync('assets/fonts', { recursive: true });
const picked = [];
for (const [family, weights] of Object.entries(need)) {
  for (const w of weights) {
    const match = faces.find(f => f.family === family && String(f.weight) === w && f.style === 'normal' && isLatin(f.unicodeRange));
    if (!match) { console.log('MISS', family, w); continue; }
    const m = match.src.match(/url\(["']?(.*?\.woff2?)["']?\)/);
    if (!m) { console.log('NOURL', family, w); continue; }
    const file = `${slug(family)}-${w}.woff2`;
    picked.push({ family, weight: w, url: m[1], file });
  }
}

for (const p of picked) {
  const res = await fetch(p.url);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(`assets/fonts/${p.file}`, buf);
  console.log('saved', p.file, buf.length, 'bytes');
}

let css = '/* Self-hosted fonts (Latin subset) for ACDJ-Informatique reconstruction */\n\n';
for (const p of picked) {
  css += `@font-face {\n  font-family: '${p.family}';\n  font-style: normal;\n  font-weight: ${p.weight};\n  font-display: swap;\n  src: url('./${p.file}') format('woff2');\n}\n\n`;
}
// Aliases used in the original hydrogel marquee
css += `/* Inter Variable / Inter Display map onto Inter */\n`;
for (const alias of ['Inter Variable', 'Inter Display']) {
  css += `@font-face {\n  font-family: '${alias}';\n  font-style: normal;\n  font-weight: 400;\n  font-display: swap;\n  src: url('./inter-400.woff2') format('woff2');\n}\n\n`;
}
fs.writeFileSync('assets/fonts/fonts.css', css);
console.log('wrote fonts.css with', picked.length, 'faces');

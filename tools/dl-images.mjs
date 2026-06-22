// Download original images at full resolution (strip Framer scale query) with clean names.
import fs from 'fs';
fs.mkdirSync('assets/images', { recursive: true });

// id (from framer url) -> { name, ext }
const map = {
  'b0sgLqjt4X0EGWGcq3jM1PhQps': 'logo',
  '6bylVg2f5jfnbSf6ZPF0rc0k0OY': 'partner-belkin',
  'DFt65Msi4oVjZ3A3qf7G4sKwE': 'partner-fairplay',
  '0Cdi18uaivhxx6d5aggZJJrIxs': 'partner-utopya',
  'BiacIqGLXMjsCLmz99HEiTv9o8': 'partner-mypart',
  'xfQf7y0F2V6NVGQLTYLmLJNRHHA': 'partner-amazon-1',
  '9nJhlzi3rHttggf2yy1Jx1cIg1I': 'partner-amazon-2',
  '6kjK1dqbAxGYIPLg9mW8igCKs8': 'partner-amazon-3',
  'OsVgUExTZ8OhbevEGNOt7dv7Jg': 'service-smartphone-repair',
  'kihpnpa8M7wXWS6jCkeMFjADHQ': 'service-computer-install',
  'uKMW9QEzzGOCR7rFDLyclkawq5Y': 'service-smartphone-install',
  'xILtlZjR1GkhLwT9dVR7iZFmqZY': 'service-printer-install',
  'YRc6p0S7eP0Bjrjy7D66Q1wvGM': 'service-it-support',
  'opz8jpAqsyFYCHbYzs0wbTBU8Gc': 'service-drone',
  'Ilad4vXWhP12tboTxHxFTycVMLo': 'service-website',
  '6MHrakowqK58uWGSiRGcNDb9pTo': 'hydrogel-compare-table',
  'W6pa7fzmE62upAv7HgGRPW0Nwbw': 'hydrogel-gallery-1',
  'nWk6qG9gPM6ew2ANjpt9wgXEr8': 'hydrogel-gallery-2',
  '0Or8X5eVcMrCcozdy2qOuClyYAo': 'avatar-client3',
  'bnLrpObXTGyxdBaNZe9KYIcgyLw': 'avatar-client2',
  'FpWoG0QbYAfX1NisgIlzV9ekpY': 'avatar-client1',
};

const data = JSON.parse(fs.readFileSync('reference/assets.json', 'utf8'));
const byId = {};
for (const im of data.imgs) {
  const base = im.src.split('?')[0];
  const m = base.match(/images\/([A-Za-z0-9]+)\.(\w+)$/);
  if (!m) continue;
  byId[m[1]] = { base, ext: m[2], w: im.w, h: im.h };
}

for (const [id, name] of Object.entries(map)) {
  const info = byId[id];
  if (!info) { console.log('MISS', name, id); continue; }
  const res = await fetch(info.base);
  if (!res.ok) { console.log('HTTP', res.status, name); continue; }
  const buf = Buffer.from(await res.arrayBuffer());
  const out = `assets/images/${name}.${info.ext}`;
  fs.writeFileSync(out, buf);
  console.log('saved', out, `${info.w}x${info.h}`, buf.length, 'b');
}
console.log('done');

// Extract every asset URL (images, background-images, svg, fonts) from the original.
import { chromium } from 'playwright';
import fs from 'fs';
const url = process.argv[2] || 'https://www.acdj-informatique.com/';
const b = await chromium.launch();
const fontReqs = new Set();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
p.on('request', r => { const u = r.url(); if (/\.(woff2?|ttf|otf)(\?|$)/i.test(u)) fontReqs.add(u); });
await p.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); } window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 500)); });
const data = await p.evaluate(() => {
  const imgs = [...document.querySelectorAll('img')].map(i => ({
    src: i.currentSrc || i.src,
    srcset: i.getAttribute('srcset') || '',
    alt: i.alt || '',
    w: i.naturalWidth, h: i.naturalHeight,
  })).filter(i => i.src);
  const bgs = [];
  document.querySelectorAll('*').forEach(el => {
    const bi = getComputedStyle(el).backgroundImage;
    if (bi && bi !== 'none') { const m = bi.match(/url\(["']?(.*?)["']?\)/); if (m) bgs.push(m[1]); }
  });
  const svgs = [...document.querySelectorAll('svg')].map(s => s.outerHTML).filter(h => h.length < 20000);
  const links = [...document.querySelectorAll('link[rel*="icon"], link[rel="apple-touch-icon"]')].map(l => ({ rel: l.rel, href: l.href }));
  return { imgs, bgs: [...new Set(bgs)], svgCount: svgs.length, svgs, links, title: document.title, desc: document.querySelector('meta[name="description"]')?.content || '' };
});
data.fonts = [...fontReqs];
fs.writeFileSync('reference/assets.json', JSON.stringify(data, null, 2));
console.log('imgs', data.imgs.length, 'bgs', data.bgs.length, 'svg', data.svgCount, 'fonts', data.fonts.length, 'icons', data.links.length);
console.log('TITLE:', data.title);
console.log('DESC:', data.desc);
await b.close();

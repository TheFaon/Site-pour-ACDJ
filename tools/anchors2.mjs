// Measure key vertical anchors for original or reconstructed ACDJ pages.
// usage: node tools/anchors2.mjs <url> <width>
import { chromium } from 'playwright';

const url = process.argv[2] || `file://${process.cwd()}/index.html`;
const width = parseInt(process.argv[3] || '1440', 10);

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) {
    window.scrollTo(0, y);
    await new Promise((resolve) => setTimeout(resolve, 60));
  }
  window.scrollTo(0, 0);
  await new Promise((resolve) => setTimeout(resolve, 300));
});
await page.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}' });

const anchors = await page.evaluate(() => {
  const normalize = (value) => value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
  };
  const rect = (el) => {
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return {
      y: Math.round(r.top + scrollY),
      x: Math.round(r.left),
      w: Math.round(r.width),
      h: Math.round(r.height),
    };
  };
  const byText = (text, selector = 'h1,h2,h3,h4,h5,p,span,a,summary') => {
    const needle = normalize(text).toLowerCase();
    return [...document.querySelectorAll(selector)]
      .filter(visible)
      .find((el) => normalize(el.textContent).toLowerCase().includes(needle));
  };
  const sectionOf = (el) => {
    let node = el;
    while (node && node !== document.body) {
      if (node.tagName === 'SECTION' || node.tagName === 'FOOTER') return node;
      node = node.parentElement;
    }
    return el;
  };
  const get = (label, text, section = false) => {
    const el = byText(text);
    return [label, rect(section && el ? sectionOf(el) : el)];
  };
  const pairs = [
    ['page', { y: 0, x: 0, w: document.documentElement.scrollWidth, h: document.body.scrollHeight }],
    ['header', rect(document.querySelector('header'))],
    ['heroTitle', rect(document.querySelector('h1'))],
    get('estimation', 'Estimation Gratuite', true),
    get('services', 'Nos Services', true),
    get('firstService', 'Reparation de Smartphones'),
    get('hydrogel', 'Protegez votre ecran', true),
    get('gammes', 'Differentes gammes', true),
    get('pricing', 'Forfaits de Depannages', true),
    get('basique', 'Basique'),
    get('faq', 'Pourquoi choisir ACDJ', true),
    get('avis', 'Avis Clients', true),
    get('footer', 'Plan du site', true),
  ];
  return Object.fromEntries(pairs);
});

console.log(JSON.stringify({ url, width, anchors }, null, 2));
await browser.close();

// Dump geometry + computed styles for ACDJ's layout-critical elements.
import { chromium } from 'playwright';
import fs from 'fs';
const url = process.argv[2] || 'https://www.acdj-informatique.com/';
const width = parseInt(process.argv[3] || '1440', 10);
const b = await chromium.launch();
const page = await b.newPage({ viewport: { width, height: 900 } });
await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); } window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 500)); });

const data = await page.evaluate(() => {
  const P = ['backgroundColor', 'backgroundImage', 'borderRadius', 'border', 'borderTop', 'boxShadow', 'padding', 'margin', 'fontFamily', 'fontSize', 'fontWeight', 'color', 'gap', 'display', 'flexDirection', 'gridTemplateColumns', 'alignItems', 'justifyContent', 'textAlign', 'letterSpacing', 'lineHeight', 'maxWidth', 'width', 'height', 'position', 'backdropFilter'];
  const R = el => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const pick = (el, props = P) => { if (!el) return null; const cs = getComputedStyle(el); const o = { _rect: R(el) }; (props).forEach(p => o[p] = cs[p]); return o; };
  const find = (sel, txt) => [...document.querySelectorAll(sel)].find(e => e.textContent.trim().startsWith(txt) && e.offsetParent);
  const exact = (sel, txt) => [...document.querySelectorAll(sel)].find(e => e.textContent.trim() === txt && e.offsetParent);
  // climb to nearest ancestor that looks like a card (bg or radius or border)
  const card = (el, max = 8) => { let n = el; for (let i = 0; i < max && n; i++) { const cs = getComputedStyle(n); if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.borderRadius !== '0px' || cs.boxShadow !== 'none') return n; n = n.parentElement; } return el; };
  const btn = (el, max = 6) => { let n = el; for (let i = 0; i < max && n; i++) { if (n.tagName === 'A' || n.tagName === 'BUTTON') return n; const cs = getComputedStyle(n); if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') return n; n = n.parentElement; } return el; };
  const out = {};

  // header / nav
  const logo = exact('p', 'ACDJ Informatique');
  out.logoP = pick(logo);
  let nav = logo; for (let i = 0; i < 8 && nav; i++) { const cs = getComputedStyle(nav); if (cs.position === 'fixed' || cs.position === 'sticky') break; nav = nav.parentElement; }
  out.nav = pick(nav);
  out.phoneBtn = pick(btn(find('p', '06 52 24 66 47')));

  // hero
  out.heroEyebrow = pick(card(find('p', 'Dépannage Informatique Rapide')));
  out.heroH1 = pick(document.querySelector('h1'));
  out.heroBtnPrimary = pick(btn(find('p', 'Prendre RDV avec un expert')));
  out.heroBtnSecondary = pick(btn(find('p', 'En savoir plus')));
  out.partnersRow = pick(find('h3', 'Nos Partenaires')?.parentElement);

  // estimation form
  const estTitle = find('h5,h2,h3,p,div', 'Estimation Gratuite') || exact('p', 'Estimation Gratuite');
  out.estCard = pick(card(estTitle, 10));
  out.estInput = pick(document.querySelector('input'));

  // services
  out.servicesH2 = pick(exact('h2', 'Nos Services'));
  const sCard = card(find('h2', 'Réparation de Smartphones'), 6);
  out.serviceCard = pick(sCard);
  out.serviceImg = pick(sCard?.querySelector('img'));
  out.serviceBtn = pick(btn(find('p', 'Prendre RDV')));
  let grid = sCard; for (let i = 0; i < 5 && grid; i++) { if (getComputedStyle(grid).display === 'grid') break; grid = grid.parentElement; }
  out.serviceGrid = pick(grid);

  // hydrogel
  out.hydroH2 = pick(find('h2', 'Protégez votre écran'));
  out.hydroTable = pick([...document.querySelectorAll('img')].find(i => /6MHrakow/.test(i.src)));
  out.hydroCta = pick(btn(find('p', 'Cliquez ici pour une protection')));
  out.gammesH3 = pick(find('h3', 'Différentes gammes'));

  // pricing
  out.pricingSection = pick(card(find('h2', 'Forfaits de Dépannages'), 6));
  out.pricingEyebrow = pick(card(exact('p', 'TARIFS')));
  const planBasique = card(exact('p', 'Basique'), 6);
  out.planBasique = pick(planBasique);
  const planAvance = card(exact('p', 'Avancé'), 6);
  out.planAvance = pick(planAvance);
  out.priceText = pick(exact('p', '25€'));
  out.devisBtn = pick(btn(find('p', 'Obtenir un devis')));

  // FAQ + contact
  out.faqH2 = pick(exact('h2', 'Pourquoi choisir ACDJ Informatique ?'));
  out.faqItem = pick(card(find('p', 'Proposez-vous un service de réparation'), 6));
  out.contactCard = pick(card(find('h5', 'Vous avez une question'), 8));

  // testimonials
  out.avisH2 = pick(exact('h2', 'Avis Clients'));
  out.testiCard = pick(card(exact('p', 'Mario SOARES'), 6));

  // footer
  const footBig = find('h3', 'ACDJ-Informatique');
  out.footerBig = pick(footBig);
  let footer = footBig; for (let i = 0; i < 8 && footer; i++) { const cs = getComputedStyle(footer); if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && parseInt(cs.height) > 300) break; footer = footer.parentElement; }
  out.footer = pick(footer);
  out.footColTitle = pick(exact('p', 'Plan du site'));

  out.body = pick(document.body, ['backgroundColor', 'fontFamily', 'color']);
  out.pageH = document.body.scrollHeight;
  return out;
});
fs.writeFileSync(`reference/inspect-${width}.json`, JSON.stringify(data, null, 2));
console.log('written reference/inspect-' + width + '.json');
await b.close();

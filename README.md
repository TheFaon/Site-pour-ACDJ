# ACDJ-Informatique Reconstruction

Reconstruction statique du site Framer `https://www.acdj-informatique.com/` en HTML/CSS/JS maintenable, avec assets et polices auto-heberges.

## Structure

- `index.html` : page statique reconstruite
- `assets/css/style.css` : styles responsive
- `assets/js/main.js` : menu mobile, formulaires front-only, cookies
- `assets/fonts/` : polices locales
- `assets/images/` : images extraites du site original
- `assets/icons/` : SVG extraits
- `reference/` : captures, mesures et assets originaux
- `tools/` : scripts Playwright de capture, inspection et verification

## Commandes

```bash
npm install
npm run serve
npm run capture:original
npm run capture:mine
node tools/anchors2.mjs https://www.acdj-informatique.com/ 1440
node tools/anchors2.mjs file://$PWD/index.html 1440
node tools/anchors2.mjs file://$PWD/index.html 1024
node tools/anchors2.mjs file://$PWD/index.html 390
node tools/mobile-audit.mjs file://$PWD/index.html 390 output/mobile
npm run overflow
node tools/debug.mjs file://$PWD/index.html
```

## Breakpoints

| Breakpoint | Largeur |
| --- | ---: |
| Desktop | 1440 px |
| Tablette | 1024 px |
| Mobile | 390 px |

## Comparaison

| Vue | Original | Reconstruction | Note |
| --- | ---: | ---: | --- |
| Desktop | 8410 px | 8410 px | Hauteur alignee |
| Tablette | 9536 px | 9558 px | Ecart +22 px |
| Mobile | 13860 px | 14227 px | Ecart +367 px, layout empile sans overflow |

## Points restants

- Les formulaires sont front-only et doivent etre branches a une vraie destination si necessaire.
- Les liens sociaux, legal et espace client sont conserves en placeholders comme dans la maquette reconstruite.

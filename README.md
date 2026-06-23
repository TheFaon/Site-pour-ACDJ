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

## Variante Archio pour ACDJ

Une copie separee de la page d'accueil a ete creee pour reprendre le style du template Framer Archio sans modifier `index.html`.

- `index-archio.html` : landing ACDJ avec structure et rythme visuel Archio
- `assets/css/archio-acdj.css` : styles dedies a cette variante
- `assets/js/archio-acdj.js` : menu mobile, FAQ et reveal simple
- `assets/fonts/archio-fonts.css` : polices Archio locales ajoutees
- `reference/archio-original-*` : captures du template Archio original
- `reference/archio-acdj-*` : captures de la variante ACDJ

Commandes de verification utilisees :

```bash
node tools/capture.mjs https://archio-template.framer.website/ reference/archio-original
node tools/capture.mjs "file://$PWD/index-archio.html" reference/archio-acdj
node tools/overflow.mjs "file://$PWD/index-archio.html"
node tools/mobile-audit.mjs "file://$PWD/index-archio.html" 390 output/mobile-archio
node tools/debug.mjs "file://$PWD/index-archio.html"
```

| Vue | Archio original | Variante ACDJ | Ecart |
| --- | ---: | ---: | ---: |
| Desktop | 10130 px | 10130 px | 0 px |
| Tablette | 11505 px | 11506 px | +1 px |
| Mobile | 16917 px | 16919 px | +2 px |

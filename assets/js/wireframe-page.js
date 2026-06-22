const serviceBlocks = [
  {
    title: "Hero de la page",
    text: "Titre, promesse courte, zone d'intervention et action principale.",
  },
  {
    title: "Contenu du service",
    text: "Blocs de réassurance, étapes d'intervention et points couverts.",
  },
  {
    title: "Conversion",
    text: "Formulaire devis ou prise de rendez-vous selon le statut de la page.",
  },
];

const pages = {
  "depannage-informatique": {
    type: "Service",
    status: "site + devis",
    title: "Dépannage informatique",
    price: "dès 25 euros, forfaits Basique 25 euros, Avancé 45 euros, Ultra 75 euros",
    intro: "Wireframe de la page dédiée au dépannage informatique, avec une structure orientée diagnostic, forfaits et demande de devis.",
    blocks: serviceBlocks,
  },
  "reparation-smartphone": {
    type: "Service",
    status: "site + devis",
    title: "Réparation smartphone",
    price: "dès 50 euros hors pièces",
    intro: "Wireframe pour présenter les réparations courantes, le diagnostic, les pièces et la demande d'estimation.",
    blocks: serviceBlocks,
  },
  "installation-configuration": {
    type: "Service",
    status: "à trancher",
    title: "Installation et configuration",
    price: "devis = 1 page, site = 3 cartes ordinateur, smartphone, imprimante",
    intro: "Wireframe prévu pour arbitrer entre une page unique ou trois cartes détaillées selon les appareils à installer.",
    blocks: [
      {
        title: "Choix de structure",
        text: "Zone pour comparer une page commune et trois entrées par appareil.",
      },
      {
        title: "Cartes appareils",
        text: "Ordinateur, smartphone et imprimante avec besoins, prérequis et livrables.",
      },
      {
        title: "Demande guidee",
        text: "Formulaire orienté appareil, marque, contexte et lieu d'intervention.",
      },
    ],
  },
  "optimisation-pc": {
    type: "Service",
    status: "devis seul",
    title: "Optimisation PC",
    price: "contenu du forfait Avancé",
    intro: "Wireframe court pour capter les demandes d'optimisation PC sans développer une page commerciale complète.",
    blocks: serviceBlocks,
  },
  "recuperation-donnees": {
    type: "Service",
    status: "devis seul",
    title: "Récupération de données",
    price: "sauvegarde du forfait Ultra",
    intro: "Wireframe de qualification pour comprendre le support, l'urgence, le type de fichiers et le risque de perte.",
    blocks: serviceBlocks,
  },
  "service-drone": {
    type: "Service",
    status: "site + devis",
    title: "Service drone",
    price: "dès 75 euros par heure",
    intro: "Wireframe de page service pour les prestations drone, avec exemples d'usages, contraintes et demande de devis.",
    blocks: serviceBlocks,
  },
  "installation-caisse": {
    type: "Service",
    status: "devis seul",
    title: "Installation caisse",
    price: "caisse pour entreprises",
    intro: "Wireframe de qualification B2B pour collecter le type de commerce, les besoins matériels et les contraintes de mise en route.",
    blocks: serviceBlocks,
  },
  "creation-site-web": {
    type: "Service",
    status: "site seul",
    title: "Création de site web",
    price: "sur devis uniquement",
    intro: "Wireframe de page vitrine pour décrire l'offre création de site web et orienter vers un contact qualifié.",
    blocks: serviceBlocks,
  },
  vittel: {
    type: "Zone d'intervention",
    status: "à confirmer",
    title: "Intervention informatique à Vittel",
    price: "zone à confirmer",
    intro: "Wireframe local pour présenter les services disponibles à Vittel et les conditions de déplacement.",
    blocks: [
      {
        title: "Hero local",
        text: "Ville, services prioritaires, délais indicatifs et action de contact.",
      },
      {
        title: "Services disponibles",
        text: "Liste des interventions pertinentes pour la zone.",
      },
      {
        title: "Preuve locale",
        text: "Avis, FAQ locale et informations de déplacement à confirmer.",
      },
    ],
  },
  contrexeville: {
    type: "Zone d'intervention",
    status: "à confirmer",
    title: "Intervention informatique à Contrexéville",
    price: "zone à confirmer",
    intro: "Wireframe local pour structurer la page Contrexéville avant validation de la couverture exacte.",
    blocks: [],
  },
  "gironcourt-sur-vraine": {
    type: "Zone d'intervention",
    status: "à confirmer",
    title: "Intervention informatique à Gironcourt-sur-Vraine",
    price: "zone à confirmer",
    intro: "Wireframe local pour présenter les prestations possibles à Gironcourt-sur-Vraine.",
    blocks: [],
  },
  mirecourt: {
    type: "Zone d'intervention",
    status: "à confirmer",
    title: "Intervention informatique à Mirecourt",
    price: "zone à confirmer",
    intro: "Wireframe local pour organiser le contenu de la page Mirecourt.",
    blocks: [],
  },
  neufchateau: {
    type: "Zone d'intervention",
    status: "à confirmer",
    title: "Intervention informatique à Neufchâteau",
    price: "zone à confirmer",
    intro: "Wireframe local pour organiser le contenu de la page Neufchâteau.",
    blocks: [],
  },
  epinal: {
    type: "Zone d'intervention",
    status: "à confirmer",
    title: "Intervention informatique à Épinal",
    price: "zone à confirmer",
    intro: "Wireframe local pour organiser le contenu de la page Épinal.",
    blocks: [],
  },
  blog: {
    type: "Blog",
    status: "devis",
    title: "Blog",
    price: "structure prête, 2 pages par mois 150 euros ou 4 pages par mois 250 euros",
    intro: "Wireframe de blog avec liste d'articles, catégories et emplacements pour une production éditoriale mensuelle.",
    blocks: [
      {
        title: "Liste d'articles",
        text: "Cartes d'articles avec titre, résumé, catégorie et date.",
      },
      {
        title: "Catégories",
        text: "Dépannage, smartphone, sécurité, conseils et actualités locales.",
      },
      {
        title: "Rythme éditorial",
        text: "Zone de pilotage pour 2 ou 4 publications mensuelles.",
      },
    ],
  },
  "mentions-legales": {
    type: "Page légale",
    status: "devis",
    title: "Mentions légales",
    price: "page légale à fournir ou rédiger",
    intro: "Wireframe de page légale avec emplacements pour éditeur, hébergeur, contact et responsabilités.",
    blocks: [],
  },
  cgv: {
    type: "Page légale",
    status: "devis",
    title: "Conditions générales de vente",
    price: "page légale à fournir ou rédiger",
    intro: "Wireframe CGV avec sections commande, prix, paiement, exécution, garanties, rétractation et litiges.",
    blocks: [],
  },
  cgu: {
    type: "Page légale",
    status: "hors devis",
    title: "Conditions générales d'utilisation",
    price: "présent sur le site actuel",
    intro: "Wireframe CGU pour conserver une route dédiée et organiser les règles d'utilisation du site.",
    blocks: [],
  },
  "politique-confidentialite": {
    type: "Page légale",
    status: "hors devis",
    title: "Politique de confidentialité",
    price: "présent sur le site actuel",
    intro: "Wireframe de confidentialité avec finalités, données collectées, durées, droits et contact.",
    blocks: [],
  },
};

const fallbackBlocks = [
  {
    title: "Section 1",
    text: "Emplacement du contenu principal à valider.",
  },
  {
    title: "Section 2",
    text: "Emplacement des détails, preuves ou informations légales.",
  },
  {
    title: "Section 3",
    text: "Emplacement du formulaire, CTA ou liens associés.",
  },
];

const defaultZoneBlocks = pages.vittel.blocks;

Object.values(pages).forEach((page) => {
  if (!page.blocks.length) page.blocks = page.type === "Zone d'intervention" ? defaultZoneBlocks : fallbackBlocks;
});

function getSlug() {
  const explicit = document.body.dataset.wireframePage;
  if (explicit) return explicit;
  const parts = window.location.pathname.split("/").filter(Boolean);
  return parts[parts.length - 1] || "depannage-informatique";
}

function blockMarkup(block, index) {
  return `
    <article class="wf-block">
      <span class="wf-circle" aria-hidden="true"></span>
      <h3>${index + 1}. ${block.title}</h3>
      <p>${block.text}</p>
    </article>
  `;
}

function renderPage(page, slug) {
  const root = document.querySelector("#wireframe-root");
  if (!root) return;

  document.title = `${page.title} | Wireframe ACDJ Informatique`;
  const description = document.querySelector("meta[name='description']");
  if (description) description.setAttribute("content", page.intro);

  root.innerHTML = `
    <header class="site-header" id="top">
      <div class="header__inner">
        <a class="brand" href="../index.html#top" aria-label="ACDJ Informatique - accueil">
          <img class="brand__logo" src="../assets/images/logo.png" alt="Logo ACDJ Informatique" width="32" height="32" />
          <span class="brand__name">ACDJ Informatique</span>
        </a>
        <nav class="nav" aria-label="Navigation principale">
          <a href="../index.html#top">Accueil</a>
          <a href="../index.html#services">Services</a>
          <a href="../index.html#pricing">Tarifs</a>
          <a href="../index.html#contact">Contact</a>
          <a href="../index.html#hydrogel">Boutique</a>
          <a href="../index.html#faq">FAQ</a>
          <a href="../index.html#avis">Avis</a>
          <a href="#">Espace client</a>
        </nav>
        <a class="phone-btn" href="tel:+33652246647">
          <span>06 52 24 66 47</span>
          <svg class="ico" viewBox="0 0 256 256" aria-hidden="true"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z"></path></svg>
        </a>
        <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <main class="wf-main">
      <section class="wf-hero">
        <p class="wf-kicker">Wireframe - ${page.type} - ${page.status}</p>
        <div class="wf-hero__grid">
          <div>
            <h1>${page.title}</h1>
            <p class="wf-lead">${page.intro}</p>
            <ul class="wf-meta">
              <li>URL : /${slug}</li>
              <li>Statut : ${page.status}</li>
              <li>${page.price}</li>
            </ul>
            <div class="wf-actions">
              <a class="btn btn--primary" href="../index.html#contact">Demander un devis</a>
              <a class="btn btn--ghost" href="../index.html#services">Retour aux services</a>
            </div>
          </div>
          <aside class="wf-panel" aria-label="Apercu wireframe du haut de page">
            <p class="wf-panel__label">Zone visuelle provisoire</p>
            <div class="wf-skeleton">
              <span class="wf-box"></span>
              <span class="wf-line"></span>
              <span class="wf-line wf-line--short"></span>
              <span class="wf-small"></span>
            </div>
          </aside>
        </div>
      </section>

      <section class="wf-section">
        <div class="wf-section__head">
          <div>
            <p class="wf-section__eyebrow">Structure proposée</p>
            <h2>Blocs à produire</h2>
          </div>
          <span class="wf-status">${page.status}</span>
        </div>
        <div class="wf-blocks">
          ${page.blocks.map(blockMarkup).join("")}
        </div>
      </section>

      <section class="wf-section">
        <div class="wf-section__head">
          <div>
            <p class="wf-section__eyebrow">Parcours utilisateur</p>
            <h2>Qualification et conversion</h2>
          </div>
        </div>
        <div class="wf-two-col">
          <div class="wf-panel">
            <p class="wf-panel__label">Contenu detaille</p>
            <div class="wf-skeleton">
              <span class="wf-line"></span>
              <span class="wf-line"></span>
              <span class="wf-line wf-line--short"></span>
              <span class="wf-box"></span>
              <span class="wf-line wf-line--tiny"></span>
            </div>
          </div>
          <aside class="wf-form" aria-label="Formulaire wireframe">
            <p class="wf-panel__label">Formulaire / CTA</p>
            <div class="wf-form__grid">
              <span class="wf-small"></span>
              <span class="wf-small"></span>
              <span class="wf-box"></span>
              <span class="wf-small"></span>
            </div>
          </aside>
        </div>
      </section>

      <section class="wf-footer-cta">
        <div class="wf-footer-cta__inner">
          <div>
            <h2>Page en wireframe</h2>
            <p>Le contenu final, les visuels et les textes SEO seront à valider après arbitrage.</p>
          </div>
          <a class="btn btn--dark" href="../index.html#contact">Contact</a>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer__inner">
        <div class="footer__brand">
          <img src="../assets/images/logo.png" alt="" width="40" height="40" />
          <span>ACDJ-Informatique</span>
        </div>
        <nav class="footer__cols" aria-label="Pied de page">
          <div class="footer__col">
            <p class="footer__col-title">Plan du site</p>
            <a href="../index.html#contact">Contact</a>
            <a href="../index.html#pricing">Nos plans</a>
            <a href="../index.html#zones">Zones d'intervention</a>
            <a href="../blog/">Blog</a>
            <a href="../index.html#faq">FAQ</a>
          </div>
          <div class="footer__col">
            <p class="footer__col-title">Nos liens</p>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
            <a href="#">Linkedin</a>
            <a href="#">Maps</a>
          </div>
          <div class="footer__col">
            <p class="footer__col-title">Legal</p>
            <a href="../cgv/">CGV</a>
            <a href="../cgu/">CGU</a>
            <a href="../mentions-legales/">Mentions légales</a>
            <a href="../politique-confidentialite/">Politique de confidentialité</a>
          </div>
        </nav>
      </div>
      <p class="footer__copy">©2026 - Créé par Adwaves</p>
    </footer>

    <div class="cookie" hidden>
      <p class="cookie__title">Paramètres des cookies</p>
      <p class="cookie__text">Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic du site et fournir du contenu personnalisé.</p>
      <div class="cookie__actions">
        <button class="cookie__btn cookie__btn--ghost" data-cookie="refuse">Refuser</button>
        <button class="cookie__btn cookie__btn--solid" data-cookie="accept">Accepter</button>
      </div>
    </div>
  `;
}

const slug = getSlug();
renderPage(pages[slug] || pages["depannage-informatique"], slug);

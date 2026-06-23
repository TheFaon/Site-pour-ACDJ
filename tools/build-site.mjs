import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const out = process.cwd();

const company = {
  name: "ACDJ Informatique",
  phone: "06 52 24 66 47",
  phoneHref: "tel:+33652246647",
  email: "contact@acdj-informatique.com",
  emailHref: "mailto:contact@acdj-informatique.com",
  sector: "Vittel, Contrexéville, Neufchâteau, Mirecourt et alentours",
  trustpilot: "https://fr.trustpilot.com/review/acdj-informatique.com",
};

const services = [
  {
    slug: "depannage-informatique",
    title: "Dépannage informatique",
    pageTitle: "Dépannage informatique à Vittel et dans les Vosges",
    price: "à partir de 25 €",
    icon: "tool",
    image: "service-it-support.webp",
    summary: "Pannes, lenteurs, virus, Wi-Fi ou logiciels: un diagnostic clair pour remettre vos appareils en état.",
    problem: "Votre ordinateur ne démarre plus, ralentit fortement ou affiche des messages inhabituels.",
    actions: ["Diagnostic matériel et logiciel", "Nettoyage, optimisation et suppression de virus", "Intervention à domicile ou à distance selon le besoin"],
    faqs: ["Combien coûte un dépannage ?", "Pouvez-vous intervenir à distance ?", "Le devis est-il obligatoire avant réparation ?"],
  },
  {
    slug: "reparation-ordinateur",
    title: "Réparation ordinateur",
    pageTitle: "Réparation ordinateur à Vittel et dans les Vosges",
    price: "sur diagnostic, à partir de 25 €",
    icon: "laptop",
    image: "service-computer-install.webp",
    summary: "PC fixe ou portable: recherche de panne, remise en état Windows, sauvegarde et conseils de réparation.",
    problem: "Votre PC portable ou fixe rencontre une panne matérielle, logicielle ou un problème de performance.",
    actions: ["Contrôle des composants et du système", "Réinstallation Windows si nécessaire", "Sauvegarde des données accessibles avant intervention lourde"],
    faqs: ["Réparez-vous les PC portables ?", "Prévenez-vous avant de changer une pièce ?", "Que se passe-t-il si la réparation n'est pas rentable ?"],
  },
  {
    slug: "reparation-smartphone",
    title: "Réparation smartphone",
    pageTitle: "Réparation smartphone à Vittel et dans les Vosges",
    price: "à partir de 50 € hors pièces",
    icon: "phone",
    image: "service-smartphone-repair.webp",
    summary: "Diagnostic smartphone, écran, batterie, connectique et problèmes logiciels selon le modèle.",
    problem: "Votre smartphone est cassé, lent, ne charge plus ou nécessite un diagnostic avant remplacement de pièce.",
    actions: ["Diagnostic de la panne et du modèle", "Devis hors pièces avant intervention", "Test de fonctionnement après réparation"],
    faqs: ["Les pièces sont-elles d'origine ?", "Faut-il commander les pièces avant ?", "Combien de temps dure une réparation ?"],
  },
  {
    slug: "assistance-a-domicile",
    title: "Assistance à domicile",
    pageTitle: "Assistance informatique à domicile à Vittel et dans les Vosges",
    price: "à partir de 25 €",
    icon: "home",
    image: "service-smartphone-install.webp",
    summary: "Aide simple et pédagogique pour ordinateur, smartphone, mail, box internet, logiciels et usages du quotidien.",
    problem: "Vous avez besoin d'aide chez vous pour configurer, comprendre ou débloquer vos équipements.",
    actions: ["Aide aux mails, comptes et logiciels", "Configuration smartphone, ordinateur et box", "Explications claires pour gagner en autonomie"],
    faqs: ["Intervenez-vous chez les particuliers ?", "Aidez-vous les seniors ?", "Puis-je préparer mes questions avant le rendez-vous ?"],
  },
  {
    slug: "installation-imprimante",
    title: "Installation imprimante",
    pageTitle: "Installation imprimante à Vittel et dans les Vosges",
    price: "à partir de 75 €",
    icon: "printer",
    image: "service-printer-install.webp",
    summary: "Installation USB, Wi-Fi ou réseau avec pilotes, tests d'impression et connexion aux appareils.",
    problem: "Votre imprimante ne s'installe pas, se déconnecte ou ne communique plus avec vos appareils.",
    actions: ["Installation des pilotes et logiciels", "Connexion Wi-Fi, USB ou réseau", "Tests d'impression et explication des réglages utiles"],
    faqs: ["Installez-vous toutes les marques ?", "Pouvez-vous connecter plusieurs appareils ?", "Intervenez-vous en entreprise ?"],
  },
  {
    slug: "installation-ordinateur",
    title: "Installation d'ordinateur",
    pageTitle: "Installation d'ordinateur à Vittel et dans les Vosges",
    price: "à partir de 75 €",
    icon: "monitor",
    image: "service-computer-install.webp",
    summary: "Mise en route, comptes, logiciels essentiels, sécurité et transfert de données pour un nouveau poste.",
    problem: "Vous venez d'acheter un ordinateur et vous souhaitez le configurer proprement dès le départ.",
    actions: ["Création des comptes et configuration initiale", "Installation des logiciels utiles", "Sécurité, sauvegarde et transfert des données accessibles"],
    faqs: ["Pouvez-vous transférer mes anciens fichiers ?", "Installez-vous les logiciels de sécurité ?", "L'installation peut-elle se faire à domicile ?"],
  },
  {
    slug: "recuperation-de-donnees",
    title: "Récupération de données",
    pageTitle: "Récupération de données à Vittel et dans les Vosges",
    price: "sur devis",
    icon: "database",
    image: "service-computer-install.webp",
    summary: "Sauvegarde, transfert et récupération de fichiers lorsque le support est encore exploitable.",
    problem: "Vos documents, photos ou fichiers professionnels ne sont plus accessibles depuis votre appareil.",
    actions: ["Diagnostic du support et du niveau de risque", "Copie ou transfert des données récupérables", "Conseil de sauvegarde pour éviter une nouvelle perte"],
    faqs: ["Garantissez-vous la récupération ?", "Faut-il arrêter d'utiliser le support ?", "Pouvez-vous mettre en place une sauvegarde ?"],
  },
  {
    slug: "creation-site-web",
    title: "Création de site web",
    pageTitle: "Création de site web à Vittel et dans les Vosges",
    price: "sur devis",
    icon: "globe",
    image: "service-website.jpg",
    summary: "Site vitrine clair, responsive et adapté aux entreprises locales qui veulent être trouvées et contactées.",
    problem: "Votre activité a besoin d'une présence en ligne propre, lisible et simple à faire évoluer.",
    actions: ["Cadrage du contenu et de l'arborescence", "Design responsive adapté à votre image", "Mise en ligne et accompagnement après livraison"],
    faqs: ["Le site sera-t-il adapté au mobile ?", "Pouvez-vous reprendre un site existant ?", "Le devis inclut-il l'accompagnement ?"],
  },
  {
    slug: "installation-de-caisse",
    title: "Installation de caisse",
    pageTitle: "Installation de caisse à Vittel et dans les Vosges",
    price: "sur devis",
    icon: "receipt",
    image: "service-printer-install.webp",
    summary: "Accompagnement pour installer, raccorder et prendre en main une solution de caisse en commerce local.",
    problem: "Votre commerce a besoin d'une installation de caisse fiable, documentée et simple à utiliser.",
    actions: ["Analyse du matériel et des besoins", "Installation et raccordement des périphériques", "Prise en main et vérification du fonctionnement"],
    faqs: ["Intervenez-vous pour les commerces ?", "Pouvez-vous configurer les périphériques ?", "Le devis dépend-il du matériel déjà en place ?"],
  },
  {
    slug: "prestations-drone",
    title: "Prestations drone",
    pageTitle: "Prestations drone à Vittel et dans les Vosges",
    price: "à partir de 75 €/h",
    icon: "drone",
    image: "service-drone.webp",
    summary: "Prises de vue aériennes par drone pour projets personnels, professionnels ou événementiels.",
    problem: "Vous avez besoin d'images aériennes propres pour valoriser un lieu, un chantier ou un projet.",
    actions: ["Préparation de la mission et du cadrage", "Prise de vue aérienne selon les contraintes du site", "Livraison des images selon le besoin défini au devis"],
    faqs: ["La prestation dépend-elle de la météo ?", "Les frais de déplacement sont-ils inclus ?", "Pouvez-vous intervenir pour une entreprise ?"],
  },
];

const plans = [
  {
    title: "Basique",
    detail: "Crédit 30 min",
    price: "25 €",
    items: ["Diagnostic et nettoyage", "Installation logiciels", "À domicile ou à distance"],
  },
  {
    title: "Avancé",
    detail: "Crédit 60 min",
    price: "45 €",
    badge: "Recommandé",
    items: ["Forfait Basique inclus", "Optimisation système", "Suppression virus et publicités"],
  },
  {
    title: "Ultra",
    detail: "Crédit 120 min",
    price: "75 €",
    items: ["Forfaits Basique et Avancé inclus", "Réinstallation Windows", "Sauvegarde des données"],
  },
];

const zones = [
  { slug: "vittel", name: "Vittel", detail: "Intervention locale pour les particuliers, indépendants et petites entreprises de Vittel." },
  { slug: "contrexeville", name: "Contrexéville", detail: "Dépannage et assistance autour de Contrexéville, à domicile ou à distance." },
  { slug: "neufchateau", name: "Neufchâteau", detail: "Accompagnement informatique à Neufchâteau et communes proches, sur devis clair." },
  { slug: "mirecourt", name: "Mirecourt", detail: "Intervention informatique à Mirecourt, avec diagnostic et suivi après prestation." },
];

const contextCities = [
  { name: "Épinal", detail: "Repère de contexte pour situer l'est des Vosges." },
  { name: "Nancy", detail: "Repère de contexte pour situer le nord du secteur." },
];

const trustStats = [
  { value: "⟦Note Trustpilot⟧", label: "avis clients vérifiés" },
  { value: "⟦Délai⟧", label: "intervention selon disponibilité" },
  { value: "⟦Services⟧", label: "prestations informatiques" },
  { value: "⟦Délai devis⟧", label: "réponse au devis" },
];

const workflowSteps = [
  {
    icon: "search",
    title: "Diagnostic",
    text: "Vous décrivez le problème, puis un premier diagnostic oriente la solution.",
  },
  {
    icon: "receipt",
    title: "Devis clair",
    text: "Le prix, les pièces éventuelles et les déplacements sont annoncés avant intervention.",
  },
  {
    icon: "tool",
    title: "Intervention",
    text: "L'intervention se fait à domicile ou à distance selon le besoin et la faisabilité.",
  },
  {
    icon: "shield",
    title: "Garantie & suivi",
    text: "Les actions réalisées sont expliquées et un suivi reste possible après la prestation.",
  },
];

const repairProcess = [
  ["package", "Dépose"],
  ["search", "Diagnostic"],
  ["tool", "Réparation"],
  ["check", "Test"],
  ["home", "Restitution"],
];

const reviews = [
  {
    name: "Mario Soares",
    avatar: "avatar-client3.png",
    text: "Très professionnel malgré son jeune âge, beaucoup de dextérité, très bonnes explications, prend le temps de bien faire comprendre ses actions, à recommander sans discussion.",
  },
  {
    name: "Aurore Lagarde",
    avatar: "avatar-client2.png",
    text: "Professionnel, sympathique, honnête.",
  },
  {
    name: "Swen Boutin",
    avatar: "avatar-client1.png",
    text: "Excellent travail. La protection d'écran est parfaite au toucher, fluide à l'utilisation, et résistante pour un usage intensif.",
  },
];

const faq = [
  {
    question: "Proposez-vous un service de réparation express ?",
    answer: "Oui, lorsque la panne et la disponibilité des pièces le permettent. Le diagnostic confirme toujours le délai réaliste avant intervention.",
  },
  {
    question: "Proposez-vous des services pour les entreprises ?",
    answer: "Oui. ACDJ Informatique accompagne les indépendants, commerces et petites entreprises pour le dépannage, l'installation et l'assistance informatique.",
  },
  {
    question: "Proposez-vous un service d'installation à domicile ?",
    answer: "Oui. Les interventions peuvent se faire à domicile dans le secteur de Vittel, Contrexéville, Neufchâteau, Mirecourt et alentours.",
  },
  {
    question: "Quels types de produits dépannez-vous ?",
    answer: "Ordinateurs, smartphones, imprimantes, périphériques, logiciels, connexions, sauvegardes et équipements liés à l'usage informatique quotidien.",
  },
  {
    question: "Utilisez-vous des pièces d'origine pour les réparations ?",
    answer: "Les pièces sont choisies selon le modèle, la disponibilité et votre accord. Le devis précise la solution proposée avant toute réparation.",
  },
];

const legacyRedirects = [
  ["contact-devis", "contact/"],
  ["depannage-informatique", "services/depannage-informatique/"],
  ["reparation-smartphone", "services/reparation-smartphone/"],
  ["recuperation-donnees", "services/recuperation-de-donnees/"],
  ["creation-site-web", "services/creation-site-web/"],
  ["installation-caisse", "services/installation-de-caisse/"],
  ["service-drone", "services/prestations-drone/"],
  ["installation-configuration", "services/installation-ordinateur/"],
  ["assistance-informatique-domicile-vittel", "services/assistance-a-domicile/"],
  ["installation-imprimante-vittel", "services/installation-imprimante/"],
  ["recuperation-donnees-vittel", "services/recuperation-de-donnees/"],
  ["reparation-ordinateur-vittel", "services/reparation-ordinateur/"],
  ["reparation-smartphone-vittel", "services/reparation-smartphone/"],
  ["service-drone-vosges", "services/prestations-drone/"],
  ["depannage-informatique-vittel", "zones/vittel/"],
  ["depannage-informatique-contrexeville", "zones/contrexeville/"],
  ["depannage-informatique-neufchateau", "zones/neufchateau/"],
  ["depannage-informatique-mirecourt", "zones/mirecourt/"],
  ["vittel", "zones/vittel/"],
  ["contrexeville", "zones/contrexeville/"],
  ["neufchateau", "zones/neufchateau/"],
  ["mirecourt", "zones/mirecourt/"],
];

function depthPrefix(file) {
  const depth = file.split("/").length - 1;
  return "../".repeat(depth);
}

function writePage(file, html) {
  const target = join(out, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
}

function icon(name) {
  const common = 'class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"';
  const icons = {
    tool: `<svg ${common}><path d="M14.7 6.3a4 4 0 0 0-5 5L4 17v3h3l5.7-5.7a4 4 0 0 0 5-5l-2.8 2.8-3-3 2.8-2.8Z"/><path d="m12 12 6 6"/></svg>`,
    laptop: `<svg ${common}><path d="M4 5.5h16v10H4z"/><path d="M2.5 18.5h19"/><path d="M9 15.5h6"/></svg>`,
    phone: `<svg ${common}><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M10.5 18h3"/></svg>`,
    home: `<svg ${common}><path d="m3 11 9-8 9 8"/><path d="M5.5 10v10h13V10"/><path d="M9.5 20v-6h5v6"/></svg>`,
    printer: `<svg ${common}><path d="M6.5 8V3.5h11V8"/><path d="M6.5 17.5H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2h-1.5"/><path d="M7 14h10v6H7z"/><path d="M17 11h1"/></svg>`,
    monitor: `<svg ${common}><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8"/><path d="M12 16v4"/></svg>`,
    database: `<svg ${common}><ellipse cx="12" cy="5" rx="7" ry="3"/><path d="M5 5v6c0 1.7 3.1 3 7 3s7-1.3 7-3V5"/><path d="M5 11v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"/></svg>`,
    globe: `<svg ${common}><circle cx="12" cy="12" r="9"/><path d="M3.5 12h17"/><path d="M12 3c2.2 2.5 3.3 5.5 3.3 9s-1.1 6.5-3.3 9c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z"/></svg>`,
    receipt: `<svg ${common}><path d="M6 3h12v18l-2-1.3-2 1.3-2-1.3-2 1.3-2-1.3L6 21V3Z"/><path d="M9 8h6"/><path d="M9 12h6"/><path d="M9 16h4"/></svg>`,
    drone: `<svg ${common}><path d="M10 12h4"/><path d="M12 10v4"/><rect x="9" y="9" width="6" height="6" rx="1.5"/><path d="M7 7 4.5 4.5"/><path d="m17 7 2.5-2.5"/><path d="M7 17 4.5 19.5"/><path d="m17 17 2.5 2.5"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/></svg>`,
    shield: `<svg ${common}><path d="M12 3 20 6v6c0 5-3.4 8-8 10-4.6-2-8-5-8-10V6l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>`,
    check: `<svg ${common}><path d="m5 12 4 4 10-10"/></svg>`,
    clock: `<svg ${common}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`,
    arrow: `<svg ${common}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>`,
    mail: `<svg ${common}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>`,
    map: `<svg ${common}><path d="M12 21s6-5.2 6-11a6 6 0 0 0-12 0c0 5.8 6 11 6 11Z"/><circle cx="12" cy="10" r="2"/></svg>`,
    search: `<svg ${common}><circle cx="11" cy="11" r="7"/><path d="m16.5 16.5 4 4"/></svg>`,
    package: `<svg ${common}><path d="m3.5 7.5 8.5 4.8 8.5-4.8"/><path d="M12 22V12.3"/><path d="M20.5 7.5v9L12 21.3 3.5 16.5v-9L12 2.7l8.5 4.8Z"/></svg>`,
  };
  return icons[name] || icons.check;
}

function arrowIcon() {
  return icon("arrow");
}

function header(prefix, active = "") {
  const current = (key) => (active === key ? ' aria-current="page"' : "");
  return `
  <a class="skip-link" href="#contenu">Aller au contenu</a>
  <header class="site-header" data-header>
    <div class="site-header__inner">
      <a class="brand" href="${prefix}index.html" aria-label="ACDJ Informatique - accueil">
        <img class="brand__logo" src="${prefix}assets/images/logo.png" width="44" height="44" alt="" />
        <span class="brand__text">ACDJ Informatique</span>
      </a>
      <button class="nav-toggle" type="button" aria-label="Ouvrir le menu" aria-controls="primary-nav" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
      <nav class="site-nav" id="primary-nav" aria-label="Navigation principale">
        <a href="${prefix}index.html"${current("home")}>Accueil</a>
        <a href="${prefix}services/"${current("services")}>Services</a>
        <a href="${prefix}zones/"${current("zones")}>Zones</a>
        <a href="${prefix}index.html#faq">FAQ</a>
        <a href="${prefix}contact/"${current("contact")}>Contact</a>
        <a class="site-nav__phone" href="${company.phoneHref}">${company.phone}</a>
        <a class="button button--primary site-nav__cta" href="${prefix}contact/">Devis gratuit</a>
      </nav>
      <div class="header-actions" aria-label="Actions rapides">
        <a class="phone-link" href="${company.phoneHref}">${icon("phone")}<span>${company.phone}</span></a>
        <a class="button button--primary button--small" href="${prefix}contact/">Devis gratuit</a>
      </div>
    </div>
  </header>`;
}

function footer(prefix) {
  return `
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a class="brand brand--footer" href="${prefix}index.html">
          <img class="brand__logo" src="${prefix}assets/images/logo.png" width="44" height="44" alt="" />
          <span class="brand__text">ACDJ Informatique</span>
        </a>
        <p>Dépannage, réparation et assistance informatique locale dans les Vosges.</p>
      </div>
      <div>
        <h2>Services</h2>
        <ul>
          <li><a href="${prefix}services/depannage-informatique/">Dépannage informatique</a></li>
          <li><a href="${prefix}services/reparation-ordinateur/">Réparation ordinateur</a></li>
          <li><a href="${prefix}services/reparation-smartphone/">Réparation smartphone</a></li>
          <li><a href="${prefix}services/creation-site-web/">Création site web</a></li>
        </ul>
      </div>
      <div>
        <h2>Zones</h2>
        <ul>
          ${zones.map((zone) => `<li><a href="${prefix}zones/${zone.slug}/">${zone.name}</a></li>`).join("")}
        </ul>
      </div>
      <div>
        <h2>Contact</h2>
        <ul>
          <li><a href="${company.phoneHref}">${company.phone}</a></li>
          <li><a href="${company.emailHref}">${company.email}</a></li>
          <li>Déplacements: 0,65 €/km</li>
          <li><a href="${company.trustpilot}" rel="noopener">Trustpilot</a></li>
        </ul>
      </div>
      <div>
        <h2>Légal</h2>
        <ul>
          <li><a href="${prefix}mentions-legales/">Mentions légales</a></li>
          <li><a href="${prefix}politique-confidentialite/">Confidentialité</a></li>
          <li><a href="${prefix}cgv/">CGV</a></li>
          <li><a href="${prefix}cgu/">CGU</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom container">
      <p>© 2026 ACDJ Informatique. Tous droits réservés.</p>
      <a href="${prefix}contact/">Demander un devis</a>
    </div>
  </footer>`;
}

function shell({ file, title, description, active, body }) {
  const prefix = depthPrefix(file);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <link rel="icon" href="${prefix}assets/images/logo.png" />
  <link rel="stylesheet" href="${prefix}assets/fonts/fonts.css" />
  <link rel="stylesheet" href="${prefix}assets/css/style.css" />
</head>
<body>
${header(prefix, active)}
  <main id="contenu">
${body}
  </main>
${footer(prefix)}
  <script defer src="${prefix}assets/js/main.js"></script>
</body>
</html>
`;
}

function sectionHeader(eyebrow, title, text) {
  return `<div class="section-header reveal">
    <p class="eyebrow">${eyebrow}</p>
    <h2>${title}</h2>
    <p>${text}</p>
  </div>`;
}

function serviceCards(prefix, count = services.length) {
  return services
    .slice(0, count)
    .map(
      (service) => `<article class="service-card reveal">
        <div class="service-card__icon">${icon(service.icon)}</div>
        <h3>${service.title}</h3>
        <p>${service.summary}</p>
        <p class="service-card__price">${service.price}</p>
        <a class="inline-link" href="${prefix}services/${service.slug}/">En savoir plus ${arrowIcon()}</a>
      </article>`,
    )
    .join("");
}

function statsBand() {
  return `<section class="section section--stats" aria-labelledby="stats-title">
      <div class="container">
        <div class="section-header section-header--compact reveal">
          <p class="eyebrow">Repères de confiance</p>
          <h2 id="stats-title">Des chiffres à renseigner clairement</h2>
          <p>Les valeurs restent en placeholders pour être remplacées par les données validées d'ACDJ.</p>
        </div>
        <dl class="stats-grid">
          ${trustStats
            .map(
              (stat) => `<div class="stat-card reveal">
                <dt>${stat.label}</dt>
                <dd class="stat-card__value">${stat.value}</dd>
              </div>`,
            )
            .join("")}
        </dl>
      </div>
    </section>`;
}

function workflowTimeline() {
  return `<ol class="steps" aria-label="Déroulé d'une intervention ACDJ Informatique">
          ${workflowSteps
            .map(
              (step, index) => `<li class="reveal" style="--step-index: ${index}">
            <span class="steps__number">${String(index + 1).padStart(2, "0")}</span>
            <span class="steps__icon">${icon(step.icon)}</span>
            <h3>${step.title}</h3>
            <p>${step.text}</p>
          </li>`,
            )
            .join("")}
        </ol>`;
}

function zoneMap(prefix) {
  const servedCities = [
    { name: "Vittel", slug: "vittel", className: "zone-pin--vittel zone-pin--featured", x: 43.75, y: 58.3 },
    { name: "Contrexéville", slug: "contrexeville", className: "zone-pin--contrexeville", x: 37.5, y: 65 },
    { name: "Neufchâteau", slug: "neufchateau", className: "zone-pin--neufchateau", x: 31.25, y: 41.7 },
    { name: "Mirecourt", slug: "mirecourt", className: "zone-pin--mirecourt", x: 58.75, y: 33.3 },
  ];
  const contextPins = [
    { name: "Épinal", x: 75, y: 60 },
    { name: "Nancy", x: 65, y: 15 },
  ];

  return `<figure class="zone-map reveal">
            <div class="zone-map__canvas">
              <svg class="zone-map__svg" viewBox="0 0 800 600" role="img" aria-label="Carte stylisée du secteur Vittel, Contrexéville, Neufchâteau, Mirecourt, avec Épinal et Nancy comme repères de contexte">
                <defs>
                  <filter id="zone-halo-blur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="18" />
                  </filter>
                </defs>
                <path class="zone-map__shape" d="M198 119C271 58 386 56 469 86c94 34 187 102 206 202 20 107-46 200-132 248-84 47-205 49-292 9-83-38-145-117-155-210-9-86 38-163 102-216Z" />
                <ellipse class="zone-map__halo zone-map__halo--wide" cx="340" cy="365" rx="285" ry="208" filter="url(#zone-halo-blur)" />
                <ellipse class="zone-map__halo zone-map__halo--core" cx="333" cy="370" rx="116" ry="82" />
                <ellipse class="zone-map__ring zone-map__ring--wide" cx="340" cy="365" rx="285" ry="208" />
                <ellipse class="zone-map__ring zone-map__ring--core" cx="333" cy="370" rx="116" ry="82" />
                <path class="zone-map__route" d="M250 250C302 294 331 329 350 350c39-47 77-94 120-150M300 390c20-22 35-32 50-40 81 17 148 21 250 10" />
              </svg>
              ${servedCities
                .map(
                  (city) => `<a class="zone-pin zone-pin--served ${city.className}" style="--x: ${city.x}%; --y: ${city.y}%;" href="${prefix}zones/${city.slug}/" data-map-pin aria-label="${city.name}, dépannage informatique à domicile">
                <span class="zone-pin__dot" aria-hidden="true"></span>
                <span class="zone-pin__label">${city.name}</span>
                <span class="zone-pin__tooltip" role="tooltip">${city.name} - dépannage à domicile</span>
              </a>`,
                )
                .join("")}
              ${contextPins
                .map(
                  (city) => `<button class="zone-pin zone-pin--context" style="--x: ${city.x}%; --y: ${city.y}%;" type="button" data-map-pin aria-label="${city.name}, repère de contexte">
                <span class="zone-pin__dot" aria-hidden="true"></span>
                <span class="zone-pin__label">${city.name}</span>
                <span class="zone-pin__tooltip" role="tooltip">${city.name} - repère de contexte</span>
              </button>`,
                )
                .join("")}
            </div>
            <figcaption class="zone-map__legend">
              <span><i class="legend-dot legend-dot--core"></i>Zone principale</span>
              <span><i class="legend-dot legend-dot--wide"></i>Secteur étendu</span>
            </figcaption>
          </figure>`;
}

function zoneInfographic(prefix) {
  return `<div class="container zone-layout">
        ${zoneMap(prefix)}
        <div class="zone-copy">
          ${sectionHeader("Zones d'intervention", "Une présence locale dans l'ouest des Vosges", "Nous intervenons à domicile dans tout le secteur de Vittel, Contrexéville et l'ouest des Vosges.")}
          <ul class="zone-city-list" aria-label="Villes desservies en priorité">
            ${zones.map((zone) => `<li><a href="${prefix}zones/${zone.slug}/">${zone.name}</a></li>`).join("")}
          </ul>
          <p class="zone-context">Repères de contexte: ${contextCities.map((city) => city.name).join(", ")}.</p>
          <a class="button button--secondary" href="${prefix}contact/">Votre ville n'est pas listée ? Demandez un devis</a>
        </div>
      </div>`;
}

function repairProcessBlock(prefix, service) {
  if (!["reparation-ordinateur", "reparation-smartphone"].includes(service.slug)) return "";

  return `<section class="section section--surface">
      <div class="container">
        ${sectionHeader("Process réparation", "Un parcours cadré du dépôt à la restitution", "Chaque étape permet de valider l'état de l'appareil avant de poursuivre.")}
        <ol class="repair-flow" aria-label="Parcours de réparation">
          ${repairProcess
            .map(
              ([iconName, label], index) => `<li class="reveal" style="--step-index: ${index}">
                <span>${icon(iconName)}</span>
                <strong>${label}</strong>
              </li>`,
            )
            .join("")}
        </ol>
      </div>
    </section>`;
}

function quoteForm(prefix, compact = false) {
  const options = services.map((service) => `<option value="${service.slug}">${service.title}</option>`).join("");
  return `<form class="quote-form reveal" data-form novalidate>
    <div class="form-grid">
      <label>Nom
        <input name="name" type="text" autocomplete="name" required />
      </label>
      <label>Email
        <input name="email" type="email" autocomplete="email" required />
      </label>
      <label>Téléphone
        <input name="phone" type="tel" autocomplete="tel" required />
      </label>
      <label>Service concerné
        <select name="service" required>
          <option value="">Choisir un service</option>
          ${options}
        </select>
      </label>
      <label>Ville
        <input name="city" type="text" autocomplete="address-level2" placeholder="Vittel" required />
      </label>
      <label class="${compact ? "" : "form-grid__wide"}">Message
        <textarea name="message" rows="5" placeholder="Décrivez brièvement votre besoin" required></textarea>
      </label>
    </div>
    <button class="button button--primary button--wide" type="submit">Demander un devis gratuit</button>
    <p class="form-note" data-form-message>Réponse sous 24 h, sans engagement.</p>
  </form>`;
}

function homePage() {
  const prefix = "";
  const guaranteeItems = [
    ["check", "Devis gratuit"],
    ["shield", "Sans engagement"],
    ["clock", "Intervention rapide"],
    ["tool", "Pièces de qualité"],
  ];

  return shell({
    file: "index.html",
    title: "Dépannage informatique Vittel & Contrexéville | ACDJ Informatique",
    description: "ACDJ Informatique intervient à Vittel, Contrexéville, Neufchâteau, Mirecourt et alentours pour le dépannage, la réparation et l'assistance informatique.",
    active: "home",
    body: `
    <section class="hero">
      <div class="container hero__grid">
        <div class="hero__content reveal">
          <p class="eyebrow">Dépannage informatique dans les Vosges</p>
          <h1>Dépannage informatique à Vittel, Contrexéville et alentours</h1>
          <p class="hero__lead">ACDJ Informatique vous aide à réparer, installer et sécuriser vos équipements avec un devis clair et une intervention locale.</p>
          <div class="hero__actions">
            <a class="button button--primary" href="contact/">Demander un devis gratuit</a>
            <a class="button button--secondary" href="services/">Voir nos services</a>
          </div>
          <ul class="proof-list" aria-label="Réassurances">
            <li>${icon("check")}Intervention à domicile</li>
            <li>${icon("check")}Devis gratuit</li>
            <li>${icon("check")}Secteur Vittel / Contrexéville / Vosges</li>
          </ul>
        </div>
        <figure class="hero__visual reveal">
          <img src="assets/images/hero-technicien-acdj.webp" width="1254" height="1254" alt="Technicien informatique intervenant sur un ordinateur de bureau" />
          <figcaption>Diagnostic, réparation et suivi après intervention.</figcaption>
        </figure>
      </div>
    </section>

    <section class="trust-strip" aria-label="Garanties ACDJ Informatique">
      <div class="container trust-strip__grid">
        ${guaranteeItems
          .map(
            ([iconName, label]) => `<div class="trust-item reveal">
              ${icon(iconName)}
              <span>${label}</span>
            </div>`,
          )
          .join("")}
      </div>
    </section>

    ${statsBand()}

    <section class="section" id="services">
      <div class="container">
        ${sectionHeader("Services", "Une grille claire pour trouver la bonne prestation", "Chaque service mène vers une page dédiée et le même tunnel de contact: le devis gratuit.")}
        <div class="services-grid">
          ${serviceCards(prefix)}
        </div>
      </div>
    </section>

    <section class="section section--surface" id="forfaits">
      <div class="container">
        ${sectionHeader("Comparatif des forfaits", "Trois niveaux lisibles pour les besoins courants", "Les déplacements sont facturés 0,65 €/km lorsque l'intervention nécessite un déplacement.")}
        <div class="pricing-grid pricing-grid--comparison">
          ${plans
            .map(
              (plan) => `<article class="price-card reveal ${plan.badge ? "price-card--featured" : ""}">
                ${plan.badge ? `<span class="badge">${plan.badge}</span>` : ""}
                <h3>${plan.title}</h3>
                <p>${plan.detail}</p>
                <strong>${plan.price}</strong>
                <ul>${plan.items.map((item) => `<li>${icon("check")}${item}</li>`).join("")}</ul>
                <a class="button button--secondary button--wide" href="contact/">Obtenir un devis</a>
              </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        ${sectionHeader("Comment ça marche", "Un déroulé lisible du premier contact au suivi", "Le fonctionnement est volontairement simple pour éviter les surprises et valider chaque étape.")}
        ${workflowTimeline()}
      </div>
    </section>

    <section class="section section--surface" id="zones">
      ${zoneInfographic(prefix)}
    </section>

    <section class="section" id="avis">
      <div class="container">
        <div class="reviews-heading">
          ${sectionHeader("Avis clients", "Des retours concrets de clients locaux", "Une preuve sociale sobre, sans carrousel automatique ni promesse excessive.")}
          <article class="rating-card rating-card--summary reveal">
            <p>Avis Trustpilot</p>
            <div class="stars" aria-label="5 étoiles">★★★★★</div>
            <strong>4,1/5</strong>
            <span>5 avis vérifiés au 23 juin 2026</span>
            <a class="inline-link" href="${company.trustpilot}" rel="noopener">Voir la fiche ${arrowIcon()}</a>
          </article>
        </div>
        <div class="review-grid">
            ${reviews
              .map(
                (review) => `<article class="review-card reveal">
                  <div class="stars" aria-label="5 étoiles">★★★★★</div>
                  <p>"${review.text}"</p>
                  <div class="review-author">
                    <img src="assets/images/${review.avatar}" width="48" height="48" loading="lazy" alt="" />
                    <strong>${review.name}</strong>
                  </div>
                </article>`,
              )
              .join("")}
        </div>
      </div>
    </section>

    <section class="section section--surface" id="devis">
      <div class="container narrow">
        ${sectionHeader("Devis gratuit", "Expliquez votre besoin, ACDJ vous répond sous 24 h", "Un formulaire unique pour toutes les demandes, afin d'éviter les tunnels multiples et incohérents.")}
        ${quoteForm(prefix)}
      </div>
    </section>

    <section class="section" id="faq">
      <div class="container narrow">
        ${sectionHeader("FAQ", "Les questions fréquentes avant une intervention", "Les réponses restent courtes pour vous aider à décider rapidement.")}
        ${faqBlock()}
      </div>
    </section>

    ${finalCta(prefix)}
`,
  });
}

function faqBlock(items = faq) {
  return `<div class="faq-list">
    ${items
      .map(
        (item, index) => `<div class="faq-item reveal">
          <button class="faq-question" type="button" aria-expanded="${index === 0 ? "true" : "false"}" aria-controls="faq-${index}">
            <span>${item.question}</span>
            <span class="faq-icon" aria-hidden="true"></span>
          </button>
          <div class="faq-answer" id="faq-${index}" ${index === 0 ? "" : "hidden"}>
            <p>${item.answer}</p>
          </div>
        </div>`,
      )
      .join("")}
  </div>`;
}

function finalCta(prefix) {
  return `<section class="final-cta">
    <div class="container final-cta__inner reveal">
      <div>
        <p class="eyebrow">Besoin d'un avis clair ?</p>
        <h2>Décrivez votre panne, obtenez un devis gratuit.</h2>
      </div>
      <div class="final-cta__actions">
        <a class="button button--primary" href="${prefix}contact/">Demander un devis</a>
        <a class="phone-link phone-link--dark" href="${company.phoneHref}">${icon("phone")}<span>${company.phone}</span></a>
      </div>
    </div>
  </section>`;
}

function servicesIndexPage() {
  const file = "services/index.html";
  const prefix = depthPrefix(file);
  return shell({
    file,
    title: "Services informatiques à Vittel et dans les Vosges | ACDJ Informatique",
    description: "Toutes les prestations ACDJ Informatique: dépannage, réparation ordinateur, smartphone, imprimante, récupération de données, site web, caisse et drone.",
    active: "services",
    body: `
    <section class="page-hero">
      <div class="container page-hero__inner reveal">
        <p class="eyebrow">Services</p>
        <h1>Services informatiques à Vittel et dans les Vosges</h1>
        <p>Des prestations lisibles, des tarifs de départ annoncés et un seul point d'entrée: le devis gratuit.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHeader("Catalogue", "Toutes les prestations disponibles", "Chaque carte résume l'usage, le prix de départ et le lien vers le détail du service.")}
        <div class="services-grid">
          ${serviceCards(prefix)}
        </div>
      </div>
    </section>
    ${finalCta(prefix)}
`,
  });
}

function servicePage(service) {
  const file = `services/${service.slug}/index.html`;
  const prefix = depthPrefix(file);
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  const localFaq = service.faqs.map((question) => ({
    question,
    answer: "Oui. Le point est validé au diagnostic et intégré au devis avant toute intervention payante.",
  }));

  return shell({
    file,
    title: `${service.pageTitle} | ACDJ Informatique`,
    description: `${service.title} par ACDJ Informatique dans le secteur de Vittel, Contrexéville, Neufchâteau, Mirecourt et alentours. Devis gratuit.`,
    active: "services",
    body: `
    <section class="page-hero page-hero--split">
      <div class="container page-hero__grid">
        <div class="page-hero__inner reveal">
          <p class="eyebrow">Service</p>
          <h1>${service.pageTitle}</h1>
          <p>${service.summary}</p>
          <div class="hero__actions">
            <a class="button button--primary" href="${prefix}contact/">Demander un devis gratuit</a>
            <a class="button button--secondary" href="${company.phoneHref}">Appeler ${company.phone}</a>
          </div>
        </div>
        <figure class="service-photo reveal">
          <img src="${prefix}assets/images/${service.image}" loading="eager" width="1024" height="768" alt="${service.title} par ACDJ Informatique" />
        </figure>
      </div>
    </section>
    <section class="section">
      <div class="container detail-layout">
        <article class="detail-panel reveal">
          <p class="eyebrow">Problème traité</p>
          <h2>${service.problem}</h2>
          <p>ACDJ Informatique commence par clarifier le besoin, puis propose une intervention adaptée à votre appareil, à votre ville et au niveau d'urgence.</p>
        </article>
        <article class="detail-panel reveal">
          <p class="eyebrow">Ce qu'on fait</p>
          <h2>Une intervention cadrée</h2>
          <ul class="check-list">${service.actions.map((item) => `<li>${icon("check")}${item}</li>`).join("")}</ul>
        </article>
        <article class="detail-panel detail-panel--accent reveal">
          <p class="eyebrow">Prix de départ</p>
          <h2>${service.price}</h2>
          <p>Déplacements: 0,65 €/km. Le devis précise le coût avant engagement.</p>
        </article>
      </div>
    </section>
    ${repairProcessBlock(prefix, service)}
    <section class="section section--surface">
      <div class="container">
        ${sectionHeader("Garanties", "Des engagements simples avant toute intervention", "Le diagnostic, le devis et le suivi restent cadrés à chaque étape.")}
        <div class="guarantees">
          ${["Devis gratuit", "Sans engagement", "Diagnostic clair", "Suivi après intervention"]
            .map((item) => `<div class="guarantee-card reveal">${icon("shield")}<h3>${item}</h3></div>`)
            .join("")}
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container narrow">
        ${sectionHeader("FAQ courte", "Questions fréquentes sur cette prestation", "Les réponses détaillées sont confirmées au moment du diagnostic.")}
        ${faqBlock(localFaq)}
      </div>
    </section>
    <section class="section section--surface">
      <div class="container">
        ${sectionHeader("Autres services", "Des prestations complémentaires si le besoin évolue", "Toutes les demandes passent par le même formulaire de devis.")}
        <div class="services-grid services-grid--three">
          ${related
            .map(
              (item) => `<article class="service-card reveal">
                <div class="service-card__icon">${icon(item.icon)}</div>
                <h3>${item.title}</h3>
                <p>${item.summary}</p>
                <p class="service-card__price">${item.price}</p>
                <a class="inline-link" href="${prefix}services/${item.slug}/">En savoir plus ${arrowIcon()}</a>
              </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    ${finalCta(prefix)}
`,
  });
}

function zonesIndexPage() {
  const file = "zones/index.html";
  const prefix = depthPrefix(file);
  return shell({
    file,
    title: "Zones d'intervention informatique dans les Vosges | ACDJ Informatique",
    description: "ACDJ Informatique intervient à Vittel, Contrexéville, Neufchâteau, Mirecourt et alentours pour le dépannage informatique.",
    active: "zones",
    body: `
    <section class="page-hero">
      <div class="container page-hero__inner reveal">
        <p class="eyebrow">Zones</p>
        <h1>Dépannage informatique local dans les Vosges</h1>
        <p>Des pages locales simples pour vérifier rapidement si votre ville est couverte.</p>
      </div>
    </section>
    <section class="section">
      <div class="container zone-cards">
        ${sectionHeader("Villes couvertes", "Les pages locales principales", "Ces villes servent de base au référencement local et au parcours de contact.")}
        <div class="zone-cards__grid">
          ${zones
            .map(
              (zone) => `<a class="zone-card reveal" href="${prefix}zones/${zone.slug}/">
              ${icon("map")}
              <h2>${zone.name}</h2>
              <p>${zone.detail}</p>
              <span>Voir la page ${arrowIcon()}</span>
            </a>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    ${finalCta(prefix)}
`,
  });
}

function zonePage(zone) {
  const file = `zones/${zone.slug}/index.html`;
  const prefix = depthPrefix(file);
  return shell({
    file,
    title: `Dépannage informatique à ${zone.name} | ACDJ Informatique`,
    description: `Dépannage informatique à ${zone.name}: réparation ordinateur, assistance à domicile, installation imprimante et devis gratuit avec ACDJ Informatique.`,
    active: "zones",
    body: `
    <section class="page-hero">
      <div class="container page-hero__inner reveal">
        <p class="eyebrow">Zone d'intervention</p>
        <h1>Dépannage informatique à ${zone.name}</h1>
        <p>${zone.detail} Devis gratuit, intervention à domicile ou à distance selon le diagnostic.</p>
        <div class="hero__actions">
          <a class="button button--primary" href="${prefix}contact/">Demander un devis gratuit</a>
          <a class="button button--secondary" href="${company.phoneHref}">Appeler ${company.phone}</a>
        </div>
      </div>
    </section>
    <section class="section section--surface">
      <div class="container">
        ${sectionHeader("Repères locaux", `Pourquoi contacter ACDJ à ${zone.name}`, "Les engagements restent identiques quelle que soit la prestation demandée.")}
        <div class="local-proof-grid">
          <div class="local-proof reveal">${icon("map")}<h2>Proximité</h2><p>${zone.name} fait partie du secteur d'intervention ACDJ Informatique dans les Vosges.</p></div>
          <div class="local-proof reveal">${icon("check")}<h2>Devis clair</h2><p>Le coût est validé avant intervention, avec déplacement à 0,65 €/km si nécessaire.</p></div>
          <div class="local-proof reveal">${icon("clock")}<h2>Réponse sous 24 h</h2><p>Le formulaire de devis centralise les demandes pour garder un suivi simple.</p></div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHeader("Services disponibles", `Services informatiques à ${zone.name}`, "Les demandes les plus courantes peuvent être traitées à domicile ou à distance.")}
        <div class="services-grid services-grid--three">
          ${serviceCards(prefix, 6)}
        </div>
      </div>
    </section>
    <section class="section section--surface">
      <div class="container reviews-layout">
        <article class="rating-card reveal">
          <p>Avis Trustpilot</p>
          <div class="stars" aria-label="5 étoiles">★★★★★</div>
          <strong>4,1/5</strong>
          <span>5 avis vérifiés au 23 juin 2026</span>
          <a class="inline-link" href="${company.trustpilot}" rel="noopener">Voir la fiche ${arrowIcon()}</a>
        </article>
        <div class="review-grid">
          ${reviews
            .slice(0, 2)
            .map(
              (review) => `<article class="review-card reveal">
                <div class="stars" aria-label="5 étoiles">★★★★★</div>
                <p>"${review.text}"</p>
                <div class="review-author">
                  <img src="${prefix}assets/images/${review.avatar}" width="48" height="48" loading="lazy" alt="" />
                  <strong>${review.name}</strong>
                </div>
              </article>`,
            )
            .join("")}
        </div>
      </div>
    </section>
    ${finalCta(prefix)}
`,
  });
}

function contactPage() {
  const file = "contact/index.html";
  const prefix = depthPrefix(file);
  return shell({
    file,
    title: "Contact et devis gratuit | ACDJ Informatique",
    description: "Contactez ACDJ Informatique pour un devis gratuit: dépannage informatique, réparation, assistance à domicile dans le secteur de Vittel et des Vosges.",
    active: "contact",
    body: `
    <section class="page-hero">
      <div class="container page-hero__inner reveal">
        <p class="eyebrow">Contact</p>
        <h1>Demander un devis gratuit</h1>
        <p>Un formulaire unique pour toutes les demandes: dépannage, réparation, assistance, imprimante, site web, caisse ou drone.</p>
      </div>
    </section>
    <section class="section">
      <div class="container">
        ${sectionHeader("Formulaire", "Votre demande en quelques informations", "Les champs permettent de préparer un premier diagnostic et de vous répondre rapidement.")}
        <div class="contact-layout">
          <div>
            ${quoteForm(prefix)}
          </div>
          <aside class="contact-panel reveal" aria-label="Coordonnées ACDJ Informatique">
            <h2>Coordonnées</h2>
            <ul class="contact-list">
              <li>${icon("phone")}<a href="${company.phoneHref}">${company.phone}</a></li>
              <li>${icon("mail")}<a href="${company.emailHref}">${company.email}</a></li>
              <li>${icon("map")}<span>${company.sector}</span></li>
              <li>${icon("tool")}<span>Déplacements: 0,65 €/km</span></li>
            </ul>
            <div class="mini-map" aria-label="Plan du secteur">
              <span>Vittel</span>
              <span>Contrexéville</span>
              <span>Neufchâteau</span>
              <span>Mirecourt</span>
            </div>
            <p class="form-note">Réponse sous 24 h, sans engagement.</p>
          </aside>
        </div>
      </div>
    </section>
`,
  });
}

function redirectPage(slug, target) {
  const file = `${slug}/index.html`;
  const prefix = depthPrefix(file);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Redirection | ACDJ Informatique</title>
  <meta http-equiv="refresh" content="0; url=${prefix}${target}" />
  <link rel="canonical" href="${prefix}${target}" />
</head>
<body>
  <p>Redirection vers <a href="${prefix}${target}">${prefix}${target}</a>.</p>
</body>
</html>
`;
}

writePage("index.html", homePage());
writePage("services/index.html", servicesIndexPage());
services.forEach((service) => writePage(`services/${service.slug}/index.html`, servicePage(service)));
writePage("zones/index.html", zonesIndexPage());
zones.forEach((zone) => writePage(`zones/${zone.slug}/index.html`, zonePage(zone)));
writePage("contact/index.html", contactPage());
legacyRedirects.forEach(([slug, target]) => writePage(`${slug}/index.html`, redirectPage(slug, target)));

console.log(`Generated ${1 + 1 + services.length + 1 + zones.length + 1 + legacyRedirects.length} HTML files.`);

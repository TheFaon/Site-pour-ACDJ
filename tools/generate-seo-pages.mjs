import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://www.acdj-informatique.com";

const navLinks = [
  ["Accueil", "../index.html#top"],
  ["Services", "../index.html#services"],
  ["Tarifs", "../index.html#pricing"],
  ["Zones", "../index.html#zones"],
  ["Devis", "../contact-devis/"],
  ["Avis", "../index.html#avis"],
];

const priorityLinks = [
  ["Dépannage informatique Vittel", "../depannage-informatique-vittel/"],
  ["Réparation ordinateur Vittel", "../reparation-ordinateur-vittel/"],
  ["Assistance informatique à domicile Vittel", "../assistance-informatique-domicile-vittel/"],
  ["Installation imprimante Vittel", "../installation-imprimante-vittel/"],
  ["Récupération de données Vittel", "../recuperation-donnees-vittel/"],
  ["Réparation smartphone Vittel", "../reparation-smartphone-vittel/"],
  ["Service drone Vosges", "../service-drone-vosges/"],
  ["Dépannage informatique Contrexéville", "../depannage-informatique-contrexeville/"],
  ["Dépannage informatique Neufchâteau", "../depannage-informatique-neufchateau/"],
  ["Dépannage informatique Mirecourt", "../depannage-informatique-mirecourt/"],
  ["Contact / Devis", "../contact-devis/"],
];

const commonSteps = [
  {
    title: "Qualification",
    text: "Vous expliquez le problème, l'appareil concerné et le lieu d'intervention afin de cadrer la demande.",
  },
  {
    title: "Diagnostic",
    text: "Un premier contrôle permet d'identifier l'origine probable de la panne et les options de réparation.",
  },
  {
    title: "Intervention",
    text: "L'intervention est réalisée à domicile, à distance ou en atelier selon le besoin et le matériel.",
  },
];

const pages = [
  {
    slug: "depannage-informatique-vittel",
    eyebrow: "Dépannage informatique Vittel",
    metaTitle: "Dépannage informatique Vittel | ACDJ Informatique",
    metaDescription: "Dépannage informatique à Vittel pour ordinateur lent, virus, panne logicielle, installation et assistance à domicile. Demandez votre devis ACDJ Informatique.",
    h1: "Dépannage informatique à Vittel",
    intro: "ACDJ Informatique intervient à Vittel pour résoudre les problèmes d'ordinateur, de logiciels, de connexion, d'imprimante ou de configuration. L'objectif est simple : comprendre la panne, remettre votre matériel en service et vous donner une solution claire.",
    image: "service-it-support.webp",
    summary: [
      ["Zone", "Vittel et alentours"],
      ["Tarifs", "Forfaits dès 25 euros"],
      ["Objectif", "Dépanner et remettre en service"],
    ],
    features: [
      ["Pannes courantes", "Ordinateur lent, blocage Windows, virus, messages d'erreur, connexion instable ou logiciel qui ne répond plus."],
      ["Intervention flexible", "Selon le problème, l'aide peut se faire à domicile, à distance ou après dépôt du matériel."],
      ["Conseil après dépannage", "Vous repartez avec les explications utiles pour éviter que le problème ne revienne trop vite."],
    ],
    price: "Le dépannage informatique à Vittel commence avec le forfait Basique à 25 euros. Les forfaits Avancé et Ultra permettent de traiter les pannes plus longues, l'optimisation, les virus ou la sauvegarde.",
    faq: [
      ["Intervenez-vous à domicile à Vittel ?", "Oui, l'intervention à domicile est possible à Vittel selon le type de panne et les disponibilités."],
      ["Pouvez-vous dépanner un ordinateur très lent ?", "Oui, un diagnostic permet de vérifier les logiciels au démarrage, l'espace disque, les virus éventuels et l'état général du système."],
      ["Faut-il demander un devis avant l'intervention ?", "Oui, la demande de devis permet de cadrer le besoin, le forfait adapté et le mode d'intervention."],
    ],
    related: ["reparation-ordinateur-vittel", "assistance-informatique-domicile-vittel", "installation-imprimante-vittel", "depannage-informatique-contrexeville"],
  },
  {
    slug: "reparation-ordinateur-vittel",
    eyebrow: "Réparation ordinateur Vittel",
    metaTitle: "Réparation ordinateur Vittel | PC portable et fixe",
    metaDescription: "Réparation d'ordinateur à Vittel : PC lent, panne Windows, virus, sauvegarde, réinstallation et diagnostic. Contactez ACDJ Informatique pour un devis.",
    h1: "Réparation d'ordinateur à Vittel",
    intro: "Votre ordinateur portable ou fixe ne démarre plus, ralentit fortement ou affiche des erreurs ? ACDJ Informatique accompagne les particuliers et professionnels de Vittel pour diagnostiquer la panne et proposer une réparation adaptée.",
    image: "service-computer-install.webp",
    summary: [
      ["Appareils", "PC portable et ordinateur fixe"],
      ["Pannes", "Système, lenteur, virus, sauvegarde"],
      ["Devis", "Avant réparation"],
    ],
    features: [
      ["Diagnostic système", "Contrôle de Windows, du démarrage, des mises à jour, des logiciels et des erreurs récurrentes."],
      ["Remise en état", "Nettoyage logiciel, optimisation, suppression de programmes indésirables et conseils d'usage."],
      ["Sauvegarde", "Aide à la sauvegarde ou au transfert des fichiers lorsque l'état de l'ordinateur le permet."],
    ],
    price: "Le tarif dépend de la panne, du temps nécessaire et des opérations à prévoir. Un devis permet de valider la bonne solution avant intervention.",
    faq: [
      ["Réparez-vous les PC portables ?", "Oui, les PC portables peuvent être diagnostiqués pour les pannes logicielles, lenteurs, virus et problèmes de configuration."],
      ["Pouvez-vous réinstaller Windows ?", "Oui, une réinstallation peut être envisagée si c'est la solution la plus fiable après diagnostic."],
      ["Mes fichiers peuvent-ils être conservés ?", "Lorsque le support le permet, une sauvegarde ou un transfert peut être proposé avant les opérations sensibles."],
    ],
    related: ["depannage-informatique-vittel", "recuperation-donnees-vittel", "assistance-informatique-domicile-vittel", "contact-devis"],
  },
  {
    slug: "assistance-informatique-domicile-vittel",
    eyebrow: "Assistance informatique à domicile Vittel",
    metaTitle: "Assistance informatique à domicile Vittel | ACDJ Informatique",
    metaDescription: "Assistance informatique à domicile à Vittel pour particuliers, seniors, installation, mails, imprimante, ordinateur et conseils simples.",
    h1: "Assistance informatique à domicile à Vittel",
    intro: "ACDJ Informatique aide les particuliers à Vittel pour les usages du quotidien : ordinateur, messagerie, imprimante, smartphone, sauvegarde, connexion et prise en main. Le service est pensé pour être clair, patient et concret.",
    image: "service-smartphone-install.webp",
    summary: [
      ["Public", "Particuliers et seniors"],
      ["Lieu", "À domicile à Vittel"],
      ["Besoin", "Aide, installation, conseils"],
    ],
    features: [
      ["Prise en main", "Aide à l'utilisation d'un ordinateur, d'une boîte mail, d'un navigateur ou de services en ligne."],
      ["Installation", "Configuration de logiciels, comptes, imprimante, smartphone ou accessoires du quotidien."],
      ["Pédagogie", "Explications simples pour comprendre ce qui a été fait et gagner en autonomie."],
    ],
    price: "L'assistance à domicile est proposée sur devis ou dans le cadre des forfaits adaptés au temps d'intervention.",
    faq: [
      ["Ce service est-il adapté aux seniors ?", "Oui, l'assistance est prévue pour expliquer calmement les manipulations et éviter le jargon inutile."],
      ["Pouvez-vous installer une imprimante à domicile ?", "Oui, l'installation d'imprimante fait partie des demandes fréquentes à domicile."],
      ["Puis-je demander une aide ponctuelle ?", "Oui, une intervention ponctuelle peut être demandée selon le besoin."],
    ],
    related: ["installation-imprimante-vittel", "depannage-informatique-vittel", "reparation-smartphone-vittel", "contact-devis"],
  },
  {
    slug: "installation-imprimante-vittel",
    eyebrow: "Installation imprimante Vittel",
    metaTitle: "Installation imprimante Vittel | Wi-Fi, PC et smartphone",
    metaDescription: "Installation d'imprimante à Vittel : configuration Wi-Fi, ordinateur, smartphone, pilotes et test d'impression. Demandez un devis ACDJ Informatique.",
    h1: "Installation d'imprimante à Vittel",
    intro: "Une imprimante neuve ou déjà installée peut vite devenir pénible si le Wi-Fi, les pilotes ou le partage ne fonctionnent pas. ACDJ Informatique configure votre imprimante à Vittel et vérifie que l'impression fonctionne sur vos appareils.",
    image: "service-printer-install.webp",
    summary: [
      ["Connexion", "USB, Wi-Fi ou réseau"],
      ["Appareils", "Ordinateur, smartphone, tablette"],
      ["Contrôle", "Test d'impression inclus"],
    ],
    features: [
      ["Configuration Wi-Fi", "Connexion de l'imprimante à la box ou au réseau de la maison."],
      ["Pilotes et logiciels", "Installation des éléments nécessaires pour imprimer ou scanner depuis vos appareils."],
      ["Tests", "Vérification d'une impression et, si besoin, d'une numérisation simple."],
    ],
    price: "L'installation et la configuration sont proposées à partir de 75 euros, hors déplacement éventuel selon la zone.",
    faq: [
      ["Pouvez-vous connecter l'imprimante en Wi-Fi ?", "Oui, si l'imprimante et la box le permettent, la configuration Wi-Fi est prise en charge."],
      ["Installez-vous aussi le scanner ?", "Oui, le scanner peut être configuré quand le modèle et les logiciels le permettent."],
      ["Faut-il avoir les identifiants Wi-Fi ?", "Oui, il faut prévoir le nom du réseau et la clé Wi-Fi pour gagner du temps."],
    ],
    related: ["assistance-informatique-domicile-vittel", "depannage-informatique-vittel", "reparation-ordinateur-vittel", "contact-devis"],
  },
  {
    slug: "recuperation-donnees-vittel",
    eyebrow: "Récupération de données Vittel",
    metaTitle: "Récupération de données Vittel | Sauvegarde et transfert",
    metaDescription: "Récupération de données à Vittel : fichiers, photos, documents, sauvegarde et transfert depuis ordinateur ou support accessible.",
    h1: "Récupération de données à Vittel",
    intro: "Lorsque des documents, photos ou fichiers importants deviennent difficiles d'accès, il faut agir avec méthode. ACDJ Informatique vous aide à Vittel pour évaluer la situation, sauvegarder ce qui peut l'être et organiser le transfert des données.",
    image: "service-computer-install.webp",
    summary: [
      ["Données", "Documents, photos, fichiers"],
      ["Action", "Sauvegarde ou transfert"],
      ["Priorité", "Limiter les manipulations risquées"],
    ],
    features: [
      ["Évaluation", "Contrôle du contexte : ordinateur qui démarre encore, support détecté, message d'erreur ou suppression accidentelle."],
      ["Sauvegarde", "Copie des fichiers accessibles vers un support adapté quand l'état du matériel le permet."],
      ["Orientation", "Si la panne est matérielle lourde, vous êtes orienté vers la solution la plus prudente."],
    ],
    price: "La récupération dépend fortement de l'état du support. Une demande de devis est nécessaire avant toute intervention sensible.",
    faq: [
      ["Faut-il continuer à utiliser l'ordinateur ?", "Non, si les données sont importantes, il vaut mieux limiter les manipulations avant diagnostic."],
      ["Pouvez-vous récupérer des photos ?", "Oui, les photos et documents peuvent être sauvegardés si le support reste lisible."],
      ["La récupération est-elle garantie ?", "Non, le résultat dépend de l'état du disque ou du support. Le diagnostic permet d'évaluer les chances."],
    ],
    related: ["reparation-ordinateur-vittel", "depannage-informatique-vittel", "contact-devis", "depannage-informatique-neufchateau"],
  },
  {
    slug: "reparation-smartphone-vittel",
    eyebrow: "Réparation smartphone Vittel",
    metaTitle: "Réparation smartphone Vittel | Diagnostic et devis",
    metaDescription: "Réparation smartphone à Vittel : diagnostic, écran, batterie, problème logiciel et devis hors pièces. ACDJ Informatique vous accompagne.",
    h1: "Réparation de smartphone à Vittel",
    intro: "Écran cassé, batterie fatiguée, problème de charge ou blocage logiciel : ACDJ Informatique propose un accompagnement pour diagnostiquer votre smartphone à Vittel et vous orienter vers la réparation adaptée.",
    image: "service-smartphone-repair.webp",
    summary: [
      ["Service", "Diagnostic smartphone"],
      ["Tarif", "À partir de 50 euros hors pièces"],
      ["Devis", "Selon modèle et panne"],
    ],
    features: [
      ["Diagnostic", "Identification du symptôme : écran, batterie, charge, logiciel, transfert ou configuration."],
      ["Devis clair", "Le coût dépend du modèle, de la pièce éventuelle et du temps nécessaire."],
      ["Protection", "Possibilité de demander aussi une protection hydrogel selon disponibilité."],
    ],
    price: "La réparation smartphone démarre à partir de 50 euros hors pièces. Le devis dépend du modèle et de la panne constatée.",
    faq: [
      ["Réparez-vous les écrans cassés ?", "Oui, selon le modèle et la disponibilité des pièces, un devis peut être établi."],
      ["Pouvez-vous transférer les données d'un téléphone ?", "Oui, le transfert peut être étudié si le téléphone reste suffisamment accessible."],
      ["Installez-vous des protections d'écran ?", "Oui, la boutique hydrogel permet de protéger l'écran selon les gammes disponibles."],
    ],
    related: ["assistance-informatique-domicile-vittel", "depannage-informatique-vittel", "contact-devis", "installation-imprimante-vittel"],
  },
  {
    slug: "service-drone-vosges",
    eyebrow: "Service drone Vosges",
    metaTitle: "Service drone Vosges | Prise de vue et prestation aérienne",
    metaDescription: "Service drone dans les Vosges pour prises de vue aériennes, projets professionnels, événements et besoins spécifiques. Devis ACDJ Informatique.",
    h1: "Service drone dans les Vosges",
    intro: "ACDJ Informatique propose une prestation drone dans les Vosges pour les prises de vue aériennes, projets professionnels, événements ou besoins de valorisation visuelle. Cette prestation est isolée pour faciliter le devis et cadrer les contraintes.",
    image: "service-drone.webp",
    summary: [
      ["Prestation", "Drone et prise de vue"],
      ["Zone", "Vosges"],
      ["Tarif", "À partir de 75 euros par heure"],
    ],
    features: [
      ["Cadrage du besoin", "Objectif, lieu, durée, type de rendu attendu et contraintes de sécurité."],
      ["Prestation dédiée", "Une page séparée permet de traiter ce service plus spécifique et plus technique."],
      ["Devis adapté", "Le tarif dépend du projet, du déplacement, de la durée et des frais éventuels."],
    ],
    price: "Le service drone est proposé à partir de 75 euros par heure, hors déplacement et frais éventuels selon le projet.",
    faq: [
      ["Intervenez-vous partout dans les Vosges ?", "La zone dépend du projet, du déplacement et des contraintes du lieu de vol."],
      ["Faut-il un devis avant la prestation ?", "Oui, le devis est indispensable pour cadrer le lieu, la durée, les livrables et les contraintes."],
      ["Le service est-il adapté aux entreprises ?", "Oui, les demandes professionnelles peuvent être étudiées selon l'objectif et les conditions de réalisation."],
    ],
    related: ["contact-devis", "depannage-informatique-vittel", "depannage-informatique-neufchateau", "depannage-informatique-mirecourt"],
  },
  {
    slug: "depannage-informatique-contrexeville",
    eyebrow: "Dépannage informatique Contrexéville",
    metaTitle: "Dépannage informatique Contrexéville | ACDJ Informatique",
    metaDescription: "Dépannage informatique à Contrexéville : ordinateur, imprimante, assistance à domicile, virus, lenteurs et devis rapide.",
    h1: "Dépannage informatique à Contrexéville",
    intro: "ACDJ Informatique intervient à Contrexéville pour les problèmes d'ordinateur, d'imprimante, de configuration et d'assistance à domicile. Cette page cible les demandes locales prioritaires autour de Contrexéville.",
    image: "service-it-support.webp",
    summary: [
      ["Zone", "Contrexéville"],
      ["Services", "Ordinateur, imprimante, assistance"],
      ["Devis", "Demande rapide"],
    ],
    features: [
      ["Dépannage PC", "Aide pour ordinateur lent, panne logicielle, virus, blocage ou messages d'erreur."],
      ["Assistance locale", "Intervention possible à domicile selon disponibilité et nature du besoin."],
      ["Installation", "Configuration d'imprimante, logiciels, comptes et appareils du quotidien."],
    ],
    price: "Les forfaits de dépannage commencent à 25 euros. Le prix final dépend du besoin, de la durée et du déplacement éventuel.",
    faq: [
      ["Intervenez-vous à Contrexéville ?", "Oui, Contrexéville fait partie des villes prioritaires de l'architecture SEO du site."],
      ["Puis-je demander une intervention pour une imprimante ?", "Oui, l'installation ou la remise en route d'imprimante peut être demandée."],
      ["Comment obtenir un tarif ?", "Le plus simple est de passer par la page Contact / Devis avec une description du problème."],
    ],
    related: ["depannage-informatique-vittel", "installation-imprimante-vittel", "assistance-informatique-domicile-vittel", "contact-devis"],
  },
  {
    slug: "depannage-informatique-neufchateau",
    eyebrow: "Dépannage informatique Neufchâteau",
    metaTitle: "Dépannage informatique Neufchâteau | ACDJ Informatique",
    metaDescription: "Dépannage informatique à Neufchâteau : ordinateur lent, assistance, imprimante, récupération de données et devis pour intervention.",
    h1: "Dépannage informatique à Neufchâteau",
    intro: "ACDJ Informatique structure une page locale pour les demandes de dépannage informatique à Neufchâteau : ordinateur, assistance, imprimante, sauvegarde et diagnostic.",
    image: "service-it-support.webp",
    summary: [
      ["Zone", "Neufchâteau"],
      ["Besoin", "Dépannage et assistance"],
      ["Conversion", "Devis avant intervention"],
    ],
    features: [
      ["Pannes informatiques", "Ordinateur lent, système instable, virus, logiciels ou problèmes de connexion."],
      ["Aide aux particuliers", "Assistance pour usages courants, installation et configuration d'appareils."],
      ["Données", "Sauvegarde ou transfert de fichiers quand le matériel reste accessible."],
    ],
    price: "Les demandes sur Neufchâteau sont à qualifier par devis pour confirmer la faisabilité, le déplacement et le forfait adapté.",
    faq: [
      ["Neufchâteau est-il une zone couverte ?", "La page est prévue pour capter la demande locale et confirmer les interventions selon disponibilité."],
      ["Quels services sont concernés ?", "Dépannage ordinateur, assistance, imprimante, récupération de données et conseils."],
      ["Puis-je envoyer une demande détaillée ?", "Oui, la page Contact / Devis sert à préciser le matériel, la panne et la commune."],
    ],
    related: ["depannage-informatique-vittel", "recuperation-donnees-vittel", "depannage-informatique-mirecourt", "contact-devis"],
  },
  {
    slug: "depannage-informatique-mirecourt",
    eyebrow: "Dépannage informatique Mirecourt",
    metaTitle: "Dépannage informatique Mirecourt | ACDJ Informatique",
    metaDescription: "Dépannage informatique à Mirecourt : diagnostic ordinateur, assistance, installation imprimante et devis ACDJ Informatique.",
    h1: "Dépannage informatique à Mirecourt",
    intro: "Cette page locale présente les services de dépannage informatique à Mirecourt : diagnostic ordinateur, aide à domicile, installation d'imprimante et accompagnement sur devis.",
    image: "service-computer-install.webp",
    summary: [
      ["Zone", "Mirecourt"],
      ["Services", "Dépannage, assistance, installation"],
      ["Demande", "Devis conseillé"],
    ],
    features: [
      ["Diagnostic", "Identification de l'origine d'une panne ou d'un ralentissement informatique."],
      ["Assistance", "Aide pour les usages du quotidien, la configuration et les appareils connectés."],
      ["Installation", "Mise en service d'imprimante, logiciels ou ordinateur selon besoin."],
    ],
    price: "Le devis permet de confirmer le forfait, la durée estimée et les conditions de déplacement pour Mirecourt.",
    faq: [
      ["Quels problèmes informatiques traitez-vous ?", "Les demandes courantes concernent les lenteurs, les virus, l'installation, les erreurs et les périphériques."],
      ["Mirecourt est-elle une page locale prioritaire ?", "Oui, la ville est prévue dans l'architecture SEO comme zone avec potentiel."],
      ["Comment demander une intervention ?", "Utilisez la page Contact / Devis en indiquant la ville, l'appareil et le problème rencontré."],
    ],
    related: ["depannage-informatique-neufchateau", "depannage-informatique-vittel", "installation-imprimante-vittel", "contact-devis"],
  },
  {
    slug: "contact-devis",
    type: "contact",
    eyebrow: "Contact / Devis",
    metaTitle: "Contact et devis dépannage informatique | ACDJ Informatique",
    metaDescription: "Contactez ACDJ Informatique pour un devis de dépannage informatique à Vittel, Contrexéville, Neufchâteau, Mirecourt et alentours.",
    h1: "Contact et devis informatique",
    intro: "Décrivez votre appareil, votre commune et le problème rencontré. Ces informations permettent de proposer le bon forfait, le bon mode d'intervention et un devis cohérent.",
    summary: [
      ["Téléphone", "06 52 24 66 47"],
      ["Email", "contact@acdj-informatique.com"],
      ["Zones", "Vittel, Contrexéville, Neufchâteau, Mirecourt"],
    ],
    related: ["depannage-informatique-vittel", "depannage-informatique-contrexeville", "reparation-ordinateur-vittel", "service-drone-vosges"],
  },
];

const pageBySlug = Object.fromEntries(pages.map((page) => [page.slug, page]));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function navMarkup() {
  return navLinks.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join("\n          ");
}

function relatedMarkup(page) {
  return page.related
    .map((slug) => {
      const related = pageBySlug[slug];
      return `<a href="../${slug}/">${escapeHtml(related.h1)}</a>`;
    })
    .join("\n        ");
}

function summaryMarkup(page) {
  return page.summary
    .map(([label, value]) => `
        <div class="seo-summary__item">
          <strong>${escapeHtml(label)}</strong>
          <span>${escapeHtml(value)}</span>
        </div>`)
    .join("");
}

function featureMarkup(page) {
  return page.features
    .map(([title, text]) => `
        <article class="seo-feature">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(text)}</p>
        </article>`)
    .join("");
}

function stepMarkup() {
  return commonSteps
    .map((step, index) => `
        <article class="seo-step">
          <span class="seo-step__num">${index + 1}</span>
          <h3>${escapeHtml(step.title)}</h3>
          <p>${escapeHtml(step.text)}</p>
        </article>`)
    .join("");
}

function faqMarkup(page) {
  return page.faq
    .map(([question, answer]) => `
        <details>
          <summary>${escapeHtml(question)}</summary>
          <p>${escapeHtml(answer)}</p>
        </details>`)
    .join("");
}

function headerMarkup() {
  return `
  <header class="site-header" id="top">
    <div class="header__inner">
      <a class="brand" href="../index.html#top" aria-label="ACDJ Informatique - accueil">
        <img class="brand__logo" src="../assets/images/logo.png" alt="Logo ACDJ Informatique" width="32" height="32" />
        <span class="brand__name">ACDJ Informatique</span>
      </a>
      <nav class="nav" aria-label="Navigation principale">
        ${navMarkup()}
      </nav>
      <a class="phone-btn" href="tel:+33652246647">
        <span>06 52 24 66 47</span>
        <svg class="ico" viewBox="0 0 256 256" aria-hidden="true"><path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z"></path></svg>
      </a>
      <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function footerMarkup() {
  return `
  <footer class="site-footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <img src="../assets/images/logo.png" alt="" width="40" height="40" />
        <span>ACDJ-Informatique</span>
      </div>
      <nav class="footer__cols" aria-label="Pied de page">
        <div class="footer__col">
          <p class="footer__col-title">Plan du site</p>
          <a href="../index.html#top">Accueil</a>
          <a href="../index.html#services">Services</a>
          <a href="../index.html#pricing">Tarifs</a>
          <a href="../contact-devis/">Contact / Devis</a>
          <a href="../index.html#faq">FAQ</a>
        </div>
        <div class="footer__col">
          <p class="footer__col-title">Pages SEO</p>
          <a href="../depannage-informatique-vittel/">Dépannage Vittel</a>
          <a href="../depannage-informatique-contrexeville/">Dépannage Contrexéville</a>
          <a href="../depannage-informatique-neufchateau/">Dépannage Neufchâteau</a>
          <a href="../service-drone-vosges/">Service drone Vosges</a>
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
  </footer>`;
}

function cookieMarkup() {
  return `
  <div class="cookie" hidden>
    <p class="cookie__title">Paramètres des cookies</p>
    <p class="cookie__text">Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic du site et fournir du contenu personnalisé.</p>
    <div class="cookie__actions">
      <button class="cookie__btn cookie__btn--ghost" data-cookie="refuse">Refuser</button>
      <button class="cookie__btn cookie__btn--solid" data-cookie="accept">Accepter</button>
    </div>
  </div>`;
}

function jsonLd(page) {
  const data = {
    "@context": "https://schema.org",
    "@type": page.type === "contact" ? "ContactPage" : "Service",
    name: page.h1,
    description: page.metaDescription,
    url: `${siteUrl}/${page.slug}/`,
    provider: {
      "@type": "LocalBusiness",
      name: "ACDJ Informatique",
      telephone: "+33652246647",
      email: "contact@acdj-informatique.com",
      areaServed: ["Vittel", "Contrexéville", "Neufchâteau", "Mirecourt", "Vosges"],
    },
  };
  return JSON.stringify(data);
}

function pageHead(page) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(page.metaTitle)}</title>
  <meta name="description" content="${escapeHtml(page.metaDescription)}" />
  <link rel="canonical" href="${siteUrl}/${page.slug}/" />
  <link rel="icon" href="../assets/images/logo.png" />
  <link rel="stylesheet" href="../assets/fonts/fonts.css" />
  <link rel="stylesheet" href="../assets/css/style.css" />
  <link rel="stylesheet" href="../assets/css/seo-pages.css" />
  <script type="application/ld+json">${jsonLd(page)}</script>
</head>`;
}

function standardPage(page) {
  return `${pageHead(page)}
<body class="seo-page">
${headerMarkup()}
  <main class="seo-main">
    <section class="seo-hero">
      <div class="seo-hero__inner">
        <div class="seo-hero__grid">
          <div>
            <p class="seo-eyebrow">${escapeHtml(page.eyebrow)}</p>
            <h1>${escapeHtml(page.h1)}</h1>
            <p class="seo-lead">${escapeHtml(page.intro)}</p>
            <div class="seo-actions">
              <a class="btn btn--primary" href="../contact-devis/">Demander un devis</a>
              <a class="btn btn--ghost" href="tel:+33652246647">Appeler ACDJ Informatique</a>
            </div>
            <ul class="seo-proof">
              <li>Réponse claire avant intervention</li>
              <li>Forfaits adaptés au problème rencontré</li>
              <li>Interventions locales autour de Vittel et des Vosges</li>
            </ul>
          </div>
          <div class="seo-hero__media">
            <img src="../assets/images/${page.image}" alt="${escapeHtml(page.h1)}" />
          </div>
        </div>
        <div class="seo-summary">
          ${summaryMarkup(page)}
        </div>
      </div>
    </section>

    <section class="seo-section">
      <div class="seo-section__head">
        <p class="seo-eyebrow">Service</p>
        <h2>Ce que couvre l'intervention</h2>
        <p class="seo-section__intro">La page est structurée pour répondre rapidement à l'intention de recherche locale et orienter vers une demande de devis.</p>
      </div>
      <div class="seo-grid">
        ${featureMarkup(page)}
      </div>
    </section>

    <section class="seo-section">
      <div class="seo-section__head">
        <p class="seo-eyebrow">Méthode</p>
        <h2>Déroulement d'une demande</h2>
      </div>
      <div class="seo-grid">
        ${stepMarkup()}
      </div>
    </section>

    <section class="seo-section">
      <div class="seo-price">
        <div>
          <p><strong>Tarifs et devis.</strong> ${escapeHtml(page.price)}</p>
        </div>
        <a class="btn btn--primary" href="../contact-devis/">Obtenir un devis</a>
      </div>
    </section>

    <section class="seo-section">
      <div class="seo-section__head">
        <p class="seo-eyebrow">FAQ</p>
        <h2>Questions fréquentes</h2>
      </div>
      <div class="seo-faq">
        ${faqMarkup(page)}
      </div>
    </section>

    <section class="seo-section">
      <div class="seo-section__head seo-section__head--center">
        <p class="seo-eyebrow eyebrow--center">Maillage interne</p>
        <h2>Pages utiles à consulter</h2>
      </div>
      <div class="seo-related">
        ${relatedMarkup(page)}
      </div>
    </section>

    <section class="seo-cta">
      <div class="seo-cta__inner">
        <div>
          <h2>Besoin d'un avis rapide ?</h2>
          <p>Envoyez une demande avec votre commune, votre appareil et le problème rencontré pour recevoir une orientation claire.</p>
        </div>
        <a class="btn btn--ghost" href="../contact-devis/">Contact / Devis</a>
      </div>
    </section>
  </main>
${footerMarkup()}
${cookieMarkup()}
  <script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

function contactPage(page) {
  return `${pageHead(page)}
<body class="seo-page">
${headerMarkup()}
  <main class="seo-main">
    <section class="seo-contact">
      <div class="seo-contact__grid">
        <div class="seo-contact__copy">
          <p class="seo-eyebrow">${escapeHtml(page.eyebrow)}</p>
          <h1>${escapeHtml(page.h1)}</h1>
          <p>${escapeHtml(page.intro)}</p>
          <ul class="seo-contact__list">
            ${page.summary.map(([label, value]) => `<li>${escapeHtml(label)} : ${escapeHtml(value)}</li>`).join("\n            ")}
          </ul>
        </div>
        <form class="est-card" novalidate>
          <h2 class="est-card__title">Demande de devis</h2>
          <p class="est-card__sub">Précisez votre commune, votre appareil et le problème rencontré.</p>
          <label class="field"><span>Nom complet</span>
            <input type="text" name="nom" placeholder="Jean Dupont" />
          </label>
          <div class="field-row">
            <label class="field"><span>Email</span>
              <input type="email" name="email" placeholder="jean@exemple.com" />
            </label>
            <label class="field"><span>Téléphone</span>
              <input type="tel" name="tel" placeholder="06 00 00 00 00" />
            </label>
          </div>
          <div class="field-row">
            <label class="field"><span>Commune</span>
              <input type="text" name="ville" placeholder="Vittel" />
            </label>
            <label class="field"><span>Service</span>
              <select name="service">
                <option>Dépannage informatique</option>
                <option>Réparation ordinateur</option>
                <option>Assistance à domicile</option>
                <option>Installation imprimante</option>
                <option>Récupération de données</option>
                <option>Réparation smartphone</option>
                <option>Service drone</option>
              </select>
            </label>
          </div>
          <label class="field"><span>Description du besoin</span>
            <textarea name="desc" rows="4" placeholder="Décrivez la panne, l'appareil et vos disponibilités..."></textarea>
          </label>
          <button type="submit" class="btn btn--blue">Envoyer ma demande</button>
        </form>
      </div>
    </section>

    <section class="seo-section">
      <div class="seo-section__head seo-section__head--center">
        <p class="seo-eyebrow eyebrow--center">Pages prioritaires</p>
        <h2>Choisir le bon service</h2>
      </div>
      <div class="seo-related">
        ${relatedMarkup(page)}
      </div>
    </section>
  </main>
${footerMarkup()}
${cookieMarkup()}
  <script src="../assets/js/main.js"></script>
</body>
</html>
`;
}

for (const page of pages) {
  const dir = path.join(root, page.slug);
  await mkdir(dir, { recursive: true });
  const html = page.type === "contact" ? contactPage(page) : standardPage(page);
  await writeFile(path.join(dir, "index.html"), html, "utf8");
}

console.log(`Generated ${pages.length} SEO pages.`);

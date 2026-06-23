const header = document.querySelector("[data-header]");
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (header) {
  const syncHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  syncHeader();
  window.addEventListener("scroll", syncHeader, { passive: true });
}

if (navToggle && nav) {
  const closeMenu = () => {
    navToggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const panelId = button.getAttribute("aria-controls");
    const panel = panelId ? document.getElementById(panelId) : null;
    if (!panel) return;

    const isOpen = button.getAttribute("aria-expanded") === "true";
    const faqList = button.closest(".faq-list");

    faqList?.querySelectorAll(".faq-question").forEach((otherButton) => {
      if (otherButton === button) return;

      const otherPanelId = otherButton.getAttribute("aria-controls");
      const otherPanel = otherPanelId ? document.getElementById(otherPanelId) : null;
      otherButton.setAttribute("aria-expanded", "false");
      if (otherPanel) otherPanel.hidden = true;
    });

    button.setAttribute("aria-expanded", String(!isOpen));
    panel.hidden = isOpen;
  });
});

document.querySelectorAll("[data-map-pin]").forEach((pin) => {
  pin.addEventListener("click", (event) => {
    if (!window.matchMedia("(pointer: coarse)").matches) return;

    const isActive = pin.classList.contains("is-active");
    document.querySelectorAll("[data-map-pin].is-active").forEach((activePin) => {
      if (activePin !== pin) activePin.classList.remove("is-active");
    });

    if (!isActive) {
      event.preventDefault();
      pin.classList.add("is-active");
    }
  });

  pin.addEventListener("blur", () => {
    pin.classList.remove("is-active");
  });
});

document.querySelectorAll("[data-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const button = form.querySelector("button[type='submit']");
    const message = form.querySelector("[data-form-message]");
    if (!(button instanceof HTMLButtonElement)) return;

    const original = button.textContent;
    button.textContent = "Demande prête à envoyer";
    button.disabled = true;
    if (message) message.textContent = "Merci. Vous pouvez aussi appeler le 06 52 24 66 47 pour une demande urgente.";

    window.setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
      form.reset();
      if (message) message.textContent = "Réponse sous 24 h, sans engagement.";
    }, 2600);
  });
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealItems = document.querySelectorAll(".reveal");

const animateCount = (item) => {
  if (item.dataset.counted === "true") return;

  const target = Number(item.dataset.count);
  if (!Number.isFinite(target)) return;

  const suffix = item.dataset.suffix || "";
  const duration = 900;
  const start = performance.now();
  item.dataset.counted = "true";

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    item.textContent = `${Math.round(target * eased)}${suffix}`;
    if (progress < 1) window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
};

if (prefersReducedMotion.matches) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  document.querySelectorAll("[data-count]").forEach(animateCount);
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-count]").forEach(animateCount);
        if (entry.target.matches("[data-count]")) animateCount(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 },
  );

  revealItems.forEach((item) => observer.observe(item));
  document.querySelectorAll("[data-count]").forEach((item) => {
    if (!item.closest(".reveal")) observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  document.querySelectorAll("[data-count]").forEach(animateCount);
}

const menuButton = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    mobileMenu.hidden = open;
    document.body.classList.toggle("menu-open", !open);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
      document.body.classList.remove("menu-open");
    });
  });
}

document.querySelectorAll("[data-faq]").forEach((item) => {
  const trigger = item.querySelector("button");
  if (!trigger) return;
  trigger.addEventListener("click", () => {
    const open = item.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(open));
  });
});

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.16 })
  : null;

document.querySelectorAll(".reveal").forEach((node) => {
  if (revealObserver) revealObserver.observe(node);
  else node.classList.add("is-visible");
});

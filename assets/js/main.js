const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

if (burger && nav) {
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });

  nav.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLAnchorElement)) return;
    burger.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  });
}

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button[type='submit']");
    if (!button) return;
    const original = button.textContent;
    button.textContent = "Demande envoyee";
    button.setAttribute("disabled", "true");
    setTimeout(() => {
      button.textContent = original;
      button.removeAttribute("disabled");
      form.reset();
    }, 2200);
  });
});

const cookie = document.querySelector(".cookie");
const cookieKey = "acdj-cookie-choice";

if (cookie && !localStorage.getItem(cookieKey)) {
  cookie.hidden = false;
}

document.querySelectorAll("[data-cookie]").forEach((button) => {
  button.addEventListener("click", () => {
    localStorage.setItem(cookieKey, button.getAttribute("data-cookie") || "set");
    if (cookie) cookie.hidden = true;
  });
});

const moduleButtons = document.querySelectorAll(".module-toggle");
const screenButtons = document.querySelectorAll(".screen-open");
const lightbox = document.querySelector(".screen-lightbox");
const lightboxImage = lightbox?.querySelector("img");
const lightboxClose = lightbox?.querySelector(".screen-lightbox-close");
const cookieBanner = document.querySelector("[data-cookie-banner]");
const cookieAccept = document.querySelector("[data-cookie-accept]");
const cookieEssential = document.querySelector("[data-cookie-essential]");
const cookieSettings = document.querySelector("[data-cookie-settings]");
const cookieDetails = document.querySelector("[data-cookie-details]");
const cookieStorageKey = "autotechnik_cookie_choice";

const getCookieChoice = () => {
  try {
    return localStorage.getItem(cookieStorageKey);
  } catch {
    return null;
  }
};

const setCookieChoice = (value) => {
  try {
    localStorage.setItem(cookieStorageKey, value);
  } catch {
    // Ignore storage errors in private mode or restricted browsers.
  }

  if (cookieBanner) {
    cookieBanner.hidden = true;
  }
};

if (cookieBanner && !getCookieChoice()) {
  cookieBanner.hidden = false;
}

cookieAccept?.addEventListener("click", () => setCookieChoice("all"));
cookieEssential?.addEventListener("click", () => setCookieChoice("essential"));

cookieSettings?.addEventListener("click", () => {
  if (!cookieDetails || !cookieSettings) return;

  const willOpen = cookieDetails.hidden;
  cookieDetails.hidden = !willOpen;
  cookieSettings.setAttribute("aria-expanded", String(willOpen));
});

moduleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const body = button.nextElementSibling;
    const isOpen = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!isOpen));
    body.hidden = isOpen;
  });
});

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) return;

  lightbox.hidden = true;
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.classList.remove("no-scroll");
};

screenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) return;

    const image = button.querySelector("img");
    lightboxImage.src = button.dataset.full || image?.src || "";
    lightboxImage.alt = image?.alt || "";
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
  });
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

lightboxClose?.addEventListener("click", closeLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeLightbox();
  }
});

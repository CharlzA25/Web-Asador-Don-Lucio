function showSection(sectionId, shouldScroll = true) {
  let selectedSection = null;
  document.querySelectorAll(".food").forEach((section) => {
    const isSelected = section.id === sectionId;
    section.classList.toggle("activa", isSelected);
    if (isSelected) selectedSection = section;
  });

  document.querySelectorAll("#menu-seleccion button").forEach((button) => {
    const target = button.getAttribute("onclick")?.match(/showSection\('([^']+)'\)/)?.[1];
    const isActive = target === sectionId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    if (isActive) {
      const menu = document.getElementById("menu-seleccion");
      menu?.scrollTo({
        left: button.offsetLeft - (menu.clientWidth - button.offsetWidth) / 2,
        behavior: shouldScroll ? "smooth" : "auto",
      });
    }
  });

  if (selectedSection && shouldScroll) {
    /*
     * Esperamos a que las secciones ocultas cambien el layout y fijamos el
     * inicio de la categoría debajo de la navegación fija.
     */
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const scrollMargin = Number.parseFloat(
          window.getComputedStyle(selectedSection).scrollMarginTop
        ) || 0;
        const sectionTop =
          selectedSection.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: Math.max(0, sectionTop - scrollMargin),
          behavior: "smooth",
        });
      });
    });
  }
}

function createDishPlaceholder() {
  const placeholder = document.createElement("div");
  placeholder.className = "food-placeholder";
  placeholder.setAttribute("role", "img");
  placeholder.setAttribute("aria-label", "Imagen del platillo próximamente");
  placeholder.innerHTML = `
    <img src="./Logo/LogoSolo.png" alt="" aria-hidden="true" width="72" height="72">
    <span>Imagen próximamente</span>
  `;
  return placeholder;
}

function addMissingDishPlaceholders() {
  document.querySelectorAll(".food").forEach((section) => {
    const cards = [...section.querySelectorAll(".food-items, .food-items2")];
    const sectionHasImages = cards.some((card) => card.querySelector(":scope > img"));

    section.classList.toggle("food--text-only", !sectionHasImages);
    if (!sectionHasImages) return;

    cards.forEach((card) => {
      if (!card.querySelector(":scope > img, :scope > .food-placeholder")) {
        card.prepend(createDishPlaceholder());
      }
    });
  });
}

document.addEventListener("error", (event) => {
  const image = event.target;
  const card = image.closest?.(".food-items, .food-items2");
  if (image.tagName === "IMG" && card && image.parentElement === card) {
    image.replaceWith(createDishPlaceholder());
  }
}, true);

function getMexicoCityTime() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Mexico_City",
    hour: "numeric",
    hourCycle: "h23",
    weekday: "short",
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  return { hour, weekday };
}

function updateTacosVisibility() {
  const tacos = document.getElementById("Tacos");
  if (!tacos) return;

  const { hour, weekday } = getMexicoCityTime();
  const availableDays = new Set(["Wed", "Thu", "Fri", "Sat", "Sun"]);
  tacos.hidden = !(availableDays.has(weekday) && hour >= 19 && hour <= 23);
}

function scrollMenu(distance) {
  document.getElementById("menu-seleccion")?.scrollBy({
    left: distance,
    behavior: "smooth",
  });
}

function updateMenuScrollControls() {
  const menu = document.getElementById("menu-seleccion");
  const previous = document.querySelector(".scroll-button.left");
  const next = document.querySelector(".scroll-button.right");
  if (!menu || !previous || !next) return;

  const maxScroll = Math.max(0, menu.scrollWidth - menu.clientWidth);
  previous.disabled = menu.scrollLeft <= 2;
  next.disabled = menu.scrollLeft >= maxScroll - 2;
}

document.addEventListener("DOMContentLoaded", () => {
  const requestedSection = new URLSearchParams(location.search).get("seccion");
  addMissingDishPlaceholders();
  showSection(requestedSection || "entradas", false);
  updateTacosVisibility();
  updateMenuScrollControls();
  document.getElementById("menu-seleccion")?.addEventListener("scroll", updateMenuScrollControls, { passive: true });
  window.addEventListener("resize", updateMenuScrollControls, { passive: true });
});

const availabilityTimer = window.setInterval(() => {
  if (!document.hidden) updateTacosVisibility();
}, 60_000);

window.addEventListener("pagehide", () => {
  window.clearInterval(availabilityTimer);
}, { once: true });

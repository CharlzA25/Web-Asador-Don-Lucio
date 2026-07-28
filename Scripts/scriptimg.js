const galleries = [
  {
    id: "imagenesFuego",
    index: 0,
    images: [
      { src: "./optimized/Menu/Cortes/Cortes-Arrachera.webp", alt: "Arrachera a la parrilla" },
      { src: "./optimized/Menu/Cortes/Cortes-Costilla de res 24hrs.webp", alt: "Costilla de res" },
      { src: "./optimized/Menu/Cortes/Cortes-Rib eye asado.webp", alt: "Rib eye asado" },
    ],
  },
  {
    id: "imagenesMar",
    index: 0,
    images: [
      { src: "./optimized/Menu/Del mar/Del mar-Pulpo con verduras.webp", alt: "Pulpo con verduras" },
      { src: "./optimized/Menu/Del mar/Fettuccine Frutti di mare.webp", alt: "Fettuccine frutti di mare" },
      { src: "./optimized/Menu/Del mar/Del mar-Salmón con salsa de mantequilla y naranja con puré de camote con piña6.webp", alt: "Salmón con salsa de mantequilla y naranja" },
    ],
  },
  {
    id: "imagenesAire",
    index: 0,
    images: [
      { src: "./optimized/Menu/Del aire/Del aire-Pechuga pollo con espinacas a la crema.webp", alt: "Pechuga con espinacas a la crema" },
      { src: "./optimized/Menu/Del aire/Del aire-Pechuga pollo en pipián de melón.webp", alt: "Pechuga en pipián de melón" },
      { src: "./optimized/Menu/Del aire/Del aire-Pechuga pollo con mermelada cebolla y puré d camote con piña.webp", alt: "Pechuga con mermelada de cebolla" },
    ],
  },
  {
    id: "imagenesMixologia",
    index: 0,
    images: [
      { src: "./optimized/Menu/Bebida/Bebidas-Hígole.webp", alt: "Cóctel Hígole" },
      { src: "./optimized/Menu/Bebida/Bebidas-La dolce far niente.webp", alt: "Cóctel La dolce far niente" },
      { src: "./optimized/Menu/Bebida/SUPERSTYLIN.webp", alt: "Cóctel Superstylin" },
    ],
  },
];

const gallerySection = document.querySelector(".ofert");
let rotationTimer = 0;
let galleriesVisible = false;

function rotateGalleries() {
  if (!galleriesVisible || document.hidden) return;

  galleries.forEach((gallery) => {
    const image = document.getElementById(gallery.id);
    if (!image) return;

    gallery.index = (gallery.index + 1) % gallery.images.length;
    const next = gallery.images[gallery.index];
    transitionGalleryImage(image, next);
  });
}

async function transitionGalleryImage(image, next) {
  const preload = new Image();
  preload.src = next.src;

  try {
    if (preload.decode) await preload.decode();
  } catch {
    return;
  }

  if (!image.animate) {
    image.src = next.src;
    image.alt = next.alt;
    return;
  }

  const fadeOut = image.animate([
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(1.025)" },
  ], {
    duration: 260,
    easing: "ease-in",
    fill: "forwards",
  });

  await fadeOut.finished;
  image.src = next.src;
  image.alt = next.alt;
  fadeOut.cancel();

  image.animate([
    { opacity: 0, transform: "scale(1.025)" },
    { opacity: 1, transform: "scale(1)" },
  ], {
    duration: 520,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  });
}

function scheduleRotation() {
  window.clearInterval(rotationTimer);
  if (galleriesVisible && !document.hidden) {
    rotationTimer = window.setInterval(rotateGalleries, 7000);
  }
}

if (gallerySection && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(([entry]) => {
    galleriesVisible = entry.isIntersecting;
    scheduleRotation();
  }, { rootMargin: "150px" });
  observer.observe(gallerySection);
} else {
  galleriesVisible = true;
  scheduleRotation();
}

document.addEventListener("visibilitychange", scheduleRotation);
window.addEventListener("pagehide", () => window.clearInterval(rotationTimer), { once: true });

// Arrays de imágenes para cada sección
const imagenesFuego = [
    { src: "./Menu/Cortes/Cortes-Arrachera.jpg", alt: "Imagen de Fuego 1" },
    { src: "./Menu/Cortes/Cortes-Costilla de res 24hrs.jpg", alt: "Imagen de Fuego 2" },
    { src: "./Menu/Cortes/Cortes-Rib eye asado.jpg", alt: "Imagen de Fuego 3" }
];

const imagenesMar = [
    { src: "./Menu/Del mar/Del mar-Pulpo con verduras.jpg", alt: "Imagen del Mar 2" },
    { src: "./Menu/Del mar/Fettuccine Frutti di mare.jpeg", alt: "Imagen del Mar 3" },
    { src: "./Menu/Del mar/Del mar-Salmón con salsa de mantequilla y naranja con puré de camote con piña6.jpg", alt: "Imagen del Mar 3" }
];

const imagenesAire = [
    { src: "./Menu/Del aire/Del aire-Pechuga pollo con espinacas a la crema.jpg", alt: "Imagen del Aire 1" },
    { src: "./Menu/Del aire/Del aire-Pechuga pollo en pipián de melón.jpg", alt: "Imagen del Aire 2" },
    { src: "./Menu/Del aire/Del aire-Pechuga pollo con mermelada cebolla y puré d camote con piña.jpg", alt: "Imagen del Aire 3" }
];

const imagenesMixologia = [
    { src: "./Menu/Bebida/Bebidas-Hígole.jpg", alt: "Imagen de Mixología 1" },
    { src: "./Menu/Bebida/Bebidas-La dolce far niente.jpg", alt: "Imagen de Mixología 2" },
    { src: "./Menu/Bebida/Bebidas-Guanatos.jpg", alt: "Imagen de Mixología 3" }
];

// Variables para controlar el índice de cada imagen
let indexFuego = 0;
let indexMar = 0;
let indexAire = 0;
let indexMixologia = 0;

// Funciones para cambiar cada imagen
function cambiarImagenFuego() {
    const imgElement = document.getElementById('imagenesFuego');
    imgElement.src = imagenesFuego[indexFuego].src;
    imgElement.alt = imagenesFuego[indexFuego].alt;
    indexFuego = (indexFuego + 1) % imagenesFuego.length;
}

function cambiarImagenMar() {
    const imgElement = document.getElementById('imagenesMar');
    imgElement.src = imagenesMar[indexMar].src;
    imgElement.alt = imagenesMar[indexMar].alt;
    indexMar = (indexMar + 1) % imagenesMar.length;
}

function cambiarImagenAire() {
    const imgElement = document.getElementById('imagenesAire');
    imgElement.src = imagenesAire[indexAire].src;
    imgElement.alt = imagenesAire[indexAire].alt;
    indexAire = (indexAire + 1) % imagenesAire.length;
}

function cambiarImagenMixologia() {
    const imgElement = document.getElementById('imagenesMixologia');
    imgElement.src = imagenesMixologia[indexMixologia].src;
    imgElement.alt = imagenesMixologia[indexMixologia].alt;
    indexMixologia = (indexMixologia + 1) % imagenesMixologia.length;
}

// Iniciar el cambio de imágenes cada 10 segundos para cada sección
setInterval(cambiarImagenFuego, 7000);
setInterval(cambiarImagenMar, 7000);
setInterval(cambiarImagenAire, 7000);
setInterval(cambiarImagenMixologia, 7000);





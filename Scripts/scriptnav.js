// Selecciona el menú y el botón
let navbar1 = document.querySelector('.navbar1');
let menuBtn = document.querySelector('#menus-btn');

// Activa el menú cuando se hace clic en el botón de menú
menuBtn.onclick = () => {
    navbar1.classList.toggle('active');
}

// Cierra el menú al hacer scroll
window.onscroll = () => {
    navbar1.classList.remove('active');
}
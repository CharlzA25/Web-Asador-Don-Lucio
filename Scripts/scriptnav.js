const navbar = document.querySelector('.navbar1');
const menuButton = document.querySelector('#menus-btn');
const contactMenu = document.querySelector('.submenu-container');
const contactToggle = contactMenu?.querySelector('.submenu-toggle');

function closeNavigation() {
  navbar?.classList.remove('active');
  contactMenu?.classList.remove('is-open');
  contactToggle?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = navbar?.classList.toggle('active');
  menuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

contactToggle?.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  const isOpen = contactMenu.classList.toggle('is-open');
  contactToggle.setAttribute('aria-expanded', String(isOpen));
});

contactMenu?.querySelectorAll('.submenu a').forEach((link) => {
  link.addEventListener('click', closeNavigation);
});

document.addEventListener('click', (event) => {
  if (!navbar?.contains(event.target) && !menuButton?.contains(event.target)) {
    closeNavigation();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNavigation();
    contactToggle?.focus();
  }
});

let lastScrollY = window.scrollY;
window.addEventListener(
  'scroll',
  () => {
    if (Math.abs(window.scrollY - lastScrollY) > 12) {
      closeNavigation();
      lastScrollY = window.scrollY;
    }
  },
  { passive: true }
);

const siteFooter = document.querySelector('.footer');

if (siteFooter) {
  siteFooter.innerHTML = `
    <div class="footer-main">
      <section class="footer-brand" aria-label="Asador Don Lucio">
        <a class="footer-logo" href="index.html" aria-label="Ir al inicio de Asador Don Lucio">
          <img src="./Logo/Logo2.png" alt="Asador Don Lucio">
        </a>
        <p>Ingredientes excepcionales, fuego y técnica para crear una experiencia gastronómica con identidad propia.</p>
        <a class="footer-reservation" href="https://www.opentable.com.mx/r/asador-don-lucio-reservations-heroica-puebla-de-zaragoza?restref=1492894&amp;lang=es-MX&amp;ot_source=Restaurant%20website" target="_blank" rel="noopener noreferrer">
          Reserva tu mesa
        </a>
      </section>

      <nav class="footer-navigation" aria-label="Navegación del pie de página">
        <h2>Explora</h2>
        <ul>
          <li><a href="index.html">Inicio</a></li>
          <li><a href="About-us.html">Sobre nosotros</a></li>
          <li><a href="menú.html">Menú</a></li>
          <li><a href="Recetas.html">Recetas</a></li>
          <li><a href="contactanos.html#bolsa-trabajo">Bolsa de trabajo</a></li>
        </ul>
      </nav>

      <section class="footer-visit" aria-labelledby="footer-visit-title">
        <h2 id="footer-visit-title">Visítanos</h2>
        <address>
          Calle 8 B Sur #3106<br>
          Ladrillera de Benítez<br>
          72530 Puebla, Pue.
        </address>
        <p>Miércoles a sábado · 13:00–23:00<br>Domingo · 13:00–19:00</p>
        <a href="contactanos.html#ubicacion">Consultar ubicación</a>
      </section>

      <section class="footer-contact" aria-labelledby="footer-contact-title">
        <h2 id="footer-contact-title">Contacto</h2>
        <a class="footer-phone" href="tel:+522222036090">+52 222 203 6090</a>
        <p>Atención, reservaciones y novedades en nuestros canales oficiales.</p>
        <ul class="footer-socials" aria-label="Redes sociales">
          <li><a href="https://www.facebook.com/share/2xBdsaFrjBSfQDxv/?mibextid=kFxxJD" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><img src="./iconos/facebook.png" alt=""></a></li>
          <li><a href="https://www.instagram.com/asadordonlucio?igsh=NGNkMnJxN2FvamI3" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><img src="./iconos/instagram.png" alt=""></a></li>
          <li><a href="https://wa.me/522222036090?text=Hola,%20me%20gustaría%20recibir%20información" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><img src="./iconos/social.png" alt=""></a></li>
        </ul>
      </section>
    </div>

    <div class="footer-bottom">
      <p>© 2026 Asador Don Lucio · Todos los derechos reservados.</p>
      <div class="developer-credit">
        <span>Sitio desarrollado y diseñado por</span>
        <a href="https://wa.me/522441257964?text=Hola,%20me%20interesa%20solicitar%20informes%20o%20una%20cotización%20para%20un%20sitio%20web."
          target="_blank"
          rel="noopener noreferrer"
          title="Solicita una cotización por WhatsApp">
          <img src="./iconos/social.png" alt="">
          <span class="developer-name">Kon Developer</span>
          <span class="developer-cta">Solicita información</span>
        </a>
      </div>
    </div>
  `;
}

const contactSections = document.querySelectorAll('.contact-panel');
const contactLinks = document.querySelectorAll(
  'a[href*="#bolsa-trabajo"], a[href*="#ubicacion"]'
);

function showContactSection(sectionId, options = {}) {
  const targetId = sectionId === 'ubicacion' ? 'ubicacion' : 'bolsa-trabajo';

  contactSections.forEach((section) => {
    const isActive = section.id === targetId;
    section.hidden = !isActive;
    section.classList.toggle('activa', isActive);
  });

  contactLinks.forEach((link) => {
    const isCurrent = link.hash === `#${targetId}`;
    link.classList.toggle('is-current', isCurrent);
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  if (options.scroll) {
    document.querySelector('.contact-main')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
      block: 'start'
    });
  }
}

function currentSectionFromHash() {
  return window.location.hash.slice(1);
}

window.addEventListener('DOMContentLoaded', () => {
  showContactSection(currentSectionFromHash());
});

window.addEventListener('hashchange', () => {
  showContactSection(currentSectionFromHash(), { scroll: true });
});

document.querySelector('.career-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = new FormData(form);
  const message = [
    'Hola, me interesa formar parte del equipo de Asador Don Lucio.',
    '',
    `Nombre: ${data.get('nombre')}`,
    `Correo: ${data.get('email')}`,
    `Área de interés: ${data.get('asunto')}`,
    `Presentación: ${data.get('mensaje')}`
  ].join('\n');

  if (status) status.textContent = 'Abriendo WhatsApp para completar tu solicitud…';
  window.open(
    `https://wa.me/522222036090?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer'
  );
  form.reset();
});

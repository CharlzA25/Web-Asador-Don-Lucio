function showSection(sectionId) {
    const sections = document.querySelectorAll('.contac');
    sections.forEach(section => {
      section.classList.remove('activa'); 
    });
  
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add('activa'); 
    }
  }
  
  window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sectionId = urlParams.get('seccion');
  
    const defaultSectionId = 'bolsa-trabajo'; 
    showSection(sectionId ? sectionId : defaultSectionId);
  };



  function mostrarSeccion() {
    // Obtener el fragmento del hash de la URL (por ejemplo, "#bolsa-trabajo")
    const seccionID = window.location.hash;

    // Ocultar todas las secciones con clase "contac"
    const secciones = document.querySelectorAll('.contac');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Mostrar solo la sección especificada por el ID de la URL
    if (seccionID) {
        const seccionMostrar = document.querySelector(seccionID);
        if (seccionMostrar) {
            seccionMostrar.style.display = 'flex'; // Cambia a 'flex' o como prefieras mostrarlo
        }
    }
}

// Ejecutar la función al cargar la página
window.onload = mostrarSeccion;

// Ejecutar la función cada vez que se cambie el hash de la URL
window.onhashchange = mostrarSeccion;
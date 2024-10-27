// Función para mostrar la sección seleccionada y ocultar las demás
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.food');
    sections.forEach(section => {
      section.classList.remove('activa');
    });
  
    // Mostrar la sección seleccionada
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
      selectedSection.classList.add('activa');
    }
  }
  
  // Función para ocultar todas las secciones al cargar, excepto la sección por defecto
  window.onload = function() {
    const defaultSectionId = 'entradas'; // Cambia 'entradas' al id de la sección por defecto que deseas mostrar
    showSection(defaultSectionId);
  };


const horaInicio = 19; // 7 PM (en formato 24h)
const horaFin = 23;    // 11 PM (en formato 24h)


const diasMostrar = [3, 4, 5, 6,7];

function verificarHoraYDia() {
    const ahora = new Date();
    const horas = ahora.getHours();
    const diaSemana = ahora.getDay();

   
    if (diasMostrar.includes(diaSemana) && horas >= horaInicio && horas <= horaFin) {
        document.getElementById('Tacos').style.display = 'block'; 
    } else {
        document.getElementById('Tacos').style.display = 'none'; 
    }
}

setInterval(verificarHoraYDia, 60000); 

verificarHoraYDia();




function scrollMenu(distance) {
    const container = document.getElementById('menu-seleccion');
    container.scrollBy({ left: distance, behavior: 'smooth' });
}







function mostrarSeccion() {
    // Obtener el fragmento de la URL (por ejemplo, "#seccion2")
    const seccionID = window.location.hash;

    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.seccion');
    secciones.forEach(seccion => {
        seccion.style.display = 'none';
    });

    // Mostrar solo la sección especificada por el ID de la URL
    if (seccionID) {
        const seccionMostrar = document.querySelector(seccionID);
        if (seccionMostrar) {
            seccionMostrar.style.display = 'block';
        }
    }
}

// Ejecutar la función al cargar la página
window.onload = mostrarSeccion;

// Ejecutar la función cada vez que se cambie el hash de la URL
window.onhashchange = mostrarSeccion;

function showSection(sectionId) {
    
    const sections = document.querySelectorAll('.food');
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
  
    
    const defaultSectionId = 'entradas'; 
    showSection(sectionId ? sectionId : defaultSectionId);
  };
  


  const horaInicio = 19; // 7 PM (en formato 24h)
  const horaFin = 23;    // 11 PM (en formato 24h)
  
  const diasMostrar = [3, 4, 5, 6]; // Miércoles a Domingo (0 es Domingo)
  
  
  function obtenerFechaHoraCDMX() {
      
      const opciones = {
          timeZone: 'America/Mexico_City',
          hour: '2-digit',
          hour12: false, // Formato 24h
          weekday: 'numeric'
      };
  
      const formatoHora = new Intl.DateTimeFormat('es-MX', opciones);
      const ahoraCDMX = formatoHora.formatToParts(new Date());
  
      // Obtener las partes de la hora y el día de la semana
      let horas = 0;
      let diaSemana = 0;
      ahoraCDMX.forEach(part => {
          if (part.type === 'hour') horas = parseInt(part.value);
          if (part.type === 'weekday') diaSemana = parseInt(part.value) - 1; // Restar 1 para que el domingo sea 0
      });
  
      return { horas, diaSemana };
  }
  
  function verificarHoraYDia() {
      const { horas, diaSemana } = obtenerFechaHoraCDMX();
  
      if (diasMostrar.includes(diaSemana) && horas >= horaInicio && horas <= horaFin) {
          document.getElementById('Tacos').style.display = 'block';
      } else {
          document.getElementById('Tacos').style.display = 'none';
      }
  }
  
  // Verificar cada minuto
  setInterval(verificarHoraYDia, 60000); 
  
  // Verificar al cargar la página
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











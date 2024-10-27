
function scrollMenu(direction) {
    const menu = document.querySelector('.menu-seleccion');
    const scrollAmount = 1; // Ajusta la cantidad de desplazamiento
    menu.scrollLeft += direction * scrollAmount;
}

function showSection(sectionId) {
    // Ocultar todas las secciones
    document.querySelectorAll('.food.container').forEach(section => {
        section.style.display = 'none';
    });

    // Mostrar la sección seleccionada
    document.getElementById(sectionId).style.display = 'block';
}



const horaInicio = 19; // 7 PM (en formato 24h)
const horaFin = 23;    // 11 PM (en formato 24h)


const diasMostrar = [3, 4, 5, 6];

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
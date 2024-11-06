let navbar1 = document.querySelector('.navbar1');

document.querySelector('menus-btn').onclick = () =>{
    navbar1.classList.toggle('active');
}

window.onscroll = () => {
    navbar1.classList.remove('active');
    
}
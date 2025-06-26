// js/init.js

// Inicialización de AOS (Animaciones)
AOS.init({
    duration: 1000,     // Duración en ms
    once: true          // Animar solo una vez
});

// Inicialización de Owl Carousel
$(document).ready(function(){
  $(".owl-carousel").owlCarousel({
    items: 4,             // Número de elementos por slide
    loop: true,           // Deslizar en bucle
    margin: 20,           // Espaciado entre los elementos
    nav: false,           // No mostrar los botones de navegación
    dots: true,           // Mostrar los puntos de navegación
    autoplay: true,       // Reproducción automática
    autoplayTimeout: 3000, // Tiempo entre transiciones (3 segundos)
    autoplayHoverPause: true, // Pausar al pasar el mouse
    smartSpeed: 800,      // Velocidad de transición suave
    responsive: {
      0: {
        items: 1  // En pantallas pequeñas, mostrar solo 1 elemento
      },
      600: {
        items: 2  // En pantallas de tablet, mostrar 2 elementos
      },
      1000: {
        items: 4  // En pantallas grandes, mostrar 4 elementos
      }
    }
  });
});

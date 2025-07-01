// js/init.js

// Inicialización de AOS (Animaciones)
AOS.init({
    duration: 1000,     // Duración en ms
    once: true          // Animar solo una vez
});

// Inicialización de Owl Carousel
$(document).ready(function(){
  // Configuración limpia para el carrusel de colaboraciones
  $(".collaborations-carousel").owlCarousel({
    loop: true,                    // ✅ Deslizar en bucle infinito
    margin: 20,                    // ✅ Espaciado entre elementos
    nav: false,                    // ❌ Sin flechas de navegación
    dots: false,                   // ❌ Sin puntos de navegación
    autoplay: true,                // ✅ Reproducción automática
    autoplayTimeout: 3000,         // ✅ Cambio cada 3 segundos
    autoplayHoverPause: true,      // ✅ Pausa al pasar el mouse
    smartSpeed: 800,               // ✅ Velocidad de transición suave
    mouseDrag: true,               // ✅ Permitir arrastrar con mouse
    touchDrag: true,               // ✅ Permitir arrastrar en móviles
    responsive: {
      0: {
        items: 1,                  // Móviles pequeños: 1 elemento
        margin: 10
      },
      480: {
        items: 1,                  // Móviles medianos: 1 elemento  
        margin: 15
      },
      576: {
        items: 2,                  // Móviles grandes: 2 elementos
        margin: 18
      },
      768: {
        items: 3,                  // Tablets: 3 elementos
        margin: 20
      },
      992: {
        items: 4,                  // Desktop: 4 elementos
        margin: 22
      },
      1200: {
        items: 5,                  // Pantallas grandes: 5 elementos
        margin: 25
      }
    }
  });
});

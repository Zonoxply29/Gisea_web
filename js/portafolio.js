document.addEventListener("DOMContentLoaded", function () {

  // Esperar a que todas las imágenes se carguen antes de inicializar Isotope
  var grid = document.querySelector('.isotope-container');
  
  // Usar imagesLoaded para esperar a que las imágenes se carguen
  imagesLoaded(grid, function() {
    // Inicializar Isotope después de que las imágenes se hayan cargado
    var iso = new Isotope(grid, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    // Manejo de filtros
    var filters = document.querySelectorAll('.portfolio-filters li');
    filters.forEach(filter => {
      filter.addEventListener("click", function () {
        filters.forEach(el => el.classList.remove('filter-active'));
        this.classList.add('filter-active');
        let filterValue = this.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });
        
        AOS.refresh();
      });
    });
  });

  // Inicializar GLightbox para las imágenes
  const lightbox = GLightbox({
    selector: '.glightbox'
  });

});

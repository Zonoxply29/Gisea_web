document.addEventListener("DOMContentLoaded", function () {

  // Inicializar Isotope para filtrar elementos
  var grid = document.querySelector('.isotope-container');
  var iso = new Isotope(grid, {
    itemSelector: '.portfolio-item', // SOLO afecta elementos con esta clase
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

  // Inicializar GLightbox para las imágenes
  const lightbox = GLightbox({
    selector: '.glightbox'
  });

});

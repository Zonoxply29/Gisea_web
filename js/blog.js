document.addEventListener("DOMContentLoaded", function () {
    const tags = document.querySelectorAll('.blog-tag');

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Eliminar .active de todos los tags
            tags.forEach(t => t.classList.remove('active'));
            // Agregar .active al clickeado
            tag.classList.add('active');
        });
    });
});

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
/// PAGINACION PARA EL BLOG
document.addEventListener("DOMContentLoaded", function () {
    const cardsPerPage = 6;
    const cards = document.querySelectorAll('.blog-card-item');
    const paginationContainer = document.querySelector('.custom-pagination');
    const totalPages = Math.ceil(cards.length / cardsPerPage);
    let currentPage = 1;
    let lastPage = 1;

    function showPage(page, direction = 'next') {
        cards.forEach((card, index) => {
            const isVisible = (index >= (page - 1) * cardsPerPage && index < page * cardsPerPage);
            card.style.display = isVisible ? 'block' : 'none';

            if (isVisible) {
                // Prepara animación de entrada
                card.classList.remove('fade-in-left', 'fade-in-right', 'hidden-left', 'hidden-right');
                card.classList.add(direction === 'next' ? 'hidden-left' : 'hidden-right');

                setTimeout(() => {
                    card.classList.remove('hidden-left', 'hidden-right');
                    card.classList.add(direction === 'next' ? 'fade-in-left' : 'fade-in-right');
                }, 50);
            }
        });
    }

    function generatePageNumbers() {
        const paginations = document.querySelectorAll('.custom-pagination');
        paginations.forEach(pagination => {
            // Eliminar números anteriores si existían
            pagination.querySelectorAll('.page-number').forEach(el => el.remove());

            // Insertar números de nueva cuenta
            for (let i = 1; i <= totalPages; i++) {
                const li = document.createElement('li');
                li.classList.add('page-item', 'page-number');
                if (i === currentPage) li.classList.add('active');
                li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
                pagination.insertBefore(li, pagination.querySelector('.next-page'));
            }
        });
    }

    function updatePaginationButtons() {
        const allPaginations = document.querySelectorAll('.custom-pagination');

        allPaginations.forEach(pagination => {
            // Quitar active y disabled dentro de cada bloque de paginación
            pagination.querySelectorAll('.page-item').forEach(li => li.classList.remove('active', 'disabled'));

            const pageNumbers = pagination.querySelectorAll('.page-number');
            if (pageNumbers[currentPage - 1]) {
                pageNumbers[currentPage - 1].classList.add('active');
            }

            const prevButton = pagination.querySelector('.prev-page');
            const nextButton = pagination.querySelector('.next-page');

            if (currentPage === 1 && prevButton) {
                prevButton.classList.add('disabled');
            }
            if (currentPage === totalPages && nextButton) {
                nextButton.classList.add('disabled');
            }
        });
    }


    function changePage(page) {
        if (page >= 1 && page <= totalPages) {
            const direction = page > lastPage ? 'next' : 'prev';
            lastPage = currentPage;
            currentPage = page;

            // Fade-out
            cards.forEach(card => {
                if (card.style.display === 'block') {
                    card.classList.remove('fade-in-left', 'fade-in-right');
                    card.classList.add(direction === 'next' ? 'fade-out-right' : 'fade-out-left');
                }
            });

            setTimeout(() => {
                // Limpiar clases
                cards.forEach(card => {
                    card.classList.remove('fade-out-left', 'fade-out-right');
                });
                // Mostrar tarjetas nuevas
                showPage(currentPage, direction);
                updatePaginationButtons();

                // ✅ Nuevo: Ajustar scroll al inicio del listado de las cards (container)
                const subnavSection = document.querySelector('.blog-subnav-container');
                subnavSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

            }, 400); // Coincide con la duración de la animación
        }
    }

    function assignPaginationEvents() {
        document.querySelectorAll('.page-number a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const page = parseInt(this.textContent);
                changePage(page);
            });
        });

        document.querySelectorAll('.prev-page').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                changePage(currentPage - 1);
            });
        });

        document.querySelectorAll('.next-page').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                changePage(currentPage + 1);
            });
        });
    }

    // Inicialización
    generatePageNumbers();
    assignPaginationEvents();
    showPage(currentPage);
    updatePaginationButtons();


});





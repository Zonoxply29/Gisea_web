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
    hideStatus();


});
// ⭐ SISTEMA DE CALIFICACIÓN CON ESTRELLAS (versión de prueba)
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("rating-stars");
    const ratingCountText = document.getElementById("rating-count-text");
    let status = document.querySelector('#rating-status');
    if (!status) {
        status = document.createElement('span');
        status.id = 'rating-status';
        status.className = 'rating-status';
        status.setAttribute('aria-live', 'polite');
        ratingCountText.insertAdjacentElement('afterend', status);
    }
    const STORAGE_KEY = "blog_user_rating";
    if (!container || !ratingCountText) return;

    const stars = Array.from(container.querySelectorAll(".star"));

    // Métricas BASE (simulan venir del backend y NO incluyen al usuario actual)
    const BASE_VOTES = 15;
    const BASE_AVG = 4.2;

    // Voto del usuario (persistente)
    let userVote = parseInt(localStorage.getItem(STORAGE_KEY) || "0", 10);
    if (Number.isNaN(userVote) || userVote < 1 || userVote > 5) userVote = 0;

    // Selección activa para pintar UI
    let selectedRating = userVote;

    // Render inicial
    paint(selectedRating);
    renderMetrics(userVote);

    // Click: alterna voto (poner/quitar) y no infla votos
    container.addEventListener("click", function (e) {
        const target = e.target.closest(".star");
        if (!target) return;

        const val = parseInt(target.dataset.value, 10);

        if (userVote === val) {
            // Quitar voto
            userVote = 0;
            selectedRating = 0;
            localStorage.removeItem(STORAGE_KEY);
            paint(0);
            renderMetrics(0);
            showOnce("rating-removed", " Voto eliminado.");
        } else {
            // Nuevo voto o actualización de voto (reemplaza, NO suma votos extra)
            userVote = val;
            selectedRating = val;
            localStorage.setItem(STORAGE_KEY, String(val));
            paint(val);
            renderMetrics(val);
            showOnce("rating-thanks", " ¡Gracias por tu calificación!");
        }
    });

    // Hover: mostrar preview del promedio que resultaría con esa calificación
    let hoverVal = 0;

    container.addEventListener("mouseover", function (e) {
        const target = e.target.closest(".star");
        if (!target) return;
        const val = parseInt(target.dataset.value, 10);
        if (val !== hoverVal) {
            hoverVal = val;
            paint(hoverVal);
            renderMetrics(hoverVal);   // muestra valor/hint en hover
        }
    });

    container.addEventListener("mouseleave", function () {
        hoverVal = 0;
        paint(selectedRating);       // vuelve a tu selección
        renderMetrics(userVote);     // y al texto acorde a tu voto
    });

    // Al salir: volver al estado actual del usuario
    container.addEventListener("mouseleave", function () {
        paint(selectedRating);
        renderMetrics(userVote);
    });

    // Muestra el valor de las estrellas + votos (sin promedio)
    function renderMetrics(valOrZero) {
        const hasVal = !!valOrZero;
        // Mantiene la lógica actual: suma +1 cuando hay selección/hover
        const votes = BASE_VOTES + (hasVal ? 1 : 0);
        const text = hasVal ? `${valOrZero}/5` : 'Elige tu calificación';
        ratingCountText.textContent = `${text} / ${votes} votos`;
    }

    // Pinta estrellas con Font Awesome v6 (fa-regular/fa-solid)
    function paint(value) {
        stars.forEach((star) => {
            const v = parseInt(star.dataset.value, 10);
            star.classList.remove("fa-regular", "fa-solid", "active");
            if (!star.classList.contains("fa-star")) {
                star.classList.add("fa-star");
            }
            if (v <= value) {
                star.classList.add("fa-solid", "active");
            } else {
                star.classList.add("fa-regular");
            }
        });
    }

    // Mensaje simple, evitando duplicados por clase
    function showOnce(cls, msg) {
        // Reemplaza cualquier mensaje previo y evita acumular nodos
        status.classList.remove('rating-thanks', 'rating-removed', 'visible');
        status.classList.add(cls); // 'rating-thanks' o 'rating-removed'
        status.textContent = msg;

        // Anima solo opacidad (sin cambiar ancho)
        requestAnimationFrame(() => status.classList.add('visible'));
    }

});

// Opcional: para ocultar el mensaje en algún punto (por ejemplo, al mouseleave si lo prefieres)
    function hideStatus() {
        status.classList.remove('visible');
    }






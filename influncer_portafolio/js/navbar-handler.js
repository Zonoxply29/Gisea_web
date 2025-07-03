/**
 * Navbar Handler - Manejo del menú hamburguesa
 * Funcionalidades:
 * - Cerrar menú al hacer clic fuera de él
 * - Cerrar menú al seleccionar una opción
 * - Cerrar menú al hacer clic en botones del navbar
 */

document.addEventListener('DOMContentLoaded', function () {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    // Validar que los elementos existan
    if (!navbarToggler || !navbarCollapse) {
        console.warn('Navbar elements not found');
        return;
    }

    /**
     * Cerrar menú utilizando Bootstrap Collapse API
     */
    function closeNavbar() {
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    }

    /**
     * Cerrar menú al hacer clic fuera de él
     */
    document.addEventListener('click', function (event) {
        const isClickInsideNav = navbarCollapse.contains(event.target) || 
                                navbarToggler.contains(event.target);

        if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
            closeNavbar();
        }
    });

    /**
     * Cerrar menú al hacer clic en cualquier enlace de navegación
     */
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            closeNavbar();
        });
    });

    /**
     * Cerrar menú al hacer clic en el botón "Precios y Paquetes"
     */
    const preciosBtn = document.querySelector('.btn-follow[href="#precios"]');
    if (preciosBtn) {
        preciosBtn.addEventListener('click', function () {
            closeNavbar();
        });
    }

    // También manejar otros botones del navbar si existen
    const navbarButtons = document.querySelectorAll('.navbar .btn-follow');
    navbarButtons.forEach(button => {
        button.addEventListener('click', function () {
            closeNavbar();
        });
    });
});

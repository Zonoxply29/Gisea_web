/**
 * Smooth Scroll Handler - Navegación suave con offset
 * Funcionalidades:
 * - Scroll suave a secciones específicas
 * - Compensación automática para navbar sticky
 * - Prevención de scroll negativo
 * - Manejo de enlaces vacíos
 * - Optimizado para rendimiento
 */

document.addEventListener('DOMContentLoaded', function () {
    
    // Cache del navbar para mejor rendimiento
    const navbar = document.querySelector('.navbar');
    
    /**
     * Configurar smooth scroll con offset para compensar el navbar sticky
     */
    function initSmoothScroll() {
        const anchors = document.querySelectorAll('a[href^="#"]');
        
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                
                // Validar que el ID no está vacío
                if (targetId !== '') {
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        scrollToElement(targetElement);
                    }
                }
            });
        });
    }

    /**
     * Realizar scroll suave a un elemento específico
     * @param {HTMLElement} targetElement - Elemento destino
     */
    function scrollToElement(targetElement) {
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        const elementPosition = targetElement.offsetTop;
        const offsetPosition = elementPosition - navbarHeight - 30; // 30px extra de margen
        
        window.scrollTo({
            top: Math.max(0, offsetPosition), // Evitar scroll negativo
            behavior: 'smooth'
        });
    }

    /**
     * Función utilitaria para scroll programático
     * @param {string} targetId - ID del elemento destino
     */
    function scrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            scrollToElement(targetElement);
        }
    }

    // Inicializar smooth scroll
    initSmoothScroll();

    // Exportar función para uso externo
    window.scrollToSection = scrollToSection;
});

/**
 * Animación de contadores para estadísticas de redes sociales
 * Se activa cuando la sección de estadísticas entra en el viewport
 */

document.addEventListener("DOMContentLoaded", () => {
    const duration = 2000; // Duración de la animación en ms
    
    // Estadísticas de redes sociales
    const socialStats = [
        { id: "count-tiktok", value: 696 },
        { id: "count-instagram", value: 42 },
    ];

    // Estadísticas de la sección story
    const storyStats = [
        { id: "count-alcance", value: 11.5, decimal: true },
        { id: "count-interacciones", value: 1.9, decimal: true },
        { id: "count-visualizaciones", value: 19.2, decimal: true }, 
    ];

    let socialHasAnimated = false; // Para la sección de redes sociales
    let storyHasAnimated = false; // Para la sección story

    /**
     * Anima un contador individual
     * @param {string} id - ID del elemento HTML
     * @param {number} value - Valor final del contador
     * @param {boolean} decimal - Si debe mostrar decimales
     */
    function animateCounter(id, value, decimal = false) {
        const el = document.getElementById(id);
        if (!el) return;

        let start = 0;
        const increment = decimal ? value / 50 : 1; // Para decimales, dividir en 50 pasos
        const stepTime = duration / (decimal ? 50 : value);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= value) {
                start = value;
                clearInterval(timer);
            }
            
            if (decimal) {
                el.textContent = start.toFixed(1);
            } else {
                el.textContent = Math.floor(start);
            }
        }, stepTime);
    }

    /**
     * Inicia la animación de los contadores de redes sociales
     */
    function startSocialCounterAnimation() {
        if (socialHasAnimated) return;
        socialHasAnimated = true;
        
        socialStats.forEach(({ id, value, decimal }) => {
            animateCounter(id, value, decimal);
        });
    }

    /**
     * Inicia la animación de los contadores de la sección story
     */
    function startStoryCounterAnimation() {
        if (storyHasAnimated) return;
        storyHasAnimated = true;
        
        storyStats.forEach(({ id, value, decimal }) => {
            animateCounter(id, value, decimal);
        });
    }

    // Observer para la sección de estadísticas de redes sociales
    const socialObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                startSocialCounterAnimation();
            }
        });
    }, {
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: '0px 0px -20px 0px'
    });

    // Observer para la sección story
    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                startStoryCounterAnimation();
            }
        });
    }, {
        threshold: [0, 0.1, 0.2, 0.3],
        rootMargin: '0px 0px -10px 0px'
    });

    // Observar las secciones
    const statsSection = document.querySelector('.stats-section');
    const storySection = document.querySelector('.story-section');
    
    if (statsSection) {
        socialObserver.observe(statsSection);
    }
    
    if (storySection) {
        storyObserver.observe(storySection);
    }
});

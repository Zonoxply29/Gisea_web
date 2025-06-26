/**
 * Animación de contadores para estadísticas de redes sociales
 * Se activa cuando la sección de estadísticas entra en el viewport
 */

document.addEventListener("DOMContentLoaded", () => {
    const duration = 2000; // Duración de la animación en ms
    
    // Estadísticas de redes sociales
    const socialStats = [
        { id: "count-tiktok", value: 123 },
        { id: "count-instagram", value: 175 },
        { id: "count-twitter", value: 98 },
    ];

    // Estadísticas de la sección story
    const storyStats = [
        { id: "count-views", value: 10 },
        { id: "count-comments", value: 230 },
        { id: "count-saves", value: 25 },
        { id: "count-shares", value: 15 },
    ];

    let socialHasAnimated = false; // Para la sección de redes sociales
    let storyHasAnimated = false; // Para la sección story

    /**
     * Anima un contador individual
     * @param {string} id - ID del elemento HTML
     * @param {number} value - Valor final del contador
     */
    function animateCounter(id, value) {
        const el = document.getElementById(id);
        if (!el) return;

        let start = 0;
        const stepTime = Math.abs(Math.floor(duration / value));
        const timer = setInterval(() => {
            start += 1;
            el.textContent = start;
            if (start >= value) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    /**
     * Inicia la animación de los contadores de redes sociales
     */
    function startSocialCounterAnimation() {
        if (socialHasAnimated) return;
        socialHasAnimated = true;
        
        socialStats.forEach(({ id, value }) => {
            animateCounter(id, value);
        });
    }

    /**
     * Inicia la animación de los contadores de la sección story
     */
    function startStoryCounterAnimation() {
        if (storyHasAnimated) return;
        storyHasAnimated = true;
        
        storyStats.forEach(({ id, value }) => {
            animateCounter(id, value);
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

/**
 * Social Embeds Handler - Manejo de TikTok e Instagram embeds
 * Funcionalidades:
 * - Carga de contenido TikTok embed
 * - Carga de contenido Instagram embed
 * - Placeholders de carga
 * - Timeouts de respaldo
 */

document.addEventListener('DOMContentLoaded', function () {
    
    /**
     * Configuración de timeouts
     */
    const CONFIG = {
        checkInterval: 200,     // Intervalo de verificación en ms
        timeout: 3000,          // Timeout de respaldo en ms
        retryAttempts: 15       // Número máximo de intentos (3000ms / 200ms)
    };

    /**
     * Manejar carga de TikTok embed
     */
    function handleTikTokEmbed() {
        const tiktokEmbed = document.querySelector('.tiktok-embed');
        const tiktokPlaceholder = document.querySelector('.tiktok-placeholder');

        if (!tiktokEmbed || !tiktokPlaceholder) {
            console.warn('TikTok embed elements not found');
            return;
        }

        let attempts = 0;
        const checkTikTokLoaded = setInterval(function () {
            attempts++;
            
            if (tiktokEmbed.offsetHeight > 0) {
                showEmbed(tiktokPlaceholder, tiktokEmbed);
                clearInterval(checkTikTokLoaded);
            } else if (attempts >= CONFIG.retryAttempts) {
                // Timeout alcanzado
                showEmbed(tiktokPlaceholder, tiktokEmbed);
                clearInterval(checkTikTokLoaded);
            }
        }, CONFIG.checkInterval);

        // Timeout de respaldo
        setTimeout(function () {
            showEmbed(tiktokPlaceholder, tiktokEmbed);
            clearInterval(checkTikTokLoaded);
        }, CONFIG.timeout);
    }

    /**
     * Manejar carga de Instagram embed
     */
    function handleInstagramEmbed() {
        const instagramEmbed = document.querySelector('.instagram-media');
        const instagramPlaceholder = document.querySelector('.instagram-placeholder');

        if (!instagramEmbed || !instagramPlaceholder) {
            console.warn('Instagram embed elements not found');
            return;
        }

        let attempts = 0;
        const checkInstagramLoaded = setInterval(function () {
            attempts++;
            
            if (instagramEmbed.offsetHeight > 0) {
                showEmbed(instagramPlaceholder, instagramEmbed);
                clearInterval(checkInstagramLoaded);
            } else if (attempts >= CONFIG.retryAttempts) {
                // Timeout alcanzado
                showEmbed(instagramPlaceholder, instagramEmbed);
                clearInterval(checkInstagramLoaded);
            }
        }, CONFIG.checkInterval);

        // Timeout de respaldo
        setTimeout(function () {
            showEmbed(instagramPlaceholder, instagramEmbed);
            clearInterval(checkInstagramLoaded);
        }, CONFIG.timeout);
    }

    /**
     * Mostrar embed y ocultar placeholder
     * @param {HTMLElement} placeholder - Elemento placeholder
     * @param {HTMLElement} embed - Elemento embed
     */
    function showEmbed(placeholder, embed) {
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        if (embed) {
            embed.style.display = 'block';
        }
    }

    /**
     * Inicializar todos los embeds
     */
    function initSocialEmbeds() {
        handleTikTokEmbed();
        handleInstagramEmbed();
    }

    // Inicializar embeds
    initSocialEmbeds();

    // Reinicializar embeds si es necesario (función utilitaria)
    window.reinitializeSocialEmbeds = initSocialEmbeds;
});

// Configuración de Plyr para los videos
document.addEventListener('DOMContentLoaded', () => {
    console.log('Iniciando Plyr...');
    
    // Configuración personalizada de Plyr
    const players = Plyr.setup('.plyr-video', {
        // Controles que queremos mostrar (SIN fullscreen)
        controls: [
            'play-large', // El gran botón de play en el centro
            'play', // Botón pequeño de play/pause
            'progress', // Barra de progreso
            'mute', // Botón de silenciar
            'volume' // Control de volumen (sin estilos personalizados)
            // NO incluimos 'fullscreen'
        ],
        
        // Configuraciones básicas para pause nativo
        clickToPlay: true, // Click en video para play/pause (NATIVO)
        hideControls: true, // Ocultar controles automáticamente
        muted: true, // Iniciar silenciado
        volume: 0.8, // Volumen por defecto
        
        // Deshabilitar explícitamente fullscreen
        fullscreen: {
            enabled: false
        }
    });
    
    console.log(`${players.length} reproductores Plyr inicializados`);
    
    // Personalizar cada reproductor si es necesario
    players.forEach((player, index) => {
        console.log(`Reproductor ${index + 1} configurado`);
        
        // Eventos personalizados
        player.on('ready', () => {
            console.log(`Reproductor ${index + 1} listo`);
        });
        
        player.on('play', () => {
            console.log(`Reproductor ${index + 1} reproduciendo`);
        });
        
        player.on('pause', () => {
            console.log(`Reproductor ${index + 1} pausado`);
        });
        
        player.on('ended', () => {
            console.log(`Reproductor ${index + 1} terminado`);
        });
    });
});

    // Fecha objetivo del contador 
    const targetDate = new Date("2025-11-28T14:00:00").getTime();

    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdown);
            document.getElementById("countdown").innerHTML = "The event has started!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerHTML = String(days).padStart(2, '0');
        document.getElementById("hours").innerHTML = String(hours).padStart(2, '0');
        document.getElementById("minutes").innerHTML = String(minutes).padStart(2, '0');
        document.getElementById("seconds").innerHTML = String(seconds).padStart(2, '0');
    }, 1000);

/// para el boton de copiar datos bancarios
function copiarDatosBancarios() {
    // Obtiene el texto de todos los <p> dentro del div
    const datos = Array.from(document.querySelectorAll('#datos-bancarios p'))
        .map(p => p.textContent)
        .join('\n');
    // Copia al portapapeles
    navigator.clipboard.writeText(datos).then(function() {
        alert('¡Datos copiados al portapapeles!');
    }, function() {
        alert('No se pudo copiar. Intenta manualmente.');
    });
}

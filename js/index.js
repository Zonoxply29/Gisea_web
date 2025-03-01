// Agrega un evento de clic al botón con el id 'languageButton'
document.getElementById('languageButton').addEventListener('click', function() {
    // Obtiene el icono del dropdown y el menú desplegable
    let dropdownIcon = document.getElementById('dropdownIcon');
    let languageDropdown = document.getElementById('languageDropdown');
    
    // Alterna la visibilidad del menú desplegable
    languageDropdown.classList.toggle('show');
    
    // Alterna la rotación del icono entre 180 grados y 0 grados
    if (dropdownIcon.classList.contains('rotate-180')) {
        dropdownIcon.classList.remove('rotate-180');
        dropdownIcon.classList.add('rotate-0');
    } else {
        dropdownIcon.classList.remove('rotate-0');
        dropdownIcon.classList.add('rotate-180');
    }
});

// Agrega un evento de clic a cada opción del menú desplegable
document.querySelectorAll('#languageDropdown a').forEach(function(element) {
    element.addEventListener('click', function (event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace

        // Obtén el idioma seleccionado y la bandera correspondiente
        let selectedLang = this.getAttribute('data-lang');
        let flagSrc = this.getAttribute('data-flag');

        // Actualiza el texto del idioma seleccionado
        document.getElementById('selectedLanguage').textContent = selectedLang;

        // Cambia la imagen de la bandera
        document.getElementById('languageIcon').src = flagSrc;

        // Oculta el menú desplegable
        document.getElementById('languageDropdown').classList.remove('show');

        // Restablece la rotación del icono a 0 grados
        let dropdownIcon = document.getElementById('dropdownIcon');
        dropdownIcon.classList.remove('rotate-180');
        dropdownIcon.classList.add('rotate-0');
    });
});

// Cierra el menú si se hace clic fuera de él
window.onclick = function(event) {
    if (!event.target.matches('#languageButton') && !event.target.matches('#languageButton *')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                // Restablece la rotación del icono a 0 grados
                let dropdownIcon = document.getElementById('dropdownIcon');
                dropdownIcon.classList.remove('rotate-180');
                dropdownIcon.classList.add('rotate-0');
            }
        }
    }
}

//ANIMACION DE CERRAR Y ABRIR DE EL MENU DE HAMBURGESA
document.getElementById('navbar-toggler').addEventListener('click', function() {
    const hamburgerIcon = document.querySelector('.icon-hamburger');
    const closeIcon = document.querySelector('.icon-close');
    
    hamburgerIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
});

////////////////////////////////////////////////////////////////////////////////!

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', () => changeContent(card));
        card.addEventListener('mouseleave', () => resetContent(card));
    });
});

///Animacion de Btn Services con hover para cambio de texto y icono

function changeContent(card) {
        const title = card.querySelector('.card-title');
        const icon = card.querySelector('.icon-background');
    
        if (title.innerText === 'Desarrollo Web') {
            title.dataset.originalText = 'Desarrollo Web';
            title.innerText = 'Mas Informacion';
            icon.classList.replace('fa-desktop', 'fa-arrow-right');
        } else if (title.innerText === 'Recursos Humanos') {
            title.dataset.originalText = 'Recursos Humanos';
            title.innerText = 'Mas Informacion';
            icon.classList.replace('fa-users', 'fa-arrow-right');
        } else if (title.innerText === 'Capacitación IT') {
            title.dataset.originalText = 'Capacitación IT';
            title.innerText = 'Mas Informacion';
            icon.classList.replace('fa-chalkboard-user', 'fa-arrow-right');
        }
    }

    function resetContent(card) {
        const title = card.querySelector('.card-title');
        const icon = card.querySelector('.icon-background');
    
        if (title.innerText === 'Mas Informacion' && title.dataset.originalText === 'Desarrollo Web') {
            title.innerText = 'Desarrollo Web';
            icon.classList.replace('fa-arrow-right', 'fa-desktop');
        } else if (title.innerText === 'Mas Informacion' && title.dataset.originalText === 'Recursos Humanos') {
            title.innerText = 'Recursos Humanos';
            icon.classList.replace('fa-arrow-right', 'fa-users');
        } else if (title.innerText === 'Mas Informacion' && title.dataset.originalText === 'Capacitación IT') {
            title.innerText = 'Capacitación IT';
            icon.classList.replace('fa-arrow-right', 'fa-chalkboard-user');
        }
    }

// Tooltip para cards
function showTooltip(card) {
    // Remueve la clase 'selected' de todas las tarjetas
    document.querySelectorAll('.tech-card').forEach(function(el) {
        el.classList.remove('selected');
    });

    // Añade la clase 'selected' a la tarjeta seleccionada
    card.classList.add('selected');
}

// Evento para detectar clic fuera de las tarjetas
document.addEventListener('click', function(event) {
    const isClickInside = event.target.closest('.tech-card');

    if (!isClickInside) {
        // Remueve la clase 'selected' de todas las tarjetas si el clic es fuera de una tarjeta
        document.querySelectorAll('.tech-card').forEach(function(el) {
            el.classList.remove('selected');
        });
    }
});

/// Tooltip de Service Desarollo Web
document.addEventListener('DOMContentLoaded', function () {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

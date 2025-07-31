document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("toggle-dark-mode");
    const moonIcon = document.getElementById("moon-icon");
    const sunIcon = document.getElementById("sun-icon");

    if (!toggle || !moonIcon || !sunIcon) {
        console.error("Elementos no encontrados");
        return;
    }

    // Cargar tema desde localStorage
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    // Aplicar tema inicial
    function setInitialTheme() {
        if (isDark) {
            document.body.classList.add("dark-mode");
            moonIcon.style.display = "none";
            sunIcon.style.display = "inline";
        } else {
            document.body.classList.remove("dark-mode");
            moonIcon.style.display = "inline";
            sunIcon.style.display = "none";
        }
    }

    setInitialTheme();

    // Evento click
    toggle.addEventListener("click", () => {
        const nowDark = !document.body.classList.contains("dark-mode");
        
        // Alternar clase
        document.body.classList.toggle("dark-mode");
        
        // Cambiar iconos
        if (nowDark) {
            moonIcon.style.display = "none";
            sunIcon.style.display = "inline";
        } else {
            moonIcon.style.display = "inline";
            sunIcon.style.display = "none";
        }
        
        // Guardar preferencia
        localStorage.setItem("theme", nowDark ? "dark" : "light");
    });
});
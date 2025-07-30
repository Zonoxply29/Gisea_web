document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle-dark-mode");
  const icon = document.getElementById("icon-theme");

  function updateIcon(isDark) {
    if (!icon) return;

    icon.classList.remove("fa-moon", "fa-sun");

    if (isDark) {
      icon.classList.add("fa-sun");
    } else {
      icon.classList.add("fa-moon");
    }
  }

  // Cargar tema desde localStorage
  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  if (isDark) {
    document.body.classList.add("dark-mode");
  }

  updateIcon(isDark);

  // Evento al presionar botón
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const nowDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("theme", nowDark ? "dark" : "light");
      updateIcon(nowDark);
    });
  }
});



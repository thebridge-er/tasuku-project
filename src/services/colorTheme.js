
export function initializeColorTheme() {
  const styleButton = document.getElementById("style-mode");
  if (!styleButton) return;

  toggleThemeIcons(); // Inicializamos iconos al cargar

  styleButton.addEventListener("click", () => {
    // Cambiamos el tema
    document.documentElement.dataset.theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light";

    // Alternamos iconos
    toggleThemeIcons();
  });
}

function toggleThemeIcons() {
  const root = document.documentElement;
  const iconMoon = document.getElementById("icon-moon");
  const iconSun = document.getElementById("icon-sun");

  if (!iconMoon || !iconSun) return;

  // Mostrar solo el icono correspondiente al tema actual
  iconMoon.style.display = root.dataset.theme === "light" ? "block" : "none";
  iconSun.style.display = root.dataset.theme === "dark" ? "block" : "none";
}
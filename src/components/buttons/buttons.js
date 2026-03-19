// =========================
// BUTTONS.JS
// Custom element dinámico con :before para icon
// =========================

class UIButton extends HTMLElement {

  connectedCallback() {

    let text = this.getAttribute("text") || "";

    let icon = this.getAttribute("icon");
    const iconLeft = this.getAttribute("icon-left");
    const iconRight = this.getAttribute("icon-right");

    const isCircle = this.hasAttribute("circle");
    const isDarkMode = this.hasAttribute("dark-mode");

    const id = this.getAttribute("id") || "";

    let leftHTML = "";
    let rightHTML = "";
    let textHTML = text;

    // ======================
    // ICONO AUTOMÁTICO DARK/LIGHT
    // ======================

    if (id === "style-mode") {
      if (isDarkMode) {
        icon = "../../assets/icons/icono-sol.svg";
      } else {
        icon = "../../assets/icons/icono-luna.svg";
      }
    }

    // ===== ICON ONLY =====

    if (icon) {
      // Usamos :before vía variable CSS
      this.style.setProperty('--icon-url', `url(${icon})`);
      textHTML = "";  // Si solo icono, sin texto
      leftHTML = "";  // No img directo
      rightHTML = "";
    }

    // ===== ICON LEFT =====

    if (iconLeft) {
      leftHTML = `<img src="${iconLeft}" alt="">`;
    }

    // ===== ICON RIGHT =====

    if (iconRight) {
      rightHTML = `<img src="${iconRight}" alt="">`;
    }

    // ===== CIRCLE BUTTON =====

    if (isCircle) {
      textHTML = "";
    }

    // ===== RENDER =====

    this.innerHTML = `
      ${leftHTML}
      ${textHTML}
      ${rightHTML}
    `;
  }

}

customElements.define("ui-button", UIButton);
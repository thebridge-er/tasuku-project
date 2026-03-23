/* // =========================
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

customElements.define("ui-button", UIButton); */

// =========================
// BUTTONS.JS
// =========================

const BASE_URL = new URL("./", import.meta.url).href;

class UIButton extends HTMLElement {

  // Observar cambios en estos atributos para re-renderizar
  static get observedAttributes() {
    return ["text", "icon", "icon-left", "icon-right", "circle", "dark-mode"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const text     = this.getAttribute("text") || "";
    const isCircle = this.hasAttribute("circle");
    const isDarkMode = this.hasAttribute("dark-mode");

    let icon       = this.getAttribute("icon");
    let iconLeft   = this.getAttribute("icon-left");
    let iconRight  = this.getAttribute("icon-right");

    // ======================
    // RUTAS ABSOLUTAS
    // ======================
    if (icon)      icon      = new URL(icon, BASE_URL).href;
    if (iconLeft)  iconLeft  = new URL(iconLeft, BASE_URL).href;
    if (iconRight) iconRight = new URL(iconRight, BASE_URL).href;

    // ======================
    // DARK/LIGHT MODE TOGGLE
    // ======================
    if (this.id === "style-mode") {
      icon = isDarkMode
        ? new URL("../../assets/icons/icono-sol.svg", BASE_URL).href
        : new URL("../../assets/icons/icono-luna.svg", BASE_URL).href;
    }

    // ======================
    // BUILD HTML
    // ======================
    let leftHTML  = iconLeft  ? `<img src="${iconLeft}" alt="">` : "";
    let rightHTML = iconRight ? `<img src="${iconRight}" alt="">` : "";
    let textHTML  = (isCircle || icon) ? "" : text;

    if (icon) {
      this.style.setProperty("--icon-url", `url(${icon})`);
    }

    this.innerHTML = `
      ${leftHTML}
      ${textHTML}
      ${rightHTML}
    `;
  }
}

customElements.define("ui-button", UIButton);
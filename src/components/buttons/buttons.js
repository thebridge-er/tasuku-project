const template = document.createElement("template");

template.innerHTML = `
  <link rel="stylesheet" href="components/button/button.css">
  <button class="btn">
    <img class="icon left">
    <span class="text"></span>
    <img class="icon right">
  </button>
`;

class UIButton extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode(true));

    const btn = shadow.querySelector(".btn");
    const text = shadow.querySelector(".text");
    const leftIcon = shadow.querySelector(".left");
    const rightIcon = shadow.querySelector(".right");

    // ===== TEXT =====
    const label = this.getAttribute("text");
    if (label) {
      text.textContent = label;
    } else {
      text.remove();
    }

    // ===== VARIANT =====
    const variant = this.getAttribute("variant");
    if (variant) {
      btn.classList.add(`btn-${variant}`);
    }

    // ===== ICON LEFT =====
    const iconLeft = this.getAttribute("icon-left");
    if (iconLeft) {
      leftIcon.src = iconLeft;
      btn.classList.add("btn-icon-left");
    } else {
      leftIcon.remove();
    }

    // ===== ICON RIGHT =====
    const iconRight = this.getAttribute("icon-right");
    if (iconRight) {
      rightIcon.src = iconRight;
      btn.classList.add("btn-icon-right");
    } else {
      rightIcon.remove();
    }

    // ===== ICON ONLY =====
    const icon = this.getAttribute("icon");
    if (icon) {
      leftIcon.src = icon;
      rightIcon.remove();
      text.remove();
      btn.classList.add("btn-icon");
    }

    // ===== CIRCLE =====
    if (this.hasAttribute("circle")) {
      btn.classList.add("btn-circle");
    }

    // ===== DARK / LIGHT MODE =====
    if (this.hasAttribute("dark-mode")) {
      btn.classList.add("btn-dark-mode");
    }
    if (this.hasAttribute("light-mode")) {
      btn.classList.add("btn-light-mode");
    }
  }
}

customElements.define("ui-button", UIButton);
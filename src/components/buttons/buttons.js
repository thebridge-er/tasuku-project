// =========================
// BUTTONS.JS
// Custom element dinámico
// =========================

class UIButton extends HTMLElement {

  connectedCallback() {

    const text = this.getAttribute("text") || "";

    const icon = this.getAttribute("icon");
    const iconLeft = this.getAttribute("icon-left");
    const iconRight = this.getAttribute("icon-right");

    const isCircle = this.hasAttribute("circle");


    let leftHTML = "";
    let rightHTML = "";
    let textHTML = text;


    // ===== ICON ONLY =====

    if (icon) {

      leftHTML = `<img src="${icon}" alt="">`;
      textHTML = "";
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
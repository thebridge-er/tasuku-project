// =========================
// UI INPUTS
// =========================

function initInputs() {

  const inputs = document.querySelectorAll("ui-input");

  inputs.forEach(input => {

    const type = input.getAttribute("type") || "text";
    const label = input.getAttribute("label") || "";
    const placeholder = input.getAttribute("placeholder") || "";

    input.innerHTML = `
      <div class="ui-input">

        ${label ? `<label class="ui-input__label">${label}</label>` : ""}

        <input
          class="ui-input__field"
          type="${type}"
          placeholder="${placeholder}"
        >

      </div>
    `;

  });

}


// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {

  initInputs();

});
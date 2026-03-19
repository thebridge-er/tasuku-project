// =========================
// COMPONENTS.JS
// Inicializador de componentes
// =========================


// ===== BUTTONS =====

function loadButtons() {
  import("./buttons.js");
}


// ===== CARDS =====

function loadCards() {
  import("./cards.js");
}


// ===== INPUTS =====

function loadInputs() {
  import("./inputs.js");
}


// ===== INIT =====

function loadComponents() {
  loadButtons();
  loadCards();
  loadInputs();
}


// ejecutar al cargar

document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
});
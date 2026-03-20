const BASE_URL = new URL("./../components/", import.meta.url).href;


function loadButtons() {
  import(`${BASE_URL}buttons/buttons.js`);
}

function loadCards() {
  import(`${BASE_URL}cards/cards.js`);
}

function loadInputs() {
  import(`${BASE_URL}inputs/inputs.js`);
}

function loadComponents() {
  loadButtons();
  loadCards();
  loadInputs();
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponents();
});
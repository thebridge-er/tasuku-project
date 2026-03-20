//IMPORTS//
/* import {
  initCalendar,
  loginGoogle,
  createEvent,
  getEventsThisWeek
} from "./services/calendarService.js"; */

import { loadLanguage } from "./services/translation.js";
import { initializeColorTheme } from "./services/colorTheme.js";
import StorageManager from "./infraestructure/storageManager.js";

const db = StorageManager.load();

console.log(db);

async function initGoogleCalendar() {
  await initCalendar();
  await initGoogleIdentity();
  console.log("Google Calendar ready");
}

/*
Dependiendo de lo seleccionado en el select 
que llame a la funcion 

loadLanguage(valor del option)
*/

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang");

  if (langSelect) {
    langSelect.addEventListener("change", (e) => {
      const selectedLang = e.target.value;

      localStorage.setItem("lang", selectedLang);
      loadLanguage(selectedLang);
      initializeColorTheme();
        initGoogleCalendar(); 
    });
  }
});


document.addEventListener("DOMContentLoaded", startApp);
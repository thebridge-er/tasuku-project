//IMPORTS//
import {
  initCalendar,
  loginGoogle,
  createEvent,
  getEventsThisWeek
} from "./services/calendarService.js";

import { loadLanguage } from "./services/translation.js";
import { initializeColorTheme } from "./services/colorTheme.js";
import StorageManager from "./infraestructure/storageManager.js";
import { loadHeader } from "./services/headerLoader.js";

const db = StorageManager.load();

console.log(db);

async function initGoogleCalendar() {
  infraestructure
  await initCalendar();
  await initGoogleIdentity();
  console.log("Google Calendar ready");
}

/*
Dependiendo de lo seleccionado en el select 
que llame a la funcion 

loadLanguage(valor del option)
*/


async function startApp() {
  console.log("kajsgdiugsjagju")
  await loadHeader()

  const selectLang = document.getElementById("lang");

  if (selectLang) {
    selectLang.addEventListener("change", (event) => {
      const selectedLang = event.target.value;
      loadLanguage(selectedLang);
    });
  }

  loadLanguage("es");
  initializeColorTheme();
}

document.addEventListener("DOMContentLoaded", startApp);
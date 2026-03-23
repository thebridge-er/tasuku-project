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
import { loadHeader } from "./services/headerLoader.js";

const db = StorageManager.load();

console.log(db);

async function initGoogleCalendar() {
  infraestructure
  await initCalendar();
  await initGoogleIdentity();
  console.log("Google Calendar ready");
}

function initLangSelector() {
  const select = document.getElementById("lang");
  if (!select) return;

  // Recuperar idioma guardado o usar "en" por defecto
  const savedLang = localStorage.getItem("tasukuLang") || "en";
  select.value = savedLang;
  loadLanguage(savedLang);

  select.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("tasukuLang", lang);
    loadLanguage(lang);
  });
}


async function startApp() {
  await loadHeader();
  initLangSelector();
  initializeColorTheme();
}

document.addEventListener("DOMContentLoaded", startApp);
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

const db = StorageManager.load();

console.log(db);

async function initGoogleCalendar() {
  await initCalendar();
  await initGoogleIdentity();
  console.log("Google Calendar ready");
}

function startApp() {
  function initLanguageSwitcher(){
  const langBtn = document.getElementById("lang-btn")
  if(!langBtn) return
  const langs = ["es", "eus", "en"]
  let current = 0
  langBtn.addEventListener("click", () => {
    current = (current + 1) % langs.length
    const lang = langs[current]
    localStorage.setItem("lang", lang)
    loadLanguage(lang)
  })

}
  const savedLang = localStorage.getItem("lang") || "eus"
  loadLanguage(savedLang)
  initLanguageSwitcher()
  initializeColorTheme();
  initGoogleCalendar();
  initStartButton();
}


document.addEventListener("DOMContentLoaded", startApp);

function initStartButton(){

  const startBtn = document.querySelector("[data-translation='start']")

  if(!startBtn) return

  startBtn.addEventListener("click", () => {

    // 🔥 activar modo registro
    localStorage.setItem("modoRegistro", "registro")

    // 🔥 ir a auth
    window.location.href = "./pages/auth/auth.html"

  })

}
window.irLogin = function(){
  window.location.href = "./pages/auth/auth.html"
}
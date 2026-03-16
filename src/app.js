//IMPORTS//
import {
  initCalendar,
  loginGoogle,
  createEvent,
  getEventsThisWeek
} from "./services/calendarService.js";

import { loadLanguage } from "./services/translation.js";
import { initializeColorTheme } from "./services/colorTheme.js";


async function initGoogleCalendar() {
  await initCalendar();
  await initGoogleIdentity();
  console.log("Google Calendar ready");
}

function startApp() {
  loadLanguage("eus");
  initializeColorTheme();
  initGoogleCalendar();
}

document.addEventListener("DOMContentLoaded", startApp);
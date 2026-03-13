//IMPORTS//
import {
  initCalendar,
  loginGoogle,
  createEvent,
  getEventsThisWeek
} from "./services/calendarService.js";

async function initGoogleCalendar() {

  await initCalendar();

  await loginGoogle();

  console.log("Google Calendar ready");

}
//APP CONTROLLER//

//EVENT HANDLERS//

//START APP//
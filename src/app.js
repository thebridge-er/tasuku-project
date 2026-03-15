/* //IMPORTS//
import {
  initCalendar,
  loginGoogle,
  createEvent,
  getEventsThisWeek
} from "./services/calendarService.js";

 */

async function initGoogleCalendar() {

  await initCalendar();

  await initGoogleIdentity();

  console.log("Google Calendar ready");

}

const toggleTheme = () => {
  const root = document.documentElement
  console.log(root.dataset.theme);
  if (root.dataset.theme === "light") {
    root.dataset.theme = "dark"
    console.log("Dark mode activated")
  } else {
    root.dataset.theme = "light"
    console.log("Lightmode activated")

  }
}

let styleButton = document.getElementById("style-mode");
styleButton.addEventListener("click", toggleTheme);



//APP CONTROLLER//

//EVENT HANDLERS//

//START APP//
startApp(console.log("Starting app..."));
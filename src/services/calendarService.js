/*Definir las constantes de la conf*/
const CLIENT_ID = 'CLIENT_ID';
const API_KEY = 'TU_API_KEY';

const DISCOVERY_DOC =
'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES =
'https://www.googleapis.com/auth/calendar.readonly';

/*AÑADIR TODAS LAS FUNCIONES*/

export async function initCalendar() {
/*promesa porque Google carga api forma asincrona*/
  return new Promise((resolve) => {

    gapi.load("client:auth2", async () => {

      /*inicializar cliente google*/
      await gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: [DISCOVERY_DOC],
        scope: SCOPES
      });

      resolve();

    });

  });

}

export async function loginGoogle(){
  try {
  const authInstance = gapi.auth2.getAuthInstance();
  await authInstance.signIn();
  console.log('login correcto')

}catch (error){
  console.error('Error en login Google',error)
}

}

export async function createEvent(task){
  try{
  const event ={

    summary:task.name,
    description:'Asignado a ' + task.user,

    start: {
      dateTime: task.start,
      timeZone: 'Europe/Madrid'
    },

    end: {
      dateTime: task.end,
      timeZone: 'Europe/Madrid'
    }

  };
  const response = await gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event
  });
  return response;

  } catch (error) {
  console.error('Error creando evento', error);

  }
}

export async function getEventsThisWeek() {
  const now = new Date()
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate()+7);

  const response = await gapi.client.calendar.events.list({
    calendarId: "primary",
    timeMin: now.toISOString(),
    timeMax: nextWeek.toISOString(),
    showDeleted: false,
    singleEvents: true,
    orderBy: "startTime"
  });
  return response.result.items;
}

/*

#### Ejemplo import para funcion crear evento ###

const task ={
name: 'limpiar cocina'
user: 'Ana'
start: "2026-04-10T10:00:00",
end: "2026-04-10T11:00:00"
};
await createEvent(task)



##### En index.html añadir ####

<head>
  <script src="https://apis.google.com/js/api.js"></script>
  <script type="module" src="./src/app.js"></script>
</head> 


##### En el app.js incluir el codigo siguiente para preparar la API ###

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

##### flujo de la aplicacion #######
            startApp()
              ↓
            initCalendar()
              ↓
            loginGoogle()
              ↓
            createEvent()
              ↓
            getEventsThisWeek()
              ↓
            console.log eventos
*/
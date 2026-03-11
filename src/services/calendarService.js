/*Definir las constantes de la conf*/
const CLIENT_ID = 'CLIENT_ID';
const API_KEY = 'TU_API_KEY';

const DISCOVERY_DOC =
'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES =
'https://www.googleapis.com/auth/calendar.readonly';

/*funcion inicializacion*/
const CLIENT_ID = "TU_CLIENT_ID";
const API_KEY = "TU_API_KEY";

const DISCOVERY_DOC =
"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const SCOPES =
"https://www.googleapis.com/auth/calendar.readonly";

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

}/*En index.html añadir ==>

<head>
  <script src="https://apis.google.com/js/api.js"></script>
  <script type="module" src="./src/app.js"></script>
</head> */

/*En el app.js incluir el codigo siguiente para preparar la API ==>

import { initCalendar } from "./services/calendarService.js";

await initCalendar();*/
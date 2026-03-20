import StorageManager from "/src/infraestructure/storageManager.js"

document.addEventListener("DOMContentLoaded", init)

import {
  initCalendar,
  loginGoogle,
  createEvent,
  initGoogleIdentity,
} from "/src/services/calendarService.js"


/* =========================
   INIT
========================= */

async function init() {

  activarSesionDemo()
  cargarPerfil()
  initEventos()
  cargarUsuariosSelect()

  try {
    await initCalendar()
  } catch {
    console.warn("Google API no disponible")
  }
}
function getSesion() {
  const db = StorageManager.load()

  const usuario = db.users.find(u => u.session)
  const espacio = db.spaces.find(s => s.session)

  return { usuario, espacio, db }
}
/* =========================
  AUXILIARES
========================= */
function activarSesionDemo() {
  const db = StorageManager.load()

  db.users[0].session = true
  db.spaces[0].session = true

  StorageManager.save(db)
}
function getUserName(userId) {
  const db = StorageManager.load()
  const user = db.users.find(u => u.id === userId)
  return user ? user.name : "?"
}
function cargarUsuariosSelect() {
  const select = document.getElementById("userSelect")
  if (!select) return 

  const db = StorageManager.load()
  const espacio = db.spaces.find(s => s.session)

  if (!espacio) return

  select.innerHTML = espacio.members.map(userId => {
    const user = db.users.find(u => u.id === userId)
    return `<option value="${user.id}">${user.name}</option>`
  }).join("")
}
/* =========================
   PERFIL
========================= */
function cargarPerfil() {
  const { usuario } = getSesion()

  if (!usuario) return

  renderPerfil(usuario)
}
function renderPerfil(usuario) {
  document.getElementById("perfilNombre").textContent = usuario.name
  document.getElementById("perfilCorreo").textContent = usuario.email

  document.getElementById("perfilAvatar").src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name
}

/* =========================
   ESPACIO
========================= */

function cargarEspacio() {
  const { usuario, espacio } = getSesion()

  if (!espacio) return

  document.getElementById("spaceName").innerText = espacio.name

  document.getElementById("spaceMembers").innerText =
    espacio.members.length + " miembros"

  document.getElementById("spaceUserName").innerText = usuario.name
}



/* =========================
   TAREAS
========================= */

function cargarTareas() {
  const { usuario, espacio, db } = getSesion()

  if (!espacio || !usuario) return

  const tareasEspacio = db.tasks.filter(t =>
    t.spaceId === espacio.id
  )

  const misTareas = tareasEspacio.filter(t =>
    t.assignedTo === usuario.id
  )

  renderTareas(misTareas, tareasEspacio)
}
function crearTarea() {
  const input = document.getElementById("taskInput")
  const titulo = input.value.trim()

  const userSelect = document.getElementById("userSelect")
  const assignedTo = parseInt(userSelect.value)

  if (!titulo) return

  const db = StorageManager.load()
  const espacio = db.spaces.find(s => s.session)

  if (!espacio) return

 const nuevaTarea = {
  id: crypto.randomUUID(),
  title: titulo,
  status: "todo",
  assignedTo: assignedTo, 
  spaceId: espacio.id,
  dueDate: new Date().toISOString().split("T")[0], // 
  synced: false // para usar la api y que no se dupliquen eventos
}

  db.tasks.push(nuevaTarea)

  StorageManager.save(db)

  input.value = ""

  cargarTareas()
  renderCalendario() 
}
function initEventos() {
  const btn = document.getElementById("addTaskBtn")
  if (btn) btn.addEventListener("click", crearTarea)

  const syncBtn = document.getElementById("syncCalendarBtn")
  if (syncBtn) {
    syncBtn.addEventListener("click", syncCalendar)
  }
}
function renderTareas(misTareas, tareasEspacio) {
  
  const container = document.querySelector(".tasks-card")

  if (!container) return

  container.innerHTML = `
    <h3>✔ Tareas</h3>

    <div class="task-create">
      <input type="text" id="taskInput" placeholder="Nueva tarea..." />
      <select id="userSelect"></select> 
      <button id="addTaskBtn" class="main-btn">Añadir</button>
    </div>

    <h4>👤 Tus tareas</h4>
    ${misTareas.length === 0 
      ? "<p>No tienes tareas</p>" 
      : misTareas.map(t => `
        <div class="task-item ${t.status === "done" ? "done" : ""}">
          <span>${t.title}</span>
          <button onclick="toggleTarea('${t.id}')">
            ${t.status === "done" ? "✅" : "✔"}
          </button>
        </div>
      `).join("")
    }

    <h4>👥 Tareas del espacio</h4>
    ${tareasEspacio.length === 0 
      ? "<p>No hay tareas</p>" 
      : tareasEspacio.map(t => `
        <div class="task-item ${t.status === "done" ? "done" : ""}">
          <span>${t.title}</span>
          <small>👤 ${getUserName(t.assignedTo)}</small>
          <button onclick="toggleTarea('${t.id}')">
            ${t.status === "done" ? "✅" : "✔"}
          </button>
        </div>
      `).join("")
    }
  `

  // 👇 REACTIVAR EVENTO (IMPORTANTE)
  cargarUsuariosSelect()
  initEventos()
}
//Calendario
function renderCalendario() {
  const { espacio, db } = getSesion()

  if (!espacio) return

  const container = document.getElementById("calendar")
  if (!container) return

  const tareas = db.tasks.filter(t => t.spaceId === espacio.id)

  // agrupar por fecha
  const tareasPorFecha = {}

  tareas.forEach(t => {
    if (!tareasPorFecha[t.dueDate]) {
      tareasPorFecha[t.dueDate] = []
    }
    tareasPorFecha[t.dueDate].push(t)
  })

  container.innerHTML = Object.keys(tareasPorFecha).map(fecha => `
    <div class="calendar-day">
      <strong>${fecha}</strong>

      ${tareasPorFecha[fecha].map(t => `
        <div class="calendar-task ${t.status === "done" ? "done" : ""}">
          ${t.title} (${getUserName(t.assignedTo)})
        </div>
      `).join("")}
    </div>
  `).join("")
}


/* =========================
   ACCIONES TAREAS
========================= */

window.toggleTarea = function (taskId) {
  const db = StorageManager.load()

  const tarea = db.tasks.find(t => t.id == taskId)

  if (!tarea) return

  tarea.status = tarea.status === "done" ? "todo" : "done"

  StorageManager.save(db)

  cargarTareas()
}

/* =========================
   DATOS DEMO (para probar)
========================= */

window.crearTareasDemo = function () {
  const db = StorageManager.load()

  const espacio = db.spaces.find(
    s => s.id === db.session?.spaceId
  )

  if (!espacio) return

  const nuevas = [
    {
      id: crypto.randomUUID(),
      title: "Limpiar cocina",
      status: "todo" 
    },
    {
      id: crypto.randomUUID(),
      title: "Bajar basura",
      status: "todo"
    },
    {
      id: crypto.randomUUID(),
      title: "Limpiar baño",
      status: "todo" 
    }
  ]

  nuevas.forEach(t => {
  t.spaceId = espacio.id
  db.tasks.push(t)
})

  StorageManager.save(db)

  cargarTareas()
}
async function syncCalendar() {

  try {

    const { db, espacio } = getSesion()

    const tareas = db.tasks.filter(t => t.spaceId === espacio.id)

    for (const t of tareas) {

      if (t.synced === true) continue

      // 👇 SIMULACIÓN
      console.log("Simulando envío a Google:", t.title)

      t.synced = true
    }

    StorageManager.save(db)

    alert("✅ Tareas sincronizadas (modo demo)")

  } catch (error) {
    console.error(error)
    alert("❌ Error en sync")
  }
}

/* =========================
   CAMBIO DE VISTA
========================= */

window.irDashboard = function () {
  document.getElementById("perfil").style.display = "none"
  document.getElementById("espacio").style.display = "block"

  // 👇 cargar aquí
  cargarEspacio()
  cargarTareas()
  renderCalendario()
}


/* =========================
  flujo 
========================= */
  /*
            init()
            ↓
            cargarDatos()
            ↓
            render()
            ↓
            evento (click)
            ↓
            cambiar estado
            ↓
            guardar
            ↓
            volver a render
*/
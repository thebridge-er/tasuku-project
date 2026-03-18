import StorageManager from "/src/infraestructure/storageManager.js"

document.addEventListener("DOMContentLoaded", init)

/* =========================
   INIT
========================= */

function init() {
  cargarPerfil()
  cargarEspacio()
  cargarTareas()
  initEventos()
}

/* =========================
   PERFIL
========================= */

function cargarPerfil() {
  const db = StorageManager.load()
  const usuario = db.session?.user

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
  const db = StorageManager.load()

  const espacio = db.spaces.find(
    s => s.id === db.session?.spaceId
  )

  if (!espacio) return

  renderEspacio(espacio)
}

function renderEspacio(espacio) {
  document.getElementById("spaceName").innerText = espacio.nombre

  document.getElementById("spaceMembers").innerText =
    espacio.miembros.length + " miembros"

  const db = StorageManager.load()
  const usuario = db.session?.user

  document.getElementById("spaceUserName").innerText = usuario.name

  document.getElementById("spaceAvatar").src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name
}

/* =========================
   TAREAS
========================= */

function cargarTareas() {
  const db = StorageManager.load()

  const espacio = db.spaces.find(
    s => s.id === db.session?.spaceId
  )

  if (!espacio) return

  const tareas = db.tasks.filter(t =>
    espacio.tasks.includes(t.id)
  )

  renderTareas(tareas)
}
function crearTarea() {
  const input = document.getElementById("taskInput")
  const titulo = input.value.trim()

  if (!titulo) return

  const db = StorageManager.load()

  const espacio = db.spaces.find(
    s => s.id === db.session?.spaceId
  )

  const nuevaTarea = {
    id: crypto.randomUUID(),
    title: titulo,
    completed: false
  }

  db.tasks.push(nuevaTarea)
  espacio.tasks.push(nuevaTarea.id)

  StorageManager.save(db)

  input.value = ""

  cargarTareas()
}
function initEventos() {
  const btn = document.getElementById("addTaskBtn")

  if (btn) {
    btn.addEventListener("click", crearTarea)
  }
}
function renderTareas(tareas) {
  const container = document.querySelector(".tasks-card")

  if (tareas.length === 0) {
    container.innerHTML = `
      <h3>✔ Tareas</h3>
      <p>Sin tareas todavía</p>
      <button class="main-btn" onclick="crearTareasDemo()">
        Añadir tareas de ejemplo
      </button>
    `
    return
  }

  container.innerHTML = `
    <h3>✔ Tareas</h3>
    ${tareas.map(t => `
      <div class="task-item">
        <span>${t.title}</span>
        <button onclick="toggleTarea('${t.id}')">
          ${t.completed ? "✅" : "✔"}
        </button>
      </div>
    `).join("")}
  `
}


/* =========================
   ACCIONES TAREAS
========================= */

window.toggleTarea = function (taskId) {
  const db = StorageManager.load()

  const tarea = db.tasks.find(t => t.id === taskId)

  if (!tarea) return

  tarea.completed = !tarea.completed

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
      completed: false
    },
    {
      id: crypto.randomUUID(),
      title: "Bajar basura",
      completed: false
    },
    {
      id: crypto.randomUUID(),
      title: "Limpiar baño",
      completed: false
    }
  ]

  nuevas.forEach(t => {
    db.tasks.push(t)
    espacio.tasks.push(t.id)
  })

  StorageManager.save(db)

  cargarTareas()
}

/* =========================
   CAMBIO DE VISTA
========================= */

window.irDashboard = function () {
  document.getElementById("perfil").style.display = "none"
  document.getElementById("espacio").style.display = "block"
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
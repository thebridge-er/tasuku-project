import StorageManager from "/src/infraestructure/storageManager.js"

document.addEventListener("DOMContentLoaded", init)

/* =========================
   INIT
========================= */

function init() {
  cargarPerfil()
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

  document.getElementById("spaceName").innerText = espacio.name

  document.getElementById("spaceMembers").innerText =
    espacio.members.length + " miembros"

  const usuario = db.session?.user
  if (!usuario) return

  document.getElementById("spaceUserName").innerText = usuario.name

  document.getElementById("spaceAvatar").src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name
}



/* =========================
   TAREAS
========================= */

function cargarTareas() {
  const db = StorageManager.load()

  const espacioId = db.session?.spaceId

  if (!espacioId) return

  const tareas = db.tasks.filter(t =>
    t.spaceId === espacioId
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

  db.tasks.push(nuevaTarea)
  const nuevaTarea = {
  id: crypto.randomUUID(),
  title: titulo,
  status: "todo",
  spaceId: db.session.spaceId
}

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
    `
    return
  }

  container.innerHTML = `
    <h3>✔ Tareas</h3>
    ${tareas.map(t => `
      <div class="task-item ${t.status === "done" ? "done" : ""}">
        <span>${t.title}</span>
        <button onclick="toggleTarea('${t.id}')">
          ${t.status === "done" ? "✅" : "✔"}
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

  // 👇 cargar aquí
  cargarEspacio()
  cargarTareas()
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
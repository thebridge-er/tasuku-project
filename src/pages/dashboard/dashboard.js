import StorageManager from "/src/infraestructure/storageManager.js"

document.addEventListener("DOMContentLoaded", init)

import {
  initCalendar,
  loginGoogle,
  createEvent,
  initGoogleIdentity,
} from "/src/services/calendarService.js"


/* PERFIL */

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

/* ESPACIO  */

function cargarEspacio() {
  const { usuario, espacio } = getSesion()

  if (!espacio) return

  document.getElementById("spaceName").innerText = espacio.name

  document.getElementById("spaceMembers").innerText =
    espacio.members.length + " miembros"

  document.getElementById("spaceUserName").innerText = usuario.name
}


/* CAMBIO DE VISTA */

window.irDashboard = function () {
  document.getElementById("perfil").style.display = "none"
  document.getElementById("espacio").style.display = "block"

  // 👇 cargar aquí
  cargarEspacio()
  cargarTareas()
  renderCalendario()
}


} 

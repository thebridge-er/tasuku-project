document.addEventListener("DOMContentLoaded", cargarPerfil)

function getDB() {
    const raw = localStorage.getItem("tasukuDB")
    if (!raw) return { users: [], spaces: [], tasks: [] }
    return JSON.parse(raw)
}

function saveDB(db) {
    localStorage.setItem("tasukuDB", JSON.stringify(db))
}

function cargarPerfil() {

    const db = getDB()

    // ✅ USUARIO ACTIVO (CORRECTO)
    const usuario = db.users.find(u => u.session === true)

    if (!usuario) {
        alert("No hay usuario logueado")
        window.location.href = "../../auth/auth.html"
        return
    }

    // ✅ DATOS BÁSICOS
    document.getElementById("perfilNombre").textContent = usuario.name
    document.getElementById("perfilEmail").textContent = usuario.email

    document.getElementById("perfilAvatar").src =
        "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name

    // ✅ ESPACIOS (usar IDs)
    const espacios = db.spaces.filter(space =>
        space.members.includes(usuario.id)
    )

    document.getElementById("perfilEspacios").textContent = espacios.length

    // ✅ TAREAS (usar assignedTo)
    const tareas = db.tasks.filter(task =>
        task.assignedTo === usuario.id
    )

    document.getElementById("perfilTareas").textContent = tareas.length

    // (opcional futuro)
    document.getElementById("perfilPuntos").textContent = tareas.length * 10
}


// ======================
// ELIMINAR CUENTA
// ======================

function eliminarCuenta() {

    const confirmacion = confirm("¿Seguro que quieres eliminar tu cuenta?")
    if (!confirmacion) return

    let db = getDB()
    const usuario = db.users.find(u => u.session === true)

    if (!usuario) return

    db.users = db.users.filter(u => u.id !== usuario.id)

    db.spaces = db.spaces
        .map(space => {

            // Quitar usuario de miembros
            space.members = space.members.filter(id => id !== usuario.id)

            // 👉 Si era el owner
            if (space.ownerId === usuario.id) {

                if (space.members.length > 0) {
                    // Transferir al primer miembro
                    space.ownerId = space.members[0]
                } else {
                    // Marcar para eliminar (no hay miembros)
                    return null
                }
            }

            return space
        })
        .filter(space => space !== null)

    db.tasks = db.tasks.filter(t => t.assignedTo !== usuario.id)

    saveDB(db)

    alert("Cuenta eliminada")

    window.location.href = "../../auth/auth.html"
}


// ======================
// EDITAR NOMBRE (simple)
// ======================

function editarNombre() {

    const nuevoNombre = prompt("Introduce tu nuevo nombre")

    if (!nuevoNombre) return

    let db = getDB()
    const usuario = db.users.find(u => u.session === true)

    if (!usuario) return

    usuario.name = nuevoNombre

    saveDB(db)

    alert("Nombre actualizado")

    cargarPerfil()
}


// ======================
// EVENTOS BOTONES
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const btnDelete = document.querySelector(".btn-delete")
    const btnEdit = document.querySelector(".btn-edit")

    if (btnDelete) {
        btnDelete.addEventListener("click", eliminarCuenta)
    }

    if (btnEdit) {
        btnEdit.addEventListener("click", editarNombre)
    }

})
document.addEventListener("DOMContentLoaded", cargarPerfil)

function cargarPerfil(){
    const avatar = document.getElementById("avatar")

    if(avatar){
    avatar.src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name
}
    const usuario = JSON.parse(localStorage.getItem("usuarioActual"))
    const db = JSON.parse(localStorage.getItem("tasukuDB")) || {
        users: [],
        spaces: [],
        tasks: []
    }

    if(!usuario) return

    // DATOS BÁSICOS
    document.getElementById("perfilNombre").textContent = usuario.name
    document.getElementById("perfilEmail").textContent = usuario.email

    document.getElementById("perfilAvatar").src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name

    // CONTAR ESPACIOS
    const espacios = db.spaces.filter(space =>
        space.miembros.some(m => m.email === usuario.email)
    )

    document.getElementById("perfilEspacios").textContent = espacios.length

    // CONTAR TAREAS
    const tareas = db.tasks.filter(task =>
        task.userEmail === usuario.email
    )

    document.getElementById("perfilTareas").textContent = tareas.length
}

function eliminarCuenta(){

    const confirmacion = confirm("¿Seguro que quieres eliminar tu cuenta?")

    if(!confirmacion) return

    const usuario = JSON.parse(localStorage.getItem("usuarioActual"))
    let db = JSON.parse(localStorage.getItem("tasukuDB"))

    // ELIMINAR USUARIO DE USERS
    db.users = db.users.filter(u => u.email !== usuario.email)

    // ELIMINAR DE ESPACIOS
    db.spaces.forEach(space => {
        space.miembros = space.miembros.filter(m => m.email !== usuario.email)
    })

    // ELIMINAR TAREAS
    db.tasks = db.tasks.filter(t => t.userEmail !== usuario.email)

    // GUARDAR
    localStorage.setItem("tasukuDB", JSON.stringify(db))

    // BORRAR SESIÓN
    localStorage.removeItem("usuarioActual")

    alert("Cuenta eliminada")

    window.location.href = "../../auth/auth.html"
}
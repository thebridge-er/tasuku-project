document.addEventListener("DOMContentLoaded", init)

function init() {

    cargarPerfil()
    cargarEspacio()

}


/* PERFIL */

function cargarPerfil() {

    const usuario = JSON.parse(localStorage.getItem("usuarioActual"))

    if (!usuario) return

    document.getElementById("perfilNombre").textContent = usuario.name
    document.getElementById("perfilCorreo").textContent = usuario.email

    document.getElementById("perfilAvatar").src =
        "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name

}


/* ESPACIO  */

function cargarEspacio() {

    const espacio = JSON.parse(localStorage.getItem("espacioActual"))

    if (!espacio) return

    document.getElementById("spaceName").innerText = espacio.nombre

    document.getElementById("spaceMembers").innerText =
        espacio.miembros.length + " miembros"

    const usuario = JSON.parse(localStorage.getItem("usuarioActual"))

    document.getElementById("spaceUserName").innerText = usuario.name

    document.getElementById("spaceAvatar").src =
        "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name

}


/* CAMBIO DE VISTA */

function irDashboard() {

    document.getElementById("perfil").style.display = "none"

    document.getElementById("espacio").style.display = "block"

} 
}
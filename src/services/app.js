

function mostrarDashboard(user) {
    localStorage.setItem("usuarioActual", JSON.stringify(user))
    document.getElementById("authSection").style.display = "none"
    document.getElementById("dashboard").style.display = "flex"
    document.getElementById("welcomeName").innerText =
        "Bienvenido, " + user.name + "!"
    document.getElementById("avatar").src =
        "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user.name
}





/* =========================
    ENTRAR ESPACIO (LOCAL)
========================= */

/* function entrarEspacio(espacio) {

    db.spaces.push(espacio)
    StorageManager.save(db)
    alert("Entrando a: " + espacio.nombre)

    document.getElementById("dashboard").style.display = "none"
    document.getElementById("espacio").style.display = "block"

    document.getElementById("spaceName").innerText = espacio.nombre
    document.getElementById("spaceMembers").innerText =
        espacio.miembros.length + " miembros"

    let usuario = JSON.parse(localStorage.getItem("usuarioActual"))

    document.getElementById("spaceUserName").innerText = usuario.name
    document.getElementById("spaceAvatar").src =
        "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name
}
 */



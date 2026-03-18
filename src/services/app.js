// ======================
// LOGIN
// ======================
window.loginUser = function (email, password) {

    if (!email || !password) {
        return { ok: false, message: "Rellena todos los campos" }
    }

    let user = JSON.parse(localStorage.getItem(email))

    if (!user) {
        return { ok: false, message: "Usuario no encontrado" }
    }

    if (user.password !== password) {
        return { ok: false, message: "Contraseña incorrecta" }
    }

    localStorage.setItem("usuarioActual", JSON.stringify(user))

    return { ok: true }
}

// ======================
// REGISTRO
// ======================
window.registerUser = function (name, email, password) {

    if (!name || !email || !password) {
        return { ok: false, message: "Rellena todos los campos" }
    }

    let existe = localStorage.getItem(email)

    if (existe) {
        return { ok: false, message: "El usuario ya existe" }
    }

    let user = {
        name,
        email,
        password
    }

    localStorage.setItem(email, JSON.stringify(user))
    localStorage.setItem("usuarioActual", JSON.stringify(user))

    return { ok: true }
}










import StorageManager from "../infraestructure/storageManager.js";

let db = StorageManager.load();

let modo = "login"

function mostrarRegistro() {
    modo = "registro"
    document.getElementById("formTitle").innerText = "Registrarse"
    document.getElementById("formSub").innerText = "Create your account"
    document.getElementById("nameField").style.display = "block"
    document.getElementById("mainBtn").innerText = "Registrarse"
    document.getElementById("switchText").innerHTML =
        '¿Ya tienes cuenta? <span onclick="mostrarLogin()">Iniciar Sesión</span>'
}

function mostrarLogin() {
    modo = "login"
    document.getElementById("formTitle").innerText = "Iniciar Sesión"
    document.getElementById("formSub").innerText = "Access your space"
    document.getElementById("nameField").style.display = "none"
    document.getElementById("mainBtn").innerText = "Iniciar Sesión"
    document.getElementById("switchText").innerHTML =
        '¿No tienes cuenta? <span onclick="mostrarRegistro()">Registrarse</span>'
}

function login() {

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value

    if (modo === "login") {
        let user = JSON.parse(localStorage.getItem(email))

        if (!user) {
            alert("Usuario no encontrado")
            return
        }

        if (user.password !== password) {
            alert("Contraseña incorrecta")
            return
        }

        mostrarDashboard(user)

    } else {

        let name = document.getElementById("nameField").value

        let user = {
            name: name,
            email: email,
            password: password
        }

        localStorage.setItem(email, JSON.stringify(user))

        db.users.push(user)
        StorageManager.save(db)

        alert("Cuenta creada")

        mostrarDashboard(user)
    }
}

function mostrarDashboard(user) {
    localStorage.setItem("usuarioActual", JSON.stringify(user))
    document.getElementById("authSection").style.display = "none"
    document.getElementById("dashboard").style.display = "flex"
    document.getElementById("welcomeName").innerText =
        "Bienvenido, " + user.name + "!"
    document.getElementById("avatar").src =
        "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user.name
}

function openJoin() {
    const modal = document.getElementById("joinModal")
    if (modal) {
        modal.style.display = "flex"
    }
}

function openCreate() {
    const modal = document.getElementById("createModal")
    if (modal) {
        modal.style.display = "flex"
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = "none"
}

function generarCodigo() {
    return "TASUKU-" + Math.floor(1000 + Math.random() * 9000)
}

/* =========================
   CREAR ESPACIO
========================= */

function crearEspacio() {

    let nombre = document.querySelector("#createModal input").value

    if (!nombre) {
        alert("Escribe un nombre para el espacio")
        return
    }

    let codigo = generarCodigo()

    let usuario = JSON.parse(localStorage.getItem("usuarioActual"))

    let espacio = {
        nombre: nombre,
        codigo: codigo,
        miembros: [usuario]
    }

    localStorage.setItem("espacio_" + codigo, JSON.stringify(espacio))

    db.spaces.push(espacio)
    StorageManager.save(db)

    alert("Espacio creado\nCódigo: " + codigo)

    closeModal("createModal")

    /* 🔥 CAMBIO IMPORTANTE */
    localStorage.setItem("espacioActual", JSON.stringify(espacio))
    window.location.href = "../../places/places.html"
}

/* =========================
    UNIRSE A ESPACIO
========================= */


function unirseEspacio() {

    let codigo = document.querySelector("#joinModal input").value
    let db = StorageManager.load()
    let espacio = db.spaces.find(s => s.codigo === codigo)

    if (!espacio) {
        alert("Código inválido")
        return
    }

    espacio = JSON.parse(espacio)
    let usuario = JSON.parse(localStorage.getItem("usuarioActual"))
    espacio.miembros.push(usuario)
    StorageManager.save(db)
    localStorage.setItem("espacio_" + codigo, JSON.stringify(espacio))

    let espacioDB = db.spaces.find(s => s.codigo === codigo)

    if (espacioDB) {
        espacioDB.miembros.push(usuario)
        StorageManager.save(db)
    }

    alert("Te has unido al espacio: " + espacio.nombre)

    closeModal("joinModal")

    /* 🔥 CAMBIO IMPORTANTE */
    localStorage.setItem("espacioActual", JSON.stringify(espacio))
    window.location.href = "../../places/places.html"
}
/* =========================
    ENTRAR ESPACIO (LOCAL)
========================= */

function entrarEspacio(espacio) {

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

function irLogin() {
    window.location.href = "pages/auth/auth.html"
}

window.crearEspacio = crearEspacio
window.unirseEspacio = unirseEspacio
window.openCreate = openCreate
window.openJoin = openJoin
window.closeModal = closeModal




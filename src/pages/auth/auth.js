document.addEventListener("DOMContentLoaded", () => {

    let modo = "login"

    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const nameField = document.getElementById("nameField")

    const mainBtn = document.getElementById("mainBtn")
    const switchText = document.getElementById("switchText")
    const formTitle = document.getElementById("formTitle")


    const errorMsg = document.getElementById("errorMsg")

    mainBtn.addEventListener("click", handleAuth)

    function mostrarError(mensaje) {
        errorMsg.innerText = mensaje
        errorMsg.classList.add("show")
    }

    function limpiarError() {
        errorMsg.innerText = ""
        errorMsg.classList.remove("show")
    }

    function handleAuth() {

        limpiarError()

        let email = emailInput.value.trim().toLowerCase()
        let password = passwordInput.value.trim()
        let name = nameField.value.trim()

        let result

        if (modo === "login") {
            result = window.loginUser(email, password)
        } else {
            result = window.registerUser(name, email, password)
        }

        if (!result.ok) {
            mostrarError(result.message) // 🆕 antes era alert
            return
        }

        window.location.href = "../dashboard/dashboard.html"
    }

    function mostrarRegistro() {
        modo = "registro"

        formTitle.innerText = "Registrarse"
        nameField.style.display = "block"
        mainBtn.innerText = "Registrarse"

        switchText.innerHTML = `
        ¿Ya tienes cuenta?
        <span id="loginLink">Iniciar sesión</span>
        `

        document
            .getElementById("loginLink")
            .addEventListener("click", mostrarLogin)
    }

    function mostrarLogin() {
        modo = "login"

        formTitle.innerText = "Iniciar Sesión"
        nameField.style.display = "none"
        mainBtn.innerText = "Iniciar Sesión"

        switchText.innerHTML = `
        ¿No tienes cuenta?
        <span id="registerLink">Registrarse</span>
        `

        document
            .getElementById("registerLink")
            .addEventListener("click", mostrarRegistro)
    }

    document
        .getElementById("registerLink")
        ?.addEventListener("click", mostrarRegistro)
})

function getDB() {
    const raw = localStorage.getItem("tasukuDB")
    if (!raw) return { users: [], spaces: [], tasks: [] }
    return JSON.parse(raw)
}

function saveDB(db) {
    localStorage.setItem("tasukuDB", JSON.stringify(db))
}

// ======================
// LOGIN
// ======================
window.loginUser = function (email, password) {

    if (!email || !password) {
        return { ok: false, message: "Rellena todos los campos" }
    }

    const db = getDB()
    const user = db.users.find(u => u.email === email)

    if (!user) {
        return { ok: false, message: "Usuario no encontrado" }
    }

    if (user.password !== password) {
        return { ok: false, message: "Contraseña incorrecta" }
    }

    db.users = db.users.map(u => ({ ...u, session: u.id === user.id }))
    saveDB(db)

    return { ok: true }
}

// ======================
// REGISTRO
// ======================
window.registerUser = function (name, email, password) {

    if (!name || !email || !password) {
        return { ok: false, message: "Rellena todos los campos" }
    }

    const db = getDB()
    const existe = db.users.find(u => u.email === email)

    if (existe) {
        return { ok: false, message: "El usuario ya existe" }
    }

    const newUser = {
        id: db.users.length ? Math.max(...db.users.map(u => u.id)) + 1 : 1,
        name,
        email,
        role: "member",
        password,
        session: true,
        createdAt: new Date().toISOString()
    }

    // Cerrar sesiones anteriores y añadir el nuevo usuario
    db.users = db.users.map(u => ({ ...u, session: false }))
    db.users.push(newUser)
    saveDB(db)

    return { ok: true }
}



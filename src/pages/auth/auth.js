document.addEventListener("DOMContentLoaded", () => {

    let modo = "login"
    let modo = "login"

    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const nameField = document.getElementById("nameField")
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
document.addEventListener("DOMContentLoaded", () => {

    console.log("auth.js cargado")

    let modo = "login"

    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    const nameField = document.getElementById("nameField")

    const mainBtn = document.getElementById("mainBtn")
    const switchText = document.getElementById("switchText")
    const registerLink = document.getElementById("registerLink")
    if(registerLink){
    registerLink.addEventListener("click", mostrarRegistro)
}

    let modoRegistro = localStorage.getItem("modoRegistro")
    if (modoRegistro === "registro") {
        mostrarRegistro()
        localStorage.removeItem("modoRegistro")
    }

    mainBtn.addEventListener("click", login)

    function login() {

        let email = emailInput.value
        let password = passwordInput.value

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

            localStorage.setItem("usuarioActual", JSON.stringify(user))

            window.location.href = "../places/places.html"

        } else {

            let user = {
                name: nameField.value,
                email: email,
                password: password
            }

            localStorage.setItem(email, JSON.stringify(user))
            localStorage.setItem("usuarioActual", JSON.stringify(user))

            window.location.href = "../profile/HOME/onboarding.html"

        }

    }

    function mostrarRegistro() {

        modo = "registro"

        document.getElementById("formTitle").innerText = "Registrarse"

        nameField.style.display = "block"

        mainBtn.innerText = "Registrarse"

        switchText.innerHTML = `
¿Ya tienes cuenta?
<span id="loginLink">Logéate</span>
`

        document.getElementById("loginLink").addEventListener("click", mostrarLogin)

    }

    function mostrarLogin() {

        modo = "login"

        document.getElementById("formTitle").innerText = "Iniciar Sesión"

        nameField.style.display = "none"

        mainBtn.innerText = "Iniciar Sesión"

        switchText.innerHTML = `
¿No tienes cuenta?
<span id="registerLink">Registrarse</span>
`

        document.getElementById("registerLink").addEventListener("click", mostrarRegistro)

    }

})
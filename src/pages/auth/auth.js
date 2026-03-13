document.addEventListener("DOMContentLoaded", () => {

console.log("auth.js cargado")

let modo = "login"

const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const nameField = document.getElementById("nameField")

const mainBtn = document.getElementById("mainBtn")
const registerLink = document.getElementById("registerLink")

mainBtn.addEventListener("click", login)
registerLink.addEventListener("click", mostrarRegistro)

function login(){

let email = emailInput.value
let password = passwordInput.value

if(modo === "login"){

let user = JSON.parse(localStorage.getItem(email))

if(!user){
alert("Usuario no encontrado")
return
}

if(user.password !== password){
alert("Contraseña incorrecta")
return
}

/* guardamos usuario actual */
localStorage.setItem("usuarioActual", JSON.stringify(user))

/* redirigir al dashboard */
window.location.href = "../dashboard/dashboard.html"

}else{

let user = {
name: nameField.value,
email: email,
password: password
}

/* guardar usuario */
localStorage.setItem(email, JSON.stringify(user))

/* guardar usuario actual */
localStorage.setItem("usuarioActual", JSON.stringify(user))

/* redirigir al dashboard */
window.location.href = "../dashboard/dashboard.html"

}

}

function mostrarRegistro(){

modo = "registro"

document.getElementById("formTitle").innerText = "Registrarse"

nameField.style.display = "block"

mainBtn.innerText = "Registrarse"

}

})
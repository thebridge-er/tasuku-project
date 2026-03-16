let modo="login"

function mostrarRegistro(){
    modo="registro"
    document.getElementById("formTitle").innerText="Registrarse"
    document.getElementById("formSub").innerText="Create your account"
    document.getElementById("nameField").style.display="block"
    document.getElementById("mainBtn").innerText="Registrarse"
    document.getElementById("switchText").innerHTML=
    '¿Ya tienes cuenta? <span onclick="mostrarLogin()">Iniciar Sesión</span>'
}

function mostrarLogin(){
    modo="login"
    document.getElementById("formTitle").innerText="Iniciar Sesión"
    document.getElementById("formSub").innerText="Access your space"
    document.getElementById("nameField").style.display="none"
    document.getElementById("mainBtn").innerText="Iniciar Sesión"
    document.getElementById("switchText").innerHTML=
    '¿No tienes cuenta? <span onclick="mostrarRegistro()">Registrarse</span>'
}

function login(){

    let email = document.getElementById("email").value
    let password = document.getElementById("password").value
    
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
    mostrarDashboard(user)

    }

    else{
    let name = document.getElementById("nameField").value
    let user = {
    name:name,
    email:email,
    password:password
    }

    localStorage.setItem(email, JSON.stringify(user))
    alert("Cuenta creada")
    mostrarDashboard(user)
    }
}

function mostrarDashboard(user){
    localStorage.setItem("usuarioActual", JSON.stringify(user))
    document.getElementById("authSection").style.display = "none"
    document.getElementById("dashboard").style.display = "flex"
    document.getElementById("welcomeName").innerText =
    "Bienvenido, " + user.name + "!"
    document.getElementById("avatar").src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user.name
}

function openJoin(){
    const modal = document.getElementById("joinModal")
    if(modal){
        modal.style.display="flex"
    }
}

function openCreate(){
    const modal = document.getElementById("createModal")
    if(modal){
        modal.style.display="flex"
    }
}

function closeModal(id){
    document.getElementById(id).style.display="none"
}

function generarCodigo(){
    return "TASUKU-" + Math.floor(1000 + Math.random()*9000)
}

function crearEspacio(){
    let nombre = document.querySelector("#createModal input").value
    if(!nombre){

    alert("Escribe un nombre para el espacio")
    return
    }

    let codigo = generarCodigo()
    let usuario = JSON.parse(localStorage.getItem("usuarioActual"))
    let espacio = {

    nombre:nombre,
    codigo:codigo,
    miembros:[usuario]
        }

    localStorage.setItem("espacio_"+codigo, JSON.stringify(espacio))
    alert("Espacio creado\nCódigo: " + codigo)
    closeModal("createModal")
    entrarEspacio(espacio)
}

function unirseEspacio(){
    let codigo = document.querySelector("#joinModal input").value
    let espacio = localStorage.getItem("espacio_"+codigo)
        if(!espacio){
        alert("Código inválido")
        return
        }
    espacio = JSON.parse(espacio)
    let usuario = JSON.parse(localStorage.getItem("usuarioActual"))
    espacio.miembros.push(usuario)
    localStorage.setItem("espacio_"+codigo, JSON.stringify(espacio))
    alert("Te has unido al espacio: " + espacio.nombre)
    closeModal("joinModal")
}

function mostrarPerfil(user){
    localStorage.setItem("usuarioActual", JSON.stringify(user))
    document.getElementById("authSection").style.display="none"
    document.getElementById("perfil").style.display="flex"
    document.getElementById("perfilNombre").innerText=user.name
    document.getElementById("perfilCorreo").innerText=user.email
    document.getElementById("perfilAvatar").src=
    "https://api.dicebear.com/7.x/adventurer/svg?seed="+user.name
}

function irDashboard(){
    document.getElementById("perfil").style.display="none"
    document.getElementById("dashboard").style.display="flex"
}

function entrarEspacio(espacio){
    document.getElementById("dashboard").style.display="none"
    document.getElementById("espacio").style.display="block"
    document.getElementById("spaceName").innerText = espacio.nombre
    document.getElementById("spaceMembers").innerText =
    espacio.miembros.length + " miembros"
    let usuario = JSON.parse(localStorage.getItem("usuarioActual"))
    document.getElementById("spaceUserName").innerText = usuario.name
    document.getElementById("spaceAvatar").src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.name
}

function irLogin(){
    window.location.href="pages/auth/auth.html"
}

async function loadComponent(id, url) {
    const element = document.getElementById(id)
    if (!element) return

    const response = await fetch(url)
    const html = await response.text()
    element.innerHTML = html
}

document.addEventListener("DOMContentLoaded", () => {

    let basePath = "components/"

    if (window.location.pathname.includes("/pages/")) {
        basePath = "../../components/"
    }

    loadComponent("header", basePath + "header/header.html")
    loadComponent("footer", basePath + "footer/footer.html")

    loadComponent("createModal", basePath + "modals/create-space.html")
    loadComponent("joinModal", basePath + "modals/join-space.html")

})


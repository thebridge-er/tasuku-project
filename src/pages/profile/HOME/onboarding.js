document.addEventListener("DOMContentLoaded", async () => {

const user = JSON.parse(localStorage.getItem("usuarioActual"))

if(!user){
    window.location.href = "../../auth/auth.html"
    return
}

const welcomeName = document.getElementById("welcomeName")
const avatar = document.getElementById("avatar")

if(welcomeName){
    welcomeName.innerText = "¡Bienvenido, " + user.name + "!"
}

if(avatar){
    avatar.src = "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user.name
}

/* CARGAR MODALES */

loadModal("../../../components/modals/create-space.html")
loadModal("../../../components/modals/join-space.html")

})


async function loadModal(path){

const res = await fetch(path)
const html = await res.text()

document.body.insertAdjacentHTML("beforeend", html)

}


/* ABRIR MODALES */

function openCreate(){
document.getElementById("createModal").style.display = "flex"
}

function openJoin(){
document.getElementById("joinModal").style.display = "flex"
}


/* CERRAR MODAL */

function closeModal(id){
document.getElementById(id).style.display = "none"
}
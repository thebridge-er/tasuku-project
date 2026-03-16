document.addEventListener("DOMContentLoaded", cargarPerfil)

function cargarPerfil(){
const usuario = JSON.parse(localStorage.getItem("usuario"))
if(!usuario){
return
}
    document.getElementById("perfilNombre").textContent = usuario.nombre
    document.getElementById("perfilCorreo").textContent = usuario.email
    document.getElementById("perfilAvatar").src =
    "https://api.dicebear.com/7.x/adventurer/svg?seed=" + usuario.nombre

}


function irDashboard(){
    document.getElementById("perfil").style.display = "none"
    document.getElementById("espacio").style.display = "block"

}
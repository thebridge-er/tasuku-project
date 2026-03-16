document.addEventListener("DOMContentLoaded", () => {

/* USUARIO*/

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

/* HEADER*/

    fetch("../../../components/header/header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header").innerHTML = data
    })

/* FOOTER */

    fetch("../../../components/footer/footer.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data
    })

/* MODAL CREAR ESPACIO */

    fetch("../../../components/modals/create-space.html")
    .then(res => res.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data)
    })


/* MODAL UNIRSE*/

    fetch("../../../components/modals/join-space.html")
    .then(res => res.text())
    .then(data => {
        document.body.insertAdjacentHTML("beforeend", data)
    })

})

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
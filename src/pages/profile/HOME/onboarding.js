document.addEventListener("DOMContentLoaded", () => {

    const createModal = document.getElementById("createModal")
    const joinModal = document.getElementById("joinModal")

    const user = JSON.parse(localStorage.getItem("usuarioActual"))

    if(!user){
        window.location.href = "../auth/auth.html"
        return
    }

    const welcomeName = document.getElementById("welcomeName")
    const avatar = document.getElementById("avatar")

    if(welcomeName){
        welcomeName.innerText = "Bienvenido, " + user.name
    }

    if(avatar){
        avatar.src = "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user.name
    }

})
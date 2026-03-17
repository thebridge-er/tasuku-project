const spacesContainer = document.getElementById("spacesContainer")

const usuario = JSON.parse(localStorage.getItem("usuarioActual"))

const db = JSON.parse(localStorage.getItem("tasukuDB")) || {
    spaces: [],
    tasks: []
}

let espacioActual = null
// 🔥 SI VIENES DE UNIRTE O CREAR
const espacioGuardado = localStorage.getItem("espacioActual")

if(espacioGuardado){

    const espacio = JSON.parse(espacioGuardado)

    const existe = db.spaces.find(s => s.codigo === espacio.codigo)

    if(!existe){
        db.spaces.push(espacio)
    }

    // 🔥 AÑADIR ESTO (CLAVE)
    const espacioEnDB = db.spaces.find(s => s.codigo === espacio.codigo)

    const yaEsta = espacioEnDB.miembros.some(m => m.email === usuario.email)

    if(!yaEsta){
        espacioEnDB.miembros.push(usuario)
    }

    localStorage.setItem("tasukuDB", JSON.stringify(db))
}
/* =========================
   CARGAR MODAL
========================= */

async function loadModal(){

    const res = await fetch("../../components/modals/create-space.html")

    const html = await res.text()

    document.getElementById("createModal").innerHTML = html

}

loadModal()


/* =========================
   BOTÓN CREAR ESPACIO
========================= */

document.getElementById("createSpaceBtn").onclick = () => {

    const modal = document.querySelector(".modal")

    if(modal){
        modal.style.display = "flex"
    }

}


/* =========================
   CREAR ESPACIO
========================= */

function crearEspacio(){

    const input = document.getElementById("spaceNameInput")

    const name = input.value.trim()

    if(!name){
        alert("Escribe un nombre")
        return
    }

    const nuevoEspacio = {
        nombre: name,
        codigo: "TASUKU-" + Math.floor(1000 + Math.random()*9000),
        miembros: [usuario]
    }

    db.spaces.push(nuevoEspacio)

    localStorage.setItem("tasukuDB", JSON.stringify(db))

    input.value = ""

    closeModal("createModal")

    renderSpaces()
}


/* =========================
   CERRAR MODAL
========================= */

function closeModal(id){
    document.querySelector(".modal").style.display = "none"
}


/* =========================
   OBTENER ESPACIOS
========================= */

function getUserSpaces(){
    return db.spaces.filter(space =>
        space.miembros.some(m => m.email === usuario.email)
    )
}


/* =========================
    RENDER ESPACIOS
========================= */

function renderSpaces(){

    const freshDB = JSON.parse(localStorage.getItem("tasukuDB")) || { spaces: [] }

    const spaces = freshDB.spaces.filter(space =>
    space.miembros.some(m => m.email === usuario.email)
    )

    spacesContainer.innerHTML = ""
    spaces.forEach(space => {
        let avatarsHTML = ""
        space.miembros.forEach(member => {
            avatarsHTML += `
            <img 
                class="avatar clickable" 
                src="https://api.dicebear.com/7.x/adventurer/svg?seed=${member.name}"
                onclick='enterSpace(${JSON.stringify(space)})'
            >
            `
        })
        const card = document.createElement("div")
        card.classList.add("space-card")

        card.innerHTML = `
        <div class="space-left">
            <div class="space-icon">🏠</div>
            <span class="space-name">${space.nombre}</span>
        </div>

        <div class="avatars">
            ${avatarsHTML}
        </div>
        `

        card.onclick = () => enterSpace(space)

        spacesContainer.appendChild(card)
    })
}


/* =========================
    ENTRAR A ESPACIO
========================= */

function enterSpace(space){

    localStorage.setItem("espacioActual", JSON.stringify(space))

    window.location.href = "../dashboard/dashboard.html"

}


/* =========================
   INIT
========================= */

renderSpaces()
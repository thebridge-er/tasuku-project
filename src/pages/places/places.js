import Space from "../../models/Space.js";
import StorageManager from "../../infraestructure/storageManager.js";

document.addEventListener("DOMContentLoaded", async () => {
  const spacesContainer = document.getElementById("spacesContainer");
  const db = JSON.parse(localStorage.getItem("tasukuDB"));
  const userData = db.users.find((u) => u.session === true);

  if (!userData) {
    window.location.href = "../../pages/auth/auth.html";
    return;
  }

  const userSpaces = db.spaces.filter(
    (s) => s.ownerId === userData.id || s.members.includes(userData.id),
  );

  userSpaces.forEach((space) => {
    const card = document.createElement("div");
    card.classList.add("space-card");
    card.setAttribute("data-name", space.name.toLowerCase());
    card.innerHTML = `
      <h3>${space.name}</h3>
      <p>Miembros: ${space.members.length}</p>
      <p>Tareas: ${space.tasks.length}</p>
      <p>Código: ${space.key}</p>
    `;

    card.addEventListener("click", () => selectSpace(space.id));
    spacesContainer.appendChild(card);
  });

  loadModal("../../components/modals/create-space.html");
  loadModal("../../components/modals/join-space.html");
});

function selectSpace(spaceId) {
  const db = StorageManager.load();

  // Poner session true solo al espacio seleccionado
  db.spaces = db.spaces.map((s) => ({
    ...s,
    session: s.id === spaceId,
  }));

  StorageManager.save(db);

  window.location.href = "../../pages/dashboard/dashboard.html";
}

/* =========================
   CARGAR MODAL
========================= */

async function loadModal(path) {
  const res = await fetch(path);
  const html = await res.text();
  document.body.insertAdjacentHTML("beforeend", html);
}

/* =========================
   BOTÓN CREAR ESPACIO
========================= */

window.openJoin = function () {
  document.getElementById("joinModal").style.display = "flex";
};

window.openCreate = function () {
  document.getElementById("createModal").style.display = "flex";
};

/* CERRAR MODAL */
window.closeModal = function (id) {
  document.getElementById(id).style.display = "none";
};

/* =========================
   CREAR ESPACIO
========================= */


function crearEspacio() {
  let nombre = document.querySelector("#createModal input").value;

  if (!nombre) {
    alert("Escribe un nombre para el espacio");
    return;
  }

  /* let db = JSON.parse(localStorage.getItem("tasukuDB")); */
  let db = StorageManager.load();
  let user = db.users.find((u) => u.session === true);
  let codigo = Math.floor(1000 + Math.random() * 9000).toString();

  const newSpace = {
    id: db.users.length ? Math.max(...db.users.map((u) => u.id)) + 1 : 1,
    name: nombre,
    key: codigo,
    ownerId: user.id,
    members: [user.id],
    tasks: [1, 2, 3, 4],
    createdAt: new Date().toISOString(),
    session: true,
    taskTemplates: [
      {
        title: "Hacer la compra",
        difficulty: "easy",
      },
      {
        title: "Limpiar baño",
        difficulty: "medium",
      },
    ],
  };

  db.spaces.push(newSpace);
  StorageManager.save(db);

  alert("Espacio creado\nCódigo: " + codigo);

  closeModal("createModal");

  location.reload();
}


/* =========================
    UNIRSE A ESPACIO
========================= */

function unirseEspacio() {

    let codigo = document.querySelector("#joinModal input").value
    let db = StorageManager.load()
    let espacio = db.spaces.find(s => s.key === codigo)

    if (!espacio) {
        alert("Código inválido")
        return
    }
    let user = db.users.find((u) => u.session === true);
    
    // Añadir al espacio encontrado el id del usuario logueado, en el apartado de members que es un array de id's
    espacio.members.push(user.id)
    StorageManager.save(db)    

    alert("Te has unido al espacio: " + espacio.name)

    closeModal("joinModal")

     window.location.href = "../../pages/dashboard/dashboard.html";
}



document.addEventListener("click", (e) => {
  if (e.target.id === "create-space-btn") {
    crearEspacio();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.id === "join-space-btn") {
    unirseEspacio();
  }
});


/* =========================
   CERRAR MODAL
========================= */

function closeModal(id) {
  document.querySelector(".modal").style.display = "none";
}

window.filterSpaces = function () {
  const query = document.getElementById("spaceSearch").value.toLowerCase();
  const cards = document.querySelectorAll(".space-card");

  cards.forEach((card) => {
    const name = card.getAttribute("data-name");
    card.style.display = name.includes(query) ? "" : "none";
  });
}
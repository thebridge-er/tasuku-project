import User from "../../models/User.js";
import StorageManager from "../../infraestructure/storageManager.js";

document.addEventListener("DOMContentLoaded", async () => {
  const raw = localStorage.getItem("tasukuDB");
  const db = JSON.parse(raw);
  const userData = db.users.find((u) => u.session === true);

  if (!userData) {
    window.location.href = "../../pages/auth/auth.html";
    return;
  }

  if (hasSpaces(userData)) {
    window.location.href = "../../pages/places/places.html";
    return;
  }

  const user = new User(
    userData.id,
    userData.name,
    userData.email,
    userData.spaces ?? [],
    userData.points ?? 0,
    userData.role,
    userData.password,
    new Date(userData.createdAt),
  );

  const welcomeName = document.getElementById("welcomeName");
  const avatar = document.getElementById("avatar");

  if (welcomeName) {
    welcomeName.innerText = "¡Bienvenido, " + user.name + "!";
  }

  if (avatar) {
    avatar.src =
      "https://api.dicebear.com/7.x/adventurer/svg?seed=" + user.name;
  }

  /* CARGAR MODALES */

  loadModal("../../components/modals/create-space.html");
  loadModal("../../components/modals/join-space.html");
});

async function loadModal(path) {
  const res = await fetch(path);
  const html = await res.text();

  document.body.insertAdjacentHTML("beforeend", html);
}

/* ABRIR MODALES */

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

function hasSpaces(userData) {
  const raw = localStorage.getItem("tasukuDB");
  const db = JSON.parse(raw);
  return db.spaces.some(
    space => space.ownerId === userData.id || space.members.includes(userData.id)
  );
}

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

  window.location.href = "../../pages/dashboard/dashboard.html";
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

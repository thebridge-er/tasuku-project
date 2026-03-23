import StorageManager from "/src/infraestructure/storageManager.js"

const output = document.getElementById("output")

document.getElementById("loadBtn").addEventListener("click", () => {
  const db = StorageManager.load()
  pintar(db)
})

document.getElementById("clearBtn").addEventListener("click", () => {
  localStorage.removeItem("tasukuDB")
  output.textContent = "DB eliminada"
})

document.getElementById("addTaskBtn").addEventListener("click", () => {
  const db = StorageManager.load()

  const nueva = {
    id: Date.now(),
    title: "Tarea test",
    status: "todo",
    spaceId: 1
  }

  db.tasks.push(nueva)

  StorageManager.save(db)

  pintar(db)
})

function pintar(db){
  output.textContent = JSON.stringify(db, null, 2)
}
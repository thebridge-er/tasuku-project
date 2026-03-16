
const spacesContainer = document.getElementById("spacesContainer")

const spaces = [
{
name:"Mikasa",
members:[
"https://api.dicebear.com/7.x/adventurer/svg?seed=1",
"https://api.dicebear.com/7.x/adventurer/svg?seed=2",
"https://api.dicebear.com/7.x/adventurer/svg?seed=3"
]
}
]



function renderSpaces(){
spacesContainer.innerHTML=""
spaces.forEach(space=>{
let avatarsHTML=""
space.members.forEach(member=>{
avatarsHTML += `
<img class="avatar" src="${member}">
`

})

const card = document.createElement("div")
card.classList.add("space-card")
card.innerHTML = `
<div class="space-left">
<div class="space-icon">🏠</div>
<span class="space-name">${space.name}</span>
</div>
<div class="avatars">
${avatarsHTML}
</div>`

card.onclick = ()=>{
enterSpace(space.name)
}

spacesContainer.appendChild(card)
})
}



function enterSpace(spaceName){
alert("Entrando al espacio: " + spaceName)
}

document.getElementById("createSpaceBtn").onclick = ()=>{
const name = prompt("Nombre del espacio")
if(!name) return
spaces.push({
name:name,
members:[
"https://api.dicebear.com/7.x/adventurer/svg?seed="+Math.random(),
"https://api.dicebear.com/7.x/adventurer/svg?seed="+Math.random(),
]

})

renderSpaces()
}

renderSpaces()
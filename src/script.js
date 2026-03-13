function irRegistro(){
localStorage.setItem("modoRegistro","registro")
window.location.href="src/pages/auth/auth.html"
}



/* Formulari ome lleva directamente a registro*/
window.addEventListener("load", function(){

let modoRegistro = localStorage.getItem("modoRegistro")

if(modoRegistro === "registro"){
mostrarRegistro()
localStorage.removeItem("modoRegistro")
}

})
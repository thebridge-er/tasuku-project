function irRegistro(){
localStorage.setItem("modoRegistro","registro")
window.location.href="pages/auth/auth.html"

}



/* Formulario que lleva directamente a registro*/
window.addEventListener("load", function(){

let modoRegistro = localStorage.getItem("modoRegistro")

if(modoRegistro === "registro"){
mostrarRegistro()
localStorage.removeItem("modoRegistro")
}

})
// Exponemos funciones al global para que onclick del HTML las vea
window.irLogin = function () {
    window.location.href = "pages/auth/auth.html";
};

window.irRegistro = function () {
    localStorage.setItem("modoRegistro", "registro");
    window.location.href = "pages/auth/auth.html";
};

/* Formulario me lleva directamente a registro*/
window.addEventListener("load", function () {

    let modoRegistro = localStorage.getItem("modoRegistro")

    if (modoRegistro === "registro") {
        mostrarRegistro()
        localStorage.removeItem("modoRegistro")
    }

})
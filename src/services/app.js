// ======================
// LOGIN
// ======================
window.loginUser = function (email, password) {

    if (!email || !password) {
        return { ok: false, message: "Rellena todos los campos" }
    }

    let user = JSON.parse(localStorage.getItem(email))

    if (!user) {
        return { ok: false, message: "Usuario no encontrado" }
    }

    if (user.password !== password) {
        return { ok: false, message: "Contraseña incorrecta" }
    }

    localStorage.setItem("usuarioActual", JSON.stringify(user))

    return { ok: true }
}

// ======================
// REGISTRO
// ======================
window.registerUser = function (name, email, password) {

    if (!name || !email || !password) {
        return { ok: false, message: "Rellena todos los campos" }
    }

    let existe = localStorage.getItem(email)

    if (existe) {
        return { ok: false, message: "El usuario ya existe" }
    }

    let user = {
        name,
        email,
        password
    }

    localStorage.setItem(email, JSON.stringify(user))
    localStorage.setItem("usuarioActual", JSON.stringify(user))

    return { ok: true }
}
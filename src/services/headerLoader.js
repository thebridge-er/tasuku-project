// src/services/headerLoader.js
export async function loadHeader() {
    const container = document.getElementById("header-container");
    console.log("header", container)
    if (!container) return;

    try {
        // HTML del header
        const res = await fetch("../../components/header/header.html");
        if (!res.ok) throw new Error("No se pudo cargar header.html");
        const html = await res.text();
        container.innerHTML = html;

        // CSS del header
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "../../components/header/header.css"; // desde auth.html
        document.head.appendChild(link);

        // JS del header (si necesitas)
        const script = document.createElement("script");
        script.src = "../../components/header/header.js";
        script.type = "module";
        document.body.appendChild(script);

    } catch (error) {
        console.error("Error cargando header:", error);
    }
}

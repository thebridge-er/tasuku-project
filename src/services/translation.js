let translations = {};

const BASE_URL = new URL("../lang/", import.meta.url).href;

export function testModule() {
    console.log("El modelo funciona!");
}

export async function loadLanguage(lang) {

    const response = await fetch(`${BASE_URL}${lang}.json`); //llamamos al archivo de traducciones (es, eus o en)
    translations = await response.json(); //convertimos la respuesta del en un objeto JSON, para poder acceder a las traducciones

    translatePage();
}

function translatePage(){

    const elements = document.querySelectorAll("[data-translation]"); //buscamos todso los elementos que tengan el atributo "data-translation"

    elements.forEach( element => {
        const key = element.getAttribute("data-translation"); //conseguimos la key del elemento que esta dentro de "data-translation"
        element.textContent = translations[key]; //cambiamos el texto del elemento por la traducción
    });

}
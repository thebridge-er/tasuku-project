// =========================
// CARDS.JS - TASUKU PROJECT
// User / Place / Ranking cards
// =========================

// Custom elements
class UICardUser extends HTMLElement {}
customElements.define("ui-card-user", UICardUser);

class UICardPlace extends HTMLElement {}
customElements.define("ui-card-place", UICardPlace);

class UICardRanking extends HTMLElement {}
customElements.define("ui-card-ranking", UICardRanking);


// =========================
// DATA
// =========================

const users = [
    { name: "Dolores Delano", score: 0, avatar: "/src/assets/images/avatar1.svg" },
    { name: "Elsa Brosón", score: 0, avatar: "/src/assets/images/avatar2.svg" }
];

const places = [
    {
        name: "Mikasa",
        icon: "/src/assets/images/icono-casa.svg",
        users: [
            "/src/assets/images/avatar1.svg",
            "/src/assets/images/avatar2.svg"
        ]
    }
];

const rankings = [
    {
        title: "Ranking",
        users: users
    }
];


// =========================
// INIT
// =========================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Init cards");

    const app = document.querySelector("#app");
    if (!app) return;


    // =========================
    // USER CARDS
    // =========================

    users.forEach(user => {

        const el = document.createElement("ui-card-user");

        el.innerHTML = `
            <div class="card-user">

                <img
                    class="card-user-avatar"
                    src="${user.avatar}"
                    alt="Avatar de ${user.name}"
                >

                <div class="card-user-info">

                    <h3 class="card-user-name">
                        ${user.name}
                    </h3>

                    <p class="card-user-points">
                        <span class="card-user-score">
                            ${user.score}
                        </span>
                        puntos
                    </p>

                </div>

            </div>
        `;

        app.appendChild(el);

    });



    // =========================
    // PLACE CARDS
    // =========================

    places.forEach(place => {

        const el = document.createElement("ui-card-place");

        const usersHTML = place.users
            .map(u =>
                `<img
                    src="${u}"
                    alt="Avatar usuario"
                    class="card-place-avatar"
                >`
            )
            .join("");

        el.innerHTML = `
            <div class="card-place">

                <div class="card-place-info">

                    <img
                        src="${place.icon}"
                        alt="Icono de ${place.name}"
                    >

                    <span class="card-place-name">
                        ${place.name}
                    </span>

                </div>

                <div class="card-place-users">
                    ${usersHTML}
                </div>

            </div>
        `;

        app.appendChild(el);

    });



    // =========================
    // RANKING CARD
    // =========================

    rankings.forEach(rank => {

        const el = document.createElement("ui-card-ranking");


        const rankingUsersHTML = rank.users
            .map((u, i) => `

                <div class="card-user-ranking ${i === 0 ? "top" : ""}">

                    <div class="user-rank">
                        ${i + 1}
                    </div>

                    <img
                        src="${u.avatar}"
                        alt="Avatar de ${u.name}"
                        class="card-user-avatar"
                    >

                    <div class="card-user-info">

                        <h3 class="card-user-name">
                            ${u.name}
                        </h3>

                        <p class="card-user-points">
                            <span class="card-user-score">
                                ${u.score}
                            </span>
                            puntos
                        </p>

                    </div>

                </div>

            `)
            .join("");



        el.innerHTML = `

            <div class="card-ranking">

                <div class="card-ranking-header">

                    <div class="card-ranking-title">
                        ${rank.title}
                    </div>

                    <div class="card-ranking-toggle"></div>

                </div>


                <div class="card-ranking-list">

                    ${rankingUsersHTML}

                </div>

            </div>

        `;


        app.appendChild(el);


        // toggle

        const header = el.querySelector(".card-ranking-header");
        const container = el.querySelector(".card-ranking");

        header.addEventListener("click", () => {

            container.classList.toggle("open");

        });

    });


});
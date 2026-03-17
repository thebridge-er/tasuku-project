// 1️. Seleccionar botón para cambiar tema
const btnTheme = document.querySelector('ui-button[dark-mode]');

btnTheme.addEventListener('click', () => {
  const html = document.documentElement;
  const isLight = html.dataset.theme === 'light';
  
  // Cambiar theme
  html.dataset.theme = isLight ? 'dark' : 'light';
  
  // Opcional: cambiar icono según theme
  btnTheme.setAttribute('icon', isLight ? 'icon-dark.png' : 'icon-light.png');
});

// ------------------------------
// 2. Datos de ejemplo de usuarios
const users = [
  { name: 'Dolores Delano', points: 120, score: 80, avatar: 'assets/images/avatar1.svg' },
  { name: 'Armando Guerra', points: 95, score: 60, avatar: 'assets/images/avatar2.svg' },
  { name: 'Aitor Tiya', points: 150, score: 90, avatar: 'assets/images/avatar3.svg' }
];

// ------------------------------
// 3. Contenedor donde se añadirán las cards
const container = document.getElementById('cards-container');

// Seleccionamos la card template (la primera o una invisible)
const templateCard = document.querySelector('.user-card');

// ------------------------------
// 4. Función para crear cards dinámicamente
users.forEach(user => {
  // Clonamos la card template
  const cardClone = templateCard.cloneNode(true);
  
  // Actualizamos contenido
  cardClone.querySelector('.user-card-name').textContent = user.name;
  cardClone.querySelector('.user-card-points').textContent = `${user.points} puntos`;
  cardClone.querySelector('.user-score').textContent = user.score;
  cardClone.querySelector('.avatar').src = user.avatar;

  // Mostramos la card (en caso de que la template esté oculta)
  cardClone.style.display = 'flex';

  // Añadimos al contenedor
  container.appendChild(cardClone);
});

// ------------------------------
// 5️⃣ (Opcional) Ocultar la template original
templateCard.style.display = 'none';
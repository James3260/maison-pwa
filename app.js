// Données (remplace par du stockage local plus tard)
let repas = [];
let stocks = [];
let courses = [];

// DOM Elements
const listeRepas = document.getElementById('liste-repas');
const listeStocks = document.getElementById('liste-stocks');
const listeCourses = document.getElementById('liste-courses');
const formRepas = document.getElementById('ajout-repas');
const formStock = document.getElementById('ajout-stock');

// Afficher les repas
function afficherRepas() {
  listeRepas.innerHTML = repas.map(repas => `<li>${repas}</li>`).join('');
}

// Afficher les stocks
function afficherStocks() {
  listeStocks.innerHTML = stocks.map(stock =>
    `<li>${stock.nom} (${stock.quantite}) - Péremption: ${stock.peremption || 'non renseignée'}</li>`
  ).join('');
}

// Afficher la liste de courses
function afficherCourses() {
  listeCourses.innerHTML = courses.map(course => `<li>${course}</li>`).join('');
}

// Ajouter un repas
formRepas.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('nouveau-repas');
  repas.push(input.value);
  afficherRepas();
  input.value = '';
});

// Ajouter un stock
formStock.addEventListener('submit', (e) => {
  e.preventDefault();
  const nom = document.getElementById('nouvel-aliment').value;
  const quantite = document.getElementById('quantite').value;
  const peremption = document.getElementById('peremption').value;
  stocks.push({ nom, quantite, peremption });
  afficherStocks();
  document.getElementById('nouvel-aliment').value = '';
  document.getElementById('quantite').value = '';
  document.getElementById('peremption').value = '';
});

// Initialisation
afficherRepas();
afficherStocks();
afficherCourses();

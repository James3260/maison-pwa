// Données de base
let repas = JSON.parse(localStorage.getItem('repas')) || [];
let stocks = JSON.parse(localStorage.getItem('stocks')) || [];
let courses = JSON.parse(localStorage.getItem('courses')) || [];

// Chargement des données au démarrage
document.addEventListener('DOMContentLoaded', () => {
  afficherRepas();
  afficherStocks();
  afficherCourses();

  // Ajout d'un repas
  document.getElementById('ajout-repas').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('nouveau-repas');
    repas.push(input.value);
    input.value = '';
    sauvegarderDonnees();
    afficherRepas();
  });

  // Ajout d'un stock
  document.getElementById('ajout-stock').addEventListener('submit', (e) => {
    e.preventDefault();
    const aliment = document.getElementById('nouvel-aliment').value;
    const quantite = document.getElementById('quantite').value;
    const peremption = document.getElementById('peremption').value;
    stocks.push({ aliment, quantite, peremption });
    document.getElementById('ajout-stock').reset();
    sauvegarderDonnees();
    afficherStocks();
  });
});

// Affichage des repas
function afficherRepas() {
  const liste = document.getElementById('liste-repas');
  liste.innerHTML = repas.map((r, index) =>
    `<li>
      <span>${r}</span>
      <button class="delete" data-index="${index}" data-type="repas">Supprimer</button>
    </li>`
  ).join('');
}

// Affichage des stocks
function afficherStocks() {
  const liste = document.getElementById('liste-stocks');
  liste.innerHTML = stocks.map((s, index) =>
    `<li>
      <div>
        <strong>${s.aliment}</strong> (${s.quantite}) - ${s.peremption || 'Pas de date'}
      </div>
      <button class="delete" data-index="${index}" data-type="stock">Supprimer</button>
    </li>`
  ).join('');
}

// Affichage des courses
function afficherCourses() {
  const liste = document.getElementById('liste-courses');
  liste.innerHTML = courses.map((c, index) =>
    `<li>
      <span>${c}</span>
      <button class="delete" data-index="${index}" data-type="course">Supprimer</button>
    </li>`
  ).join('');
}

// Sauvegarde dans le stockage local
function sauvegarderDonnees() {
  localStorage.setItem('repas', JSON.stringify(repas));
  localStorage.setItem('stocks', JSON.stringify(stocks));
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Gestion des suppressions
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = e.target.dataset.index;
    const type = e.target.dataset.type;
    if (type === 'repas') repas.splice(index, 1);
    else if (type === 'stock') stocks.splice(index, 1);
    else if (type === 'course') courses.splice(index, 1);
    sauvegarderDonnees();
    afficherRepas();
    afficherStocks();
    afficherCourses();
  }
});

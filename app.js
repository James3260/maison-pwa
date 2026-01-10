// Données
const data = {
  repas: JSON.parse(localStorage.getItem('repas')) || {
    lundi: [], mardi: [], mercredi: [], jeudi: [], vendredi: [], samedi: [], dimanche: []
  },
  stocks: JSON.parse(localStorage.getItem('stocks')) || {
    congelateur: [], frigo: [], placard: []
  },
  courses: JSON.parse(localStorage.getItem('courses')) || []
};

// DOM
document.addEventListener('DOMContentLoaded', () => {
  // Gestion des onglets
  const tabButtons = document.querySelectorAll('.tab-button');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      button.classList.add('active');
      document.getElementById(button.dataset.tab).classList.add('active');
    });
  });

  // Chargement initial
  afficherRepas();
  afficherStocks();
  afficherCourses();

  // Ajout de repas
  document.querySelectorAll('.add-meal-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const day = form.dataset.day;
      const input = form.querySelector('input');
      data.repas[day].push(input.value);
      sauvegarderDonnees();
      afficherRepas();
      input.value = '';
    });
  });

  // Ajout de stock
  document.querySelectorAll('.add-stock-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const category = form.dataset.category;
      const inputs = form.querySelectorAll('input');
      const stock = {
        name: inputs[0].value,
        quantity: inputs[1].value,
        expiry: inputs[2].value
      };
      data.stocks[category].push(stock);
      sauvegarderDonnees();
      afficherStocks();
      form.reset();
    });
  });

  // Ajout de course
  document.getElementById('ajout-course').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    data.courses.push(input.value);
    sauvegarderDonnees();
    afficherCourses();
    input.value = '';
  });
});

// Fonctions d'affichage
function afficherRepas() {
  for (const day in data.repas) {
    const list = document.getElementById(`repas-${day}`);
    if (list) {
      list.innerHTML = data.repas[day].map((repas, index) =>
        `<li>
          ${repas}
          <button class="delete-btn" data-day="${day}" data-index="${index}"><i class="fas fa-trash"></i></button>
        </li>`
      ).join('');
    }
  }
}

function afficherStocks() {
  for (const category in data.stocks) {
    const list = document.getElementById(`stocks-${category}`);
    if (list) {
      list.innerHTML = data.stocks[category].map((stock, index) => {
        const isExpiringSoon = stock.expiry && new Date(stock.expiry) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        return `
          <li class="${isExpiringSoon ? 'expiring-soon' : ''}">
            <div>
              <strong>${stock.name}</strong> (${stock.quantity}) - ${stock.expiry || 'Pas de date'}
            </div>
            <button class="delete-btn" data-category="${category}" data-index="${index}"><i class="fas fa-trash"></i></button>
          </li>
        `;
      }).join('');
    }
  }
}

function afficherCourses() {
  const list = document.getElementById('liste-courses');
  list.innerHTML = data.courses.map((course, index) =>
    `<li>
      ${course}
      <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
    </li>`
  ).join('');
}

// Suppression
document.addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn')) {
    const btn = e.target.closest('.delete-btn');
    const index = btn.dataset.index;
    if (btn.dataset.day) {
      const day = btn.dataset.day;
      data.repas[day].splice(index, 1);
    } else if (btn.dataset.category) {
      const category = btn.dataset.category;
      data.stocks[category].splice(index, 1);
    } else {
      data.courses.splice(index, 1);
    }
    sauvegarderDonnees();
    afficherRepas();
    afficherStocks();
    afficherCourses();
  }
});

// Sauvegarde
function sauvegarderDonnees() {
  localStorage.setItem('repas', JSON.stringify(data.repas));
  localStorage.setItem('stocks', JSON.stringify(data.stocks));
  localStorage.setItem('courses', JSON.stringify(data.courses));
}

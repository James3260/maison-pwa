function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// REPAS
function saveRepas() {
  const repas = document.getElementById('repasInput').value;
  localStorage.setItem('repasDuJour', repas);
  document.getElementById('repasAffiche').innerText = repas;
}

document.getElementById('repasAffiche').innerText =
  localStorage.getItem('repasDuJour') || '';

// STOCKS
function addStock() {
  const nom = stockNom.value;
  const qte = stockQte.value;
  const stocks = JSON.parse(localStorage.getItem('stocks') || '[]');
  stocks.push({ nom, qte });
  localStorage.setItem('stocks', JSON.stringify(stocks));
  renderStocks();
}

function renderStocks() {
  const list = document.getElementById('stockListe');
  list.innerHTML = '';
  const stocks = JSON.parse(localStorage.getItem('stocks') || '[]');
  stocks.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.nom} – ${s.qte}`;
    list.appendChild(li);
  });
}
renderStocks();

// TACHES
function addTache() {
  const taches = JSON.parse(localStorage.getItem('taches') || '[]');
  taches.push(tacheInput.value);
  localStorage.setItem('taches', JSON.stringify(taches));
  renderTaches();
}

function renderTaches() {
  const list = document.getElementById('tacheListe');
  list.innerHTML = '';
  const taches = JSON.parse(localStorage.getItem('taches') || '[]');
  taches.forEach(t => {
    const li = document.createElement('li');
    li.textContent = t;
    list.appendChild(li);
  });
}
renderTaches();

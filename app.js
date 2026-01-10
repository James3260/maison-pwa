// Dans la fonction afficherRepas()
function afficherRepas() {
  const liste = document.getElementById('liste-repas');
  liste.innerHTML = repas.map((r, index) =>
    `<li>
      ${r}
      <button class="delete" data-index="${index}" data-type="repas">Supprimer</button>
    </li>`
  ).join('');
}

// Dans la fonction afficherStocks()
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

// Ajoute cet écouteur d'événement pour la suppression
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = e.target.dataset.index;
    const type = e.target.dataset.type;
    if (type === 'repas') {
      repas.splice(index, 1);
    } else if (type === 'stock') {
      stocks.splice(index, 1);
    }
    sauvegarderDonnees();
    afficherRepas();
    afficherStocks();
  }
});

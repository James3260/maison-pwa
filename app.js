function go(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.bottom-nav button').forEach(b => b.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  event.currentTarget.classList.add('active');
}

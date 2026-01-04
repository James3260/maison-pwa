self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('maison-cache').then(cache =>
      cache.addAll(['./','index.html','style.css','app.js'])
    )
  );
});

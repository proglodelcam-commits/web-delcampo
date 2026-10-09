/* PG del Campo — Service Worker PWA */
const CACHE = 'pgdelcampo-v1';
const CORE = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.webmanifest',
  './img/logo-pg.png',
  './img/icon-192.png',
  './img/icon-512.png'
];

// Instalación: precache de archivos base (tolerante a fallos)
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.allSettled(CORE.map(function (url) { return cache.add(url); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

// Activación: limpiar cachés antiguas
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) { return caches.delete(k); }
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Fetch: network-first para navegación, cache-first para estáticos
self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') { return; }

  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(function (cached) {
      return cached || fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      }).catch(function () { return cached; });
    })
  );
});

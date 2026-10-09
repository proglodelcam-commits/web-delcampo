/* PG del Campo — Service Worker PWA
 * v3: estrategia "red primero" (network-first) para que los cambios del sitio
 * se vean enseguida al recargar, y la caché solo sirva de respaldo sin conexión.
 * Al subir una versión nueva, sube el número de CACHE (v3 -> v4) para forzar
 * la limpieza de la caché anterior en todos los dispositivos.
 */
const CACHE = 'pgdelcampo-v3';
const CORE = [
  './',
  './index.html',
  './css/styles.css',
  './manifest.webmanifest',
  './img/logo-pg.png',
  './img/icon-192.png',
  './img/icon-512.png'
];

// Instalación: precache base + activar de inmediato la nueva versión
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return Promise.allSettled(CORE.map(function (url) { return cache.add(url); }));
    }).then(function () { return self.skipWaiting(); })
  );
});

// Activación: borrar TODAS las cachés antiguas y tomar control ya
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) { return caches.delete(k); }
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

// Fetch: RED PRIMERO para todo (navegación y estáticos).
// Si hay internet, siempre trae el archivo más reciente y actualiza la caché;
// si no hay internet, usa la copia guardada (modo offline).
self.addEventListener('fetch', function (event) {
  const req = event.request;
  if (req.method !== 'GET') { return; }

  event.respondWith(
    fetch(req).then(function (res) {
      // Guardar copia fresca solo de respuestas válidas del mismo origen
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
      }
      return res;
    }).catch(function () {
      // Sin conexión: devolver caché; para navegación, caer al index
      return caches.match(req).then(function (r) {
        return r || (req.mode === 'navigate' ? caches.match('./index.html') : undefined);
      });
    })
  );
});

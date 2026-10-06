// Service Worker — PG del Campo PWA
const CACHE_NAME = 'pg-del-campo-v3';
const PRECACHE = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/config.js',
  '/js/main.js',
  '/manifest.webmanifest'
];

// Install: pre-cache shell
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

// Activate: limpiar cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

// Fetch: cache-first para shell, network-first para API
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // No cachear Apps Script (chatbot) ni LAFISE
  if (url.hostname.includes('script.google.com') || url.hostname.includes('lafise.com') || url.hostname.includes('firebaseio.com') || url.hostname.includes('gstatic.com')) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp.ok && (url.origin === self.location.origin)) {
          const clone = resp.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return resp;
      });
    })
  );
});

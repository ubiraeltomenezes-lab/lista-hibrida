const CACHE_NAME = 'mondialle-v1';
const ARQUIVOS_CACHE = [
  './',
  './index.html',
  './style.css', // Altere para o nome do seu arquivo CSS, se houver
  './script.js'  // Altere para o nome do seu arquivo JS
];

// Instala o Service Worker e guarda os arquivos em cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ARQUIVOS_CACHE);
    })
  );
  self.skipWaiting();
});

// Ativa o SW e remove caches antigos
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepta as requisições e entrega o conteúdo do cache se estiver offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((respostaCache) => {
      return respostaCache || fetch(e.request);
    })
  );
});
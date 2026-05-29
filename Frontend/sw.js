const CACHE_NAME = 'ezycart-v1';
const urlsToCache = [
  './',
  './index.html',
  './categories.html',
  './styles/style.css',
  './styles/styles.css',
  './scripts/theme.js',
  './assets/logo/cart.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Do not fail installation if some assets are missing
        return Promise.allSettled(
          urlsToCache.map(url => cache.add(url).catch(e => console.error(`Cache add failed for ${url}:`, e)))
        );
      })
  );
});

self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

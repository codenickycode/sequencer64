const cacheName = 'v4';

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (e) => {
  console.log('Service Worker: installed');
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (e) => {
  console.log('Service Worker: activated');
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker: clearing old cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: fetching');
  e.respondWith(
    caches
      .match(e.request)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        fetch(e.request).then((res) => {
          const resClone = res.clone();
          caches.open(cacheName).then((cache) => {
            cache.put(e.request, resClone);
          });
          return res;
        });
      })
  );
});

const cacheName = "Bpl-cache-v2"

self.addEventListener('install', (event) => {
    const urlsToPrefetch = [
        "/home",
        "/exercises",
        "/offline",
        "/css/main.css",
        "/css/font-awesome.min.css",
        "/js/clientPartialsControllers/toggleNavMenu.js",
        "/js/ClientPagesControllers/ClientDashboardControllers.js",
        "/serviceWorker.js",
        "/serviceWorkerRegister.js",
    ]
    
      console.log(
        "Handling install event. Resources to pre-fetch:",
        urlsToPrefetch,
      );
    
      event.waitUntil(
        caches
          .open(cacheName)
          .then((cache) => {
            return cache
              .addAll(
                urlsToPrefetch.map((urlToPrefetch) => {
                  return new Request(urlToPrefetch, { mode: "no-cors" });
                }),
              )
              .then(() => {
                console.log("All resources have been fetched and cached.");
              });
          })
          .catch((error) => {
            console.error("Pre-fetching failed:", error);
          }),
      );

      self.skipWaiting();
})

self.addEventListener('activate', event => {
    console.log('Service Worker activated');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Deleting old cache:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
  console.log("service worker: fetching");

  // Let the browser do its default thing for non-GET requests.
  if (event.request.method !== "GET") return;

  // Prevent the default, and handle the request ourselves.
  event.respondWith(
    (async () => {
      // Try to get the response from a cache.
      const cache = await caches.open(cacheName);
      const cachedResponse = await cache.match(event.request);

      if (cachedResponse) {
        // If we found a match in the cache, return it, but also update
        // the entry in the cache in the background.
        event.waitUntil(
          fetch(event.request).then((networkResponse) => {
            // Clone the response so we can use it both for the cache
            // and the network request.
            cache.put(event.request, networkResponse.clone());
          })
        );
        console.log("service worker fetched:", cachedResponse);
        return cachedResponse;  // Serve the cached response
      }

      // If we didn't find a match in the cache, use the network.
      return fetch(event.request).then((networkResponse) => {
        // Clone the network response before putting it in the cache
        const responseClone = networkResponse.clone();
        // Cache the cloned response
        event.waitUntil(
          caches.open(cacheName).then((cache) => {
            cache.put(event.request, responseClone);
          })
        );
        return networkResponse;  // Serve the network response
      });
    })()
  );
});
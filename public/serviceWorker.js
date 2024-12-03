const cacheName = "Bpl-cache-v1"

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

  if (event.request.method !== "GET") return; // Ignore non-GET requests

  event.respondWith(
    (async () => {
      const cache = await caches.open(cacheName);

      try {
        // Attempt to fetch from the cache
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          // If cache hit, update in the background and return cached response
          event.waitUntil(
            fetch(event.request).then((networkResponse) => {
              cache.put(event.request, networkResponse.clone());
            })
          );
          return cachedResponse;
        }

        // No cached response, fetch from the network
        const networkResponse = await fetch(event.request);
        event.waitUntil(
          cache.put(event.request, networkResponse.clone())
        );
        return networkResponse;
      } catch (error) {
        // Network request failed, fallback to offline page
        console.log("Fetch failed; serving offline page instead.", error);
        const offlinePage = await cache.match('/offline.ejs');
        if (offlinePage) {
          return offlinePage; // Serve the offline page
        }

        // Optional fallback response
        return new Response('Offline page not available', {
          status: 404,
          statusText: 'Not Found',
        });
      }
    })
  );
});
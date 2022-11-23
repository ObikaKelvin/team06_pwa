const THEBYTE = "the-byte-v1";

var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + THEBYTE
};


const assets = [
    "./",
    "./index.html",
    "../src/js/home.js",
]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(THEBYTE).then(cache => {
      return cache.addAll(assets)
    })
  )
});

const OFFLINE_VERSION = 1;
const CACHE_NAME = 'offline';
// Customize this with a different URL if needed.
const OFFLINE_URL = 'offline.html';

self.addEventListener("activate", async () => {
    console.log("activated")
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
});

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
      event.respondWith((async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }
  
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log('Fetch failed; returning offline page instead.', error);
  
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })());
    }
});


// This is the service worker file
const CACHE_NAME = "my-app-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/static/css/main.chunk.css",
    "/static/js/main.chunk.js",
    "/static/js/1.chunk.js",
    "/static/js/bundle.js",
    "/manifest.json",
    "/favicon.ico",
    "/icons/icon-192x192.png", // Add any other icons here
    "/icons/icon-512x512.png",
];

// Install the service worker and cache important assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event - serving cached content when offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});

const VERSION = "v1";
const PAGES_CACHE = `pages-${VERSION}`;
const ASSETS_CACHE = `assets-${VERSION}`;
const OFFLINE_URL = "/offline";
const PRECACHE_URLS = [
  "/",
  OFFLINE_URL,
  "/sprites.png",
  "/favicon/site.webmanifest?v=pixel-3",
  "/favicon/android-chrome-192x192.png?v=pixel-3",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(PAGES_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  const current = new Set([PAGES_CACHE, ASSETS_CACHE]);
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => !current.has(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

async function networkFirst(request) {
  const cache = await caches.open(PAGES_CACHE);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request)) || (await cache.match(OFFLINE_URL));
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(ASSETS_CACHE);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response.ok) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached);
  return cached || network;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  const isFont = url.origin === "https://fonts.googleapis.com" || url.origin === "https://fonts.gstatic.com";
  if (url.origin !== self.location.origin && !isFont) return;
  if (url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  // Page data for client-side navigation behaves like a page.
  if (url.pathname.startsWith("/_next/data/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isFont || url.pathname.startsWith("/_next/static/") || /\.(png|jpe?g|gif|svg|webp|avif|ico|woff2?|css|js)$/.test(url.pathname)) {
    event.respondWith(staleWhileRevalidate(request));
  }
});

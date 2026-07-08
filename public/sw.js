importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

if (workbox) {
  console.log('Workbox is loaded');
  
  // Cache all static assets (images, fonts, etc.)
  workbox.routing.registerRoute(
    ({request}) => request.destination === 'image' || request.destination === 'font' || request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'static-assets',
    })
  );

  // Cache API responses for /api/today-session
  workbox.routing.registerRoute(
    ({url}) => url.pathname === '/api/today-session',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'api-today-session',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [200],
        }),
      ],
    })
  );

  // Offline fallback
  const fallbacksCache = 'offline-fallbacks';
  const offlineFallbackPage = '/offline';

  self.addEventListener('install', async (event) => {
    event.waitUntil(
      caches.open(fallbacksCache).then((cache) => cache.add(offlineFallbackPage))
    );
  });

  workbox.routing.setCatchHandler(async ({event}) => {
    switch (event.request.destination) {
      case 'document':
        return caches.match(offlineFallbackPage);
      default:
        return Response.error();
    }
  });

} else {
  console.log('Workbox could not be loaded');
}

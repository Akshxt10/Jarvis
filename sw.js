/* JARVIS service worker: caches the app shell only.
   It never touches localStorage and never caches user data, API keys or POST requests. */
const CACHE = 'jarvis-v1-shell-11'; // change this number whenever you redeploy new files
const SHELL = ['./', 'index.html', 'styles.css', 'app.js', 'manifest.webmanifest', 'offline.html', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Network first (so redeploys show up), cache fallback when offline.
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET' || u.origin !== location.origin) return; // ignore POST and other sites
  e.respondWith(
    fetch(r).then(res => {
      if (res.ok && res.type === 'basic') { const copy = res.clone(); caches.open(CACHE).then(c => c.put(r, copy)); }
      return res;
    }).catch(() =>
      caches.match(r).then(hit => hit || (r.mode === 'navigate'
        ? caches.match('index.html').then(i => i || caches.match('offline.html'))
        : Response.error()))
    )
  );
});

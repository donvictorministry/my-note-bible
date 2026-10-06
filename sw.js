/*
 * DV Note & Bible service worker.
 * Keeps the app working offline. There is no cache number to change any more:
 * update.js asks this worker to compare the saved files with your website, and when the user taps
 * Update Now, this worker downloads every file first and only then swaps them in.
 * If you add a new file to the app, add its name to the dvA list below.
 */
const dvC = 'dv-note-bible-app';
const dvA = ['./', 'index.html', 'styles.css', 'script.js', 'daily-verse.js', 'transfer.js', 'reach.js', 'update.js', 'about-app.js', 'about-dev.js', 'contact-us.js', 'settings.js', 'desktop-blocker.js', 'manifest.json', 'privacy.html', 'icons/icon-192.png', 'icons/icon-512.png'];

const dvUrl = (f) => new URL(f, self.registration.scope).href;
const dvHex = async (buf) => Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', buf)), (b) => b.toString(16).padStart(2, '0')).join('');

// Download every app file from the website (mode 'no-cache' = ask the server if it changed, 'reload' = always fresh)
const dvFetchAll = async (mode) => {
  const items = [];
  let failed = false;
  await Promise.all(dvA.map(async (f) => {
    try {
      const r = await fetch(dvUrl(f), { cache: mode });
      if (r.ok) items.push({ f: f, url: dvUrl(f), r: r });
    } catch (e) { failed = true; }
  }));
  return { items: items, failed: failed };
};

// Which saved files differ from the website, and how new is the newest one
const dvCheck = async () => {
  const fresh = await dvFetchAll('no-cache');
  if (fresh.failed) return { error: true };
  const cache = await caches.open(dvC);
  const changed = [];
  let latest = 0;
  for (const it of fresh.items) {
    const saved = await cache.match(it.url);
    const now = await dvHex(await it.r.clone().arrayBuffer());
    if (!saved || (await dvHex(await saved.clone().arrayBuffer())) !== now) {
      changed.push(it.f);
      const lm = Date.parse(it.r.headers.get('last-modified') || '');
      if (lm > latest) latest = lm;
    }
  }
  return { changed: changed, date: latest };
};

// Download everything first; only if all of it arrived, replace the saved files
const dvApply = async () => {
  const fresh = await dvFetchAll('reload');
  if (fresh.failed || !fresh.items.length) return { ok: false };
  const cache = await caches.open(dvC);
  await Promise.all(fresh.items.map((it) => cache.put(it.url, it.r)));
  return { ok: true };
};

self.addEventListener('install', (e) => e.waitUntil((async () => {
  const cache = await caches.open(dvC);
  if ((await cache.keys()).length === 0) {
    const all = await dvFetchAll('reload');
    await Promise.all(all.items.map((it) => cache.put(it.url, it.r)));
  }
  await self.skipWaiting();
})()));

self.addEventListener('activate', (e) => e.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter((k) => k.indexOf('dv-note-bible-') === 0 && k !== dvC).map((k) => caches.delete(k)));
  await self.clients.claim();
})()));

self.addEventListener('message', (e) => {
  const d = e.data || {};
  const port = e.ports && e.ports[0];
  if (!port) return;
  const run = d.type === 'dv-check' ? dvCheck : (d.type === 'dv-apply' ? dvApply : null);
  if (!run) return;
  e.waitUntil(run().then((r) => port.postMessage(r)).catch(() => port.postMessage({ error: true })));
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (e.request.mode === 'navigate' && /\/[A-DURFG][A-Za-z0-9_-]+-DVNote$/.test(new URL(e.request.url).pathname)) {
    e.respondWith(caches.match('index.html').then((r) => r || fetch(e.request)));
    return;
  }
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request).catch(() => e.request.mode === 'navigate' ? caches.match('index.html') : Response.error())));
});

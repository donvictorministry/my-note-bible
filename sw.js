const dvC='dv-note-bible-v4.6',dvA=['./','index.html','styles.css','script.js','daily-verse.js','about-app.js','about-dev.js','contact-us.js','settings.js','desktop-blocker.js','manifest.json'];
self.addEventListener('install',e=>e.waitUntil(caches.open(dvC).then(c=>c.addAll(dvA)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==dvC).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())))});

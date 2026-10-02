const dvC='dv-note-bible-v7.2',dvA=['./','index.html','styles.css','script.js','daily-verse.js','transfer.js','reach.js','about-app.js','about-dev.js','contact-us.js','settings.js','desktop-blocker.js','manifest.json','privacy.html','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(dvC).then(c=>c.addAll(dvA)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==dvC).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):Response.error())))});

(() => {
  'use strict';
  if (window.dvBlocked || !('serviceWorker' in navigator)) return;

  // ==========================================================================
  // DV NOTE & BIBLE: automatic update prompt.
  // Asks the service worker (sw.js) whether any app file on your website differs from the saved copy.
  // If yes, a "New version available" box offers Update Now or Later. Nothing for you to bump by hand.
  // ==========================================================================
  const RECHECK_MS = 4 * 60 * 60 * 1000; // look again when the app is brought back after 4 hours
  let pending = null, later = false, showing = false, waiting = false, lastCheck = 0;

  const ask = (msg) => new Promise((res) => {
    const sw = navigator.serviceWorker.controller;
    if (!sw) { res(null); return; }
    const ch = new MessageChannel();
    const t = setTimeout(() => res(null), 60000);
    ch.port1.onmessage = (e) => { clearTimeout(t); res(e.data); };
    sw.postMessage(msg, [ch.port2]);
  });

  // Never interrupt: writing a note, another dialog, the verse popup or the verse page
  const busy = () => document.hidden ||
    !!document.getElementById('dv-verse-popup') ||
    !!document.getElementById('dv-daily-verse-modal') ||
    !!document.querySelector('#dvEditor.dvOn') ||
    !!document.querySelector('#dvModal.dvOn');

  const fmt = (ms) => ms ? new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  const show = () => {
    showing = true;
    const date = fmt(pending && pending.date);

    const overlay = document.createElement('div');
    overlay.id = 'dv-update';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:1000001;background:rgba(0,0,0,0.5);display:grid;place-items:center;';

    const box = document.createElement('div');
    box.style.cssText = 'width:90dvw;max-height:90dvh;overflow-y:auto;background:var(--dvBg,#fff);color:var(--dvFg,#000);border-radius:28px;padding:24px;';

    const title = document.createElement('h2');
    title.textContent = 'New version available';
    title.style.cssText = 'font-size:22px;text-align:center;margin:0 0 14px;';

    const msg = document.createElement('p');
    msg.textContent = 'A new version' + (date ? ' (' + date + ')' : '') + ' is available. Update now to get the latest features and fixes.';
    msg.style.cssText = 'font-size:19px;line-height:1.5;color:var(--dvMut,#4A5568);margin:0 0 20px;';

    const err = document.createElement('p');
    err.style.cssText = 'font-size:19px;line-height:1.5;color:#D93025;margin:-8px 0 16px;display:none;';
    err.textContent = 'Could not update. Check your internet connection and try again.';

    const go = document.createElement('button');
    go.className = 'dvBtn';
    go.style.width = '100%';
    go.textContent = 'Update Now';

    const lt = document.createElement('button');
    lt.className = 'dvBtn dvGhost';
    lt.style.cssText = 'width:100%;margin-top:12px;';
    lt.textContent = 'Later';

    lt.onclick = () => { later = true; showing = false; overlay.remove(); };
    go.onclick = async () => {
      go.disabled = true; lt.disabled = true; err.style.display = 'none';
      go.textContent = 'Updating...';
      const r = await ask({ type: 'dv-apply' });
      if (r && r.ok) { location.reload(); return; }
      go.disabled = false; lt.disabled = false; go.textContent = 'Try again';
      err.style.display = 'block';
    };

    box.appendChild(title); box.appendChild(msg); box.appendChild(err); box.appendChild(go); box.appendChild(lt);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  };

  const tryShow = () => {
    if (!pending || later || showing || waiting) return;
    if (!busy()) { show(); return; }
    waiting = true;
    setTimeout(() => { waiting = false; tryShow(); }, 2500);
  };

  const check = async () => {
    lastCheck = Date.now();
    const r = await ask({ type: 'dv-check' });
    if (r && r.changed) { pending = r.changed.length ? r : null; tryShow(); }
  };

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    if (Date.now() - lastCheck > RECHECK_MS) check(); else tryShow();
  });

  const start = () => setTimeout(check, 5000);
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);

  window.dvUpdate = { check: check };
})();

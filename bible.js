(() => {
  'use strict';
  if (window.dvBlocked) return;
  const root = document.getElementById('dvV-bible');
  if (!root) return;

  // ==========================================================================
  // DV NOTE & BIBLE: the Bible tab. Reads kjv.json from your own website (no outside service),
  // saves it on the phone for offline reading, and gives Books / Chapters / Verse pickers.
  // ==========================================================================
  const dvBibleFile = 'kjv.json';
  const NAMES = ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi', 'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon', 'Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude', 'Revelation'];
  const SEARCH_ICON = 'M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z';

  let bible = null;          // list of books; each book is a list of chapters; each chapter is a list of verse texts
  let names = NAMES;
  let pos = { b: 0, c: 0 };
  let loading = null;
  try { const s = JSON.parse(localStorage.getItem('dvNbPos') || 'null'); if (s && s.b >= 0 && s.c >= 0) pos = { b: s.b | 0, c: s.c | 0 }; } catch (e) { /* first visit */ }

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const $ = (id) => document.getElementById(id);

  // ---------- Styles (kept here so this file is self-contained) ----------
  const css = document.createElement('style');
  css.textContent = [
    '.dvBkBtn{flex:1;min-width:0;height:56px;border:2px solid var(--dvBd);border-radius:16px;background:var(--dvCard);color:var(--dvFg);font-weight:700;font-size:21px}',
    '.dvBkBtn:active,.dvBkCell:active,.dvBkBook:active{background:rgba(24,119,242,.2)}',
    '.dvBkHead{font-size:24px;color:var(--dvA);margin:0 0 6px}',
    '.dvBkNav{display:flex;gap:10px;margin:18px 0 8px}.dvBkNav .dvBtn{flex:1}',
    '.dvVs{border-radius:10px}',
    '.dvVs.dvHot{background:#FFF176;color:#111;box-shadow:0 0 0 6px #FFF176}.dvVs.dvHot b{color:#0A4FC4}',
    '#dvBText ::selection{background:#FFE082;color:#111}',
    '#dvBText .dvVs{-webkit-tap-highlight-color:transparent}',
    '.dvBkPick{position:fixed;left:0;right:0;z-index:40;overflow-y:auto;background:var(--dvCard);padding:12px}',
    '.dvBkCard{background:var(--dvBg);border-radius:24px;padding:16px;min-height:100%}',
    '.dvBkTitle{display:flex;align-items:center;gap:8px;margin-bottom:14px}.dvBkTitle h2{flex:1;font-size:23px;color:var(--dvA);margin:0}',
    '.dvBkX{flex:none;width:48px;height:48px;border:0;border-radius:50%;background:var(--dvCard);display:grid;place-items:center}',
    '.dvBkGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}',
    '.dvBkCell{height:60px;border:2px solid var(--dvBd);border-radius:16px;background:var(--dvCard);color:var(--dvFg);font-size:22px;font-weight:700}',
    '.dvBkCell.dvBkCur{background:var(--dvG);color:#fff;border-color:transparent}',
    '.dvBkBook{display:block;width:100%;text-align:left;height:58px;padding:0 18px;margin-bottom:10px;border:2px solid var(--dvBd);border-radius:16px;background:var(--dvCard);color:var(--dvFg);font-size:21px;font-weight:700}',
    '.dvBkBook.dvBkCur{background:var(--dvG);color:#fff;border-color:transparent}',
    '.dvBkSec{font-size:22px;font-weight:700;color:var(--dvA);margin:16px 0 10px}',
    '.dvHdrSw{display:flex;align-items:center;gap:8px;color:#fff;font-size:19px;font-weight:500;margin-right:2px}.dvHdrSw .dvSw:checked{background:#FFD54F}'
  ].join('\n');
  document.head.appendChild(css);

  // ---------- Screen layout ----------
  const z = Math.min(27, Math.max(23, +localStorage.dvNbFont || 23));
  document.documentElement.style.setProperty('--dvBs', z + 'px');
  root.innerHTML =
    '<div class="dvBRow"><button class="dvBkBtn" id="dvBkBooks">Books</button><button class="dvBkBtn" id="dvBkChs">Chapters</button><button class="dvBkBtn" id="dvBkVs">Verse</button></div>' +
    '<div class="dvBRow"><span class="dvBA">A</span><input type="range" id="dvBSize" min="23" max="27" step="1" value="' + z + '" aria-label="Text size"><span class="dvBA">A+</span>' +
    '<div class="dvSearch"><svg class="dvIco" viewBox="0 0 24 24"><path d="' + SEARCH_ICON + '"/></svg><input id="dvBkFind" type="search" placeholder="Search"></div></div>' +
    '<div id="dvBText"><div class="dvEmpty">Open the Bible tab to start reading.</div></div>';
  const box = $('dvBText');

  // ---------- Data: read kjv.json (any common layout) ----------
  const clean = (s) => String(s).replace(/\{[HG]\d+\}/g, '').replace(/[{}]/g, '').replace(/<[^>]*>/g, '').replace(/\u00B6/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\s+/g, ' ').trim();
  const list = (x) => Array.isArray(x) ? x : (x && typeof x === 'object' ? Object.keys(x).sort((a, b) => a - b).map((k) => x[k]) : []);
  const vtext = (v) => typeof v === 'string' ? v : ((v && (v.text || v.t || v.verse_text)) || '');
  const normalize = (raw) => {
    const books = Array.isArray(raw) ? raw : ((raw && (raw.books || raw.bible || raw.Books)) || []);
    const out = [];
    const nm = [];
    list(books).forEach((b, i) => {
      const chapters = [];
      list(b.chapters || b.c).forEach((c) => {
        const verses = (Array.isArray(c) || !c || c.verses === undefined) ? list(c) : list(c.verses);
        chapters.push(verses.map((v) => clean(vtext(v))));
      });
      out.push(chapters);
      nm.push(b.name || b.n || b.book || b.title || NAMES[i] || ('Book ' + (i + 1)));
    });
    return { books: out, names: nm };
  };

  // ---------- Saved copy (IndexedDB) so the Bible works offline ----------
  const idb = () => new Promise((res, rej) => {
    const q = indexedDB.open('dvBibleDB', 1);
    q.onupgradeneeded = () => q.result.createObjectStore('kv');
    q.onsuccess = () => res(q.result);
    q.onerror = () => rej(q.error);
  });
  const idbGet = async (k) => {
    try { const d = await idb(); return await new Promise((res) => { const r = d.transaction('kv').objectStore('kv').get(k); r.onsuccess = () => res(r.result); r.onerror = () => res(undefined); }); } catch (e) { return undefined; }
  };
  const idbSet = async (k, v) => {
    try { const d = await idb(); await new Promise((res) => { const t = d.transaction('kv', 'readwrite'); t.objectStore('kv').put(v, k); t.oncomplete = res; t.onerror = res; }); } catch (e) { /* the saved copy is optional */ }
  };

  const fileUrl = () => location.pathname.replace(/[^/]*$/, '') + dvBibleFile;
  const tagOf = (r) => r.headers.get('etag') || r.headers.get('last-modified') || '';
  const install = (n) => { bible = n.books; names = n.books.length === 66 ? NAMES : n.names; };
  const fetchBible = async () => {
    const r = await fetch(fileUrl());
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const n = normalize(JSON.parse((await r.text()).replace(/^\uFEFF/, '')));
    if (!n.books.length) throw new Error('empty');
    await idbSet('kjv', { tag: tagOf(r), books: n.books, names: n.names });
    return n;
  };
  const revalidate = async (tag) => {
    try {
      const r = await fetch(fileUrl(), { method: 'HEAD', cache: 'no-store' });
      const t = tagOf(r);
      if (r.ok && t && tag && t !== tag) install(await fetchBible());
    } catch (e) { /* offline: keep the saved copy */ }
  };
  const ensure = () => {
    if (bible) return Promise.resolve();
    if (!loading) {
      loading = (async () => {
        const hit = await idbGet('kjv');
        if (hit && hit.books && hit.books.length) { install(hit); revalidate(hit.tag); return; }
        install(await fetchBible());
      })().finally(() => { loading = null; });
    }
    return loading;
  };

  // ---------- Reading ----------
  const clamp = () => {
    pos.b = Math.min(Math.max(pos.b, 0), bible.length - 1);
    pos.c = Math.min(Math.max(pos.c, 0), bible[pos.b].length - 1);
  };
  const hideBar = () => document.dispatchEvent(new Event('dvbible:navigate'));
  const lastChapter = () => pos.b === bible.length - 1 && pos.c === bible[pos.b].length - 1;

  const show = (b, c, verse) => {
    pos = { b: b, c: c };
    clamp();
    try { localStorage.setItem('dvNbPos', JSON.stringify(pos)); } catch (e) { /* ignore */ }
    const vs = bible[pos.b][pos.c];
    hideBar();
    let h = '<h3 class="dvBkHead">' + esc(names[pos.b]) + ' ' + (pos.c + 1) + '</h3>';
    vs.forEach((t, i) => { h += '<p class="dvVs" data-v="' + (i + 1) + '"><b>' + (i + 1) + '</b> ' + esc(t) + '</p>'; });
    h += '<div class="dvBkNav"><button class="dvBtn dvGhost" data-dvbk="prev"' + (pos.b === 0 && pos.c === 0 ? ' disabled' : '') + '>Previous</button><button class="dvBtn" data-dvbk="next"' + (lastChapter() ? ' disabled' : '') + '>Next</button></div>';
    box.innerHTML = h;
    const f = $('dvBkFind');
    if (f) f.value = '';
    box.scrollTop = 0;
    if (verse) {
      const p = box.querySelector('.dvVs[data-v="' + verse + '"]');
      if (p) { p.scrollIntoView({ block: 'start' }); p.click(); }
    }
  };
  const step = (d) => {
    let b = pos.b, c = pos.c + d;
    if (c < 0) { if (b === 0) return; b--; c = bible[b].length - 1; }
    else if (c >= bible[b].length) { if (b === bible.length - 1) return; b++; c = 0; }
    show(b, c);
  };

  const message = (text, retry) => {
    box.innerHTML = '<div class="dvEmpty">' + esc(text) + '</div>' + (retry ? '<button class="dvBtn" style="width:100%" data-dvbk="retry">Try again</button>' : '');
  };
  const open = () => {
    if (bible) { if (!box.querySelector('.dvVs') && !box.querySelector('[data-dvg]')) show(pos.b, pos.c); return; }
    message('Loading the Bible...');
    ensure().then(() => show(pos.b, pos.c)).catch(() => message('The Bible could not be loaded. Please check your internet connection and try again.', true));
  };
  window.dvBibleOpen = open;
  window.dvBible = { where: () => (bible ? { book: names[pos.b], chapter: pos.c + 1 } : null) };

  // ---------- Search ----------
  let timer = 0;
  const search = (q) => {
    const found = [];
    let total = 0;
    bible.forEach((chs, b) => chs.forEach((vs, c) => vs.forEach((t, v) => {
      if (t.toLowerCase().indexOf(q) < 0) return;
      total++;
      if (found.length < 100) found.push({ b: b, c: c, v: v, t: t });
    })));
    let h = '<h3 class="dvBkHead">' + total + (total === 1 ? ' verse found' : ' verses found') + '</h3>';
    found.forEach((f) => { h += '<p class="dvVs" data-dvg="' + f.b + ':' + f.c + ':' + (f.v + 1) + '"><b>' + esc(names[f.b]) + ' ' + (f.c + 1) + ':' + (f.v + 1) + '</b> ' + esc(f.t) + '</p>'; });
    if (total > 100) h += '<div class="dvEmpty">Showing the first 100. Add more words to narrow it down.</div>';
    box.innerHTML = h;
    box.scrollTop = 0;
    hideBar();
  };

  // ---------- Full page pickers ----------
  const closePick = () => { const p = $('dvBkPick'); if (p) p.remove(); };
  const shell = (title) => {
    closePick();
    hideBar();
    const bar = $('dvBar'), nav = $('dvNav');
    const p = document.createElement('div');
    p.id = 'dvBkPick';
    p.className = 'dvBkPick';
    p.style.top = (bar ? bar.offsetHeight : 0) + 'px';
    p.style.bottom = (nav ? nav.offsetHeight : 0) + 'px';
    p.innerHTML = '<div class="dvBkCard"><div class="dvBkTitle"><h2></h2><button class="dvBkX" aria-label="Close"><svg class="dvIco" viewBox="0 0 24 24"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4 10.6 12 5 17.6 6.4 19 12 13.4 17.6 19 19 17.6 13.4 12z"/></svg></button></div><div id="dvBkBody"></div></div>';
    p.querySelector('h2').textContent = title;
    p.querySelector('.dvBkX').onclick = closePick;
    document.body.appendChild(p);
    return $('dvBkBody');
  };
  const grid = (count, current, onPick) => {
    let h = '<div class="dvBkGrid">';
    for (let i = 1; i <= count; i++) h += '<button class="dvBkCell' + (i === current ? ' dvBkCur' : '') + '" data-n="' + i + '">' + i + '</button>';
    return h + '</div>';
  };
  const openChapters = (b) => {
    const body = shell(names[b] + ' - Chapters');
    body.innerHTML = grid(bible[b].length, b === pos.b ? pos.c + 1 : 0);
    body.onclick = (e) => { const t = e.target.closest('[data-n]'); if (!t) return; closePick(); show(b, +t.dataset.n - 1); };
  };
  const openVerses = () => {
    const body = shell(names[pos.b] + ' ' + (pos.c + 1) + ' - Verses');
    body.innerHTML = grid(bible[pos.b][pos.c].length, 0);
    body.onclick = (e) => { const t = e.target.closest('[data-n]'); if (!t) return; closePick(); show(pos.b, pos.c, +t.dataset.n); };
  };
  const openBooks = () => {
    const body = shell('Books');
    const mk = (i) => '<button class="dvBkBook' + (i === pos.b ? ' dvBkCur' : '') + '" data-b="' + i + '">' + esc(names[i]) + '</button>';
    const paint = (q) => {
      let h = '', ot = '', nt = '', all = '';
      names.forEach((n, i) => {
        if (q && n.toLowerCase().indexOf(q) < 0) return;
        if (bible.length === 66) { if (i < 39) ot += mk(i); else nt += mk(i); } else all += mk(i);
      });
      if (ot) h += '<div class="dvBkSec">Old Testament</div>' + ot;
      if (nt) h += '<div class="dvBkSec">New Testament</div>' + nt;
      h += all;
      $('dvBkList').innerHTML = h || '<div class="dvEmpty">No book found.</div>';
    };
    body.innerHTML = '<div class="dvSearch" style="margin-bottom:6px"><svg class="dvIco" viewBox="0 0 24 24"><path d="' + SEARCH_ICON + '"/></svg><input id="dvBkBookFind" type="search" placeholder="Search books"></div><div id="dvBkList"></div>';
    paint('');
    $('dvBkBookFind').oninput = (e) => paint(e.target.value.trim().toLowerCase());
    body.onclick = (e) => { const t = e.target.closest('[data-b]'); if (t) openChapters(+t.dataset.b); };
  };
  const needBible = (fn) => () => {
    if (bible) { fn(); return; }
    ensure().then(() => { show(pos.b, pos.c); fn(); }).catch(() => message('The Bible could not be loaded. Please check your internet connection and try again.', true));
  };
  $('dvBkBooks').onclick = needBible(openBooks);
  $('dvBkChs').onclick = needBible(() => openChapters(pos.b));
  $('dvBkVs').onclick = needBible(openVerses);

  // ---------- Controls inside the reading area ----------
  $('dvBSize').oninput = (e) => { document.documentElement.style.setProperty('--dvBs', e.target.value + 'px'); try { localStorage.setItem('dvNbFont', e.target.value); } catch (x) { /* ignore */ } };
  $('dvBkFind').oninput = (e) => {
    clearTimeout(timer);
    const q = e.target.value.trim().toLowerCase();
    timer = setTimeout(() => { if (!bible) return; if (q.length >= 3) search(q); else show(pos.b, pos.c); }, 300);
  };
  box.addEventListener('click', (e) => {
    const nav = e.target.closest('[data-dvbk]');
    if (nav) { const a = nav.dataset.dvbk; if (a === 'prev') step(-1); else if (a === 'next') step(1); else if (a === 'retry') open(); return; }
    const r = e.target.closest('[data-dvg]');
    if (r) { const g = r.dataset.dvg.split(':'); show(+g[0], +g[1], +g[2]); }
  });

  // ---------- Dark mode switch in the header (Bible tab only) ----------
  const bar = $('dvBar'), more = bar ? bar.querySelector('[data-dvact="openr"]') : null;
  const sw = document.createElement('label');
  sw.className = 'dvHdrSw';
  sw.hidden = true;
  sw.innerHTML = '<span>Dark</span><input type="checkbox" class="dvSw" aria-label="Dark mode">';
  if (bar) bar.insertBefore(sw, more);
  const swBox = sw.querySelector('input');
  const syncSwitch = () => { try { swBox.checked = window.dvSettings.get().theme === 'dark'; } catch (e) { /* settings not ready */ } };
  swBox.onchange = () => window.dvSettings.set('theme', swBox.checked ? 'dark' : 'light');
  syncSwitch();
  if (typeof window.dvApplyCfg === 'function') {
    const base = window.dvApplyCfg;
    window.dvApplyCfg = function () { base.apply(this, arguments); syncSwitch(); };
  }

  // Show the switch only on the Bible tab and close any picker when the screen changes
  const main = $('dvMain');
  if (main) {
    new MutationObserver(() => {
      const v = main.querySelector('.dvView.dvOn');
      const onBible = !!v && v.id === 'dvV-bible';
      sw.hidden = !onBible;
      if (!onBible) closePick();
    }).observe(main, { attributes: true, subtree: true, attributeFilter: ['class'] });
  }
  const nav = $('dvNav');
  if (nav) nav.addEventListener('click', closePick, true);
})();

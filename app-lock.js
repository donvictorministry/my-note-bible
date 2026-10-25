/* app-lock.js - plug-and-play lock module for Android web apps.
   Host page needs: <div id="app-lock"></div> and <script src="app-lock.js"></script>.
   Fill in CONFIG below. Leave a contact value empty to hide that button. */
(function () {
  'use strict';

  var CONFIG = {
    // SWAP: paste your real Web app URL from Deploy > Manage deployments in Apps Script
    GAS_URL: 'https://script.google.com/macros/s/AKfycbwbRU6wHuefxpx-6Vk3l40KoRaZl72xbapK8HKQh0Ha0zAEvTKICCe9WVMRyM4y8sEu/exec',
    // SWAP: the name of the host app, shown at the top of the lock screens
    APP_NAME: 'DV- Note & Bible',
    // SWAP: admin WhatsApp number, digits only, with country code, no plus sign
    WHATSAPP: '15551234567',
    // SWAP: admin Gmail address
    EMAIL: 'youradmin@gmail.com',
    // SWAP: admin phone number, with plus and country code
    PHONE: '+15551234567',
    // SWAP: full link to your Facebook page
    FACEBOOK: 'https://www.facebook.com/yourpage',
    // SWAP: direct link to your circular ministry logo image (PNG or JPG, square)
    LOGO_URL: 'https://yourname.github.io/logo.png',
    // SWAP: the "Published Status" tab link: in the sheet use File > Share > Publish to web, pick that tab, choose CSV, copy the link
    STATUS_CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQxhAhz8zA9pZaFqT8wLp5Bm38iCg6oV_JkcI9fG52YFZ255aGKo-KWI5WGxsOLDc0U3u5BctXL1D_v/pub?gid=1630462233&single=true&output=csv',
    // SWAP: full link to your Terms of Use page
    TERMS_URL: 'https://yourname.github.io/terms.html',
    // SWAP: full link to your Privacy Policy page
    PRIVACY_URL: 'https://yourname.github.io/privacy.html'
  };

  var root = document.getElementById('app-lock');
  if (!root) return;

  var SESSION_MS = 30 * 24 * 3600 * 1000;
  var BAD = ['fuck', 'shit', 'bitch', 'asshole', 'bastard', 'crap', 'dick', 'pussy', 'slut', 'whore', 'cunt', 'porn', 'ass', 'nude', 'sex'];
  var MSG_OK = 'Your account creation details has been submitted for reviews; you shall be contacted via your contact channel. If there is no response under 24 hours, please reach out through any of the channels below.';
  var LIMIT_MSG = 'Contact Administrator for assistance, or try again in twenty-four hours.';

  var ICON = {
    bell: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2z"/><path fill="#fff" d="M8 7c0 5 4 9 9 9l1.5-2-3-1.5-1.2 1.2a6 6 0 0 1-3-3L12.5 9.5 11 6.5 8 7z"/></svg>',
    mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="2"/></svg>',
    tel: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>'
  };

  var GEAR = (function () {
    var t = '';
    for (var i = 0; i < 16; i++) t += '<rect x="94" y="4" width="12" height="12" rx="2" transform="rotate(' + (i * 22.5) + ' 100 100)"/>';
    return '<svg class="al-gear" viewBox="0 0 200 200" fill="currentColor"><circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" stroke-width="8"/>' + t + '</svg>';
  })();

  var css = [
    '#app-lock,#app-lock *{box-sizing:border-box;font-family:Roboto,sans-serif;font-size:18px}',
    '#app-lock .al-wrap{position:fixed;top:0;left:0;width:100dvw;height:100dvh;background:#fff;color:#000;overflow-y:auto;padding:24px 20px 40px;z-index:2147483646;-webkit-overflow-scrolling:touch}',
    '#app-lock .al-mod{padding:0}',
    '#app-lock .al-top{text-align:center;margin-bottom:12px}',
    '#app-lock .al-logo{position:relative;width:200px;height:200px;margin:0 auto}',
    '#app-lock .al-gear{position:absolute;top:0;left:0;width:200px;height:200px;color:#1877F2;animation:als 10s linear infinite}',
    '#app-lock .al-logo img{position:absolute;top:20px;left:20px;width:160px;height:160px;border-radius:50%;object-fit:cover;background:#fff}',
    '#app-lock .al-ti{margin-bottom:6px;font-size:20px;font-weight:700}',
    '#app-lock .al-au{margin-top:8px;color:#1877F2;font-weight:700}',
    '#app-lock h1{margin:8px 0 0;color:#1877F2;font-size:26px;font-weight:700}',
    '#app-lock .al-top p{margin:4px 0 0;color:#000}',
    '#app-lock .al-tabs{display:flex;gap:10px;margin:16px 0 8px}',
    '#app-lock .al-tabs button{flex:1;height:52px;border:2px solid #1877F2;background:#fff;color:#1877F2;border-radius:10px;font-weight:700}',
    '#app-lock .al-tabs button.on{background:#1877F2;color:#fff}',
    '#app-lock label{display:block;margin:14px 0 6px;font-weight:700;color:#000}',
    '#app-lock input:not([type=checkbox]),#app-lock select{width:100%;height:52px;border:2px solid #1877F2;border-radius:10px;padding:0 12px;background:#fff;color:#000}',
    '#app-lock .al-chk{display:flex;align-items:center;gap:10px;font-weight:400}',
    '#app-lock .al-chk input{width:26px;height:26px;accent-color:#1877F2}',
    '#app-lock .al-btn{width:100%;height:56px;margin-top:20px;border:0;border-radius:10px;background:#1877F2;color:#fff;font-size:20px;font-weight:700}',
    '#app-lock .al-btn:disabled{opacity:.55}',
    '#app-lock .al-msg{margin:16px 0 0;padding:14px;border-left:6px solid #1877F2;background:#F0F2F5;color:#000;line-height:1.4}',
    '#app-lock .al-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:20px}',
    '#app-lock .al-ic{display:flex;flex-direction:column;align-items:center;gap:6px;padding:14px;border:2px solid #1877F2;border-radius:12px;color:#1877F2;text-decoration:none;font-weight:700}',
    '#app-lock .al-ic svg{width:44px;height:44px}',
    '#app-lock .al-th{margin:40px 0 18px;text-align:center}',
    '#app-lock .al-tp{margin:0 0 24px;line-height:1.7;color:#000}',
    '#app-lock .al-tp a{color:#1877F2;font-weight:700;text-decoration:none}',
    '#app-lock .al-agree{display:flex;align-items:flex-start;gap:16px;padding:18px;border:2px solid #1877F2;border-radius:20px;font-weight:400;line-height:1.5;color:#000}',
    '#app-lock .al-agree input{flex:none;width:28px;height:28px;margin:2px 0 0;accent-color:#1877F2}',
    '#app-lock .al-pill{height:60px;margin-top:24px;border-radius:30px}',
    '#app-lock .al-bell{position:fixed;top:12px;right:12px;width:56px;height:56px;border:0;border-radius:50%;background:#1877F2;color:#fff;z-index:2147483645;padding:0}',
    '#app-lock .al-bell svg{width:30px;height:30px}',
    '#app-lock .al-pulse{animation:alp 1.4s ease-out infinite}',
    '#app-lock .al-bd{position:absolute;top:-8px;right:-12px;min-width:36px;padding:0 6px;border:2px solid #1877F2;border-radius:18px;background:#fff;color:#000;font-weight:700;text-align:center}',
    '#app-lock .al-bar{position:sticky;top:0;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 12px 0 20px;background:#1877F2;color:#fff;font-size:22px;font-weight:700}',
    '#app-lock .al-bar span{color:#fff;font-size:22px}',
    '#app-lock .al-bar button{width:48px;height:48px;border:0;background:none;color:#fff;padding:6px}',
    '#app-lock .al-bar svg{width:100%;height:100%}',
    '#app-lock .al-card{width:100%;padding:18px 20px;border-bottom:2px solid #1877F2;color:#000;white-space:pre-wrap;word-break:break-word;line-height:1.45}',
    '#app-lock .al-dt{margin-bottom:6px;color:#1877F2;font-weight:700}',
    '#app-lock .al-spin{position:fixed;top:0;left:0;width:100dvw;height:100dvh;display:none;align-items:center;justify-content:center;background:rgba(255,255,255,.7);z-index:2147483647}',
    '#app-lock .al-spin.al-q{background:none;pointer-events:none}',
    '#app-lock .al-spin div{width:60px;height:60px;border:7px solid #cfe0fc;border-top-color:#1877F2;border-radius:50%;animation:als .8s linear infinite}',
    '@keyframes als{to{transform:rotate(360deg)}}',
    '@keyframes alp{0%{box-shadow:0 0 0 0 rgba(24,119,242,.75);transform:scale(1)}50%{transform:scale(1.08)}100%{box-shadow:0 0 0 20px rgba(24,119,242,0);transform:scale(1)}}'
  ].join('');
  var st = document.createElement('style');
  st.textContent = css;
  document.head.appendChild(st);

  root.innerHTML = '<div id="al-v"></div><div id="al-sp" class="al-spin"><div></div></div>';
  var V = document.getElementById('al-v'), SP = document.getElementById('al-sp');

  var LS = {
    g: function (k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
    s: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } },
    d: function (k) { try { localStorage.removeItem(k); } catch (e) { } }
  };
  var busy = 0, open = false, inModal = false, tm = 0, cdT = 0;

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function box(m) { return '<div class="al-msg">' + esc(m) + '</div>'; }
  function say(m) { var e = $('al-m'); if (e) e.innerHTML = box(m); }
  function today() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function tries() { var t = LS.g('al_try'); if (!t || t.d !== today()) t = { d: today(), n: 0, t: 0 }; return t; }
  function sess() { var s = LS.g('al_session'); return s && s.exp > Date.now() ? s : null; }

  function spin(on, q) {
    busy = Math.max(0, busy + (on ? 1 : -1));
    if (on) SP.className = 'al-spin' + (q ? ' al-q' : '');
    SP.style.display = busy ? 'flex' : 'none';
  }

  function post(d, q) {
    if (!CONFIG.GAS_URL) return Promise.resolve(null);
    spin(true, q);
    return fetch(CONFIG.GAS_URL, { method: 'POST', body: JSON.stringify(d) })
      .then(function (r) { return r.json(); })
      .catch(function () { return null; })
      .then(function (r) { spin(false); return r; });
  }

  /* ---------- Analytics data (ipapi plus device details) ---------- */

  function geo() {
    return new Promise(function (res) {
      var done = false;
      var t = setTimeout(function () { if (!done) { done = true; res({}); } }, 4000);
      fetch('https://ipapi.co/json/').then(function (r) { return r.json(); }).then(function (j) {
        if (done) return;
        done = true; clearTimeout(t);
        res({ ip: j.ip, city: j.city, region: j.region, country: j.country_name, isp: j.org });
      }).catch(function () { if (!done) { done = true; clearTimeout(t); res({}); } });
    });
  }
  function info() {
    return geo().then(function (g) {
      try { g.tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) { g.tz = ''; }
      g.ua = navigator.userAgent;
      g.lang = navigator.language;
      g.scr = screen.width + 'x' + screen.height;
      g.plat = navigator.platform || '';
      g.app = location.host + location.pathname;
      return g;
    });
  }

  /* ---------- Input checks ---------- */

  function checkName(n) {
    if (n.length < 2) return 'Please enter your name.';
    if (/http|www|@/i.test(n)) return 'Name must not contain links or the @ symbol.';
    var sym = n.replace(/[\p{L}\s]/gu, '').length;
    if (sym / n.length > 0.3) return 'Name has too many numbers or symbols.';
    if (n.length > 10 && n === n.toUpperCase() && n !== n.toLowerCase()) return 'Please do not type your name in all capital letters.';
    var w = n.toLowerCase().split(/[^a-z]+/);
    for (var i = 0; i < w.length; i++) if (BAD.indexOf(w[i]) > -1) return 'Please use a respectful name.';
    return '';
  }
  function checkContact(ch, c) {
    if (ch === 'Email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) ? '' : 'Please enter a valid email address.';
    return /^\d{7,15}$/.test(c.replace(/[\s+()-]/g, '')) ? '' : 'Enter your WhatsApp number with country code, digits only.';
  }

  /* ---------- Screens ---------- */

  function head() {
    return '<div class="al-top"><div class="al-logo">' + GEAR + '<img src="' + esc(CONFIG.LOGO_URL) + '" alt="" onerror="this.style.visibility=\'hidden\'"></div><h1>' + esc(CONFIG.APP_NAME) + '</h1><p>Secure access</p></div>';
  }
  function reach() {
    var a = [];
    if (CONFIG.WHATSAPP) a.push(['https://wa.me/' + CONFIG.WHATSAPP, ICON.wa, 'WhatsApp']);
    if (CONFIG.EMAIL) a.push(['mailto:' + CONFIG.EMAIL, ICON.mail, 'Gmail']);
    if (CONFIG.PHONE) a.push(['tel:' + CONFIG.PHONE, ICON.tel, 'Phone']);
    if (CONFIG.FACEBOOK) a.push([CONFIG.FACEBOOK, ICON.fb, 'Facebook']);
    return '<div class="al-grid">' + a.map(function (x) {
      return '<a class="al-ic" href="' + esc(x[0]) + '" target="_blank" rel="noopener">' + x[1] + '<span>' + x[2] + '</span></a>';
    }).join('') + '</div>';
  }
  function page(inner) { V.innerHTML = '<div class="al-wrap">' + head() + inner + '</div>'; }

  function showLimit(extra) {
    page((extra ? box(extra) : '') + box(LIMIT_MSG) + reach());
  }
  function blocked(m) {
    page(box(m || 'Access blocked. Contact Administrator.') + reach());
  }

  function showTerms(mode, msg) {
    V.innerHTML = '<div class="al-wrap"><h1 class="al-th">Terms &amp; Privacy Policy</h1>' +
      '<p class="al-tp">Please review our <a href="' + esc(CONFIG.TERMS_URL) + '" target="_blank" rel="noopener">Terms of Use</a> and ' +
      '<a href="' + esc(CONFIG.PRIVACY_URL) + '" target="_blank" rel="noopener">Privacy Policy</a> before proceeding.</p>' +
      '<label class="al-agree"><input type="checkbox" id="al-ag"><span>I acknowledge and agree to the Terms of Use and Privacy Policy</span></label>' +
      '<button class="al-btn al-pill" id="al-ct" disabled>Continue to Form</button></div>';
    $('al-ag').onchange = function () { $('al-ct').disabled = !this.checked; };
    $('al-ct').onclick = function () { LS.s('al_terms', 1); showLock(mode, msg); };
  }

  function showLock(mode, msg) {
    if (tries().n >= 3) return showLimit();
    if (!LS.g('al_terms')) return showTerms(mode, msg);
    mode = mode || 'up';
    var f = mode === 'up'
      ? '<label for="al-n">Name</label><input id="al-n" maxlength="40" autocomplete="name">' +
        '<label for="al-g">Gender</label><select id="al-g"><option value="">Select</option><option>Male</option><option>Female</option></select>' +
        '<label for="al-ch">Contact Channel</label><select id="al-ch"><option value="">Select</option><option>WhatsApp</option><option>Email</option></select>' +
        '<label for="al-c">WhatsApp number with country code, or Email</label><input id="al-c" maxlength="60" autocapitalize="none" autocomplete="off">'
      : '<label for="al-c">WhatsApp number or Email</label><input id="al-c" maxlength="60" autocapitalize="none" autocomplete="username">';
    page('<div class="al-tabs"><button id="al-tu" class="' + (mode === 'up' ? 'on' : '') + '">Create Account</button><button id="al-ti" class="' + (mode === 'in' ? 'on' : '') + '">Log In</button></div>' +
      f + '<label for="al-p">Password</label><input id="al-p" type="password" maxlength="40" autocomplete="' + (mode === 'up' ? 'new-password' : 'current-password') + '">' +
      '<label class="al-chk"><input type="checkbox" id="al-sh"> Show password</label>' +
      '<div id="al-m">' + (msg ? box(msg) : '') + '</div>' +
      '<button class="al-btn" id="al-go" data-l="' + (mode === 'up' ? 'Submit' : 'Log In') + '">' + (mode === 'up' ? 'Submit' : 'Log In') + '</button>');
    $('al-tu').onclick = function () { showLock('up'); };
    $('al-ti').onclick = function () { showLock('in'); };
    $('al-sh').onchange = function () { $('al-p').type = this.checked ? 'text' : 'password'; };
    $('al-go').onclick = mode === 'up' ? signup : login;
    cool();
  }

  function cool() {
    clearInterval(cdT);
    function tick() {
      var b = $('al-go');
      if (!b) { clearInterval(cdT); return; }
      var left = Math.ceil((60000 - (Date.now() - tries().t)) / 1000);
      if (left > 0) { b.disabled = true; b.textContent = 'Please wait ' + left + ' s'; }
      else { b.disabled = false; b.textContent = b.getAttribute('data-l'); clearInterval(cdT); }
    }
    tick();
    cdT = setInterval(tick, 1000);
  }

  /* ---------- Trigger actions: signup and login ---------- */

  function run(action, body, ok) {
    var t = tries();
    if (t.n >= 3) return showLimit();
    var w = 60000 - (Date.now() - t.t);
    if (w > 0) return say('Please wait ' + Math.ceil(w / 1000) + ' seconds before trying again.');
    t.n++; t.t = Date.now();
    LS.s('al_try', t);
    spin(true);
    cool();
    info().then(function (i) {
      body.action = action;
      body.info = i;
      return post(body);
    }).then(function (r) {
      spin(false);
      if (!r) r = { ok: false, msg: 'Network problem. Please check your internet and try again.' };
      if (r.bypass) return begin('', '', [], 24 * 3600 * 1000);
      if (r.banned) { LS.d('al_session'); return blocked(r.msg); }
      if (r.ok) return ok(r);
      if (tries().n >= 3) return showLimit(r.msg);
      say(r.msg || 'Request failed.');
      cool();
    });
  }

  function signup() {
    var n = $('al-n').value.trim(), g = $('al-g').value, ch = $('al-ch').value, c = $('al-c').value.trim(), p = $('al-p').value;
    var e = checkName(n) || (!g ? 'Please select your gender.' : '') || (!ch ? 'Please select a contact channel.' : '') ||
      (ch ? checkContact(ch, c) : '') || (p.length < 4 ? 'Password must be at least 4 characters.' : '');
    if (e) return say(e);
    run('signup', { name: n, gender: g, channel: ch, contact: c, password: p }, function () {
      LS.s('al_mode', 'in');
      page(box(MSG_OK) + reach());
    });
  }

  function login() {
    var c = $('al-c').value.trim(), p = $('al-p').value;
    if (!c || !p) return say('Please enter your contact and password.');
    run('login', { contact: c, password: p }, function (r) { begin(r.name, r.contact, r.messages, SESSION_MS); });
  }

  function begin(name, contact, messages, ms) {
    LS.s('al_session', { n: name, c: contact, exp: Date.now() + ms });
    LS.s('al_msgs', messages || []);
    open = true;
    bell();
    timers();
  }

  /* ---------- Unlocked state: bell and messages ---------- */

  function bell() {
    inModal = false;
    var m = LS.g('al_msgs') || [], seen = LS.g('al_seen') || [];
    if (!m.length) { V.innerHTML = ''; return; }
    var u = m.filter(function (x) { return seen.indexOf(x.k) < 0; }).length;
    V.innerHTML = '<button id="al-b" class="al-bell' + (u ? ' al-pulse' : '') + '" aria-label="Messages">' + ICON.bell + (u ? '<span class="al-bd">+' + u + '</span>' : '') + '</button>';
    $('al-b').onclick = openMsgs;
  }

  function openMsgs() {
    inModal = true;
    var m = LS.g('al_msgs') || [];
    V.innerHTML = '<div class="al-wrap al-mod"><div class="al-bar"><span>Messages</span><button id="al-x" aria-label="Close">' + ICON.x + '</button></div>' +
      m.map(function (x) { return '<div class="al-card"><div class="al-dt">' + esc(x.d) + '</div>' + (x.t ? '<div class="al-ti">' + esc(x.t) + '</div>' : '') + '<div>' + esc(x.m) + '</div>' + (x.a ? '<div class="al-au">' + esc(x.a) + '</div>' : '') + '</div>'; }).join('') + '</div>';
    LS.s('al_seen', m.map(function (x) { return x.k; }));
    $('al-x').onclick = bell;
  }

  /* ---------- Scheduled operations: hourly check, 30-minute analytics ---------- */

  function expired() {
    LS.d('al_session');
    open = false;
    showLock('in', 'Your 30-day access has ended. Please log in again.');
  }

  function sync() {
    var s = sess();
    if (!s) return expired();
    post({ action: 'sync', contact: s.c, name: s.n, usage: LS.g('al_use') || {} }, true).then(function (r) {
      if (!r || !r.ok) return;
      LS.d('al_use');
      if (r.off) return;
      if (r.valid === false) {
        LS.d('al_session');
        open = false;
        return r.banned ? blocked(r.msg) : showLock('in', r.msg);
      }
      LS.s('al_msgs', r.messages || []);
      if (!inModal) bell();
    });
  }

  function pingA() {
    var s = sess();
    if (!s) return expired();
    info().then(function (i) { return post({ action: 'analytics', event: 'Scheduled', name: s.n, info: i }, true); });
  }

  /* ---------- Published Status CSV: checked every 5 seconds, GAS is called only when something changed ---------- */

  function bkt(c) {
    var s = String(c || '').trim().toLowerCase(), h = 5381;
    if (s.indexOf('@') < 0) s = s.replace(/\D/g, '');
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0) % 64;
  }
  var pubLast = null;
  function poll() {
    var s = sess();
    if (!s || !CONFIG.STATUS_CSV_URL || document.hidden) return;
    fetch(CONFIG.STATUS_CSV_URL + (CONFIG.STATUS_CSV_URL.indexOf('?') > -1 ? '&' : '?') + '_=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.text(); })
      .then(function (t) {
        var L = t.split(/\r?\n/).map(function (x) { return x.replace(/"/g, '').trim(); });
        var mine = (L[0] || '') + '.' + (L[1 + bkt(s.c)] || '');
        if (pubLast !== null && pubLast !== mine) { pubLast = mine; sync(); }
        else pubLast = mine;
      }).catch(function () { });
  }

  function timers() {
    if (tm) return;
    tm = 1;
    setInterval(sync, 3600000);
    setInterval(pingA, 1800000);
    setInterval(poll, 5000);
  }

  /* ---------- Usage tracking (local only, sent with the hourly check) ---------- */

  function mark() {
    if (!open) return;
    var u = LS.g('al_use') || {}, k = (location.pathname + location.hash).slice(0, 80);
    u[k] = (u[k] || 0) + 1;
    LS.s('al_use', u);
  }
  window.addEventListener('hashchange', mark);
  window.addEventListener('popstate', mark);
  var ps = history.pushState;
  history.pushState = function () { ps.apply(this, arguments); mark(); };

  /* ---------- Start: no server call on page load ---------- */

  var s0 = LS.g('al_session');
  if (s0 && s0.exp > Date.now()) {
    open = true;
    mark();
    bell();
    timers();
  } else {
    if (s0) LS.d('al_session');
    showLock(LS.g('al_mode') || 'up', s0 ? 'Your 30-day access has ended. Please log in again.' : '');
  }
})();

(function () {
  // ===== CONFIG =====
  var LAUNCH_UTC = Date.UTC(2026, 9, 12, 0, 0, 0) - 3600000; // 12 Oct 2026, 00:00 WAT

  var HEADLINE = 'I am finalising the Note & Bible App experience . 🎉 Rev. Don Victor, PhD.';
  var SUBLINE  = 'Opening live on October 12, 2026.';
  var LIVE_MSG = 'We are live now.';

  // ===== STYLES (mobile-first, 19px floor, no emojis) =====
  var css = ''
    + 'html,body{overflow:hidden!important;margin:0!important;padding:0!important;height:100%!important;background:#0057B8;}'
    + '#lc-gate{'
    +   'position:fixed;inset:0;height:100dvh;'
    +   'background:#0057B8;'
    +   'color:#ffffff;'
    +   'font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;'
    +   'display:flex;flex-direction:column;align-items:center;justify-content:center;'
    +   'padding:24px;text-align:center;box-sizing:border-box;'
    +   'z-index:2147483647;'
    + '}'
    + '#lc-gate h1{font-size:24px;font-weight:700;line-height:1.4;margin:0 0 12px;max-width:340px;color:#ffffff;}'
    + '#lc-gate p.lc-sub{font-size:19px;font-weight:700;line-height:1.5;margin:0 0 40px;max-width:340px;color:#ffffff;}'
    + '#lc-gate .lc-timer{'
    +   'display:grid;grid-template-columns:repeat(2,1fr);gap:14px;'
    +   'width:100%;max-width:340px;margin:0 0 32px;'
    + '}'
    + '#lc-gate .lc-unit{'
    +   'background:rgba(255,255,255,0.12);'
    +   'border:1px solid rgba(255,255,255,0.35);'
    +   'border-radius:16px;padding:22px 12px;min-height:96px;box-sizing:border-box;'
    +   'display:flex;flex-direction:column;align-items:center;justify-content:center;'
    + '}'
    + '#lc-gate .lc-num{font-size:34px;font-weight:700;line-height:1;color:#ffffff;font-variant-numeric:tabular-nums;margin-bottom:10px;}'
    + '#lc-gate .lc-lbl{font-size:19px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;}'
    + '#lc-gate .lc-live{font-size:24px;font-weight:700;color:#ffffff;}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ===== MARKUP =====
  var gate = document.createElement('div');
  gate.id = 'lc-gate';
  gate.innerHTML =
      '<h1>' + HEADLINE + '</h1>'
    + '<p class="lc-sub">' + SUBLINE + '</p>'
    + '<div class="lc-timer">'
    +   '<div class="lc-unit"><div class="lc-num" id="lc-d">00</div><div class="lc-lbl">Days</div></div>'
    +   '<div class="lc-unit"><div class="lc-num" id="lc-h">00</div><div class="lc-lbl">Hours</div></div>'
    +   '<div class="lc-unit"><div class="lc-num" id="lc-m">00</div><div class="lc-lbl">Minutes</div></div>'
    +   '<div class="lc-unit"><div class="lc-num" id="lc-s">00</div><div class="lc-lbl">Seconds</div></div>'
    + '</div>';
  document.body.appendChild(gate);

  // ===== COUNTDOWN =====
  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function tick() {
    var dist = LAUNCH_UTC - Date.now();
    if (dist <= 0) {
      gate.innerHTML = '<p class="lc-live">' + LIVE_MSG + '</p>';
      clearInterval(timer);
      return;
    }
    var d = Math.floor(dist / 86400000);
    var h = Math.floor((dist % 86400000) / 3600000);
    var m = Math.floor((dist % 3600000) / 60000);
    var s = Math.floor((dist % 60000) / 1000);
    document.getElementById('lc-d').textContent = pad(d);
    document.getElementById('lc-h').textContent = pad(h);
    document.getElementById('lc-m').textContent = pad(m);
    document.getElementById('lc-s').textContent = pad(s);
  }

  tick();
  var timer = setInterval(tick, 1000);
})();
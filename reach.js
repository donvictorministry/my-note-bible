(() => {
  'use strict';
  if (window.dvBlocked) return;

  // Shared bridge with script.js (works whichever file loads first)
  const T = window.dvT = window.dvT || { acts: [] };

  const FONT = 'Roboto, "Helvetica Neue", Arial, sans-serif';
  const GRAD = 'linear-gradient(135deg,#42A5FF,#1877F2 55%,#0A4FC4)';
  const appUrl = () => location.origin + location.pathname.replace(/[^/]*$/, '');
  const say = (m, ms) => { if (T.toast) T.toast(m, ms); };

  // ==========================================
  // A. VERSE PICTURE CARDS (1080 x 1920, made for WhatsApp Status and Facebook stories)
  // ==========================================
  const wrapLines = (x, t, maxW) => {
    const words = t.split(/\s+/);
    const lines = [];
    let cur = '';
    words.forEach((w) => {
      const n = cur ? cur + ' ' + w : w;
      if (x.measureText(n).width > maxW && cur) { lines.push(cur); cur = w; } else { cur = n; }
    });
    if (cur) lines.push(cur);
    return lines;
  };

  const drawCard = (ref, text, title) => {
    const W = 1080, H = 1920;
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const x = c.getContext('2d');

    const g = x.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#42A5FF'); g.addColorStop(0.55, '#1877F2'); g.addColorStop(1, '#0A4FC4');
    x.fillStyle = g; x.fillRect(0, 0, W, H);

    x.fillStyle = '#ffffff'; x.globalAlpha = 0.08;
    [{ cx: 920, cy: 220, r: 420 }, { cx: 120, cy: 1650, r: 520 }, { cx: 1000, cy: 1480, r: 250 }].forEach((o) => {
      x.beginPath(); x.arc(o.cx, o.cy, o.r, 0, Math.PI * 2); x.fill();
    });
    x.globalAlpha = 1;

    // dv badge
    const bx = W / 2, by = 250, br = 110;
    const rg = x.createRadialGradient(bx - 30, by - 30, 10, bx, by, br);
    rg.addColorStop(0, '#FFF8D6'); rg.addColorStop(0.6, '#F5DC85'); rg.addColorStop(1, '#E8C560');
    x.fillStyle = rg; x.beginPath(); x.arc(bx, by, br, 0, Math.PI * 2); x.fill();
    x.strokeStyle = '#9AD1FF'; x.lineWidth = 8; x.setLineDash([22, 18]);
    x.beginPath(); x.arc(bx, by, br + 24, 0, Math.PI * 2); x.stroke(); x.setLineDash([]);
    x.fillStyle = '#D32F2F'; x.font = 'bold 128px ' + FONT; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.fillText('dv', bx, by + 4);

    x.fillStyle = '#ffffff'; x.font = '600 48px ' + FONT; x.textBaseline = 'alphabetic';
    x.fillText(title || 'Bible Verse', W / 2, 500);

    // verse text, sized to fit
    const maxH = 880;
    let size = 76, lines = [];
    for (; size >= 34; size -= 2) {
      x.font = 'italic 600 ' + size + 'px ' + FONT;
      lines = wrapLines(x, '"' + text + '"', 900);
      if (lines.length * size * 1.35 <= maxH) break;
    }
    const total = lines.length * size * 1.35;
    let y = 600 + (maxH - total) / 2 + size;
    x.fillStyle = '#ffffff';
    lines.forEach((l) => { x.fillText(l, W / 2, y); y += size * 1.35; });

    x.fillStyle = '#FFE08A'; x.font = 'bold 58px ' + FONT;
    x.fillText(ref, W / 2, 1560);

    x.fillStyle = '#ffffff'; x.globalAlpha = 0.35; x.fillRect(W / 2 - 160, 1620, 320, 4); x.globalAlpha = 1;
    x.font = 'bold 54px ' + FONT; x.fillText('DV Note & Bible', W / 2, 1710);
    x.globalAlpha = 0.9; x.font = '40px ' + FONT;
    x.fillText(appUrl().replace(/^https?:\/\//, '').replace(/\/$/, ''), W / 2, 1778);
    x.font = '36px ' + FONT; x.fillText('Free  |  No ads  |  Works offline', W / 2, 1848);
    x.globalAlpha = 1;
    return c;
  };

  T.verseCard = async (ref, text, title) => {
    try {
      const blob = await new Promise((res) => drawCard(ref, text, title).toBlob(res, 'image/png'));
      const name = 'DV-' + ref.replace(/[^A-Za-z0-9]+/g, '-') + '.png';
      const file = new File([blob], name, { type: 'image/png' });
      const caption = ref + ' - Get DV Note & Bible: ' + appUrl();
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: caption, title: ref });
      } else {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob); a.download = name;
        document.body.appendChild(a); a.click(); a.remove();
        say('Picture saved to your phone', 3000);
      }
    } catch (e) {
      if (e.name !== 'AbortError') say('Could not make the picture');
    }
  };

  // ==========================================
  // B. SHARE ANY VERSE FROM THE BIBLE READER
  // ==========================================
  let selected = null;
  let bar = null;
  const navH = () => (document.getElementById('dvNav') || { offsetHeight: 0 }).offsetHeight;

  const hideBar = () => {
    if (selected) selected.style.background = '';
    selected = null;
    if (bar) bar.style.display = 'none';
    const box = document.getElementById('dvBText');
    if (box) box.style.paddingBottom = '';
  };

  const current = () => {
    if (!selected || !document.body.contains(selected)) return null;
    const b = selected.querySelector('b');
    const num = b ? b.textContent.trim() : '';
    const bookSel = document.getElementById('dvBBook');
    const chSel = document.getElementById('dvBCh');
    const book = bookSel && bookSel.options[bookSel.selectedIndex] ? bookSel.options[bookSel.selectedIndex].text : '';
    const ch = chSel ? (+chSel.value + 1) : 1;
    return { ref: book + ' ' + ch + ':' + num, text: selected.textContent.slice(num.length).trim() };
  };

  const makeBar = () => {
    bar = document.createElement('div');
    bar.id = 'dv-verse-bar';
    bar.style.cssText = 'position:fixed;left:10px;right:10px;z-index:55;display:none;background:var(--dvBg,#fff);color:var(--dvFg,#000);border:2px solid #1877F2;border-radius:24px;box-shadow:0 6px 18px rgba(0,0,0,0.3);padding:12px 14px;';
    const ref = document.createElement('div');
    ref.id = 'dv-verse-bar-ref';
    ref.style.cssText = 'font-size:21px;font-weight:bold;margin-bottom:10px;';
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:10px;';
    const mk = (label, primary, fn) => {
      const b = document.createElement('button');
      b.textContent = label;
      b.style.cssText = 'flex:1;height:52px;border-radius:26px;font-size:20px;font-weight:bold;cursor:pointer;' +
        (primary ? 'border:none;color:#fff;background:' + GRAD + ';' : 'border:2px solid #1877F2;color:#1877F2;background:transparent;');
      b.onclick = fn;
      return b;
    };
    row.appendChild(mk('Share verse', true, async () => {
      const v = current();
      if (!v) return hideBar();
      const msg = '"' + v.text + '" - ' + v.ref + '\n\nRead more on DV Note & Bible: ' + appUrl();
      try {
        if (navigator.share) await navigator.share({ title: v.ref, text: msg });
        else { await navigator.clipboard.writeText(msg); say('Verse copied'); }
      } catch (e) { if (e.name !== 'AbortError') say('Could not share the verse'); }
    }));
    row.appendChild(mk('Picture', false, () => {
      const v = current();
      if (!v) return hideBar();
      T.verseCard(v.ref, v.text, 'Bible Verse');
    }));
    row.appendChild(mk('Close', false, hideBar));
    bar.appendChild(ref); bar.appendChild(row);
    document.body.appendChild(bar);
  };

  const showBar = () => {
    if (!bar) makeBar();
    const v = current();
    if (!v) return hideBar();
    document.getElementById('dv-verse-bar-ref').textContent = v.ref;
    bar.style.bottom = (navH() + 10) + 'px';
    bar.style.display = 'block';
    const box = document.getElementById('dvBText');
    if (box) box.style.paddingBottom = '130px';
  };

  const wire = () => {
    const box = document.getElementById('dvBText');
    if (!box) return;
    box.addEventListener('click', (e) => {
      const p = e.target.closest('.dvVs');
      if (!p || p.dataset.dvg !== undefined) return; // search results keep their own "jump to chapter" tap
      if (selected) selected.style.background = '';
      selected = p;
      p.style.background = 'rgba(24,119,242,0.2)';
      showBar();
    });
    ['dvBBook', 'dvBCh', 'dvBFind'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) { el.addEventListener('change', hideBar); el.addEventListener('input', hideBar); }
    });
    const nav = document.getElementById('dvNav');
    if (nav) nav.addEventListener('click', hideBar, true);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire);
  else wire();
})();

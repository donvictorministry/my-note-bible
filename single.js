(function() {
  // ============================================================
  // CONFIGURATION
  // ============================================================
  // Launch moment in West Africa Time (WAT / UTC+1)
  const LAUNCH_WAT = { year: 2027, month: 10, day: 12, hour: 0, minute: 0 };

  const APP_NAME         = 'DV Note & Bible';
  const TITLE            = 'Launching Soon';
  const SUBTITLE         = 'I'm finalising the experience. Check back shortly by. Dr. Don Victor, PhD.';
  const EXPIRED_MESSAGE  = 'We are live. Opening now.';
  const REDIRECT_ON_LAUNCH = true;

  // ============================================================
  // Convert WAT launch moment to a UTC timestamp
  // ============================================================
  const LAUNCH_DATE = Date.UTC(
    LAUNCH_WAT.year,
    LAUNCH_WAT.month - 1,   // JS months are 0-indexed
    LAUNCH_WAT.day,
    LAUNCH_WAT.hour,
    LAUNCH_WAT.minute
  ) - (60 * 60 * 1000);      // WAT = UTC+1, so subtract 1 hour

  // ============================================================
  // Lock the page immediately (before body paints)
  // ============================================================
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.height = '100%';

  // ============================================================
  // Styles — mobile-first, 19px minimum, no emojis
  // ============================================================
  const styles = `
    html, body {
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      -webkit-tap-highlight-color: transparent;
      background: #0a0a0f;
    }
    body > *:not(#launch-countdown-overlay) {
      display: none !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
    #launch-countdown-overlay {
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      height: 100dvh;
      background: radial-gradient(circle at 50% 30%, #1a1a2e 0%, #0a0a0f 70%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #ffffff;
      padding: 24px;
      text-align: center;
      box-sizing: border-box;
      animation: lc-fadeIn 0.5s ease;
    }
    @keyframes lc-fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    .lc-brand {
      font-size: 19px;
      font-weight: 600;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: #00c6ff;
      margin: 0 0 32px 0;
      opacity: 0.9;
    }
    .lc-title {
      font-size: 30px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 16px 0;
      color: #ffffff;
      letter-spacing: -0.5px;
    }
    .lc-subtitle {
      font-size: 19px;
      font-weight: 400;
      line-height: 1.5;
      margin: 0 0 44px 0;
      color: rgba(255, 255, 255, 0.65);
      max-width: 340px;
    }
    .lc-timer {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;
      width: 100%;
      max-width: 340px;
      margin: 0 0 40px 0;
    }
    .lc-unit {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      padding: 22px 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 96px;
      box-sizing: border-box;
    }
    .lc-number {
      font-size: 34px;
      font-weight: 700;
      line-height: 1;
      color: #ffffff;
      font-variant-numeric: tabular-nums;
      margin-bottom: 10px;
    }
    .lc-label {
      font-size: 19px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: rgba(255, 255, 255, 0.45);
    }
    .lc-expired {
      font-size: 24px;
      font-weight: 600;
      color: #00c6ff;
      animation: lc-pulse 1.5s infinite;
      padding: 0 20px;
    }
    @keyframes lc-pulse {
      0%, 100% { opacity: 1; }
      50%      { opacity: 0.55; }
    }
    .lc-footer {
      font-size: 19px;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.35);
      margin: 0;
      position: absolute;
      bottom: calc(env(safe-area-inset-bottom, 0px) + 28px);
      left: 0;
      right: 0;
      padding: 0 24px;
    }
  `;

  function injectStyles() {
    const s = document.createElement('style');
    s.id = 'lc-styles';
    s.textContent = styles;
    (document.head || document.documentElement).appendChild(s);
  }

  // ============================================================
  // Overlay markup
  // ============================================================
  function overlayMarkup() {
    return `
      <div class="lc-brand">${APP_NAME}</div>
      <h1 class="lc-title">${TITLE}</h1>
      <p class="lc-subtitle">${SUBTITLE}</p>
      <div class="lc-timer" id="lc-timer">
        <div class="lc-unit"><div class="lc-number" id="lc-days">00</div><div class="lc-label">Days</div></div>
        <div class="lc-unit"><div class="lc-number" id="lc-hours">00</div><div class="lc-label">Hours</div></div>
        <div class="lc-unit"><div class="lc-number" id="lc-minutes">00</div><div class="lc-label">Minutes</div></div>
        <div class="lc-unit"><div class="lc-number" id="lc-seconds">00</div><div class="lc-label">Seconds</div></div>
      </div>
      <p class="lc-footer">Available on Android and iOS</p>
    `;
  }

  function buildOverlay() {
    const ov = document.createElement('div');
    ov.id = 'launch-countdown-overlay';
    ov.innerHTML = overlayMarkup();
    if (document.body) {
      document.body.appendChild(ov);
    } else {
      document.addEventListener('DOMContentLoaded', () => document.body.appendChild(ov));
    }
  }

  // ============================================================
  // Countdown logic
  // ============================================================
  function pad(n) { return String(n).padStart(2, '0'); }

  function updateCountdown() {
    const distance = LAUNCH_DATE - Date.now();
    const timerEl = document.getElementById('lc-timer');
    if (!timerEl) return;

    if (distance <= 0) {
      const ov = document.getElementById('launch-countdown-overlay');
      if (ov) {
        ov.innerHTML = `<p class="lc-expired">${EXPIRED_MESSAGE}</p>`;
      }
      clearInterval(timerInterval);
      if (REDIRECT_ON_LAUNCH) {
        setTimeout(() => {
          const o = document.getElementById('launch-countdown-overlay');
          const s = document.getElementById('lc-styles');
          if (o) o.remove();
          if (s) s.remove();
          document.documentElement.style.overflow = '';
          if (document.body) document.body.style.overflow = '';
          location.reload();
        }, 2200);
      }
      return;
    }

    const days    = Math.floor(distance / 86400000);
    const hours   = Math.floor((distance % 86400000) / 3600000);
    const minutes = Math.floor((distance % 3600000) / 60000);
    const seconds = Math.floor((distance % 60000) / 1000);

    document.getElementById('lc-days').textContent    = pad(days);
    document.getElementById('lc-hours').textContent   = pad(hours);
    document.getElementById('lc-minutes').textContent = pad(minutes);
    document.getElementById('lc-seconds').textContent = pad(seconds);
  }

  // ============================================================
  // Anti-bypass lockdown
  // ============================================================
  function lockDown() {
    document.addEventListener('contextmenu', e => e.preventDefault());

    document.addEventListener('keydown', e => {
      const k = e.key.toLowerCase();
      if (e.key === 'F12') return e.preventDefault();
      if (e.ctrlKey && e.shiftKey && ['i', 'j', 'c'].includes(k)) return e.preventDefault();
      if (e.ctrlKey && ['u', 's', 'p'].includes(k)) return e.preventDefault();
    }, true);

    document.addEventListener('touchmove', e => e.preventDefault(), { passive: false });
    document.addEventListener('wheel',     e => e.preventDefault(), { passive: false });

    // Re-inject overlay if someone removes it via devtools
    const observer = new MutationObserver(() => {
      const ov = document.getElementById('launch-countdown-overlay');
      if (!ov || !document.body.contains(ov)) {
        const n = document.createElement('div');
        n.id = 'launch-countdown-overlay';
        n.innerHTML = overlayMarkup();
        document.body.appendChild(n);
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  // ============================================================
  // Boot
  // ============================================================
  injectStyles();
  buildOverlay();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lockDown);
  } else {
    lockDown();
  }

  updateCountdown();
  const timerInterval = setInterval(updateCountdown, 1000);
})();

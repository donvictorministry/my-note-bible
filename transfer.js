(() => {
  'use strict';
  if (window.dvBlocked) return;

  // Shared bridge with script.js (works whichever file loads first)
  const T = window.dvT = window.dvT || { acts: [] };

  const ICON_CHAT = 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z';
  const ICON_SMS = 'M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z';
  const ICON_NEARBY = 'M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z';

  // Note link + short caption, ready to drop into a chat. Asks for the PIN first if the note is locked.
  const buildMessage = async (f) => {
    const pin = await T.guard(f);
    if (!pin) return null;
    const link = await T.makeLink(f, pin);
    const title = f.name.replace(/\.txt$/i, '');
    if (link.length > 1800) T.toast('This is a long note, so the link is long. WhatsApp handles long links best.', 3500);
    return title + (f.pin ? ' (PIN needed)' : '') + '\n' + link;
  };

  const openUrl = (url, newTab) => {
    const a = document.createElement('a');
    a.href = url;
    if (newTab) { a.target = '_blank'; a.rel = 'noopener'; }
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // 1. Messaging deep links
  T.acts.push(['Send via WhatsApp', ICON_CHAT, async (f) => {
    const msg = await buildMessage(f);
    if (msg) openUrl('https://wa.me/?text=' + encodeURIComponent(msg), true);
  }]);

  T.acts.push(['Send via SMS', ICON_SMS, async (f) => {
    const msg = await buildMessage(f);
    if (msg) openUrl('sms:?body=' + encodeURIComponent(msg), false);
  }]);

  // 2. Local offline channel: the Android share sheet (Quick Share / Bluetooth) with the note as a text file
  T.acts.push(['Send nearby (offline)', ICON_NEARBY, async (f) => {
    const pin = await T.guard(f);
    if (!pin) return;
    const name = (f.name.replace(/\.txt$/i, '') || 'note') + '.txt';
    const file = new File([f.code], name, { type: 'text/plain' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: name });
      } catch (e) {
        if (e.name !== 'AbortError') T.toast('Could not send the note');
      }
    } else {
      T.toast('This phone cannot send files from the app', 3000);
    }
  }]);
})();

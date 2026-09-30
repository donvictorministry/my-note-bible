
(() => {
  'use strict';

  // ==========================================
  // CONFIGURATION: DAILY VERSE
  // ==========================================
  const CONFIG = {
    isActive: true,
    
    // App URL for Sharing
    appUrl: location.origin + location.pathname.replace(/[^/]*$/, ''),

    // Contact Information (Footer)
    contact: {
      phone: 'tel:+1234567890',
      whatsapp: 'https://wa.me/1234567890',
      email: 'mailto:example@gmail.com',
      facebook: 'https://facebook.com/'
    },

    // 60 Seeded Verses (Old & New Testament)
    verses: [
      { ref: "Genesis 1:1", text: "In the beginning God created the heavens and the earth." },
      { ref: "Joshua 1:9", text: "Have I not commanded you? Be strong and courageous. Do not be frightened, and do not be dismayed, for the Lord your God is with you wherever you go." },
      { ref: "Psalm 23:1", text: "The Lord is my shepherd; I shall not want." },
      { ref: "Psalm 46:1", text: "God is our refuge and strength, a very present help in trouble." },
      { ref: "Psalm 119:105", text: "Your word is a lamp to my feet and a light to my path." },
      { ref: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths." },
      { ref: "Isaiah 40:31", text: "But they who wait for the Lord shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint." },
      { ref: "Isaiah 41:10", text: "Fear not, for I am with you; be not dismayed, for I am your God; I will strengthen you, I will help you, I will uphold you with my righteous right hand." },
      { ref: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope." },
      { ref: "Lamentations 3:22-23", text: "The steadfast love of the Lord never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness." },
      { ref: "Micah 6:8", text: "He has told you, O man, what is good; and what does the Lord require of you but to do justice, and to love kindness, and to walk humbly with your God?" },
      { ref: "Matthew 5:14", text: "You are the light of the world. A city set on a hill cannot be hidden." },
      { ref: "Matthew 6:33", text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you." },
      { ref: "Matthew 11:28", text: "Come to me, all who labor and are heavy laden, and I will give you rest." },
      { ref: "Matthew 28:19", text: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit." },
      { ref: "Mark 10:27", text: "Jesus looked at them and said, 'With man it is impossible, but not with God. For all things are possible with God.'" },
      { ref: "Luke 6:31", text: "And as you wish that others would do to you, do so to them." },
      { ref: "John 1:5", text: "The light shines in the darkness, and the darkness has not overcome it." },
      { ref: "John 3:16", text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." },
      { ref: "John 8:12", text: "Again Jesus spoke to them, saying, 'I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life.'" },
      { ref: "John 14:6", text: "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.'" },
      { ref: "John 16:33", text: "I have said these things to you, that in me you may have peace. In the world you will have tribulation. But take heart; I have overcome the world." },
      { ref: "Acts 1:8", text: "But you will receive power when the Holy Spirit has come upon you, and you will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth." },
      { ref: "Romans 3:23", text: "For all have sinned and fall short of the glory of God." },
      { ref: "Romans 5:8", text: "But God shows his love for us in that while we were still sinners, Christ died for us." },
      { ref: "Romans 8:28", text: "And we know that for those who love God all things work together for good, for those who are called according to his purpose." },
      { ref: "Romans 8:31", text: "What then shall we say to these things? If God is for us, who can be against us?" },
      { ref: "Romans 8:38-39", text: "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord." },
      { ref: "Romans 12:2", text: "Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect." },
      { ref: "Romans 15:13", text: "May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope." },
      { ref: "1 Corinthians 10:13", text: "No temptation has overtaken you that is not common to man. God is faithful, and he will not let you be tempted beyond your ability, but with the temptation he will also provide the way of escape, that you may be able to endure it." },
      { ref: "1 Corinthians 13:4-5", text: "Love is patient and kind; love does not envy or boast; it is not arrogant or rude. It does not insist on its own way; it is not irritable or resentful." },
      { ref: "1 Corinthians 16:14", text: "Let all that you do be done in love." },
      { ref: "2 Corinthians 4:16-17", text: "So we do not lose heart. Though our outer self is wasting away, our inner self is being renewed day by day. For this light momentary affliction is preparing for us an eternal weight of glory beyond all comparison." },
      { ref: "2 Corinthians 5:17", text: "Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come." },
      { ref: "2 Corinthians 12:9", text: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly of my weaknesses, so that the power of Christ may rest upon me." },
      { ref: "Galatians 2:20", text: "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me." },
      { ref: "Galatians 5:22-23", text: "But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law." },
      { ref: "Ephesians 2:8-9", text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast." },
      { ref: "Ephesians 4:32", text: "Be kind to one another, tenderhearted, forgiving one another, as God in Christ forgave you." },
      { ref: "Ephesians 6:11", text: "Put on the whole armor of God, that you may be able to stand against the schemes of the devil." },
      { ref: "Philippians 4:4", text: "Rejoice in the Lord always; again I will say, rejoice." },
      { ref: "Philippians 4:6-7", text: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus." },
      { ref: "Philippians 4:13", text: "I can do all things through him who strengthens me." },
      { ref: "Philippians 4:19", text: "And my God will supply every need of yours according to his riches in glory in Christ Jesus." },
      { ref: "Colossians 3:2", text: "Set your minds on things that are above, not on things that are on earth." },
      { ref: "Colossians 3:14", text: "And above all these put on love, which binds everything together in perfect harmony." },
      { ref: "Colossians 3:23", text: "Whatever you do, work heartily, as for the Lord and not for men." },
      { ref: "1 Thessalonians 5:16-18", text: "Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you." },
      { ref: "2 Timothy 1:7", text: "For God gave us a spirit not of fear but of power and love and self-control." },
      { ref: "2 Timothy 3:16", text: "All Scripture is breathed out by God and profitable for teaching, for reproof, for correction, and for training in righteousness." },
      { ref: "Hebrews 11:1", text: "Now faith is the assurance of things hoped for, the conviction of things not seen." },
      { ref: "Hebrews 12:2", text: "Looking to Jesus, the founder and perfecter of our faith, who for the joy that was set before him endured the cross, despising the shame, and is seated at the right hand of the throne of God." },
      { ref: "Hebrews 13:5", text: "Keep your life free from love of money, and be content with what you have, for he has said, 'I will never leave you nor forsake you.'" },
      { ref: "James 1:2-3", text: "Count it all joy, my brothers, when you meet trials of various kinds, for you know that the testing of your faith produces steadfastness." },
      { ref: "James 1:5", text: "If any of you lacks wisdom, let him ask God, who gives generously to all without reproach, and it will be given him." },
      { ref: "James 1:22", text: "But be doers of the word, and not hearers only, deceiving yourselves." },
      { ref: "1 Peter 5:7", text: "Casting all your anxieties on him, because he cares for you." },
      { ref: "1 John 1:9", text: "If we confess our sins, he is faithful and just to forgive us our sins and to cleanse us from all unrighteousness." },
      { ref: "1 John 4:19", text: "We love because he first loved us." }
    ]
  };

  if (!CONFIG.isActive || window.dvBlocked) return;

  const LAST_OPENED_KEY = 'dv_daily_verse_last_opened';
  const STREAK_KEY = 'dv_daily_verse_streak';
  const MS_IN_DAY = 24 * 60 * 60 * 1000;

  // Brand icons (no emojis)
  const dvVerseIcon = `<svg class="dvIco" viewBox="0 0 24 24" stroke="url(#dvGrad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path fill="none" d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path fill="none" d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/><circle cx="12" cy="7" r="3" stroke="none"/></svg>`;
  const dvBookSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
  const dvFlameSvg = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1 4-3 5-3 9a3 3 0 0 0 6 0c0-1-.5-2-1-3 2 1 4 3 4 6a6 6 0 0 1-12 0c0-5 4-6 6-12z"/></svg>`;

  // ==========================================
  // STREAK & TIMING LOGIC
  // ==========================================
  const getTodayIndex = () => Math.floor(Date.now() / MS_IN_DAY) % 60;
  
  const handleStreakUpdate = () => {
    const now = Date.now();
    const lastOpened = parseInt(localStorage.getItem(LAST_OPENED_KEY) || '0', 10);
    let streak = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);

    if (lastOpened === 0) {
      streak = 1;
    } else {
      const hoursSince = (now - lastOpened) / (1000 * 60 * 60);
      if (hoursSince > 48) {
        streak = 1; // Broke streak
      } else if (hoursSince >= 24) {
        streak += 1; // Next day increment
      }
    }
    
    localStorage.setItem(LAST_OPENED_KEY, now.toString());
    localStorage.setItem(STREAK_KEY, streak.toString());
    return streak;
  };

  const getStreakDisplay = () => {
    return parseInt(localStorage.getItem(STREAK_KEY) || '0', 10) || 1;
  };

  const shouldShowPopup = () => {
    const lastOpened = parseInt(localStorage.getItem(LAST_OPENED_KEY) || '0', 10);
    const hoursSince = (Date.now() - lastOpened) / (1000 * 60 * 60);
    return hoursSince >= 24;
  };

  // ==========================================
  // UI: GRID BUTTON (Completes 3rd Row)
  // ==========================================
  const injectGridButton = () => {
    const qaContainer = document.querySelector('.dvQuick');
    if (!qaContainer || document.getElementById('dv-qa-daily-verse')) return;

    const btn = document.createElement('button');
    btn.id = 'dv-qa-daily-verse';
    btn.className = 'dvQ';
    
    btn.innerHTML = `${dvVerseIcon}<span>Verse Today</span>`;
    btn.onclick = openVerseModal;
    qaContainer.appendChild(btn);
  };

  // ==========================================
  // UI: BOTTOM NAVIGATION BUTTON (4th button)
  // ==========================================
  const dvInjectNavButton = () => {
    const nav = document.getElementById('dvNav');
    if (!nav || document.getElementById('dv-nav-daily-verse')) return;

    const btn = document.createElement('button');
    btn.id = 'dv-nav-daily-verse';
    btn.innerHTML = `<span class="dvNi">${dvVerseIcon}</span>Verse`;
    btn.onclick = openVerseModal;
    nav.appendChild(btn);
    nav.style.gridTemplateColumns = 'repeat(4,1fr)';
  };

  // ==========================================
  // UI: DAILY CENTER POPUP
  // ==========================================
  const checkAndShowPopup = () => {
    if (!shouldShowPopup() || document.getElementById('dv-verse-popup')) return;

    const overlay = document.createElement('div');
    overlay.id = 'dv-verse-popup';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:999998;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity 0.3s ease;';

    const btn = document.createElement('button');
    btn.style.cssText = 'background:linear-gradient(135deg,#42A5FF,#1877F2 55%,#0A4FC4);color:#fff;border:none;border-radius:24px;padding:24px 32px;font-size:22px;font-weight:bold;cursor:pointer;box-shadow:0 10px 25px rgba(0,0,0,0.3);display:flex;flex-direction:column;align-items:center;gap:12px;max-width:92dvw;transform:scale(0.8);transition:transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);';
    
    // Fetch today's reference dynamically and assemble the strict popup UI
    const verseRef = CONFIG.verses[getTodayIndex()].ref;
    btn.innerHTML = `<span>Today's Verse of the Day</span><span style="font-size:19px;background:rgba(255,255,255,0.2);padding:6px 16px;border-radius:12px;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px 16px;"><span style="display:inline-flex;align-items:center;gap:8px;white-space:nowrap;">${dvBookSvg} ${verseRef}</span><span style="display:inline-flex;align-items:center;gap:8px;white-space:nowrap;">${dvFlameSvg} ${getStreakDisplay()} Day Streak</span></span>`;
    
    // Strictly no "X" to dismiss. User MUST tap to proceed.
    btn.onclick = () => {

      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
      openVerseModal();
    };

    overlay.appendChild(btn);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      btn.style.transform = 'scale(1)';
    });
  };

  // ==========================================
  // UI: FULL-SCREEN MODAL
  // ==========================================
  const openVerseModal = () => {
    if (document.getElementById('dv-daily-verse-modal')) return;
    
    const streakNum = handleStreakUpdate();
    const verseData = CONFIG.verses[getTodayIndex()];
    const shareText = `"${verseData.text}" - ${verseData.ref}\n\nRead more on DV Note & Bible: ${CONFIG.appUrl}`;

    const modal = document.createElement('div');
    modal.id = 'dv-daily-verse-modal';
    modal.style.cssText = `position:fixed;top:0;left:0;width:100dvw;height:100dvh;background:var(--dvBg,#fff);color:var(--dvFg,#000);z-index:999999;display:flex;flex-direction:column;opacity:0;transition:opacity 0.3s ease;font-family:inherit;`;

    // 1. Header (Facebook Blue)
    const topBar = document.createElement('div');
    topBar.style.cssText = 'flex-shrink:0;height:64px;display:flex;align-items:center;justify-content:center;position:relative;background:linear-gradient(135deg,#42A5FF,#1877F2 55%,#0A4FC4);box-shadow:0 2px 4px rgba(0,0,0,0.1);';
    
    const headerTitle = document.createElement('div');
    headerTitle.textContent = 'DV Daily Bible Verse';
    headerTitle.style.cssText = 'color:#ffffff;font-size:22px;font-weight:bold;letter-spacing:0.5px;';
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" style="display:block;"><path d="M15 18l-6-6 6-6"/></svg>';
    closeBtn.style.cssText = 'position:absolute;left:4px;background:none;border:none;cursor:pointer;padding:12px;display:flex;align-items:center;justify-content:center;';
    
    closeBtn.onclick = () => {
      modal.style.opacity = '0';
      setTimeout(() => modal.remove(), 300);
    };
    
    topBar.appendChild(closeBtn);
    topBar.appendChild(headerTitle);

    // 2. Body Container
    const scrollBody = document.createElement('div');
    scrollBody.style.cssText = 'flex:1;overflow-y:auto;padding:32px 16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:24px;';

    // Streak UI
    const streakBadge = document.createElement('div');
    streakBadge.style.cssText = 'background:rgba(255, 69, 0, 0.1);color:#ff4500;padding:6px 16px;border-radius:20px;font-weight:bold;font-size:19px;display:inline-flex;align-items:center;gap:8px;';
    streakBadge.innerHTML = `${dvFlameSvg} ${streakNum} Day Streak`;

    // Title
    const title = document.createElement('h2');
    title.textContent = "Today's Verse";
    title.style.cssText = 'font-size:28px;font-weight:900;margin:0;color:inherit;';

    // Verse Ref & Text
    const verseRef = document.createElement('div');
    verseRef.textContent = verseData.ref;
    verseRef.style.cssText = 'font-size:24px;font-weight:bold;color:inherit;margin-top:16px;';

    const verseText = document.createElement('div');
    verseText.textContent = `"${verseData.text}"`;
    verseText.style.cssText = 'font-size:26px;font-style:italic;line-height:1.5;color:inherit;padding:0 8px;';

    // 3. Share Buttons Row
    const shareContainer = document.createElement('div');
    shareContainer.style.cssText = 'display:flex;gap:16px;justify-content:center;margin-top:24px;padding-bottom:32px;border-bottom:1px solid rgba(128,128,128,0.2);width:100%;';

    const buildShareBtn = (bg, svg, action) => {
      const btn = document.createElement('button');
      btn.style.cssText = `width:56px;height:56px;border-radius:50%;background:${bg};border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 10px rgba(0,0,0,0.15);`;
      btn.innerHTML = svg;
      btn.onclick = action;
      return btn;
    };

    const svgNative = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>';

    if (navigator.share) {
      shareContainer.appendChild(buildShareBtn('linear-gradient(135deg,#42A5FF,#1877F2 55%,#0A4FC4)', svgNative, () => navigator.share({ title: 'Verse of the Day', text: shareText })));
    }

    // 4. Footer Contact Row
    const footerWrap = document.createElement('div');
    footerWrap.style.cssText = 'width:100%;margin-top:16px;text-align:left;';
    
    const footerTitle = document.createElement('div');
    footerTitle.textContent = 'Share your thoughts with us:';
    footerTitle.style.cssText = 'font-size:20px;font-weight:bold;margin-bottom:16px;color:inherit;';
    
    const cardsContainer = document.createElement('div');
    cardsContainer.style.cssText = 'display:flex;flex-direction:column;gap:12px;';

    const buildContactCard = (bg, path, titleText, url) => {
      const card = document.createElement('a');
      card.href = url;
      card.target = '_blank';
      card.style.cssText = `background:rgba(128,128,128,0.1);border-left:8px solid ${bg};border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:16px;text-decoration:none;color:inherit;`;

      const iconWrap = document.createElement('div');
      iconWrap.innerHTML = `<svg viewBox="0 0 64 64" width="40" height="40"><circle cx="32" cy="32" r="32" fill="${bg}"/><g transform="translate(16, 16) scale(1.33)"><path d="${path}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;

      const textWrap = document.createElement('span');
      textWrap.textContent = titleText;
      textWrap.style.cssText = 'font-size:19px;font-weight:bold;';

      card.appendChild(iconWrap);
      card.appendChild(textWrap);
      return card;
    };

    // Uses the authentic WhatsApp chat bubble SVG path
    cardsContainer.appendChild(buildContactCard('#25D366', 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z', 'WhatsApp', CONFIG.contact.whatsapp));

    cardsContainer.appendChild(buildContactCard('#1877f2', 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', 'Facebook', CONFIG.contact.facebook));
    cardsContainer.appendChild(buildContactCard('#ea4335', 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6', 'Email', CONFIG.contact.email));
    cardsContainer.appendChild(buildContactCard('#29b6f6', 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z', 'Phone', CONFIG.contact.phone));

    footerWrap.appendChild(footerTitle);
    footerWrap.appendChild(cardsContainer);

    // Assembly
    scrollBody.appendChild(streakBadge);
    scrollBody.appendChild(title);
    scrollBody.appendChild(verseRef);
    scrollBody.appendChild(verseText);
    scrollBody.appendChild(shareContainer);
    scrollBody.appendChild(footerWrap);

    modal.appendChild(topBar);
    modal.appendChild(scrollBody);
    document.body.appendChild(modal);

    requestAnimationFrame(() => {
      modal.style.opacity = '1';
    });
  };

  // Safe Initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      injectGridButton();
      dvInjectNavButton();
      setTimeout(checkAndShowPopup, 1000); // Slight delay for popup UX
    });
  } else {
    injectGridButton();
    dvInjectNavButton();
    setTimeout(checkAndShowPopup, 1000);
  }

  // Re-check when the app returns to the foreground so the 24-hour popup still appears without a reload
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) checkAndShowPopup();
  });

})();

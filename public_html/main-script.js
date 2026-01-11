// main-script.js v0.104 – Remove scroll reveal, pillars in hero

// ========== GSAP GLOBAL ==========
// GSAP jest załadowany z <script> w index.html, dostępny jako window.gsap

// ========== STATE ==========
let resizeDebounceTimer = null;

// ========== REDUCED MOTION CHECK ==========
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ========== PILLS LOGIC ==========
function initPills() {
  const pills = document.querySelectorAll('.hub-pill');

  if (pills.length === 0) {
    console.log('ℹ️ No pills found');
    return;
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cardId = pill.dataset.card;
      console.log(`🔘 Pill clicked: ${cardId}`);
      showCard(cardId);
    });

    pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        const cardId = pill.dataset.card;
        showCard(cardId);
      }
    });
  });

  console.log('✅ Pills initialized');
}

// ========== SHOW CARD ==========
function showCard(cardId) {
  // Flash connection line
  flashPillLine(cardId);

  // Wait for flash animation peak before opening card (800ms delay)
  setTimeout(() => {
    openCard(cardId);
  }, 800);

  console.log(`📍 Showing card: ${cardId} (delayed open)`);
}

// ========== FLASH PILL LINE ==========
function flashPillLine(cardId) {
  if (!window.gsap) {
    console.warn('⚠️ GSAP not loaded, skipping flash animation');
    return;
  }

  // Special case: Robotyka has TWO lines (left and right converging)
  if (cardId === 'robotyka') {
    animateLine('pill-line-robotyka-left');
    animateLine('pill-line-robotyka-right');
    console.log(`⚡ Electric current flow for: ${cardId} (dual lines)`);
  } else {
    const lineId = `pill-line-${cardId}`;
    animateLine(lineId);
    console.log(`⚡ Electric current flow for: ${cardId}`);
  }
}

// ========== ANIMATE SINGLE LINE ==========
function animateLine(lineId) {
  const lineEl = document.getElementById(lineId);

  if (!lineEl) {
    console.warn(`⚠️ Line ${lineId} not found`);
    return;
  }

  console.log(`🔧 Animating line: ${lineId}`);

  const gsap = window.gsap;

  // Kill any existing animations on this line
  gsap.killTweensOf(lineEl);

  // Get the total length of the path for dash animation
  const pathLength = lineEl.getTotalLength();

  console.log(`📏 Path length for ${lineId}: ${pathLength}`);

  // Set up initial dash state (fully hidden)
  gsap.set(lineEl, {
    attr: {
      'stroke-dasharray': pathLength,
      'stroke-dashoffset': pathLength,
      'stroke-width': '2',
      stroke: '#48D2E7'
    },
    opacity: 0
  });

  // Create electric current flow effect with GSAP timeline
  const timeline = gsap.timeline({
    onStart: () => console.log(`▶️ Animation started for ${lineId}`),
    onComplete: () => console.log(`✅ Animation completed for ${lineId}`)
  });

  // Phase 1: Current starts flowing - reveal the path with cyan
  timeline.to(lineEl, {
    attr: {
      'stroke-dashoffset': pathLength * 0.6,
      'stroke-width': '4',
      stroke: '#48D2E7'
    },
    opacity: 0.7,
    duration: 0.3,
    ease: 'power2.in',
  }, 0);

  // Phase 2: Current accelerates - bright cyan pulse
  timeline.to(lineEl, {
    attr: {
      'stroke-dashoffset': pathLength * 0.2,
      'stroke-width': '6',
      stroke: '#6EE7FF'
    },
    opacity: 1,
    duration: 0.25,
    ease: 'power1.inOut',
  }, 0.3);

  // Phase 3: Peak current - white flash, fully revealed
  timeline.to(lineEl, {
    attr: {
      'stroke-dashoffset': 0,
      'stroke-width': '7',
      stroke: '#FFFFFF'
    },
    opacity: 1,
    duration: 0.25,
    ease: 'power2.out',
  }, 0.55);

  // Phase 4: Sustain - bright cyan, visible line
  timeline.to(lineEl, {
    attr: {
      'stroke-width': '5',
      stroke: '#6EE7FF'
    },
    opacity: 0.9,
    duration: 0.3,
    ease: 'none',
  }, 0.8);

  // Phase 5: Fade - dimmer cyan
  timeline.to(lineEl, {
    attr: {
      'stroke-width': '3',
      stroke: '#48D2E7'
    },
    opacity: 0.6,
    duration: 0.4,
    ease: 'power2.in',
  }, 1.1);

  // Phase 6: Fade out - disappear
  timeline.to(lineEl, {
    attr: {
      'stroke-width': '2',
    },
    opacity: 0,
    duration: 0.5,
    ease: 'power2.in',
  }, 1.5);
}

// ========== TYPEWRITER EFFECT ==========
function initTypewriter() {
  const subtitle = document.getElementById('heroSubtitle');
  if (!subtitle) return;

  const textEl = subtitle.querySelector('.typewriter-text');
  const cursorEl = subtitle.querySelector('.typewriter-cursor');
  if (!textEl) return;

  // Get text from translations
  const text = translations[currentLang]?.hero_subtitle || 'Jack into the digital world where code meets creativity.';
  const speed = 50; // ms per character

  let i = 0;
  textEl.textContent = '';

  function type() {
    if (i < text.length) {
      textEl.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      // Typing complete - cursor keeps blinking (handled by CSS)
      console.log('✅ Typewriter complete');
    }
  }

  // Start typing
  type();
}

// ========== PAGE FADE IN ==========
function fadeInPage() {
  const body = document.body;
  const pills = document.querySelectorAll('.hub-pill');
  const heroOverlay = document.querySelector('.hero-overlay');

  if (!window.gsap) {
    // Fallback bez GSAP
    body.style.opacity = '1';
    body.style.transition = 'opacity 2s ease-out';

    // Pills stagger fallback
    pills.forEach((pill, index) => {
      setTimeout(() => {
        pill.style.opacity = '1';
        if (pill.classList.contains('hub-pill-3')) {
          pill.style.transform = 'translate(0%, -100%)';
        } else {
          pill.style.transform = 'translate(-100%, -100%)';
        }
      }, 2000 + (index * 200));
    });
    // Start typewriter after fade
    setTimeout(initTypewriter, 2000);
    return;
  }

  if (prefersReducedMotion()) {
    // Reduced motion - instant display
    body.style.opacity = '1';
    pills.forEach((pill) => {
      pill.style.opacity = '1';
      const isWWW = pill.classList.contains('hub-pill-3');
      const translateX = isWWW ? '0%' : '-100%';
      pill.style.transform = `translate(${translateX}, -100%) scale(1)`;
    });
    // Start typewriter immediately
    initTypewriter();
    console.log('✅ Page instant display (reduced motion)');
    return;
  }

  // Full animation
  const gsap = window.gsap;
  const timeline = gsap.timeline();

  // Body fade in
  timeline.to(body, {
    opacity: 1,
    duration: 2,
    ease: 'power2.out',
  }, 0);

  // Hero overlay fade in from depth (scale effect)
  if (heroOverlay) {
    gsap.set(heroOverlay, { opacity: 0, scale: 0.9 });
    timeline.to(heroOverlay, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out',
      onComplete: () => {
        // Start typewriter after hero fade in
        initTypewriter();
      }
    }, 0.3);
  }

  // Pills stagger animation (start after 1.5s)
  pills.forEach((pill, index) => {
    const isWWW = pill.classList.contains('hub-pill-3');
    const translateX = isWWW ? '0%' : '-100%';

    timeline.to(pill, {
      opacity: 1,
      scale: 1,
      transform: `translate(${translateX}, -100%) scale(1)`,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, 1.5 + (index * 0.2));
  });

  console.log('✅ Page fade in started (2s)');
}

// ========== DYNAMIC PILLS POSITIONING ==========
function positionPills() {
  const svg = document.querySelector('.hub-mesh');
  const pillsContainer = document.querySelector('.hub-pills-container');
  const pills = document.querySelectorAll('.hub-pill');

  if (!svg || !pillsContainer || pills.length === 0) {
    return;
  }

  // Get container dimensions (pills are positioned relative to this)
  const containerRect = pillsContainer.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;

  // Calculate scale (preserveAspectRatio="xMidYMid meet" uses min scale)
  const scaleX = containerRect.width / viewBox.width;
  const scaleY = containerRect.height / viewBox.height;
  const scale = Math.min(scaleX, scaleY);

  // Calculate offset for centering SVG within container
  const offsetX = (containerRect.width - viewBox.width * scale) / 2;
  const offsetY = (containerRect.height - viewBox.height * scale) / 2;

  // Diagonal offsets for each pill (60 deg angle from vertical)
  const pillOffsets = {
    'robotyka': { x: -52, y: -30 },
    'aplikacje': { x: -52, y: -30 },
    'www': { x: 52, y: -30 },
    'studio': { x: -52, y: -30 }
  };

  pills.forEach(pill => {
    const nodeX = parseFloat(pill.dataset.nodeX);
    const nodeY = parseFloat(pill.dataset.nodeY);
    const cardId = pill.dataset.card;

    if (isNaN(nodeX) || isNaN(nodeY)) {
      console.warn('⚠️ Pill missing data-node-x or data-node-y attributes');
      return;
    }

    const offset = pillOffsets[cardId] || { x: 0, y: -60 };

    // Position relative to container (not viewport)
    const posX = offsetX + ((nodeX + offset.x) * scale);
    const posY = offsetY + ((nodeY + offset.y) * scale);

    pill.style.left = `${posX}px`;
    pill.style.top = `${posY}px`;
  });

  console.log('📍 Pills positioned dynamically (scale:', scale.toFixed(3), ')');
}

// Debounced resize handler
function handleResize() {
  if (resizeDebounceTimer) {
    clearTimeout(resizeDebounceTimer);
  }

  resizeDebounceTimer = setTimeout(() => {
    positionPills();
    console.log('🔄 Pills repositioned on resize');
  }, 100);
}

// ========== COPY TO CLIPBOARD ==========
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return Promise.resolve();
    } catch (err) {
      document.body.removeChild(textarea);
      return Promise.reject(err);
    }
  }
}

// Show copy feedback toast
function showCopyFeedback() {
  const toast = document.createElement('div');
  toast.className = 'copy-toast';
  toast.textContent = '✓ Skopiowano!';
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 2000);
}

// ========== EMAIL COPY BUTTON ==========
function initEmailCopy() {
  const emailBtn = document.querySelector('.email-copy-btn');
  if (!emailBtn) return;

  emailBtn.addEventListener('click', () => {
    const email = emailBtn.dataset.email;
    if (email) {
      copyToClipboard(email)
        .then(() => {
          showCopyFeedback();
          console.log(`✓ Email copied: ${email}`);
        })
        .catch(err => {
          console.error('❌ Copy failed:', err);
        });
    }
  });

  console.log('✅ Email copy button initialized');
}

// ========== LANGUAGE TOGGLE ==========
let currentLang = 'pl';

const translations = {
  pl: {
    hub_status: 'OTWARTY NA NOWE PROJEKTY',
    pill_robotyka: 'Robotyka_',
    pill_apps: 'Apps_',
    pill_www: 'WWW_',
    pill_studio: 'STUDIO_',
    enter_cta: 'WEJDZ',
    robotyka_desc: 'Przyszłość osiągów: SUV, który redefiniuje luksus. Poznaj Projekt P47 – pierwszy w historii McLarena, pięcioosobowy SUV typu coupe. Tworzony we współpracy z Forseven, ten hybrydowy potwór V8 o mocy 800 KM rzuci wyzwanie Ferrari Purosangue i Aston Martinowi DBX. Premiera rynkowa planowana jest na rok 2028.',
    aplikacje_desc: '> Automatyzuję to, czego nie warto robić ręcznie. Inżynierskie webappki zaprojektowane do określonych zadań biznesowych. #vibecoding',
    www_desc: '> Projektuję nowoczesne i responsywne strony internetowe, które są wizytówką Twojej firmy. Skupiam się na estetyce, szybkości działania i intuicyjnej nawigacji.',
    studio_desc: '> Technologia przestała być barierą. Stała się dźwignią dla tych, którzy mają plan.',
    headline_line1: '<span class="word-cyan glitch" data-text="KOD">KOD</span> JEST',
    headline_line2: 'OSTATNIM',
    headline_line3: 'KROKIEM<span class="dot-magenta">.</span>',
    scroll_cta: 'Zobacz, czym się teraz zajmuję.',
    hero_subtitle: 'Jack into the digital world where code meets creativity.',
    pillars_heading: 'Symulacje robotyczne. Aplikacje. Strony internetowe.',
  },
  en: {
    hub_status: 'OPEN FOR NEW PROJECTS',
    pill_robotyka: 'Robotics_',
    pill_apps: 'Apps_',
    pill_www: 'WWW_',
    pill_studio: 'STUDIO_',
    enter_cta: 'ENTER',
    robotyka_desc: 'The future of performance: an SUV that redefines luxury. Meet Project P47 – McLaren\'s first-ever five-seater coupe SUV. Developed in collaboration with Forseven, this 800 HP hybrid V8 beast will challenge the Ferrari Purosangue and Aston Martin DBX. Market premiere planned for 2028.',
    aplikacje_desc: '> I automate what is not worth doing manually. Engineering webapps designed for specific business tasks. #vibecoding',
    www_desc: '> I design modern and responsive websites that are your company\'s showcase. I focus on aesthetics, performance and intuitive navigation.',
    studio_desc: '> Technology is no longer a barrier. It has become a lever for those who have a plan.',
    headline_line1: '<span class="word-cyan glitch" data-text="CODE">CODE</span> IS',
    headline_line2: 'THE LAST',
    headline_line3: 'STEP<span class="dot-magenta">.</span>',
    scroll_cta: 'See what I\'m working on now.',
    hero_subtitle: 'Jack into the digital world where code meets creativity.',
    pillars_heading: 'Robotic simulations. Applications. Websites.',
  }
};

function setLanguage(lang) {
  currentLang = lang;

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Update elements with data-i18n-html (innerHTML)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Update toggle button text
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    const langText = langToggle.querySelector('.lang-text');
    if (langText) {
      langText.textContent = lang === 'pl' ? 'EN' : 'PL';
    }
  }

  // Store preference
  localStorage.setItem('lang', lang);

  console.log(`🌐 Language set to: ${lang}`);
}

function initLangToggle() {
  const langToggle = document.getElementById('lang-toggle');
  if (!langToggle) return;

  // Load saved preference
  const savedLang = localStorage.getItem('lang');
  if (savedLang && (savedLang === 'pl' || savedLang === 'en')) {
    setLanguage(savedLang);
  }

  langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'pl' ? 'en' : 'pl';
    setLanguage(newLang);
  });

  console.log('✅ Language toggle initialized');
}

// ========== PAGE INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing michalrapala.com...');

  if (prefersReducedMotion()) {
    console.log('⚠️ Reduced motion preference detected');
  }

  if (window.gsap) {
    console.log('✅ GSAP loaded successfully');
  } else {
    console.warn('⚠️ GSAP not found - animations will use fallback');
  }

  // Initialize page
  fadeInPage();
  initPills();
  initEmailCopy();
  initLangToggle();

  // Position pills after DOM is ready
  setTimeout(() => {
    positionPills();
  }, 100);

  // Add resize listeners
  window.addEventListener('resize', handleResize);
  window.addEventListener('orientationchange', handleResize);

  console.log('✅ Initialization complete');

  // Check for deep link
  if (window.location.hash) {
    const cardId = window.location.hash.slice(1);
    if (['robotyka', 'aplikacje', 'www', 'studio'].includes(cardId)) {
      console.log(`🔗 Deep link detected: ${cardId}`);
      setTimeout(() => openCard(cardId), 300);
    }
  }
});

// ========== CARD SHEET SYSTEM ==========

let currentCardId = null;
let dragState = null;

// Card data
const cardData = {
  robotyka: {
    title: 'McLaren | Projekt P47',
    images: [
      'assets/images/robotyka/P47-1.jpg',
      'assets/images/robotyka/P47-2.jpg',
      'assets/images/robotyka/P47-3.jpg',
    ],
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=P47',
  },
  aplikacje: {
    title: 'Aplikacje webowe',
    logo: 'assets/images/global/logo_app.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Aplikacje',
  },
  www: {
    title: 'Twoja strona → online',
    logo: 'assets/images/global/logo_web_ai.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Strony+WWW',
  },
  studio: {
    title: 'Studio',
    logo: 'assets/images/global/logo_placeholder.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Studio',
  },
};

// Detect desktop
function isDesktop() {
  return window.matchMedia('(min-width: 1025px)').matches;
}

// Open card
function openCard(id) {
  if (currentCardId === id) return;
  if (!cardData[id]) {
    console.error(`❌ Unknown card ID: ${id}`);
    return;
  }

  console.log(`📂 Opening card: ${id}`);

  currentCardId = id;

  // Mount content
  mountCardContent(id);

  // Show backdrop
  showBackdrop(true);

  // Lock body scroll
  lockBodyScroll(true);

  // Get elements
  const sheet = document.getElementById('card-sheet');
  if (!sheet) return;

  sheet.hidden = false;
  sheet.classList.add('is-open');

  // Animation with GSAP
  if (window.gsap && !prefersReducedMotion()) {
    const gsap = window.gsap;

    if (isDesktop()) {
      // Desktop: slide from right
      const viewportWidth = window.innerWidth;
      const statusEl = document.querySelector('.cyber-nav-status');
      const statusWidth = statusEl ? statusEl.getBoundingClientRect().width : 200;
      const targetLeft = (viewportWidth / 2) + (statusWidth / 2) + 16;

      gsap.fromTo(sheet,
        { left: viewportWidth, opacity: 0 },
        { left: targetLeft, opacity: 1, duration: 1.2, ease: 'power2.out', force3D: true }
      );
    } else {
      // Mobile: slide from bottom
      gsap.fromTo(sheet,
        { y: '100%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 0.5, ease: 'power2.out', force3D: true }
      );
    }
  } else {
    // Reduced motion
    sheet.style.transition = 'opacity 0.3s ease';
    if (isDesktop()) {
      const viewportWidth = window.innerWidth;
      const statusEl = document.querySelector('.cyber-nav-status');
      const statusWidth = statusEl ? statusEl.getBoundingClientRect().width : 200;
      const targetLeft = (viewportWidth / 2) + (statusWidth / 2) + 16;
      sheet.style.left = `${targetLeft}px`;
    }
    sheet.style.transform = isDesktop() ? 'translateX(0)' : 'translateY(0)';
    sheet.style.opacity = '0';
    sheet.offsetHeight;
    sheet.style.opacity = '1';
  }

  // Update hash
  history.replaceState(null, '', `#${id}`);

  // Focus trap
  setTimeout(() => trapFocus(sheet), 100);

  console.log(`✅ Card opened: ${id}`);
}

// Close card
function closeCard() {
  if (!currentCardId) return;

  console.log(`📪 Closing card: ${currentCardId}`);

  const sheet = document.getElementById('card-sheet');
  if (!sheet) return;

  sheet.classList.remove('is-open');

  // Disable drag
  disableDrag();

  // Animation
  if (window.gsap && !prefersReducedMotion()) {
    const gsap = window.gsap;

    if (isDesktop()) {
      const viewportWidth = window.innerWidth;
      gsap.to(sheet, {
        left: viewportWidth, opacity: 0, duration: 0.8, ease: 'power2.in', force3D: true,
        onComplete: () => finishClose(sheet),
      });
    } else {
      gsap.to(sheet, {
        y: '100%', opacity: 0, duration: 0.35, ease: 'power2.in', force3D: true,
        onComplete: () => finishClose(sheet),
      });
    }
  } else {
    sheet.style.transition = 'opacity 0.2s ease';
    sheet.style.opacity = '0';
    setTimeout(() => finishClose(sheet), 200);
  }
}

function finishClose(sheet) {
  sheet.hidden = true;

  // Reset inline styles
  sheet.style.transform = '';
  sheet.style.opacity = '';
  sheet.style.left = '';
  sheet.style.transition = '';

  if (window.gsap) {
    window.gsap.killTweensOf(sheet);
  }

  unmountCardContent();
  showBackdrop(false);
  lockBodyScroll(false);

  // Clear hash
  history.replaceState(null, '', window.location.pathname);

  // Return focus to pill
  if (currentCardId) {
    const pill = document.querySelector(`[data-card="${currentCardId}"]`);
    if (pill) pill.focus();
  }

  currentCardId = null;
  console.log('✅ Card closed');
}

// Carousel for robotyka
let carouselInterval = null;

function startCarousel(container) {
  stopCarousel();
  const images = container.querySelectorAll('.carousel-img');
  const dots = container.querySelectorAll('.carousel-dot');
  if (images.length <= 1) return;

  let currentIndex = 0;

  carouselInterval = setInterval(() => {
    images[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');
  }, 3500);

  // Click on dots to navigate
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      images[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      currentIndex = i;
      images[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    });
  });
}

function stopCarousel() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
    carouselInterval = null;
  }
}

// Mount card content
function mountCardContent(id) {
  const data = cardData[id];
  if (!data) return;

  // Set title
  const titleEl = document.getElementById('card-title');
  if (titleEl) {
    if (id === 'studio') {
      // SVG logo for studio
      titleEl.innerHTML = `
        <svg viewBox="0 0 110 40" class="rtk-logo-svg" style="width: 65px; height: auto; vertical-align: middle; margin-left: 4px;">
          <circle cx="5" cy="15" r="2" fill="#00ffff" />
          <circle cx="20" cy="5" r="2" fill="#00ffff" />
          <circle cx="10" cy="30" r="2" fill="#00ffff" />
          <line x1="5" y1="15" x2="20" y2="5" stroke="#00ffff" stroke-width="1.5" opacity="0.6" />
          <line x1="20" y1="5" x2="10" y2="30" stroke="#00ffff" stroke-width="1.5" opacity="0.6" />
          <line x1="5" y1="15" x2="10" y2="30" stroke="#00ffff" stroke-width="1.5" opacity="0.6" />
          <path d="M 10 30 L 32 30" stroke="#00ffff" stroke-width="2" fill="none" />
          <text x="32" y="30" fill="#00ffff" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="28px">cd</text>
          <rect x="68" y="8" width="14" height="26" fill="#00ffff" class="rtk-cursor-blink" />
        </svg>
      `;
    } else {
      titleEl.textContent = data.title;
    }
  }

  // Handle terminal dot for studio
  const terminalDot = document.querySelector('.card-terminal-dot');
  if (terminalDot && id === 'studio') {
    terminalDot.classList.add('dot-yellow');
  }

  // Set logo (hide for studio, carousel for robotyka)
  const logoEl = document.getElementById('card-logo');
  const mediaFrame = document.querySelector('.card-media-frame');
  if (id === 'studio') {
    if (mediaFrame) mediaFrame.style.display = 'none';
  } else if (id === 'robotyka' && data.images) {
    // Image carousel for robotyka
    if (mediaFrame) {
      mediaFrame.style.display = '';
      mediaFrame.innerHTML = `
        <div class="card-carousel">
          ${data.images.map((src, i) => `
            <img class="carousel-img ${i === 0 ? 'active' : ''}" src="${src}" alt="${data.title} ${i + 1}" />
          `).join('')}
          <div class="carousel-dots">
            ${data.images.map((_, i) => `<span class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
          </div>
        </div>
      `;
      // Start carousel auto-rotation
      startCarousel(mediaFrame);
    }
  } else if (logoEl) {
    if (mediaFrame) mediaFrame.style.display = '';
    logoEl.src = data.logo;
    logoEl.alt = data.title;
    logoEl.onerror = () => {
      logoEl.src = data.logoFallback;
    };
  }

  // Set content from template
  const template = document.getElementById(`template-${id}`);
  const contentEl = document.getElementById('card-content');
  if (template && contentEl) {
    const clone = template.content.cloneNode(true);
    contentEl.appendChild(clone);
  }

  // Attach CTA click handler for studio sequence
  if (id === 'studio') {
    setTimeout(() => {
      const cta = document.getElementById('studio-cta');
      if (cta) {
        cta.addEventListener('click', handleStudioCTAClick);
      }
    }, 100);
  }

  console.log(`📝 Content mounted for: ${id}`);
}

// Handle Studio CTA click sequence
function handleStudioCTAClick(e) {
  const cta = e.currentTarget;
  const textEl = cta.querySelector('.cta-text');
  const terminalDot = document.querySelector('.card-terminal-dot');
  const titleEl = document.getElementById('card-title');
  let state = parseInt(cta.dataset.state || '0');

  if (state === 0) {
    e.preventDefault();
    cta.classList.add('card-cta-denied');
    textEl.textContent = 'ACCESS_DENIED';
    cta.dataset.state = '1';
  } else if (state === 1) {
    e.preventDefault();
    cta.classList.remove('card-cta-denied');
    cta.classList.add('card-cta-preview');
    textEl.textContent = 'GAIN_PREVIEW';
    cta.dataset.state = '2';
    if (terminalDot) {
      terminalDot.classList.remove('dot-yellow');
    }
    if (titleEl) {
      titleEl.innerHTML = `
        <svg viewBox="0 0 440 60" class="rtk-base-svg" style="width: 240px; height: auto; vertical-align: middle; margin-left: 4px;">
          <circle cx="5" cy="15" r="2" class="rtk-long-node rtk-n1" />
          <circle cx="20" cy="5" r="2" class="rtk-long-node rtk-n2" />
          <circle cx="10" cy="30" r="2" class="rtk-long-node rtk-n3" />
          <line x1="5" y1="15" x2="20" y2="5" class="rtk-long-link rtk-l1" />
          <line x1="20" y1="5" x2="10" y2="30" class="rtk-long-link rtk-l2" />
          <line x1="5" y1="15" x2="10" y2="30" class="rtk-long-link rtk-l3" />
          <path d="M 10 30 L 40 30" class="rtk-long-path" />
          <text x="48" y="38" class="rtk-long-cmd">&gt;_</text>
          <text x="86" y="38" class="rtk-long-url" xml:space="preserve">cd resztatokod.pl</text>
          <g class="rtk-long-cursor-g">
            <rect x="86" y="16" width="14" height="26" class="rtk-long-cursor" />
          </g>
        </svg>
      `;
    }
  } else if (state === 2) {
    cta.href = 'https://resztatokod.pl';
    cta.target = '_blank';
  }
}

// Handle Pillar Studio CTA click sequence (standalone, no card dependencies)
function handlePillarStudioCTAClick(e) {
  const cta = e.currentTarget;
  const textEl = cta.querySelector('.cta-text');
  const pillarDot = document.querySelector('.pillar-studio .pillar-dot');
  const pillarHeader = document.querySelector('.pillar-studio .pillar-header');
  let state = parseInt(cta.dataset.state || '0');

  if (state === 0) {
    e.preventDefault();
    cta.classList.add('pillar-cta-denied');
    textEl.textContent = 'ACCESS_DENIED';
    cta.dataset.state = '1';
    // Update pillar dot to red
    if (pillarDot) {
      pillarDot.style.background = '#ff3366';
      pillarDot.style.boxShadow = '0 0 10px #ff3366';
    }
  } else if (state === 1) {
    e.preventDefault();
    cta.classList.remove('pillar-cta-denied');
    cta.classList.add('pillar-cta-preview');
    textEl.textContent = 'GAIN_PREVIEW';
    cta.dataset.state = '2';
    // Update pillar dot to yellow
    if (pillarDot) {
      pillarDot.style.background = 'var(--yellow)';
      pillarDot.style.boxShadow = '0 0 10px var(--yellow)';
    }
  } else if (state === 2) {
    cta.href = 'https://resztatokod.pl';
    cta.target = '_blank';
  }
}

// Initialize Pillar Studio CTA
function initPillarStudioCTA() {
  const pillarCta = document.getElementById('pillar-studio-cta');
  if (pillarCta) {
    pillarCta.addEventListener('click', handlePillarStudioCTAClick);
    console.log('✅ Pillar Studio CTA initialized');
  }
}

// Unmount card content
function unmountCardContent() {
  // Stop carousel if running
  stopCarousel();

  const titleEl = document.getElementById('card-title');
  if (titleEl) titleEl.innerHTML = '';

  const terminalDot = document.querySelector('.card-terminal-dot');
  if (terminalDot) {
    terminalDot.classList.remove('dot-yellow', 'dot-red');
  }

  const mediaFrame = document.querySelector('.card-media-frame');
  if (mediaFrame) {
    mediaFrame.style.display = '';
    // Restore original img element if carousel was used
    if (mediaFrame.querySelector('.card-carousel')) {
      mediaFrame.innerHTML = '<img id="card-logo" class="card-logo-img" alt="" />';
    }
  }

  const logoEl = document.getElementById('card-logo');
  if (logoEl) {
    logoEl.src = '';
    logoEl.alt = '';
  }

  const contentEl = document.getElementById('card-content');
  if (contentEl) contentEl.innerHTML = '';
}

// Show/hide backdrop
function showBackdrop(show) {
  const backdrop = document.getElementById('card-backdrop');
  if (!backdrop) return;
  backdrop.hidden = !show;
}

// Lock/unlock body scroll
function lockBodyScroll(lock) {
  if (lock) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    document.body.classList.add('card-open');
  } else {
    document.body.classList.remove('card-open');
    document.documentElement.style.removeProperty('--scrollbar-width');
  }
}

// Focus trap
let focusTrapActive = false;
let focusableElements = [];

function trapFocus(container) {
  if (!container) return;

  focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  if (focusableElements.length === 0) return;

  const firstEl = focusableElements[0];
  const lastEl = focusableElements[focusableElements.length - 1];

  firstEl.focus();
  focusTrapActive = true;

  container.addEventListener('keydown', (e) => {
    if (!focusTrapActive || e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });
}

// Drag (mobile only)
function enableDrag(sheet) {
  if (isDesktop()) return;

  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  const handleStart = (e) => {
    const target = e.target;
    if (target.closest('.card-close') || target.closest('a') || target.closest('button:not(.card-close)')) {
      return;
    }

    startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    isDragging = true;
    sheet.classList.add('is-dragging');
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const deltaY = currentY - startY;

    if (deltaY < 0) return;

    const yPercent = (deltaY / window.innerHeight) * 100;
    sheet.style.transform = `translateY(${yPercent}%)`;

    const backdrop = document.getElementById('card-backdrop');
    if (backdrop) {
      const opacity = Math.max(0, 0.35 - (yPercent / 100) * 0.35);
      backdrop.style.opacity = opacity;
    }
  };

  const handleEnd = () => {
    if (!isDragging) return;

    isDragging = false;
    sheet.classList.remove('is-dragging');

    const deltaY = currentY - startY;
    const deltaPercent = (deltaY / window.innerHeight) * 100;
    const velocity = Math.abs(deltaY);

    if (deltaPercent > 33 || velocity > 1200) {
      closeCard();
    } else {
      if (window.gsap) {
        window.gsap.to(sheet, {
          yPercent: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        sheet.style.transform = 'translateY(0)';
      }

      const backdrop = document.getElementById('card-backdrop');
      if (backdrop) backdrop.style.opacity = '';
    }

    startY = 0;
    currentY = 0;
  };

  sheet.addEventListener('mousedown', handleStart);
  sheet.addEventListener('touchstart', handleStart, { passive: true });

  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: true });
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('touchend', handleEnd);

  dragState = { handleStart, handleMove, handleEnd, sheet };

  console.log('✅ Drag enabled');
}

function disableDrag() {
  if (!dragState) return;

  const { handleStart, handleMove, handleEnd, sheet } = dragState;

  if (sheet) {
    sheet.removeEventListener('mousedown', handleStart);
    sheet.removeEventListener('touchstart', handleStart);
  }

  document.removeEventListener('mousemove', handleMove);
  document.removeEventListener('touchmove', handleMove);
  document.removeEventListener('mouseup', handleEnd);
  document.removeEventListener('touchend', handleEnd);

  dragState = null;
  focusTrapActive = false;
}

// Event listeners for card sheet
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('card-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeCard);
  }

  const closeBtn = document.querySelector('.card-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCard);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentCardId) {
      closeCard();
    }
  });

  // Initialize pillar CTA
  initPillarStudioCTA();

  // Initialize stacked carousel (mobile only)
  initPillarsCarousel();

  console.log('✅ Card sheet listeners initialized');
});

// ========== STACKED CARD CAROUSEL (MOBILE) ==========
let carouselInterval = null;
let currentPillarIndex = 0;
const CAROUSEL_DELAY = 4000; // 4 seconds

function initPillarsCarousel() {
  const pillars = document.querySelectorAll('.pillar');
  const dots = document.querySelectorAll('.pillars-nav-dot');

  if (pillars.length < 2) return;

  // Check if mobile
  const isMobile = () => window.matchMedia('(max-width: 900px)').matches;

  // Set initial state
  function setInitialState() {
    if (!isMobile()) {
      // Desktop: remove all stack classes
      pillars.forEach(p => {
        p.classList.remove('stack-active', 'stack-next', 'stack-hidden', 'stack-exiting');
      });
      stopCarousel();
      return;
    }

    // Mobile: set stack positions
    updateStackPositions();
    startCarousel();
  }

  // Update stack positions based on currentPillarIndex
  function updateStackPositions() {
    pillars.forEach((pillar, index) => {
      pillar.classList.remove('stack-active', 'stack-next', 'stack-hidden', 'stack-exiting');

      if (index === currentPillarIndex) {
        pillar.classList.add('stack-active');
      } else if (index === (currentPillarIndex + 1) % pillars.length) {
        pillar.classList.add('stack-next');
      } else {
        pillar.classList.add('stack-hidden');
      }
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPillarIndex);
    });
  }

  // Go to specific slide
  function goToSlide(index, animate = true) {
    if (!isMobile()) return;

    const prevIndex = currentPillarIndex;
    if (index === prevIndex) return;

    if (animate) {
      // Add exit animation to current card
      const currentCard = pillars[prevIndex];
      currentCard.classList.add('stack-exiting');

      // After exit animation, update positions
      setTimeout(() => {
        currentPillarIndex = index;
        updateStackPositions();
      }, 400);
    } else {
      currentPillarIndex = index;
      updateStackPositions();
    }

    // Reset timer
    restartCarousel();
  }

  // Next slide
  function nextSlide() {
    const next = (currentPillarIndex + 1) % pillars.length;
    goToSlide(next);
  }

  // Previous slide
  function prevSlide() {
    const prev = (currentPillarIndex - 1 + pillars.length) % pillars.length;
    goToSlide(prev);
  }

  // Start auto-rotation
  function startCarousel() {
    if (carouselInterval) return;
    carouselInterval = setInterval(() => {
      if (isMobile()) {
        nextSlide();
      }
    }, CAROUSEL_DELAY);
  }

  // Stop auto-rotation
  function stopCarousel() {
    if (carouselInterval) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  // Restart timer
  function restartCarousel() {
    stopCarousel();
    if (isMobile()) {
      startCarousel();
    }
  }

  // Click on card to advance
  pillars.forEach((pillar, index) => {
    pillar.addEventListener('click', (e) => {
      if (!isMobile()) return;

      // Don't advance if clicking on CTA
      if (e.target.closest('.pillar-cta')) return;

      // If clicking active card, go to next
      if (pillar.classList.contains('stack-active')) {
        nextSlide();
      }
    });
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  // Swipe handling for mobile
  const pillarsContainer = document.getElementById('twoPillars');
  if (pillarsContainer) {
    let touchStartX = 0;
    let touchEndX = 0;
    const SWIPE_THRESHOLD = 50;

    pillarsContainer.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    pillarsContainer.addEventListener('touchend', (e) => {
      if (!isMobile()) return;

      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > SWIPE_THRESHOLD) {
        if (diff > 0) {
          // Swipe left -> next
          nextSlide();
        } else {
          // Swipe right -> prev
          prevSlide();
        }
      }
    }, { passive: true });
  }

  // Handle resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setInitialState, 150);
  });

  // Initialize
  setInitialState();

  console.log('✅ Pillars carousel initialized');
}

// ========== SCROLL INDICATOR ==========
function initScrollIndicator() {
  const indicator = document.getElementById('scrollIndicator');
  const pcbSection = document.getElementById('hubMeshSection');

  if (!indicator || !pcbSection) return;

  indicator.addEventListener('click', () => {
    pcbSection.scrollIntoView({ behavior: 'smooth' });
  });

  // Hide indicator when scrolled past hero
  const hideOnScroll = () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight * 0.5;

    if (scrollY > heroHeight) {
      indicator.style.opacity = '0';
      indicator.style.pointerEvents = 'none';
    } else {
      indicator.style.opacity = '0.7';
      indicator.style.pointerEvents = 'auto';
    }
  };

  window.addEventListener('scroll', hideOnScroll, { passive: true });
  console.log('✅ Scroll indicator initialized');
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initScrollIndicator();
});

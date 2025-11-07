// main-script.js v0.010 – Multi-Page Navigation + Card Sheets + Flash Lines

// ========== GSAP GLOBAL ==========
// GSAP jest załadowany z <script> w index.html, dostępny jako window.gsap

// ========== STATE ==========
let isNavigating = false;

// ========== REDUCED MOTION CHECK ==========
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ========== GATE: INICJALIZACJA ==========
function initGate() {
  const enterBtn = document.querySelector('.gate__enter');
  
  if (!enterBtn) {
    console.error('❌ Gate enter button not found');
    return;
  }
  
  enterBtn.addEventListener('click', () => navigateToHub());
  
  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!isNavigating && (e.key === 'Enter' || e.code === 'Space')) {
      e.preventDefault();
      navigateToHub();
    }
  });
  
  console.log('✅ Gate initialized');
}

// ========== NAVIGATE TO HUB ==========
function navigateToHub() {
  if (isNavigating) return;
  isNavigating = true;
  
  console.log('📍 Navigating to Hub...');
  
  const body = document.body;
  
  if (!window.gsap) {
    console.warn('⚠️ GSAP not loaded, using fallback');
    // Fallback bez GSAP
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.8s ease-in';
    setTimeout(() => {
      window.location.href = 'hub.html';
    }, 800);
    return;
  }
  
  if (prefersReducedMotion()) {
    // Reduced motion: tylko fade
    const gsap = window.gsap;
    gsap.to(body, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        window.location.href = 'hub.html';
      },
    });
  } else {
    // Full animation
    const gsap = window.gsap;
    const timeline = gsap.timeline();
    
    timeline.to(body, {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: 'power2.in',
    }, 0);
    
    timeline.call(() => {
      window.location.href = 'hub.html';
    }, null, 0.6);
  }
}

// ========== BACK BUTTON (FOR HUB PAGE) ==========
// Ten kod będzie załadowany przez hub.html (separate page)
function initBackButton() {
  const backBtn = document.getElementById('backButton');
  
  if (!backBtn) {
    console.log('ℹ️ Back button not found (this is Gate page)');
    return;
  }
  
  backBtn.addEventListener('click', () => navigateToGate());
  
  backBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.code === 'Space') {
      e.preventDefault();
      navigateToGate();
    }
  });
  
  console.log('✅ Back button initialized');
}

// ========== NAVIGATE TO GATE ==========
function navigateToGate() {
  if (isNavigating) return;
  isNavigating = true;
  
  console.log('🔙 Navigating back to Gate...');
  
  const body = document.body;
  
  if (!window.gsap) {
    console.warn('⚠️ GSAP not loaded, using fallback');
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.8s ease-in';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);
    return;
  }
  
  if (prefersReducedMotion()) {
    const gsap = window.gsap;
    gsap.to(body, {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        window.location.href = 'index.html';
      },
    });
  } else {
    const gsap = window.gsap;
    const timeline = gsap.timeline();
    
    timeline.to(body, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.in',
    }, 0);
    
    timeline.call(() => {
      window.location.href = 'index.html';
    }, null, 0.6);
  }
}

// ========== PILLS LOGIC (FOR HUB PAGE) ==========
function initPills() {
  const pills = document.querySelectorAll('.hub-pill');
  
  if (pills.length === 0) {
    console.log('ℹ️ No pills found (this is Gate page)');
    return;
  }
  
  let currentCard = null;
  
  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const cardId = pill.dataset.card;
      console.log(`🔘 Pill clicked: ${cardId}`);
      showCard(cardId, currentCard);
      currentCard = document.getElementById(`hub-card-${cardId}`);
    });
    
    pill.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        const cardId = pill.dataset.card;
        showCard(cardId, currentCard);
        currentCard = document.getElementById(`hub-card-${cardId}`);
      }
    });
  });
  
  console.log('✅ Pills initialized');
}

// ========== SHOW CARD (updated for card-sheet system) ==========
function showCard(cardId, previousCard) {
  // Flash connection line
  flashPillLine(cardId);

  // Open card sheet (replaces old inline cards)
  openCard(cardId);

  console.log(`📍 Showing card: ${cardId}`);
}

// ========== FLASH PILL LINE ==========
function flashPillLine(cardId) {
  const lineId = `pill-line-${cardId}`;
  const lineEl = document.getElementById(lineId);

  if (!lineEl) {
    console.warn(`⚠️ Line ${lineId} not found`);
    return;
  }

  // Remove any existing flash animation
  lineEl.classList.remove('flash');

  // Trigger reflow to restart animation
  void lineEl.offsetWidth;

  // Add flash animation
  lineEl.classList.add('flash');

  // Remove class after animation completes (1.2s to match CSS animation)
  setTimeout(() => {
    lineEl.classList.remove('flash');
  }, 1200);

  console.log(`⚡ Flashing line for: ${cardId}`);
}

// ========== PAGE DETECTION & INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 Initializing michalrapala.com...');
  
  // Check environment
  if (prefersReducedMotion()) {
    console.log('⚠️ Reduced motion preference detected');
  }
  
  if (window.gsap) {
    console.log('✅ GSAP loaded successfully');
  } else {
    console.warn('⚠️ GSAP not found - animations will use fallback');
  }
  
  // Detect current page
  const isGatePage = document.querySelector('.gate') !== null;
  const isHubPage = document.querySelector('.hub-mesh-section') !== null;
  
  if (isGatePage) {
    console.log('📍 On Gate page (index.html)');
    initGate();
  }
  
  if (isHubPage) {
    console.log('📍 On Hub page (hub.html)');
    initBackButton();
    initPills();
  }
  
  console.log('✅ Initialization complete');

  // Check for deep link (hash in URL)
  if (isHubPage && window.location.hash) {
    const cardId = window.location.hash.slice(1); // remove #
    if (['robotyka', 'aplikacje', 'www'].includes(cardId)) {
      console.log(`🔗 Deep link detected: ${cardId}`);
      setTimeout(() => openCard(cardId), 300); // delay for DOM ready
    }
  }
});

// ========== CARD SHEET SYSTEM ==========

let currentCardId = null;
let dragState = null;

// Card data
const cardData = {
  robotyka: {
    title: 'Robotyka',
    logo: 'assets/images/global/logo_robotyka.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Robotyka',
  },
  aplikacje: {
    title: 'Aplikacje Webowe',
    logo: 'assets/images/global/logo_app.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Aplikacje',
  },
  www: {
    title: 'Strony WWW',
    logo: 'assets/images/global/logo_web_ai.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Strony+WWW',
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
    const duration = 0.42;
    const ease = 'power3.out';

    if (isDesktop()) {
      // Desktop: slide from right
      gsap.set(sheet, { xPercent: 100, yPercent: 0, opacity: 0 });
      gsap.to(sheet, { xPercent: 0, opacity: 1, duration, ease });
    } else {
      // Mobile: slide from bottom
      gsap.set(sheet, { yPercent: 100, xPercent: 0, opacity: 0 });
      gsap.to(sheet, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        onComplete: () => {
          // Enable drag on mobile
          enableDrag(sheet);
        },
      });
    }
  } else {
    // Reduced motion: instant
    if (isDesktop()) {
      sheet.style.transform = 'translateX(0)';
    } else {
      sheet.style.transform = 'translateY(0)';
    }
    sheet.style.opacity = '1';
    if (!isDesktop()) enableDrag(sheet);
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
    const duration = 0.36;
    const ease = 'power2.in';

    if (isDesktop()) {
      gsap.to(sheet, {
        xPercent: 100,
        opacity: 0,
        duration,
        ease,
        onComplete: () => finishClose(sheet),
      });
    } else {
      gsap.to(sheet, {
        yPercent: 100,
        opacity: 0,
        duration,
        ease,
        onComplete: () => finishClose(sheet),
      });
    }
  } else {
    // Reduced motion
    if (isDesktop()) {
      sheet.style.transform = 'translateX(100%)';
    } else {
      sheet.style.transform = 'translateY(100%)';
    }
    sheet.style.opacity = '0';
    setTimeout(() => finishClose(sheet), 150);
  }
}

function finishClose(sheet) {
  sheet.hidden = true;
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

// Mount card content
function mountCardContent(id) {
  const data = cardData[id];
  if (!data) return;

  // Set title
  const titleEl = document.getElementById('card-title');
  if (titleEl) titleEl.textContent = data.title;

  // Set logo
  const logoEl = document.getElementById('card-logo');
  if (logoEl) {
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

  console.log(`📝 Content mounted for: ${id}`);
}

// Unmount card content
function unmountCardContent() {
  const titleEl = document.getElementById('card-title');
  if (titleEl) titleEl.textContent = '';

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
    // Calculate scrollbar width
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

  // Trap tab key
  container.addEventListener('keydown', (e) => {
    if (!focusTrapActive || e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
  });
}

// Enable drag (mobile only)
function enableDrag(sheet) {
  if (isDesktop()) return;

  const grabber = sheet.querySelector('.card-grabber');
  const topbar = sheet.querySelector('.card-topbar');
  if (!grabber && !topbar) return;

  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  const handleStart = (e) => {
    startY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    isDragging = true;
    sheet.classList.add('is-dragging');
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    currentY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    const deltaY = currentY - startY;

    // Only allow drag down
    if (deltaY < 0) return;

    // Update position
    const yPercent = (deltaY / window.innerHeight) * 100;
    sheet.style.transform = `translateY(${yPercent}%)`;

    // Update backdrop opacity
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

    // Close if dragged more than 33% or fast swipe
    if (deltaPercent > 33 || velocity > 1200) {
      closeCard();
    } else {
      // Snap back
      if (window.gsap) {
        window.gsap.to(sheet, {
          yPercent: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        sheet.style.transform = 'translateY(0)';
      }

      // Reset backdrop
      const backdrop = document.getElementById('card-backdrop');
      if (backdrop) backdrop.style.opacity = '';
    }

    startY = 0;
    currentY = 0;
  };

  // Add listeners
  if (grabber) {
    grabber.addEventListener('mousedown', handleStart);
    grabber.addEventListener('touchstart', handleStart, { passive: true });
  }
  if (topbar) {
    topbar.addEventListener('mousedown', handleStart);
    topbar.addEventListener('touchstart', handleStart, { passive: true });
  }

  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: true });
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('touchend', handleEnd);

  // Store for cleanup
  dragState = { handleStart, handleMove, handleEnd, grabber, topbar };

  console.log('✅ Drag enabled');
}

function disableDrag() {
  if (!dragState) return;

  const { handleStart, handleMove, handleEnd, grabber, topbar } = dragState;

  if (grabber) {
    grabber.removeEventListener('mousedown', handleStart);
    grabber.removeEventListener('touchstart', handleStart);
  }
  if (topbar) {
    topbar.removeEventListener('mousedown', handleStart);
    topbar.removeEventListener('touchstart', handleStart);
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
  // Backdrop click
  const backdrop = document.getElementById('card-backdrop');
  if (backdrop) {
    backdrop.addEventListener('click', closeCard);
  }

  // Close button
  const closeBtn = document.querySelector('.card-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeCard);
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentCardId) {
      closeCard();
    }
  });

  console.log('✅ Card sheet listeners initialized');
});

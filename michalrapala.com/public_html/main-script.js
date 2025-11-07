// main-script.js v0.009 – Multi-Page Navigation + Enhanced Flash Lines (1.2s)

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

// ========== SHOW CARD ==========
function showCard(cardId, previousCard) {
  const cardEl = document.getElementById(`hub-card-${cardId}`);

  if (!cardEl) {
    console.error(`❌ Card ${cardId} not found`);
    return;
  }

  // Flash connection line
  flashPillLine(cardId);

  // Close previous card
  if (previousCard && previousCard !== cardEl) {
    closeCard(previousCard);
  }

  // Open new card
  openCard(cardEl);

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

// ========== OPEN CARD ==========
function openCard(cardEl) {
  if (!cardEl) return;
  
  cardEl.classList.add('active');
  
  if (window.gsap && !prefersReducedMotion()) {
    const gsap = window.gsap;
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: slide up from bottom
      gsap.fromTo(
        cardEl,
        { y: '100%', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }
      );
    } else {
      // Desktop: slide right from side
      gsap.fromTo(
        cardEl,
        { x: '100%', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }
      );
    }
  }
  
  console.log(`✅ Card opened: ${cardEl.id}`);
}

// ========== CLOSE CARD ==========
function closeCard(cardEl) {
  if (!cardEl) return;
  
  cardEl.classList.remove('active');
  
  if (window.gsap && !prefersReducedMotion()) {
    const gsap = window.gsap;
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Mobile: slide down
      gsap.to(cardEl, {
        y: '100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    } else {
      // Desktop: slide left
      gsap.to(cardEl, {
        x: '-100%',
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      });
    }
  }
  
  console.log(`✅ Card closed: ${cardEl.id}`);
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
});

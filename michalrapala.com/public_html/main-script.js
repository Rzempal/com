// main-script.js v0.054 – Revert card animation speed (desktop: 1.2s, mobile: 0.5s)

// ========== GSAP GLOBAL ==========
// GSAP jest załadowany z <script> w index.html, dostępny jako window.gsap

// ========== STATE ==========
let isNavigating = false;
let resizeDebounceTimer = null;

// ========== REDUCED MOTION CHECK ==========
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ========== GATE: INICJALIZACJA ==========
function initGate() {
  const enterBtn = document.querySelector('.gate__enter');
  const gateLogo = document.getElementById('gateLogo');

  if (!enterBtn) {
    console.error('❌ Gate enter button not found');
    return;
  }

  enterBtn.addEventListener('click', () => navigateToHub());

  // Logo click - open video modal
  if (gateLogo) {
    gateLogo.addEventListener('click', () => openVideoModal());
    gateLogo.style.cursor = 'pointer';
  }

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (!isNavigating && (e.key === 'Enter' || e.code === 'Space')) {
      e.preventDefault();
      navigateToHub();
    }
  });

  console.log('✅ Gate initialized');
}

// ========== VIDEO MODAL ==========
function openVideoModal() {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('introVideo');
  const closeBtn = document.querySelector('.video-modal-close');
  const backdrop = document.querySelector('.video-modal-backdrop');

  if (!modal || !video) return;

  modal.hidden = false;
  video.play();

  // Close handlers
  const closeModal = () => {
    video.pause();
    video.currentTime = 0;
    modal.hidden = true;
  };

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);

  // ESC key
  const escHandler = (e) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', escHandler);
    }
  };
  document.addEventListener('keydown', escHandler);

  console.log('🎬 Video modal opened');
}

// ========== NAVIGATE TO HUB ==========
function navigateToHub() {
  if (isNavigating) return;
  isNavigating = true;

  console.log('📍 Navigating to Hub...');

  const body = document.body;

  if (!window.gsap) {
    console.warn('⚠️ GSAP not loaded, using fallback');
    // Fallback bez GSAP - extended fade
    body.style.opacity = '0';
    body.style.transition = 'opacity 1.5s ease-in';
    setTimeout(() => {
      window.location.href = 'hub.html';
    }, 1500);
    return;
  }

  if (prefersReducedMotion()) {
    // Reduced motion: fade with reduced duration
    const gsap = window.gsap;
    gsap.to(body, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
      onComplete: () => {
        window.location.href = 'hub.html';
      },
    });
  } else {
    // Full animation - extended fade (1.5s)
    const gsap = window.gsap;
    const timeline = gsap.timeline();

    timeline.to(body, {
      opacity: 0,
      duration: 1.5,
      ease: 'power2.in',
    }, 0);

    timeline.call(() => {
      window.location.href = 'hub.html';
    }, null, 1.2);
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
    // Fallback bez GSAP - extended fade
    body.style.opacity = '0';
    body.style.transition = 'opacity 1.5s ease-in';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1500);
    return;
  }

  if (prefersReducedMotion()) {
    const gsap = window.gsap;
    gsap.to(body, {
      opacity: 0,
      duration: 0.6,
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
      duration: 1.5,
      ease: 'power2.in',
    }, 0);

    timeline.call(() => {
      window.location.href = 'index.html';
    }, null, 1.2);
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

// ========== HUB FADE IN ==========
function fadeInHub() {
  const body = document.body;
  const pills = document.querySelectorAll('.hub-pill');
  const backButton = document.querySelector('.hub-back-button');

  if (!window.gsap) {
    // Fallback bez GSAP
    body.style.opacity = '1';
    body.style.transition = 'opacity 2s ease-out';

    // Pills stagger fallback (preserve corner-based transforms)
    pills.forEach((pill, index) => {
      setTimeout(() => {
        pill.style.opacity = '1';
        // Preserve anchor point based on pill class
        if (pill.classList.contains('hub-pill-3')) {
          pill.style.transform = 'translate(0%, -100%)'; // bottom-left anchor
        } else {
          pill.style.transform = 'translate(-100%, -100%)'; // bottom-right anchor
        }
      }, 2000 + (index * 200));
    });

    // Back button - after all pills
    if (backButton) {
      setTimeout(() => {
        backButton.style.opacity = '1';
        backButton.style.visibility = 'visible';
      }, 2800);
    }
    return;
  }

  if (prefersReducedMotion()) {
    // Reduced motion - instant display (no animations, no GSAP)
    body.style.opacity = '1';
    pills.forEach((pill) => {
      pill.style.opacity = '1';
      // Preserve positioning only
      const isWWW = pill.classList.contains('hub-pill-3');
      const translateX = isWWW ? '0%' : '-100%';
      pill.style.transform = `translate(${translateX}, -100%) scale(1)`;
    });
    // Back button instant
    if (backButton) {
      backButton.style.opacity = '1';
      backButton.style.visibility = 'visible';
    }
    console.log('✅ Hub instant display (reduced motion)');
    return; // Skip GSAP animations
  } else {
    // Full animation - extended fade in (2s) + staggered pills
    const gsap = window.gsap;
    const timeline = gsap.timeline();

    // Body fade in
    timeline.to(body, {
      opacity: 1,
      duration: 2,
      ease: 'power2.out',
    }, 0);

    // Pills stagger animation (start after 1.5s)
    pills.forEach((pill, index) => {
      // Preserve anchor point transform while animating scale
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

    // Back button - appears after all pills (4 pills = 2.3s, so 2.5s for back button)
    if (backButton) {
      timeline.to(backButton, {
        opacity: 1,
        visibility: 'visible',
        scale: 1,
        duration: 0.6,
        ease: 'back.out(1.7)',
      }, 2.5);
    }
  }

  console.log('✅ Hub fade in started (2s)');
}

// ========== DYNAMIC PILLS POSITIONING ==========
function positionPills() {
  const svg = document.querySelector('.hub-mesh');
  const pills = document.querySelectorAll('.hub-pill');

  if (!svg || pills.length === 0) {
    return;
  }

  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;

  // Calculate scale (preserveAspectRatio="xMidYMid meet" uses min scale)
  const scaleX = svgRect.width / viewBox.width;
  const scaleY = svgRect.height / viewBox.height;
  const scale = Math.min(scaleX, scaleY);

  // Calculate offset for centering SVG
  const offsetX = (svgRect.width - viewBox.width * scale) / 2;
  const offsetY = (svgRect.height - viewBox.height * scale) / 2;

  // Diagonal offsets for each pill (60° angle from vertical)
  // x: ±52px (horizontal), y: -30px (vertical up)
  const pillOffsets = {
    'robotyka': { x: -52, y: -30 },    // up-left diagonal
    'aplikacje': { x: -52, y: -30 },   // up-left diagonal
    'www': { x: 52, y: -30 },          // up-right diagonal
    'newproject': { x: -52, y: -30 }   // up-left diagonal (old Apps position)
  };

  pills.forEach(pill => {
    const nodeX = parseFloat(pill.dataset.nodeX);
    const nodeY = parseFloat(pill.dataset.nodeY);
    const cardId = pill.dataset.card;

    if (isNaN(nodeX) || isNaN(nodeY)) {
      console.warn('⚠️ Pill missing data-node-x or data-node-y attributes');
      return;
    }

    // Get offset for this pill (default to vertical if card ID not found)
    const offset = pillOffsets[cardId] || { x: 0, y: -60 };

    // Convert SVG viewBox coordinates to screen pixels
    // Pills positioned diagonally from node (60° angle)
    const screenX = svgRect.left + offsetX + ((nodeX + offset.x) * scale);
    const screenY = svgRect.top + offsetY + ((nodeY + offset.y) * scale);

    pill.style.left = `${screenX}px`;
    pill.style.top = `${screenY}px`;
  });

  console.log('📍 Pills positioned dynamically (scale:', scale.toFixed(3), ', diagonal 60° offsets)');
}

// ========== SYNC TOP BAR WIDTH TO PCB ==========
function syncTopBarWidth() {
  const section = document.querySelector('.hub-mesh-section');
  const topBar = document.querySelector('.top-info-bar');
  const topBarContent = document.querySelector('.top-info-bar-content');
  const backButton = document.querySelector('.hub-back-button');

  if (!section || !topBar || !topBarContent) {
    return;
  }

  // Get section dimensions
  const sectionRect = section.getBoundingClientRect();
  const sectionWidth = sectionRect.width;
  const sectionHeight = sectionRect.height;

  // SVG is square (viewBox 1000x1000) with preserveAspectRatio="xMidYMid meet"
  // Actual rendered size = min(width, height) to maintain square aspect ratio
  const actualSvgSize = Math.min(sectionWidth, sectionHeight);

  // SVG is centered in section, calculate left offset
  const actualSvgLeft = sectionRect.left + (sectionWidth - actualSvgSize) / 2;

  // Sync top-bar container to match actual SVG size and position
  topBar.style.width = `${actualSvgSize}px`;
  topBar.style.left = `${actualSvgLeft}px`;
  topBar.style.right = 'auto';
  topBar.style.maxWidth = 'none';

  // Sync top-bar content
  topBarContent.style.maxWidth = `${actualSvgSize}px`;

  // Sync back button to PCB left edge (+ 1rem offset)
  if (backButton) {
    backButton.style.left = `${actualSvgLeft + 16}px`;  // 16px = 1rem
  }

  console.log(`📐 Synced to PCB: top-bar & back-button, size=${actualSvgSize}px, left=${actualSvgLeft.toFixed(1)}px`);
}

// ========== UPDATE CARD CLIP-PATH (DESKTOP) ==========
function updateCardClipPath() {
  const topBar = document.querySelector('.top-info-bar');
  const cardSheet = document.getElementById('card-sheet');

  if (!topBar || !cardSheet) {
    return;
  }

  // Only for desktop (≥1025px)
  if (window.matchMedia('(max-width: 1024px)').matches) {
    return;
  }

  // Get full top bar height (including padding & border) - AB should match exactly
  const topBarHeight = topBar.getBoundingClientRect().height;

  // Calculate notch point C (B + 60px diagonal offset)
  const notchC = topBarHeight + 60;

  // Update clip-path dynamically
  // A: 0 0 (top-left corner)
  // B: 0 topBarHeight (down along left edge, before notch)
  // C: 90px notchC (diagonal right and down)
  // D: 90px 100% (down to bottom)
  // E: 100% 100% (bottom-right corner)
  // F: 100% 0 (top-right corner)
  cardSheet.style.clipPath = `polygon(
    0 0,
    0 ${topBarHeight}px,
    90px ${notchC}px,
    90px 100%,
    100% 100%,
    100% 0
  )`;

  console.log(`📐 Updated card clip-path: B=${topBarHeight}px, C=90px ${notchC}px`);
}

// ========== UPDATE CARD POSITION (DESKTOP) ==========
function updateCardPosition() {
  const statusEl = document.querySelector('.top-info-bar-status');
  const cardSheet = document.getElementById('card-sheet');

  if (!statusEl || !cardSheet) {
    return;
  }

  // Only for desktop (≥1025px)
  if (window.matchMedia('(max-width: 1024px)').matches) {
    return;
  }

  // Get position of status text end (right edge)
  const statusRect = statusEl.getBoundingClientRect();
  const statusRightEdge = statusRect.right;

  // Set card's left edge to align with end of status text
  cardSheet.style.left = `${statusRightEdge}px`;

  console.log(`📐 Updated card position: left=${statusRightEdge.toFixed(1)}px (aligned to status text end)`);
}

// Debounced resize handler for performance
function handleResize() {
  if (resizeDebounceTimer) {
    clearTimeout(resizeDebounceTimer);
  }

  resizeDebounceTimer = setTimeout(() => {
    positionPills();
    syncTopBarWidth();
    updateCardClipPath();
    updateCardPosition();
    console.log('🔄 Pills repositioned, top-bar synced, card clip-path & position updated on resize');
  }, 100);
}

// ========== TOP BAR TOOLTIPS & COPY FUNCTIONALITY ==========

// Copy to clipboard with fallback
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
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

// Desktop: Hover tooltips with copy button
function initTopBarTooltips() {
  const contactLinks = document.querySelectorAll('.top-info-bar-contact a');
  const tooltip = document.getElementById('topBarTooltip');
  const tooltipText = document.getElementById('tooltipText');
  const tooltipCopyBtn = document.getElementById('tooltipCopyBtn');

  if (!tooltip || !tooltipText || !tooltipCopyBtn) return;

  let currentLink = null;

  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', (e) => {
      const copyText = link.dataset.copyText;
      if (!copyText) return;

      currentLink = link;
      tooltipText.textContent = copyText;

      // Position tooltip below the link
      const linkRect = link.getBoundingClientRect();
      const topBarRect = document.querySelector('.top-info-bar-content').getBoundingClientRect();
      tooltip.style.left = `${linkRect.left - topBarRect.left}px`;
      tooltip.hidden = false;
    });

    link.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!tooltip.matches(':hover')) {
          tooltip.hidden = true;
          currentLink = null;
        }
      }, 100);
    });
  });

  // Tooltip hover - keep visible
  tooltip.addEventListener('mouseenter', () => {
    // Keep visible
  });

  tooltip.addEventListener('mouseleave', () => {
    tooltip.hidden = true;
    currentLink = null;
  });

  // Copy button click
  tooltipCopyBtn.addEventListener('click', () => {
    if (!currentLink) return;
    const copyText = currentLink.dataset.copyText;
    copyToClipboard(copyText)
      .then(() => {
        tooltip.hidden = true;
        showCopyFeedback();
        console.log(`✓ Copied: ${copyText}`);
      })
      .catch(err => {
        console.error('❌ Copy failed:', err);
      });
  });

  console.log('✅ Top bar tooltips initialized (desktop)');
}

// Mobile: Long press to copy
function initTopBarCopy() {
  const contactLinks = document.querySelectorAll('.top-info-bar-contact a');

  contactLinks.forEach(link => {
    let pressTimer = null;
    let isPressing = false;

    const startPress = (e) => {
      isPressing = true;
      const copyText = link.dataset.copyText;
      if (!copyText) return;

      // Visual feedback: slight scale
      link.style.transform = 'scale(0.95)';

      pressTimer = setTimeout(() => {
        if (isPressing) {
          // Long press complete - copy
          copyToClipboard(copyText)
            .then(() => {
              showCopyFeedback();
              console.log(`✓ Copied (long press): ${copyText}`);
            })
            .catch(err => {
              console.error('❌ Copy failed:', err);
            });

          // Reset
          link.style.transform = '';
          isPressing = false;
        }
      }, 500); // 500ms long press
    };

    const endPress = (e) => {
      if (pressTimer) {
        clearTimeout(pressTimer);
        pressTimer = null;
      }
      isPressing = false;
      link.style.transform = '';
    };

    // Touch events
    link.addEventListener('touchstart', startPress, { passive: true });
    link.addEventListener('touchend', endPress);
    link.addEventListener('touchcancel', endPress);

    // Mouse events (for testing on desktop)
    link.addEventListener('mousedown', startPress);
    link.addEventListener('mouseup', endPress);
    link.addEventListener('mouseleave', endPress);
  });

  console.log('✅ Top bar copy initialized (mobile long-press)');
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
    fadeInHub();
    initBackButton();
    initPills();
    initTopBarTooltips();
    initTopBarCopy();

    // Position pills, sync top-bar, update card clip-path & position dynamically after DOM is ready
    setTimeout(() => {
      positionPills();
      syncTopBarWidth();
      updateCardClipPath();
      updateCardPosition();
    }, 100);

    // Add resize listeners with debounce
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
  }

  console.log('✅ Initialization complete');

  // Check for deep link (hash in URL)
  if (isHubPage && window.location.hash) {
    const cardId = window.location.hash.slice(1); // remove #
    if (['robotyka', 'aplikacje', 'www', 'newproject'].includes(cardId)) {
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
    title: 'Aplikacje webowe',
    logo: 'assets/images/global/logo_app.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Aplikacje',
  },
  www: {
    title: 'Twoja strona → online',
    logo: 'assets/images/global/logo_web_ai.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=Strony+WWW',
  },
  newproject: {
    title: 'New Project',
    logo: 'assets/images/global/logo_placeholder.png',
    logoFallback: 'https://placehold.co/300x200/1e293b/48d2e7?text=New+Project',
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

  // Update card position & clip-path (desktop only)
  if (isDesktop()) {
    updateCardClipPath();
  }

  // Animation with GSAP (GPU accelerated)
  if (window.gsap && !prefersReducedMotion()) {
    const gsap = window.gsap;

    if (isDesktop()) {
      // Desktop: slide from right, end position aligned to centered status text
      // Calculate where status will be after it animates to center
      const statusEl = document.querySelector('.top-info-bar-status');
      const viewportWidth = window.innerWidth;
      const statusWidth = statusEl ? statusEl.getBoundingClientRect().width : 200;

      // Status centered: left edge at (viewportWidth/2 - statusWidth/2)
      // Card's left edge should be at status right edge: (viewportWidth/2 + statusWidth/2)
      const targetLeft = (viewportWidth / 2) + (statusWidth / 2) + 16; // +16px gap

      // Animate from off-screen right to target position
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
    // Reduced motion: simple fade-in
    sheet.style.transition = 'opacity 0.3s ease';
    if (isDesktop()) {
      const statusEl = document.querySelector('.top-info-bar-status');
      const viewportWidth = window.innerWidth;
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

  // Status highlight after delay (mobile: draws attention to status above blur)
  setTimeout(() => {
    document.querySelector('.top-info-bar-status')?.classList.add('status-highlight');
  }, 1000);

  console.log(`✅ Card opened: ${id}`);
}

// Close card
function closeCard() {
  if (!currentCardId) return;

  console.log(`📪 Closing card: ${currentCardId}`);

  const sheet = document.getElementById('card-sheet');
  if (!sheet) return;

  sheet.classList.remove('is-open');

  // Remove status highlight
  document.querySelector('.top-info-bar-status')?.classList.remove('status-highlight');

  // Disable drag
  disableDrag();

  // Animation (GPU accelerated)
  if (window.gsap && !prefersReducedMotion()) {
    const gsap = window.gsap;

    if (isDesktop()) {
      // Desktop: slide to right (off-screen)
      const viewportWidth = window.innerWidth;
      gsap.to(sheet, {
        left: viewportWidth, opacity: 0, duration: 0.8, ease: 'power2.in', force3D: true,
        onComplete: () => finishClose(sheet),
      });
    } else {
      // Mobile: slide to bottom
      gsap.to(sheet, {
        y: '100%', opacity: 0, duration: 0.35, ease: 'power2.in', force3D: true,
        onComplete: () => finishClose(sheet),
      });
    }
  } else {
    // Reduced motion: simple fade-out
    sheet.style.transition = 'opacity 0.2s ease';
    sheet.style.opacity = '0';
    setTimeout(() => finishClose(sheet), 200);
  }
}

function finishClose(sheet) {
  sheet.hidden = true;

  // Reset inline styles to allow CSS defaults for next open
  sheet.style.transform = '';
  sheet.style.opacity = '';
  sheet.style.left = '';
  sheet.style.transition = '';

  // Kill any remaining GSAP tweens on this element
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

// Mount card content
function mountCardContent(id) {
  const data = cardData[id];
  if (!data) return;

  // Set title
  const titleEl = document.getElementById('card-title');
  if (titleEl) {
    // Special case: newproject uses SVG logo instead of text title
    if (id === 'newproject') {
      // SVG SHORT sized proportionally to SYS:// (viewBox 110x40 = 2.75:1 ratio)
      titleEl.innerHTML = `
        <svg viewBox="0 0 110 40" class="rtk-logo-svg" style="width: 65px; height: auto; vertical-align: middle; margin-left: 4px;">
          <circle cx="5" cy="15" r="2" fill="#ffffff" />
          <circle cx="20" cy="5" r="2" fill="#ffffff" />
          <circle cx="10" cy="30" r="2" fill="#ffffff" />
          <line x1="5" y1="15" x2="20" y2="5" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
          <line x1="20" y1="5" x2="10" y2="30" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
          <line x1="5" y1="15" x2="10" y2="30" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />
          <path d="M 10 30 L 32 30" stroke="#ffffff" stroke-width="2" fill="none" />
          <text x="32" y="30" fill="#ffffff" font-family="'JetBrains Mono', monospace" font-weight="700" font-size="28px">cd</text>
          <rect x="68" y="8" width="14" height="26" fill="#ffffff" class="rtk-cursor-blink" />
        </svg>
      `;
    } else {
      titleEl.textContent = data.title;
    }
  }

  // Handle terminal dot color for newproject (yellow = default/pending state)
  const terminalDot = document.querySelector('.card-terminal-dot');
  if (terminalDot && id === 'newproject') {
    terminalDot.classList.add('dot-yellow');
  }

  // Set logo (hide for newproject since we use text headline instead)
  const logoEl = document.getElementById('card-logo');
  const mediaFrame = document.querySelector('.card-media-frame');
  if (id === 'newproject') {
    if (mediaFrame) mediaFrame.style.display = 'none';
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

  // Attach CTA click handler for newproject sequence
  if (id === 'newproject') {
    setTimeout(() => {
      const cta = document.getElementById('newproject-cta');
      if (cta) {
        cta.addEventListener('click', handleNewProjectCTAClick);
      }
    }, 100);
  }

  console.log(`📝 Content mounted for: ${id}`);
}

// Handle NewProject CTA click sequence
function handleNewProjectCTAClick(e) {
  const cta = e.currentTarget;
  const textEl = cta.querySelector('.cta-text');
  const terminalDot = document.querySelector('.card-terminal-dot');
  const titleEl = document.getElementById('card-title');
  let state = parseInt(cta.dataset.state || '0');

  // State machine: 0 -> 1 -> 2 -> 3 (redirect)
  if (state === 0) {
    // ACCESS_MODUL (cyan) -> ACCESS_DENIED (red)
    e.preventDefault();
    cta.classList.add('card-cta-denied');
    textEl.textContent = 'ACCESS_DENIED';
    cta.dataset.state = '1';
    // Dot stays yellow
  } else if (state === 1) {
    // ACCESS_DENIED (red) -> GAIN_PREVIEW (yellow)
    e.preventDefault();
    cta.classList.remove('card-cta-denied');
    cta.classList.add('card-cta-preview');
    textEl.textContent = 'GAIN_PREVIEW';
    cta.dataset.state = '2';
    // Dot turns to green (remove yellow)
    if (terminalDot) {
      terminalDot.classList.remove('dot-yellow');
    }
    // Change logo from SHORT to LONG variant with animation
    if (titleEl) {
      titleEl.innerHTML = `
        <svg viewBox="0 0 440 60" class="rtk-base-svg" style="width: 240px; height: auto; vertical-align: middle; margin-left: 4px;">
          <!-- 1. Sieć neuronowa (Chaos) -->
          <circle cx="5" cy="15" r="2" class="rtk-long-node rtk-n1" />
          <circle cx="20" cy="5" r="2" class="rtk-long-node rtk-n2" />
          <circle cx="10" cy="30" r="2" class="rtk-long-node rtk-n3" />
          <line x1="5" y1="15" x2="20" y2="5" class="rtk-long-link rtk-l1" />
          <line x1="20" y1="5" x2="10" y2="30" class="rtk-long-link rtk-l2" />
          <line x1="5" y1="15" x2="10" y2="30" class="rtk-long-link rtk-l3" />
          <!-- 2. Linia przepływu (Process) -->
          <path d="M 10 30 L 40 30" class="rtk-long-path" />
          <!-- 3. Prompt (Static >_) -->
          <text x="48" y="38" class="rtk-long-cmd">&gt;_</text>
          <!-- 4. Wpisywana komenda (Typing "cd resztatokod.pl") -->
          <text x="86" y="38" class="rtk-long-url" xml:space="preserve">cd resztatokod.pl</text>
          <!-- 5. Kursor -->
          <g class="rtk-long-cursor-g">
            <rect x="86" y="16" width="14" height="26" class="rtk-long-cursor" />
          </g>
        </svg>
      `;
    }
  } else if (state === 2) {
    // GAIN_PREVIEW (yellow) -> Redirect to ResztaToKod.pl
    cta.href = 'https://resztatokod.pl';
    cta.target = '_blank';
    // Allow default link behavior - will open in new tab
  }
}

// Unmount card content
function unmountCardContent() {
  const titleEl = document.getElementById('card-title');
  if (titleEl) titleEl.innerHTML = '';

  // Reset terminal dot color (remove yellow/red classes if present)
  const terminalDot = document.querySelector('.card-terminal-dot');
  if (terminalDot) {
    terminalDot.classList.remove('dot-yellow', 'dot-red');
  }

  // Reset media frame visibility
  const mediaFrame = document.querySelector('.card-media-frame');
  if (mediaFrame) mediaFrame.style.display = '';

  const logoEl = document.getElementById('card-logo');
  if (logoEl) {
    logoEl.src = '';
    logoEl.alt = '';
  }

  // Reset media frame visibility (hidden for newproject)
  const mediaFrame = document.querySelector('.card-media-frame');
  if (mediaFrame) mediaFrame.style.display = '';

  // Reset terminal dot color (remove yellow/red states)
  const terminalDot = document.querySelector('.card-terminal-dot');
  if (terminalDot) {
    terminalDot.classList.remove('dot-yellow');
    terminalDot.classList.remove('dot-red');
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

  let startY = 0;
  let currentY = 0;
  let isDragging = false;

  const handleStart = (e) => {
    // Don't start drag if clicking close button or links
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

  // Add listeners to entire sheet (mobile only)
  sheet.addEventListener('mousedown', handleStart);
  sheet.addEventListener('touchstart', handleStart, { passive: true });

  document.addEventListener('mousemove', handleMove);
  document.addEventListener('touchmove', handleMove, { passive: true });
  document.addEventListener('mouseup', handleEnd);
  document.addEventListener('touchend', handleEnd);

  // Store for cleanup
  dragState = { handleStart, handleMove, handleEnd, sheet };

  console.log('✅ Drag enabled (entire card draggable)');
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

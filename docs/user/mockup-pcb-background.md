# PCB Background - Technical Mockup

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│ HERO SECTION (Page 1)                                  │
│ ┌─────────────────────────────────────────────────────┐ │
│ │  "Michał Rapała"                                    │ │
│ │  Typewriter animation                               │ │
│ │  ↓ Scroll Indicator [START POINT]                  │ │
│ └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
                         ↓
         [CURRENT STARTS FLOWING FROM HERE]
                         ↓
┌═════════════════════════════════════════════════════════┐
║  PCB BACKGROUND LAYER (fixed, opacity: 15-20%)        ║
║  ┌─────────────────────────────────────────────────┐   ║
║  │  ╭─────╮  Circuit traces (cyan/emerald)        │   ║
║  │  │ SMD │  Components, pads, vias                │   ║
║  │  ╰─────╯  Ground plane pattern                  │   ║
║  │  ━━━━━━━  Silk screen labels                    │   ║
║  └─────────────────────────────────────────────────┘   ║
║                                                         ║
║  [ANIMATED CURRENT FLOWS - Scroll-linked]              ║
║  ● Cyan path (from scroll indicator)                   ║
║  ● Emerald path (from scroll indicator)                ║
║  ● Pulsating bursts (not continuous)                   ║
║  ● Highlights pads/traces along the path               ║
║                                                         ║
╠═════════════════════════════════════════════════════════╣
│ TWO PILLARS SECTION (Page 2)                   scroll↓ │
│ ┌──────────────────┐  ┌──────────────────┐            │
│ │ ENG://SYMULACJA  │  │ DEV://KOD        │            │
│ │ Robotyka card    │  │ ResztaToKod card │            │
│ └──────────────────┘  └──────────────────┘            │
│                                                        │
│ ↓ Scroll Indicator                                    │
╠═════════════════════════════════════════════════════════╣
│ SECTION 03: ROBOTYKA (NEW)                    scroll↓ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ McLaren | Projekt P47                              │ │
│ │ [Carousel: 3 images]                               │ │
│ │ Description: P47 SUV...                            │ │
│ │ [CTA: "WEJDŹ" → robotyka.michalrapala.com]         │ │
│ └─────────────────────────────────────────────────────┘ │
╠═════════════════════════════════════════════════════════╣
│ SECTION 04: APPS (NEW)                         scroll↓ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Aplikacje webowe                                   │ │
│ │ [Image: logo_app.png]                              │ │
│ │ Description: Automatyzuję...                       │ │
│ │ [CTA: "WEJDŹ" → michalrapala.app]                  │ │
│ └─────────────────────────────────────────────────────┘ │
╠═════════════════════════════════════════════════════════╣
│ SECTION 05: WWW (NEW)                          scroll↓ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Strony internetowe                                 │ │
│ │ [Image: logo_web_ai.png]                           │ │
│ │ Description: Projektuję...                         │ │
│ │ [CTA: "WEJDŹ" → twoja-strona.online]               │ │
│ └─────────────────────────────────────────────────────┘ │
╠═════════════════════════════════════════════════════════╣
│ SECTION 06: STUDIO (NEW)                       scroll↓ │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Twoja domowa apteczka z AI                         │ │
│ │ [Image: Karton-AI.jpg]                             │ │
│ │ Description: Nie kop w pudle...                    │ │
│ │ [CTA: "WEJDŹ" → pudelkonaleki.michalrapala.app]    │ │
│ └─────────────────────────────────────────────────────┘ │
└═════════════════════════════════════════════════════════┘
```

---

## 🎨 Visual Concept

### PCB Background Layer (Fixed Position)

```css
.pcb-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  opacity: 0.15; /* Subtle but visible on mobile */
  pointer-events: none;
}
```

**Why Fixed?**
- PCB stays in place while content scrolls over it
- Creates parallax-like depth
- Easier to control current animations (they move relative to viewport, not content)

**SVG Structure:**
- Single SVG: 1920x4000px (covers full scroll height)
- **OR** Repeating pattern: 1920x1080px tiled vertically

**Recommendation:** Single giant SVG for precise path control, but with `preserveAspectRatio="xMidYMid slice"` for responsiveness.

---

## ⚡ Current Flow Animation

### Starting Point
- **Origin:** Scroll indicator at bottom of Hero section (`y: ~800px`)
- **Trigger:** When user scrolls past Hero (scrollY > 100px)

### Animation Behavior

#### Option A: Dual Paths (Recommended)
```
                [Scroll Indicator]
                       ↓
              ╭────────┴────────╮
              │                 │
         [Cyan Path]      [Emerald Path]
              │                 │
              ↓                 ↓
        Trace Route 1      Trace Route 2
              │                 │
              ↓                 ↓
         Section 03         Section 04
         Section 05         Section 06
```

#### Technical Implementation

**Framer Motion - useScroll + useTransform**

```typescript
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start end', 'end start']
});

// Current position (0 → 1 as user scrolls through sections)
const currentProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

// Map to SVG path length
const pathLength = useTransform(currentProgress, [0, 100], [0, totalPathLength]);
```

**SVG Animation Strategy:**

```svg
<!-- Path definition -->
<path
  id="current-path-cyan"
  d="M 960,800 L 960,1200 Q 800,1400 600,1600 L 500,2000 Q 450,2200 400,2400"
  stroke="url(#cyanGradient)"
  stroke-width="8"
  fill="none"
  stroke-dasharray={totalPathLength}
  stroke-dashoffset={totalPathLength - pathLength}
/>

<!-- Glow effect -->
<filter id="currentGlow">
  <feGaussianBlur stdDeviation="8" result="blur"/>
  <feComponentTransfer in="blur">
    <feFuncA type="linear" slope="2.5"/>
  </feComponentTransfer>
</filter>

<!-- Animated particles -->
<circle
  cx="0"
  cy="0"
  r="6"
  fill="#06b6d4"
  filter="url(#currentGlow)"
>
  <animateMotion
    dur="3s"
    repeatCount="indefinite"
    path={currentPathData}
    begin={scrollTrigger}
  />
</circle>
```

**Pulsating Bursts (Not Continuous):**

```typescript
// Burst every 1.5s
const burstInterval = 1500;

useEffect(() => {
  const interval = setInterval(() => {
    // Trigger burst animation
    setBurstActive(true);
    setTimeout(() => setBurstActive(false), 600);
  }, burstInterval);

  return () => clearInterval(interval);
}, []);
```

**Pad/Trace Highlighting:**

```css
/* When current passes through */
.pcb-pad.active {
  animation: padPulse 0.4s ease-out;
}

@keyframes padPulse {
  0% {
    filter: drop-shadow(0 0 4px #06b6d4);
    opacity: 0.5;
  }
  50% {
    filter: drop-shadow(0 0 12px #06b6d4);
    opacity: 1;
  }
  100% {
    filter: drop-shadow(0 0 4px #06b6d4);
    opacity: 0.7;
  }
}
```

---

## 🎯 Scroll-Spy Integration

### Section Progress Updates

Current sections:
```javascript
const sections = [
  { id: 'hero', number: '01' },
  { id: 'pillars', number: '02' },
  { id: 'pcb', number: '03' }, // REMOVE - PCB is now background
];
```

New sections:
```javascript
const sections = [
  { id: 'hero', number: '01' },
  { id: 'pillars', number: '02' },
  { id: 'robotyka', number: '03' },
  { id: 'apps', number: '04' },
  { id: 'www', number: '05' },
  { id: 'studio', number: '06' },
];
```

### Current Flow Tied to Active Section

```typescript
const activeSectionIndex = sections.findIndex(s => s.id === activeSection);

// Branch current to corresponding path
const activePath = activeSectionIndex > 1
  ? (activeSectionIndex % 2 === 0 ? 'emerald' : 'cyan')
  : 'both';

// Highlight corresponding PCB region
const highlightRegion = {
  3: { x: 500, y: 1200 },  // Robotyka
  4: { x: 350, y: 1800 },  // APPS
  5: { x: 700, y: 2400 },  // WWW
  6: { x: 850, y: 3000 },  // STUDIO
}[activeSectionIndex];
```

---

## 📱 Mobile Optimization

### Performance Considerations

1. **Reduce SVG Complexity:**
   - Mobile: 50% fewer traces/components
   - Use CSS `will-change: transform` on animated paths
   - Disable particle animations on low-end devices

2. **Detect Low-End Devices:**
```typescript
const isLowEndDevice = navigator.hardwareConcurrency < 4
  || navigator.deviceMemory < 4;

if (isLowEndDevice) {
  // Use CSS-only animations instead of Framer Motion
  // Reduce blur stdDeviation from 8 to 4
  // Disable particle system
}
```

3. **Opacity Adjustment:**
```css
@media (max-width: 768px) {
  .pcb-background {
    opacity: 0.18; /* Slightly more visible */
  }
}
```

---

## 🎬 Animation Timeline

### Phase 1: Scroll 0% → 20% (Hero Exit)
- Current begins pulsing from scroll indicator
- First burst travels down cyan path
- PCB background fades in

### Phase 2: Scroll 20% → 40% (Two Pillars Active)
- Both paths active, alternating bursts
- Pads around Two Pillars glow subtly

### Phase 3: Scroll 40% → 100% (Projects)
- Current splits to individual project sections
- When Section 03 active: Cyan path highlights
- When Section 04 active: Emerald path highlights
- When Section 05 active: Cyan path highlights
- When Section 06 active: Emerald path highlights

---

## 🌟 Polish & Industry Standards

### High-Quality Techniques

1. **Gradient Masks for Current:**
```svg
<linearGradient id="currentGradient">
  <stop offset="0%" stop-color="#06b6d4" stop-opacity="0"/>
  <stop offset="30%" stop-color="#06b6d4" stop-opacity="0.8"/>
  <stop offset="70%" stop-color="#10b981" stop-opacity="1"/>
  <stop offset="100%" stop-color="#10b981" stop-opacity="0"/>
</linearGradient>
```

2. **Easing Functions (Natural Motion):**
```typescript
const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1.5
};
```

3. **Motion Blur for Speed:**
```svg
<filter id="motionBlur">
  <feGaussianBlur in="SourceGraphic" stdDeviation="4,0"/>
</filter>
```

4. **Sound Design (Optional):**
- Subtle "zap" sound on burst (muted by default)
- Volume: 10%, Duration: 80ms

---

## 🔤 i18n Keys Explanation

**Question:** "Czy mają zachować te same klucze i18n co poprzednie pills?"

**Answer:** Tak, ale z refaktorem struktury.

### Current Structure (pl.json):
```json
{
  "pcb": {
    "heading": "Technologie",
    "hint": "[ wybierz projekt ]"
  }
}
```

### New Structure (pl.json):
```json
{
  "projects": {
    "robotyka": {
      "title": "Robotyka",
      "headline": "McLaren | Projekt P47",
      "description": "Przyszłość osiągów: SUV...",
      "cta": "Dowiedz się więcej"
    },
    "apps": {
      "title": "Aplikacje webowe",
      "headline": "Automatyzacja dla biznesu",
      "description": "Automatyzuję to, czego nie warto...",
      "cta": "Zobacz projekty"
    },
    "www": {
      "title": "Strony internetowe",
      "headline": "Twoja cyfrowa wizytówka",
      "description": "Projektuję nowoczesne...",
      "cta": "Zobacz realizacje"
    },
    "studio": {
      "title": "STUDIO",
      "headline": "Twoja domowa apteczka z AI",
      "description": "Nie kop w pudle. Sprawdź...",
      "cta": "Sprawdź aplikację"
    }
  }
}
```

**Why?**
- Old: Pills were interactive buttons
- New: Full sections with rich content
- Need: More granular keys (title, headline, description, cta)

---

## 📊 Component Architecture

### File Structure

```
next-app/src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx (existing)
│   │   ├── TwoPillars.tsx (existing)
│   │   ├── PCBShowcase.tsx (REMOVE/REFACTOR)
│   │   ├── ProjectShowcase.tsx (NEW - reusable)
│   │   └── index.ts
│   ├── ui/
│   │   ├── SectionProgress.tsx (UPDATE - add sections 03-06)
│   │   └── PCBBackground.tsx (NEW - fixed background layer)
│   └── animations/
│       ├── CurrentFlow.tsx (NEW - scroll-linked current)
│       └── ParticleSystem.tsx (NEW - burst particles)
├── app/
│   └── [locale]/
│       └── page.tsx (UPDATE - new sections)
└── messages/
    ├── pl.json (UPDATE - new keys)
    └── en.json (UPDATE - new keys)
```

### Component Hierarchy

```tsx
<main>
  <PCBBackground /> {/* Fixed layer, z-index: -1 */}
  <CurrentFlow scrollProgress={scrollYProgress} /> {/* Fixed layer, z-index: -1 */}

  <SectionProgress /> {/* Sidebar/mobile pill */}

  <Hero />
  <TwoPillars />
  <ProjectShowcase id="robotyka" data={robotykaData} />
  <ProjectShowcase id="apps" data={appsData} />
  <ProjectShowcase id="www" data={wwwData} />
  <ProjectShowcase id="studio" data={studioData} />
</main>
```

---

## ⚙️ Tech Stack Recommendations

| Feature | Technology | Why |
|---------|------------|-----|
| Current Animation | Framer Motion + SVG | Scroll-linked precision, spring physics |
| Particles | Canvas API | Better performance than SVG for 50+ particles |
| Path Calculations | D3.js (pathLength) | Industry standard for SVG path manipulation |
| Glow Effects | SVG Filters | Native, hardware-accelerated |
| Responsive SVG | `preserveAspectRatio` | Maintains aspect ratio across devices |
| Performance Monitoring | `react-intersection-observer` | Lazy-load sections, pause animations off-screen |

---

## 🚀 Implementation Phases

### Phase 1: Foundation (2-3h)
- [x] Create PCBBackground component (fixed, 15% opacity)
- [x] Convert old PCB SVG to background layer
- [x] Add 4 new sections with content from public_html

### Phase 2: Current Animation (3-4h)
- [ ] Implement CurrentFlow component
- [ ] Create dual paths (cyan/emerald)
- [ ] Add scroll-spy integration
- [ ] Pulsating burst system

### Phase 3: Interactions (2h)
- [ ] Pad/trace highlighting
- [ ] Section-based path switching
- [ ] Mobile optimizations

### Phase 4: Polish (1-2h)
- [ ] Easing tuning
- [ ] Glow effects
- [ ] Performance testing
- [ ] Accessibility (reduced motion)

---

## 🎨 Mockup Preview (ASCII Art)

```
┌─────────────────────────────────────┐
│  HERO                               │
│  "Michał Rapała"                    │
│          ↓                          │  PCB Background:
│   [Scroll Indicator]                │  ░░░▒▒▓ traces
│          ⚡ ← Current starts here   │  ◉◉◉ pads
└─────────────────────────────────────┘  ━━━ paths
          ↓
   ┌──────┴──────┐
   ↓             ↓
 [Cyan]      [Emerald]
   │             │
┌──┴─────────────┴──┐  ░░░░░░░░░░░
│  TWO PILLARS      │  ▒▒▒PCB▒▒▒▒
│  [ENG] [DEV]      │  ▓▓▓BG▓▓▓▓▓
└───────────────────┘  ░░░░░░░░░░░
          ↓
┌───────────────────┐  ⚡━━━━━━◉
│  ROBOTYKA         │  Cyan highlight
│  McLaren P47      │
└───────────────────┘
          ↓
┌───────────────────┐  ━━━━━━◉⚡
│  APPS             │  Emerald highlight
│  Webappki         │
└───────────────────┘
          ↓
┌───────────────────┐  ⚡━━━━━━◉
│  WWW              │  Cyan highlight
│  Strony           │
└───────────────────┘
          ↓
┌───────────────────┐  ━━━━━━◉⚡
│  STUDIO           │  Emerald highlight
│  Karton-AI        │
└───────────────────┘
```

---

## ✅ Success Metrics

**Visual Quality:**
- [ ] PCB background visible but doesn't overpower content
- [ ] Current animation feels "electric" and responsive
- [ ] Smooth 60fps on desktop, 30fps+ on mobile
- [ ] No layout shift during scroll

**User Experience:**
- [ ] Clear visual feedback showing progress
- [ ] Current flow guides user through sections
- [ ] Mobile users can see full experience (no degradation)
- [ ] Reduced motion respected (prefers-reduced-motion)

**Code Quality:**
- [ ] TypeScript strict mode
- [ ] No prop drilling (Context for scroll progress)
- [ ] Memoized heavy calculations
- [ ] Clean separation of concerns

---

## 🤔 Open Questions for User

1. **Current Speed:** Fast (0.6s per burst) or Slow (1.5s per burst)?
2. **Color Intensity:** Subtle glow or strong neon?
3. **Particle Count:** Minimalist (5-10) or Rich (20-30)?
4. **Sound Effects:** Yes (optional) or No?
5. **Desktop vs Mobile:** Same animation quality or mobile-optimized version?

---

**Status:** ⏸️ Awaiting feedback on mockup before implementation.

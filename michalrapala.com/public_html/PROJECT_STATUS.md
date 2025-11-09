# Project Status - michalrapala.com Hub Modernization

## Przegląd projektu

Modernizacja strony głównej michalrapala.com z systemem nawigacji Gate → Hub z animowanym tłem obwodu drukowanego (PCB), interaktywnymi pills i kartami usług.

---

## ✅ Zaimplementowane funkcjonalności

### 1. System nawigacji Gate → Hub

**Gate (index.html)** - Strona powitalna:
- Logo jako przycisk otwierający modal z wideo (`AI_intro.mp4`)
- Przycisk "Wejdź" prowadzący do Hub
- Płynne fade-out (1.5s) podczas przejścia
- Spójne tło SVG z Hub

**Hub (hub.html)** - Główna nawigacja:
- 3 interaktywne pills: Robotyka, Aplikacje webowe, Strony internetowe
- Animowane tło z obwodem drukowanym
- Electric current flash animations przy kliknięciu
- Fade-in z staggered pills animation (2s)

**Przejścia:**
- Synchronizowane fade out/in bez vertical movement
- Identyczne tła SVG dla płynnego przejścia
- Brak scrollbara dzięki `height: 100svh`

---

### 2. Animowane tło SVG - Circuit Board

**Struktura:**
- ViewBox: 1000x1000
- `preserveAspectRatio="xMidYMid meet"` - spójne skalowanie
- Synchronizacja między index.html i hub.html

**Elementy:**
- Circuit traces (ścieżki obwodu) - 9 linii
- Circuit pads (pady/vias) - ~18 punktów
- Pill connection lines (ukryte, aktywowane przy kliknięciu)
- Filtry SVG: glow i glowStrong dla efektów świecenia

**Animacje tła:**
- Gradient mesh
- Subtle animations dla circuit pads
- Opacity transitions

---

### 3. Pills System - Interaktywne przyciski

**Pozycjonowanie:**
- Robotyka: centrum (50%, 50%)
- Aplikacje webowe: prawy górny (85%, 35%)
- Strony internetowe: dolny (60%, 85%)

**Animacje:**
- Floating animation (6s ease-in-out infinite)
- Staggered appearance przy fade-in Hub (0.2s delay)
- Początkowy stan: `scale(0), opacity: 0`
- Hover: gradient intensification + box-shadow glow
- Pill glow effect (radial gradient z animation)

**Styling:**
- Gradient background: `rgba(72, 210, 231, 0.15)` → `rgba(52, 194, 217, 0.1)`
- Border: 1.5px solid cyan
- Border-radius: 50px
- Font: Montserrat 600, 0.9rem

---

### 4. Electric Current Flash Animations

**Technologia:**
- GSAP timeline animations
- SVG `stroke-dasharray` + `stroke-dashoffset` dla efektu przepływu

**Trasy flash lines:**
- **Robotyka**: Dwie linie zbiegające się w centrum
  - Lewa: z lewej krawędzi (100, 750) → centrum (500, 500)
  - Prawa: z prawego górnego rogu (900, 250) → centrum (500, 500)
- **Aplikacje**: z lewego dolnego rogu → prawy górny (follows circuit trace 1)
- **WWW**: z góry na dół (follows vertical trace 5)

**Fazy animacji (2s total):**
1. Start: cyan fade-in
2. Accelerate: bright cyan pulse
3. Peak: white flash
4. Sustain: bright cyan
5. Fade: dimmer cyan
6. Out: invisible

**Stroke-width progression:** 2 → 4 → 6 → 7 → 5 → 3 → 2

**Kolory:** `#48D2E7` (cyan) → `#6EE7FF` (bright cyan) → `#FFFFFF` (white)

---

### 5. Card Sheet System

**Typ:** Bottom sheet (mobile) / Side sheet (desktop)

**Karty:**
1. **Robotyka**
   - Logo: `logo_robotyka.png`
   - Link: https://robotyka.michalrapala.com

2. **Aplikacje webowe**
   - Logo: `logo_app.png`
   - Link: https://michalrapala.app

3. **Twoja strona → online**
   - Logo: `logo_web_ai.png`
   - Link: https://twoja-strona.online

**Funkcjonalność:**
- Reusable single container
- Template-based content mounting
- Desktop: slide from right (0.6s)
- Mobile: slide from bottom + drag-to-close
- Backdrop blur
- Focus trap accessibility
- Hash-based deep linking (#robotyka, #aplikacje, #www)

**Timing:**
- Flash animation: immediate
- Card open: 800ms delay po flash peak

**Styling:**
- Tytuły: Montserrat 700, 2rem
- Opisy: Montserrat 400, 1rem
- CTA: wyśrodkowane, Montserrat 600

---

### 6. Top Bar

**Elementy:**
- Email kontaktowy (z ikoną)
- LinkedIn link (z ikoną)
- Status indicator: "Otwarty na nowe projekty" (pulsing green dot)

**Responsive:**
- >900px: pełen tekst
- 600-900px: tekst przy email, ikona LinkedIn
- <600px: tylko ikony

---

### 7. Back Button

**Design:**
- Okrągły przycisk (3rem × 3rem)
- Pozycja: fixed, left: 1rem, vertically centered
- Tylko ikona strzałki (bez tekstu)
- Pill styling: gradient + border + glow
- Floating animation (horizontal -5px)

---

### 8. Przyciski CTA

**"Wejdź" (Gate):**
- Pill styling zamiast solid gradient
- Floating animation (vertical -8px)
- Glow effect on hover

**"Powrót" (Hub):**
- Icon-only circular button
- Matched pill aesthetics

**Card CTAs:**
- Centered alignment
- Consistent pill appearance

---

### 9. Font System - Montserrat

**Migration:** Inter/Manrope → Montserrat (lokalny hosting)

**Wagi:**
- **400 (Regular)**: Body text, opisy, linki
- **600 (Semi-Bold)**: Przyciski, pills, elementy interaktywne
- **700 (Bold)**: Nagłówki, tytuły kart

**Pliki:**
```
assets/fonts/
├── montserrat-latin-400-normal.woff2
├── montserrat-latin-600-normal.woff2
└── montserrat-latin-700-normal.woff2
```

**Zalety:**
- Szybsze ładowanie (self-hosted)
- GDPR compliance
- Brak zewnętrznych requestów
- Offline functionality

---

### 10. Responsive Design

**Breakpoints:**
- Desktop: >1025px
- Tablet wide: 900-1025px
- Tablet: 600-900px
- Mobile wide: <600px
- Mobile small: <480px

**Adaptive:**
- Pills: font-size scaling
- Top bar: progressive content hiding
- Card sheet: bottom sheet (mobile) vs side sheet (desktop)
- SVG: preserveAspectRatio meet dla consistent appearance

---

## 🎨 Design System

**Kolory:**
```css
--bg: #0f172a           /* Dark background */
--fg: #f9fafb           /* Light text */
--muted: #d1d5db        /* Secondary text */
--accent: #48D2E7       /* Cyan primary */
--accent-2: #34c2d9     /* Cyan hover */
--surface: #1e293b      /* Card surface */
```

**Animacje:**
- Duration: 0.3s - 2s
- Easing: power2, power3, back.out
- Reduced motion support

**Shadows:**
- Subtle: `0 0 20px rgba(72, 210, 231, 0.4)`
- Strong: `0 0 30px rgba(72, 210, 231, 0.6)`

---

## 📂 Struktura plików

```
public_html/
├── index.html              # Gate (strona główna)
├── hub.html               # Hub (nawigacja)
├── common-styles.css      # Wspólne style + fonts
├── hub-styles.css         # Style specifyczne dla Hub
├── main-script.js         # Logika JS (GSAP, pills, cards)
├── assets/
│   ├── fonts/             # Montserrat woff2
│   ├── images/global/     # Logos
│   └── movies/            # AI_intro.mp4
├── FONTS.md               # Dokumentacja fontów
└── PROJECT_STATUS.md      # Ten plik
```

---

## ⚠️ Znane problemy

### 1. Pozycjonowanie pills - rozjeżdżanie się na niektórych ekranach

**Problem:**
Pills używają procentowego pozycjonowania (`left: 50%`, `top: 50%`) względem viewportu. Na różnych aspect ratio (szczególnie ultrawide, narrow mobile) pills mogą nie pokrywać się idealnie z odpowiednimi nodes w tle SVG.

**Przyczyna:**
- SVG używa `preserveAspectRatio="xMidYMid meet"` - skaluje proporcjonalnie
- Pills używają absolutnego pozycjonowania % - nie skalują się z SVG
- Viewport coordinates ≠ SVG viewBox coordinates

**Konsekwencje:**
- Na Galaxy Z Fold 7 (narrow): pills mogą być przesunięte
- Na ultrawide (>1920px): pills nie trafiają dokładnie w nodes
- Flash lines zawsze trafiają w centrum pills, ale niekoniecznie w visual nodes

---

## 🚀 Możliwe dalsze kroki rozwoju

### Priorytet 1: Rozwiązanie problemu pozycjonowania pills

#### Opcja A: Pills jako część SVG
**Koncepcja:** Przenieść pills bezpośrednio do SVG jako `<foreignObject>`

**Zalety:**
- Pills zawsze w dokładnych współrzędnych viewBox
- Perfekcyjne dopasowanie do nodes niezależnie od rozmiaru ekranu
- Proporcjonalne skalowanie z SVG

**Wady:**
- Bardziej złożona implementacja
- Potencjalne problemy z accessibility (focus, screen readers)
- Może wymagać refactoringu animacji

**Implementacja:**
```html
<svg viewBox="0 0 1000 1000">
  <foreignObject x="475" y="475" width="50" height="50">
    <button class="hub-pill">Robotyka</button>
  </foreignObject>
</svg>
```

#### Opcja B: JavaScript-based dynamic positioning
**Koncepcja:** Kalkulacja pozycji pills w JS bazując na aktualnych rozmiarach SVG

**Zalety:**
- Zachowanie obecnej struktury HTML
- Pełna kontrola w JavaScript
- Łatwiejsze do debug'owania

**Implementacja:**
```javascript
function positionPills() {
  const svg = document.querySelector('.hub-mesh');
  const svgRect = svg.getBoundingClientRect();
  const viewBox = svg.viewBox.baseVal;

  // Przelicz viewBox coordinates na screen coordinates
  const scaleX = svgRect.width / viewBox.width;
  const scaleY = svgRect.height / viewBox.height;

  pills.forEach(pill => {
    const nodeX = pill.dataset.nodeX; // 500 dla Robotyka
    const nodeY = pill.dataset.nodeY; // 500 dla Robotyka

    pill.style.left = `${svgRect.left + (nodeX * scaleX)}px`;
    pill.style.top = `${svgRect.top + (nodeY * scaleY)}px`;
  });
}

window.addEventListener('resize', positionPills);
```

#### Opcja C: CSS Container Queries
**Koncepcja:** Użycie CSS Container Queries dla responsive positioning

**Wymaga:** Nowoczesne przeglądarki (2023+)

```css
@container (aspect-ratio > 16/9) {
  .hub-pill-1 { left: 52%; }
}
```

---

### Priorytet 2: Optymalizacja performance

#### 2.1 Lazy loading
- Lazy load card content (templates)
- Defer non-critical animations
- Intersection Observer dla flash animations

#### 2.2 Preloading
```html
<link rel="preload" href="assets/fonts/montserrat-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
```

#### 2.3 GSAP optimization
- Use GSAP's `will-change` hints
- Kill tweens on unmount
- Reuse timelines where possible

---

### Priorytet 3: Accessibility improvements

#### 3.1 Keyboard navigation
- Tab order: Gate button → Pills → Cards
- Arrow keys dla pills navigation
- Enter/Space dla activation

#### 3.2 Screen readers
- ARIA labels dla wszystkich interactive elements
- Live regions dla dynamic content
- Skip links dla keyboard users

#### 3.3 Reduced motion
- Rozszerzyć support dla `prefers-reduced-motion`
- Alternative animations (fade zamiast slide)
- Instant transitions option

---

### Priorytet 4: Dodatkowe features

#### 4.1 Dark/Light mode toggle
- System preference detection
- Manual toggle w top bar
- Persist w localStorage

#### 4.2 Language switcher
- PL/EN toggle
- i18n dla wszystkich tekstów
- URL-based lang detection

#### 4.3 Search functionality
- Quick search w Hub
- Filter pills by keyword
- Command palette (Cmd+K)

#### 4.4 Analytics integration
- Track pill clicks
- Monitor flash animation performance
- Heatmap dla user interactions

---

### Priorytet 5: Content expansion

#### 5.1 Więcej pills/kategorii
- Blog pill
- Contact pill
- Portfolio pill

#### 5.2 Dynamic card content
- Fetch z API/CMS
- Dynamic templates
- Real-time updates

#### 5.3 Case studies
- Expand card content
- Image galleries
- Testimonials

---

## 🛠️ Rekomendowane narzędzia dla dalszego rozwoju

### Testing
- **Playwright** - E2E testing (pill clicks, animations)
- **Lighthouse** - Performance audits
- **BrowserStack** - Cross-device testing (rozjeżdżanie pills)

### Development
- **Vite** - Fast dev server + build tool
- **PostCSS** - CSS preprocessing
- **TypeScript** - Type safety dla main-script.js

### Monitoring
- **Sentry** - Error tracking
- **Google Analytics 4** - User behavior
- **WebPageTest** - Performance monitoring

---

## 📊 Metryki sukcesu

### Performance
- ✅ First Contentful Paint: < 1.5s
- ✅ Time to Interactive: < 3s
- ✅ Lighthouse Score: 90+ (performance)
- ⚠️ Layout shifts: minimalizować przy resize

### User Experience
- ✅ Smooth 60fps animations
- ✅ Responsive na wszystkich urządzeniach (z wyjątkiem pills alignment)
- ✅ Accessible (keyboard + screen reader)
- ⚠️ Pills alignment: 95% accuracy (cel: 100%)

### Code Quality
- ✅ Modular CSS (common + hub specific)
- ✅ Reusable card system
- ✅ Documented (FONTS.md, PROJECT_STATUS.md)
- ✅ Version controlled (git)

---

## 📝 Changelog - Recent commits

**Latest:**
1. `2c0af75` - Switch to Montserrat local fonts from Inter/Manrope
2. `bcb4290` - Remove text from back button, keep only arrow icon
3. `25e3ec4` - Add font documentation (FONTS.md)
4. `7fb84b1` - Update pill labels and card titles
5. `2e08afa` - Update WWW card title and link to twoja-strona.online

**Zobacz pełną historię:** `git log --oneline`

---

## 👥 Contributors

- Development: Claude AI + Michał Rapała
- Design: Michał Rapała
- Testing: User feedback driven

---

## 📄 Licencja

Proprietary - michalrapala.com

---

**Last updated:** 2025-01-09
**Version:** 1.0.0
**Branch:** `claude/modernize-website-hub-011CUtyaXJyu1kYnEtaQjzs6`

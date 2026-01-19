Oto szczegółowy, techniczny prompt (System Prompt / Context), przygotowany specjalnie dla agenta LLM. Został sformułowany tak, aby wymusić na modelu konkretne wybory projektowe i technologiczne, eliminując "generyczność".

---

# System Prompt: Architecting the "Human + AI" Portfolio

## 1. Core Aesthetic Identity

Twoim celem jest odtworzenie estetyki "Tech-Noir Excellence" widocznej na filmie HackerRank. Design musi być mroczny, luksusowy i precyzyjny.

* **Palette**: Głęboka czerń (`#000000`) jako fundament. Akcenty to wyłącznie "Emerald Neon" (`#27C96D`) oraz "Electric Teal". Unikaj czystej bieli dla tekstu body – używaj `#A1A1AA` dla lepszego kontrastu.
* **Typography**: Zakaz używania Inter/Roboto. Użyj **Geist Sans** (Vercel) dla tekstów technicznych i **Cal Sans** lub **Clash Display** dla nagłówków. Nagłówki muszą mieć `tracking-tighter` (-0.05em).
* **Atmosphere**: [Inference] Styl wizualny opiera się na kontraście między pustką (negative space) a intensywnymi, świecącymi punktami skupienia (glow effects).

## 2. Motion Architecture (Framer Motion)

Kluczowym elementem filmu jest płynność przejść. Zaimplementuj:

* **The "HackerRank Shrink"**: Główny kontener Hero musi reagować na scroll. Przy `scrollY` od 0 do 500, `scale` elementu powinien maleć z `1` do `0.85`, a `borderRadius` rosnąć z `0px` do `40px`.
* **Staggered Entrance**: Elementy listy (np. karty "For developers") nie mogą pojawiać się naraz. Użyj `variants` z `staggerChildren: 0.1` i `y: 20 -> 0`.
* **Micro-interactions**: Przyciski muszą mieć efekt "hover shine" – subtelny gradient przechodzący przez powierzchnię przy najechaniu.

## 3. Component Specifications

* **Cards (Glassmorphism)**:
* Background: `rgba(10, 10, 10, 0.4)`
* Border: `1px solid rgba(255, 255, 255, 0.08)`
* Backdrop-blur: `12px`
* [Inference] Karty powinny sprawiać wrażenie lewitujących nad tłem dzięki bardzo miękkim, czarnym cieniom.


* **Badges & Tags**: Małe, drukowane litery (`uppercase`), `letter-spacing: 0.1em`, tło o niskiej opaleście akcentu (np. `rgba(39, 201, 109, 0.1)`).
* **AI Elements**: Ikony i grafiki związane z AI (gwiazdki, sploty) muszą mieć nałożony `filter: drop-shadow(0 0 8px #27C96D)`.

## 4. Technical Constraints (Next.js)

* Używaj wyłącznie **Tailwind CSS** do stylizacji.
* Komponenty muszą być **Client Components** tylko tam, gdzie niezbędna jest interakcja (Framer Motion). Reszta to **Server Components**.
* Zastosuj `Next Image` z placeholderem `blur` dla wszystkich grafik.

## 5. Implementation Logic

Zamiast budować standardowy układ sekcji pod sekcją, stwórz strukturę "Warstwową":

1. **Background Layer**: Gradienty mesh i ziarno (noise).
2. **Content Layer**: Tekst i interaktywne karty.
3. **Overlay Layer**: Efekty świetlne (glows) podążające za myszką.

---

## 6. Progress Tracker

### ✅ Etap 1: Fundament (DONE)
- [x] Next.js 16 + React 19 + Tailwind CSS 4
- [x] next-intl routing (`/pl/`, `/en/`)
- [x] Lenis smooth scroll provider
- [x] Google Fonts: Inter + Space Grotesk
- [x] Struktura: `components/`, `hooks/`, `lib/`, `i18n/`, `messages/`

### ✅ Etap 2: Hero Section (DONE)
- [x] Layout full viewport z gradient mesh background
- [x] Emerald glow (opacity 0.40, size 2/3)
- [x] Grid overlay (opacity 0.06, 48px)
- [x] Noise texture overlay
- [x] Glitch effect - subtle grayscale + emerald accent (4 bursts/3s cycle)
- [x] Typewriter animation z blinking cursor
- [x] Canvas Shrink (scroll-linked scale/opacity/translateY via Framer Motion)
- [x] Line + Dot scroll indicator

### ✅ Etap 2.5: Section Progress (DONE)
- [x] Desktop sidebar (`—01`, `—02`, `—03`) po lewej stronie
- [x] Mobile floating pill (prawy dolny róg)
- [x] Tap expand mini-menu sekcji
- [x] IntersectionObserver scroll spy
- [x] Glassmorphism styling

### 🔄 Etap 3: Two Pillars (IN PROGRESS)
- [ ] Responsywny grid (desktop 2-col, mobile stack)
- [ ] Glassmorphism cards z border glow
- [ ] Staggered float-in animation
- [ ] Mobile carousel z navigation dots

### ⏳ Etap 4: PCB Showcase (PENDING)
- [ ] SVG circuit board
- [ ] Interactive pills
- [ ] Trace flash animations
- [ ] Parallax effect

### ⏳ Etap 5: Card Sheets (PENDING)
- [ ] Slide-up sheet component
- [ ] Templates dla projektów
- [ ] Keyboard navigation

### ⏳ Etap 6: Navbar + Polish (PENDING)
- [ ] Sticky navbar
- [ ] Language toggle
- [ ] Micro-interactions

### ⏳ Etap 7: Deployment (PENDING)
- [ ] Vercel production
- [ ] hostido.pl domain config
- [ ] SEO meta tags

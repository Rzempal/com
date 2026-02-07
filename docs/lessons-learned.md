# 🧠 Lessons Learned

> **Powiązane:** [Standardy](standards/conventions.md) | [Roadmap](roadmap.md)

---

## 2026-01-19: Separacja Dokumentacji (Standards vs Live)

### Problem

Dokumentacja "żywa" (opisująca konkretny projekt) mieszała się ze standardami firmowymi (Code
Review, Konwencje) w jednym katalogu `docs/`, co utrudniało nawigację i zrozumienie co można
edytować.

### Rozwiązanie

Wydzielono podkatalog `docs/standards/` dla dokumentów reużywalnych.

- **Project Specific (`docs/*.md`)**: Edytowalne, specyficzne dla projektu.
- **Standards (`docs/standards/*.md`)**: Read-only (chyba że zmieniamy standard globalny).

---

## 2026-01-15: Separacja procesu Review

### Problem

Mieszanie uwag dotyczących logiki biznesowej ("Code Review") z uwagami wizualnymi ("Design Review")
powodowało szum informacyjny i rozmycie odpowiedzialności.

### Rozwiązanie

Zastosowano standard branżowy rozdzielający te dwa procesy:

1. **Code Review:** Skupia się na architekturze, bezpieczeństwie i logice (styl Linusa).
2. **Design Review:** Skupia się na UI, UX i zgodności z Design Systemem (pixel-perfect).

### Wnioski

- Pozwala to na precyzyjniejsze dobieranie reviewerów (Backend dev vs Frontend/Designer).
- Zwiększa jakość warstwy wizualnej poprzez dedykowaną checklistę.

---

## 2026-01-28: Architektura komponentów Tech-Noir

### Problem

Przeniesienie skomplikowanych animacji scroll-based z prototypu HTML (getBoundingClientRect + event
listeners) do architektury React/Next.js bez utraty wydajności.

### Rozwiązanie

Zastosowano Framer Motion z hookami `useScroll` i `useTransform`:

- **PCBBackground:** Energy beams z motion.path i animacją pathLength zamiast CSS keyframes
- **StickyProjectDeck:** Efekt sticky stacking cards z `position: sticky` + dynamicznym
  `scale`/`brightness`
- **TwoPillars:** Glassmorphism PillarCard z connector points i hover effects

### Wnioski

- Framer Motion offloaduje animacje na GPU, zapewniając 60 FPS
- `useTransform` pozwala na deklaratywne wiązanie wartości ze scrollem bez ręcznej obsługi eventów
- Warstwa PCB jako `z-0` z `pointer-events-none` nie blokuje interakcji z contentem

---

## 2026-01-30: Pierwszy Orphan Hunt (Next.js)

### Problem

Nieużywane komponenty React (`PCBShowcase`, `ProjectShowcase`, `SectionProgress`, `CurrentFlow`)
zalegały w projekcie - eksportowane w plikach barrel, ale nigdzie nieimportowane.

### Rozwiązanie

Systematyczny audyt z użyciem `grep_search` na wzorce importów:

1. Zidentyfikowano orphany przez brak importów w `page.tsx` i innych plikach
2. Zweryfikowano brak znaczników `// KEEP:`
3. Usunięto pliki i zaktualizowano pliki barrel (`index.ts`)
4. Potwierdzono sukces przez `npm run build`

### Wnioski

- Regularne audyty Orphan Hunt pomagają utrzymać higienę kodu
- Raport w `docs/audits/` dokumentuje usunięte elementy dla przyszłej referencji

---

## 2026-02-07: Dynamiczna ścieżka emerald (useContainerEdge)

### Problem

Ścieżka emerald w `PCBBackground.tsx` miała stały X=15% (viewBox percentage). Na ekranach
o różnej szerokości (1280px vs 1920px) trace wchodził pod kontent lub był za daleko od niego —
nie biegł obok lewej krawędzi kontentu jak zamierzono.

### Rozwiązanie

Zamiast stałej wartości procentowej, hook `useContainerEdge(offsetPx)`:

1. Oblicza lewą krawędź Tailwind `container` z breakpointów (640/768/1024/1280/1536)
2. Dodaje padding sekcji (`px-4` / `px-6`)
3. Odejmuje offset (12px) — trace biegnie tuż obok kontentu
4. Zwraca wartość jako % viewportu (kompatybilny z SVG viewBox 0-100)
5. Nasłuchuje `resize` — reaguje na zmianę rozmiaru okna

### Wnioski

- **Nie zgaduj wartości procentowych** — zawsze zweryfikuj z faktyczną strukturą kontenerów
  w kodzie. Zaproponowanie x=4% (z głowy) okazało się błędne po analizie breakpointów
- **Obliczenie z breakpointów > pomiar DOM** — czyste, bez zależności między komponentami,
  działa natychmiast (brak opóźnienia ResizeObserver)
- `preserveAspectRatio="none"` + dynamiczny path `d` to dobre połączenie: SVG skaluje się
  na cały viewport, a konkretne współrzędne X reagują na layout

---

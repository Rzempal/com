# Dokumentacja Architektury

> **Cel dokumentu:** Przegląd architektury systemu michalrapala.com

---

## Dokumentacja

| Dokument | Opis |
| --- | --- |
| **[Architektura](architecture.md)** | Przegląd systemu, stack, warstwy (ten plik) |
| **[Design](design.md)** | Design System Tech-Noir, tokeny, typografia |
| **[Deployment](deployment.md)** | Wdrożenie przez Vercel |
| **[Lessons Learned](lessons-learned.md)** | Dziennik doświadczeń i wniosków |
| **[Road Map](roadmap.md)** | Plan rozwoju projektu |

---

## Przegląd Systemu

### Model Biznesowy

Portfolio/strona główna prezentująca usługi z obszaru automatyzacji, symulacji robotycznych
i rozwoju aplikacji webowych. Styl: **Tech-Noir** (retro-futurism / cyberpunk).

### Struktura domen

- **michalrapala.com** — strona główna (ten projekt)
- **robotyka.michalrapala.com** — symulacje robotyczne
- **resztatokod.pl** — studio developerskie
- **twoja-strona.online** — strony WWW
- **michalrapala.app** — aplikacje webowe

---

## Stack Technologiczny

### Frontend (Next.js)

| Pakiet | Wersja | Zastosowanie |
|--------|--------|-------------|
| Next.js | 16.1.2 | Framework SSR/SSG |
| React | 19.2.3 | Biblioteka UI |
| TypeScript | 5.9.3 | Typowanie statyczne |
| Tailwind CSS | 4 | Style utility-first |
| Framer Motion | 12.27.0 | Animacje scroll-linked |
| GSAP | 3.14.2 | Zaawansowane animacje (RTK logo) |
| Lenis | 1.3.17 | Smooth scroll |
| next-intl | 4.7.0 | Internacjonalizacja PL/EN |
| Lucide React | 0.562.0 | Ikony |

### Backend

Brak — statyczna strona portfolio. Dane przechowywane w plikach JSON (i18n messages).

### Hosting / DevOps

| Element | Technologia |
|---------|-------------|
| Hosting | Vercel (preview deployments) |
| DNS/Domena | hostido.pl |
| CI/CD | Vercel (automatyczne deploye z branchy) |
| VCS | GitHub |

---

## Architektura Wysokiego Poziomu

```
┌────────────────────────────────────────────┐
│               Vercel CDN                   │
│          (Edge + ISR/Static)               │
└──────────────────┬─────────────────────────┘
                   │
┌──────────────────▼─────────────────────────┐
│            Next.js 16 App Router           │
│                                            │
│  ┌─────────────────────────────────────┐   │
│  │  app/[locale]/layout.tsx            │   │
│  │  ├─ NextIntlClientProvider          │   │
│  │  └─ LenisProvider (smooth scroll)   │   │
│  │                                     │   │
│  │  app/[locale]/page.tsx              │   │
│  │  ├─ PCBBackground (fixed, z-0)      │   │
│  │  ├─ Hero                            │   │
│  │  ├─ TwoPillars                      │   │
│  │  ├─ StickyProjectDeck               │   │
│  │  └─ Contact                         │   │
│  └─────────────────────────────────────┘   │
└────────────────────────────────────────────┘
```

---

## Frontend (Next.js)

### Struktura katalogów

```
next-app/src/
├── app/
│   └── [locale]/
│       ├── layout.tsx          # Root layout: fonty, providers, meta
│       └── page.tsx            # Kompozycja sekcji strony
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            # Fullscreen hero z typewriter + glitch
│   │   ├── TwoPillars.tsx      # Grid 2x2: Robotyka + ResztaToKod
│   │   ├── StickyProjectDeck.tsx  # Karuzela projektów (sticky scroll)
│   │   ├── Contact.tsx         # Sekcja kontaktowa
│   │   └── index.ts            # Barrel export
│   ├── ui/
│   │   ├── PCBBackground.tsx   # Animowane tło PCB (fixed, emerald/cyan traces)
│   │   └── index.ts
│   └── providers/
│       ├── LenisProvider.tsx   # Smooth scroll wrapper
│       └── index.ts
├── i18n/
│   ├── routing.ts              # Konfiguracja locale: ['pl', 'en'], default: 'pl'
│   └── request.ts              # Server-side message loading
├── messages/
│   ├── pl.json                 # Tłumaczenia polskie
│   └── en.json                 # Tłumaczenia angielskie
└── lib/
    └── utils.ts                # Utility: cn() (clsx + tailwind-merge)
```

### Routing

| Ścieżka | Komponent | Opis |
|----------|-----------|------|
| `/pl` | `page.tsx` | Strona główna (PL) |
| `/en` | `page.tsx` | Strona główna (EN) |

Routing oparty na `next-intl` z prefixem locale w URL.

### Kompozycja strony (render order)

1. **PCBBackground** — fixed layer z-0, animowane circuit traces (emerald + cyan)
2. **Hero** — fullscreen, tytuł z glitch, subtitle typewriter, scroll indicator
3. **TwoPillars** — `container mx-auto`, grid 2x2 (ENG://Symulacja + DEV://Programowanie)
4. **StickyProjectDeck** — `max-w-7xl mx-auto`, 5 kart projektów z sticky scroll
5. **Contact** — `max-w-2xl mx-auto`, dane kontaktowe

### Kluczowe wzorce

- **PCBBackground:** `useContainerEdge()` hook dynamicznie oblicza pozycję trace'ów
  emerald na podstawie breakpointów Tailwind `container` — trace biegnie obok lewej
  krawędzi kontentu
- **Animacje:** Framer Motion dla scroll-linked effects, GSAP dla RTK logo
- **i18n:** Server-side message loading via `next-intl`, client hydration w layout
- **Smooth scroll:** Lenis provider wrappuje całą aplikację

---

## Warstwy wizualne (z-index)

| z-index | Warstwa | Komponent |
|---------|---------|-----------|
| z-0 | Background | PCBBackground (fixed, pointer-events-none) |
| z-10 | Content | Wszystkie sekcje (Hero, TwoPillars, etc.) |

PCBBackground jest fixed i nie przesuwa się ze scrollem. Sekcje kontentu przesuwają się
nad nim, tworząc efekt głębi.

---

> 📅 **Ostatnia aktualizacja:** 2026-02-07
> 🏷️ **Wersja:** 0.2

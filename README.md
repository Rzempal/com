# michalrapala.com

Strona główna oraz system subdomen prezentujący ofertę usług z obszaru automatyzacji,
symulacji procesów przemysłowych i rozwoju aplikacji webowych.

**Styl:** Tech-Noir (retro-futurism / cyberpunk)

---

## Struktura domen

- [michalrapala.com](https://michalrapala.com) — strona główna (ten projekt)
  - [robotyka.michalrapala.com](https://robotyka.michalrapala.com) — symulacje robotyczne
  - [resztatokod.pl](https://resztatokod.pl) — studio developerskie
- [twoja-strona.online](https://twoja-strona.online) — strony WWW
- [michalrapala.app](https://michalrapala.app) — aplikacje webowe

---

## Technologie

| Pakiet | Wersja | Zastosowanie |
|--------|--------|-------------|
| Next.js | 16.1.2 | Framework (App Router, SSR/SSG) |
| React | 19.2.3 | Biblioteka UI |
| TypeScript | 5.9.3 | Typowanie statyczne |
| Tailwind CSS | 4 | Style utility-first |
| Framer Motion | 12.27.0 | Animacje scroll-linked, SVG pulse |
| GSAP | 3.14.2 | Zaawansowane animacje (RTK logo) |
| Lenis | 1.3.17 | Smooth scroll |
| next-intl | 4.7.0 | Internacjonalizacja PL/EN |

---

## Struktura projektu

```
next-app/src/
├── app/[locale]/
│   ├── layout.tsx              # Root layout: fonty, providers, meta
│   └── page.tsx                # Kompozycja sekcji strony
├── components/
│   ├── sections/
│   │   ├── Hero.tsx            # Fullscreen hero: glitch title, typewriter
│   │   ├── TwoPillars.tsx      # Grid 2x2: Robotyka + ResztaToKod
│   │   ├── StickyProjectDeck.tsx  # Karuzela projektów (sticky scroll)
│   │   └── Contact.tsx         # Sekcja kontaktowa
│   ├── ui/
│   │   └── PCBBackground.tsx   # Animowane tło PCB (emerald/cyan traces)
│   └── providers/
│       └── LenisProvider.tsx   # Smooth scroll wrapper
├── i18n/                       # Konfiguracja next-intl (PL/EN)
├── messages/                   # Pliki tłumaczeń (pl.json, en.json)
└── lib/utils.ts                # Utility: cn() (clsx + tailwind-merge)
```

### Kompozycja strony

1. **PCBBackground** — fixed z-0, animowane circuit traces (emerald + cyan)
2. **Hero** — fullscreen, tytuł z efektem glitch, subtitle typewriter, scroll indicator
3. **TwoPillars** — `container mx-auto`, 2x2 grid (ENG://Symulacja + DEV://Programowanie)
4. **StickyProjectDeck** — `max-w-7xl mx-auto`, 5 kart projektów ze sticky scroll
5. **Contact** — `max-w-2xl mx-auto`, dane kontaktowe

---

## Dokumentacja

### Standardy (globalne, cross-project)

| Dokument | Opis |
| --- | --- |
| **[Conventions](docs/standards/conventions.md)** | Standardy kodu, nazewnictwo, struktura plików |
| **[Code Review](docs/standards/code-review.md)** | Zasady weryfikacji kodu (styl Linusa) |
| **[Design Review](docs/standards/design-review.md)** | Zasady weryfikacji UI/UX |
| **[Testing](docs/standards/testing.md)** | Strategia testów i TDD |
| **[Contributing](docs/standards/contributing.md)** | Przewodnik po współpracy |

### Projekt (live)

| Dokument | Opis |
| --- | --- |
| **[Architecture](docs/architecture.md)** | Przegląd systemu, stack, warstwy |
| **[Design](docs/design.md)** | Design System Tech-Noir, tokeny wizualne |
| **[Deployment](docs/deployment.md)** | Wdrożenie przez Vercel |
| **[Lessons Learned](docs/lessons-learned.md)** | Dziennik doświadczeń |
| **[Road Map](docs/roadmap.md)** | Plan rozwoju projektu |
| **[PCB Oznaczenia](docs/PCB-Oznaczenia.md)** | Dokumentacja oznaczeń silk screen na PCB |

---

## Deployment

- **Hosting:** Vercel (preview deployments z każdego brancha)
- **Domena:** hostido.pl
- **CI/CD:** Vercel (automatyczny build + deploy)

---

## Uruchomienie lokalne

```bash
cd next-app
npm install
npm run dev
```

Aplikacja dostępna pod `http://localhost:3000/pl`

---

## Kontakt

- kontakt@michalrapala.com
- [LinkedIn](https://www.linkedin.com/in/michal-rapala)
- [GitHub](https://github.com/Rzempal)

---

> Ostatnia aktualizacja: luty 2026

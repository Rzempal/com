# michalrapala.com

Strona glowna oraz system subdomen prezentujacy oferte uslug z obszaru automatyzacji, symulacji procesow przemyslowych i rozwoju aplikacji webowych.

**Styl:** Retro-futurism / Cyberpunk

---

## Struktura domen

- [michalrapala.com](https://michalrapala.com) - strona glowna (ten projekt)
  - [robotyka.michalrapala.com](https://robotyka.michalrapala.com) - symulacje robotyczne
  - [resztatokod.pl](https://resztatokod.pl) - studio developerskie
- [twoja-strona.online](https://twoja-strona.online) - strony WWW
- [michalrapala.app](https://michalrapala.app) - aplikacje webowe

---

## Struktura plikow (public_html)

### Pliki UZYWANE (produkcja)

```
public_html/
├── index.html              # Glowna strona (v0.115) - full-screen snap-scroll
├── common-styles.css       # Wspolne style CSS (zmienne, typografia)
├── hub-styles.css          # Style hub/hero section (v0.050) - snap-scroll + kolorystyka
├── main-animations.css     # Animacje CSS (glitch, reveal, traces)
├── fonts.css               # Definicje fontow
├── main-script.js          # Glowny skrypt JS (animacje, i18n, carousel)
└── assets/
    └── images/
        └── global/
            └── logo_robotyka.png   # Logo sekcji Robotyka
```

### Pliki NIEUZYWANE (do usuniecia lub archiwum)

```
public_html/
├── footer-template.html    # Stary szablon footer (nieimportowany)
├── mockup-cyberpunk.html   # Mockup dev (do archiwum)
├── PROJECT_STATUS.md       # Stara dokumentacja techniczna
└── assets/
    └── images/
        └── global/
            └── kod_jest_ostatni.jpg  # Nieuzywany obraz
```

```

---

## Dokumentacja

### Standardy (Globalne/Read-Only)
| Dokument | Opis |
| --- | --- |
| 🛡️ **[Conventions](docs/standards/conventions.md)** | Standardy kodu, nazewnictwo, struktura plików |
| 👁️ **[Code Review](docs/standards/code-review.md)** | Zasady weryfikacji kodu (Backend/Logic) |
| 🎨 **[Design Review](docs/standards/design-review.md)** | Zasady weryfikacji UI/UX (Frontend) |
| 🧪 **[Testing](docs/standards/testing.md)** | Strategia testów i TDD |
| 🤝 **[Contributing](docs/standards/contributing.md)** | Przewodnik po dokumentacji i zasadach współpracy |

### Projekt (Live)
| Dokument | Opis |
| --- | --- |
| 🏛️ **[Architecture](docs/architecture.md)** | Przegląd systemu i warstwy |
| 📊 **[Database](docs/database.md)** | Model danych i schematy |
| 💅 **[Design](docs/design.md)** | Design System implementation |
| 🔐 **[Security](docs/security.md)** | Zasady bezpieczeństwa |

---

## Technologie

- **CSS:** Tailwind CSS (CDN), custom CSS variables
- **JS:** Vanilla JS + GSAP 3.12 (animacje)
- **Fonty:** Poppins (preload woff2), Font Awesome 6 (CDN)
- **i18n:** PL/EN via data-i18n attributes

---

## Glowne komponenty

### Hero Section
- Tytul z efektem glitch
- Subtitle z animacja typewriter
- Fade-in z efektem "z glebi" (scale 0.9 -> 1)

### Two Pillars (wewnatrz hero)
- **Robotyka** - symulacje przemyslowe (KUKA, Fanuc, ABB)
- **resztatokod.pl** - studio developerskie (3-state CTA sequence)
- Desktop: grid 2 kolumny
- Mobile: stacked card carousel z swipe

### PCB Showcase
- Interaktywne tlo SVG (circuit board)
- Pill buttons z animacja GSAP
- Flash effect na trace paths

### Navbar
- Status badge: "OTWARTY NA NOWE PROJEKTY"
- Social links (LinkedIn, GitHub, Email)
- Language toggle (PL/EN)

---

## Tlumaczenia (i18n)

Obiekt `translations` w `main-script.js`:

| Klucz | PL | EN |
|-------|----|----|
| hub_status | OTWARTY NA NOWE PROJEKTY | OPEN FOR NEW PROJECTS |
| scroll_cta | Zobacz, czym sie teraz zajmuje. | See what I'm working on now. |
| pillars_heading | Symulacje robotyczne. Aplikacje. Strony internetowe. | Robotic simulations. Applications. Websites. |
| hero_subtitle | Jack into the digital world... | Jack into the digital world... |

---

## Deployment

- **Hosting:** hostido.pl
- **CI/CD:** Vercel (preview deployments)
- **Branch:** `claude/simplify-user-flow-B3JeE`

---

## Kontakt

- kontakt@michalrapala.com
- [LinkedIn](https://www.linkedin.com/in/michal-rapala)
- [GitHub](https://github.com/Rzempal)

---

## Status

- Otwarty na nowe projekty
- Ostatnia aktualizacja: styczen 2026

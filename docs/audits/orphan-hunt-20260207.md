# Orphan Hunt Report - 2026-02-07

**Ocena:** akceptowalne — komponenty czyste, CSS i dependencies ciagnely trupy

## Usuniete CSS (globals.css)

| Klasa / Blok | Linie (przed) | Uzasadnienie |
| --- | --- | --- |
| `.scrollbar-hide` | 151-157 | Zero referencji w komponentach |
| `.glass-card` | 178-182 | Komponenty uzywaja inline Tailwind |
| `.glow-emerald` + 3 override | 185-207 | Zero referencji (w tym robotyka-theme override) |
| `.animate-bounce-subtle` + keyframe | 221-233 | Zero referencji |
| `.rtk-external` | 369-372 | SVG class nigdzie nie nalozony |
| `.rtk-animate .rtk-external` | 409-411 | Animacja dla nieistniejacego elementu |
| `--color-accent` | 29, 58, 90, 127 | Zdefiniowana w 3 trybach + @theme, zero uzycia |
| Caly blok PCB Animations | 540-638 | Stara wersja PCB — `.pcb-trace`, `.pcb-pad`, `.pcb-pill-anchor`, `.pcb-trace-flash` + 4 keyframes — zero referencji |

## Usuniete dependencies (package.json)

| Pakiet | Uzasadnienie |
| --- | --- |
| `@fontsource/space-grotesk` | Font ladowany z Google Fonts CDN |
| `@gsap/react` | Zero importow — Framer Motion zastapil GSAP |
| `gsap` | Zero importow — j.w. |
| `clsx` | Zero importow |
| `react-icons` | Zero importow — ikony z lucide-react i inline SVG |
| `tailwind-merge` | Zero importow |

## Zachowane (OK)

| Element | Powod |
| --- | --- |
| `--color-trace` | Uzywana przez Tailwind `stroke-trace` w PCBBackground.tsx |
| `.rtk-*` (bez external) | Aktywnie uzywane w TwoPillars.tsx |
| `.footer-*` | Aktywnie uzywane w Footer.tsx |
| `useContainerLayout.ts` | Importowany bezposrednio 3x (nie w barrel — nie szkodzi) |

## Weryfikacja

- `npm install` — sukces (lockfile zaktualizowany)
- `npm run build` — sukces (11/11 stron)
- Wszystkie routes wygenerowane poprawnie

## Statystyki

- **Usunieto CSS:** ~120 linii martwego kodu
- **Usunieto dependencies:** 6 pakietow
- **Komponenty orphan:** 0 (czysto od poprzedniego audytu)
- **Zakomentowany kod:** 0

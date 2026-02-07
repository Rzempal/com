# Design System — Tech-Noir

> **Powiązane:** [Conventions](standards/conventions.md) | [Architektura](architecture.md)

---

## Filozofia Projektowa

Styl **Tech-Noir**: retro-futurism / cyberpunk. Ciemne tła, neonowe akcenty (emerald, cyan),
efekty glow, monospace typography, estetyka PCB / circuit board.

- **KISS:** Jeśli element nie pełni funkcji, usuń go.
- **Consistency:** Spójność buduje zaufanie i zmniejsza obciążenie poznawcze.
- **Accessibility First:** Design, który nie jest dostępny, jest popsuty.

---

## Design Tokens

### Kolory (globals.css)

| Token | Wartość | Zastosowanie |
|-------|---------|-------------|
| `--color-background` | `#000000` | Tło strony |
| `--color-foreground` | `#fafafa` | Tekst główny |
| `--color-emerald-neon` | `#27c96d` | Akcent neonowy (CTA, headingi) |
| `--color-emerald-glow` | `#10b981` | Glow effect, traces |
| `--color-text-muted` | `#a1a1aa` | Tekst drugorzędny (zinc-400) |
| `--color-border` | `#27272a` | Krawędzie (zinc-800) |
| `--color-surface` | `#18181b` | Tło kart (zinc-900) |

### Paleta Tailwind (najczęściej używane)

| Klasa | Kontekst |
|-------|----------|
| `bg-[#030303]` | Tło sekcji main |
| `bg-zinc-900/80` | Tło kart (glassmorphism) |
| `text-emerald-500` | Akcenty emerald (headingi, CTA) |
| `text-emerald-400` | Etykiety (DEV://) |
| `text-cyan-400` | Etykiety (ENG://) |
| `stroke-emerald-500` | SVG traces (PCB) |
| `stroke-cyan-400` | SVG traces (PCB) |
| `border-zinc-700/50` | Krawędzie kart |

### Glow Effects

```css
.glow-emerald {
  box-shadow: 0 0 20px rgba(39, 201, 109, 0.15);
}
.glow-emerald:hover {
  box-shadow: 0 0 30px rgba(39, 201, 109, 0.25);
}
```

SVG traces: `filter: drop-shadow(0 0 6px #10b981)` (emerald) / `drop-shadow(0 0 6px #06b6d4)` (cyan)

---

## Typografia

| Token | Wartość | Zastosowanie |
|-------|---------|-------------|
| `--font-sans` | Inter, system-ui, sans-serif | Tekst body |
| `--font-mono` | JetBrains Mono, Fira Code, monospace | Kod, etykiety, opisy |
| `--font-display` | Space Grotesk, Inter, system-ui | Nagłówki hero |

### Skala typograficzna

| Element | Klasy Tailwind |
|---------|---------------|
| Hero title | `text-4xl sm:text-5xl md:text-6xl font-bold font-display` |
| Section heading | `text-3xl md:text-4xl font-bold` |
| Body text | `text-sm font-mono text-zinc-400` |
| Tags/Labels | `text-xs font-mono font-bold tracking-wider uppercase` |
| Tech tags | `text-[10px] font-mono` |

---

## Layout

### Konteneryzacja

Sekcje używają zróżnicowanych kontenerów dopasowanych do treści:

| Sekcja | Kontener | Padding |
|--------|----------|---------|
| Hero | brak max-w, flex center | `px-6` |
| TwoPillars | `container mx-auto` | `px-4 md:px-6` |
| StickyProjectDeck | `max-w-7xl mx-auto` | `px-6` |
| Contact | `max-w-2xl mx-auto` | `px-6` |

### Warstwy z-index

| z-index | Warstwa |
|---------|---------|
| z-0 | PCBBackground (fixed, pointer-events-none) |
| z-10 | Content sections |

---

## Komponenty wizualne

### Glassmorphism Card (unified-card)

```
bg-zinc-900/80 backdrop-blur-md
border border-zinc-700/50
shadow-[0_0_30px_rgba(0,0,0,0.5)]
rounded-[32px]
p-3 md:p-4
```

### PCB Circuit Traces

Dwie animowane ścieżki biegnące przez tło strony:

- **Emerald trace:** Start center → diagonal ↙ → vertical ↓ (dynamiczny X, wyrównany do lewej krawędzi `container`)
- **Cyan trace:** Start prawy → diagonal ↙ → vertical ↓ (stały, 60% viewportu)
- Animacja: `strokeDashoffset` z `pathLength={1}` — płynny puls prądu

### Efekty specjalne

| Efekt | Opis | Zastosowanie |
|-------|------|-------------|
| Glitch | text-shadow z przesunięciem RGB | Hero title |
| Typewriter cursor | Blinkający `\|` w emerald | Hero subtitle |
| Pulse dots | `animate-pulse` na okrągłych elementach | Etykiety sekcji |
| RTK Logo | SVG z neural nodes + typing animation | TwoPillars DevMediaCell |

---

## Dostępność (WCAG 2.1)

- **Kontrast:** Tekst musi spełniać minimum 4.5:1
- **Interakcja:** Elementy obsługiwane klawiaturą (focus states)
- **Semantyka:** Poprawne tagi HTML (`<section>`, `<main>`, `<nav>`)
- **Reduced motion:** Animacje powinny respektować `prefers-reduced-motion`

---

> 📅 **Ostatnia aktualizacja:** 2026-02-07

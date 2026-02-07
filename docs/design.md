# Design System — Tech-Noir / Deep Vaporwave

> **Powiązane:** [Conventions](standards/conventions.md) | [Architektura](architecture.md)

---

## Filozofia Projektowa

Dwa tryby, jedna paleta:

- **Dark Mode (Tech-Noir):** retro-futurism / cyberpunk. Ciemne tła, neonowe akcenty (emerald, cyan), efekty glow, monospace typography, estetyka PCB / circuit board.
- **Alternate Mode (Deep Vaporwave):** styl "Vaporwave". Głęboki fiolet (#1e1046) jako tło, lavender tekst, magenta/fuksja neony (#d946ef), cyan akcent (#22d3ee), fioletowy glassmorphism z glow effects.

Oba tryby łączy ta sama paleta kolorów o różnym nasyceniu — sterowana CSS custom properties.

- **KISS:** Jeśli element nie pełni funkcji, usuń go.
- **Consistency:** Spójność buduje zaufanie i zmniejsza obciążenie poznawcze.
- **Accessibility First:** Design, który nie jest dostępny, jest popsuty.

---

## Design Tokens

### Kolory — Dark Mode (globals.css)

| Token | Wartość | Zastosowanie |
|-------|---------|-------------|
| `--color-background` | `#000000` | Tło strony |
| `--color-foreground` | `#fafafa` | Tekst główny |
| `--color-emerald-neon` | `#27c96d` | Akcent neonowy (CTA, headingi) |
| `--color-emerald-glow` | `#10b981` | Glow effect, traces |
| `--color-text-secondary` | `#a1a1aa` | Tekst drugorzędny |
| `--color-text-tertiary` | `#71717a` | Tekst trzeciorzędny |
| `--color-text-faint` | `#52525b` | Tekst stonowany (labels) |
| `--color-border` | `#27272a` | Krawędzie |
| `--color-border-subtle` | `rgba(255,255,255,0.1)` | Subtelne krawędzie |
| `--color-surface` | `#18181b` | Tło kart |
| `--color-surface-hover` | `#27272a` | Tło hover |
| `--color-glass-bg` | `rgba(24,24,27,0.8)` | Glassmorphism tło |
| `--color-glass-border` | `rgba(39,39,42,0.5)` | Glassmorphism border |
| `--color-accent` | `#06b6d4` | Cyan accent |
| `--color-trace` | `#27272a` | Statyczne PCB traces |
| `--color-vignette` | `#050505` | PCB winietka |
| `--color-svg-fill` | `#ffffff` | SVG fill (RTK Logo, Footer) |

### Kolory — Alternate Mode (Deep Vaporwave)

| Token | Wartość | Zastosowanie |
|-------|---------|-------------|
| `--color-background` | `#1e1046` | Tło strony (głęboki fiolet) |
| `--color-foreground` | `#ede9fe` | Tekst główny (Violet 100 / lavender) |
| `--color-emerald-neon` | `#d946ef` | Fuchsia-500 (główny neon) |
| `--color-emerald-glow` | `#a855f7` | Purple-500 (glow) |
| `--color-text-muted` | `#c4b5fd` | Tekst wyciszony (Violet 300) |
| `--color-text-secondary` | `#c4b5fd` | Tekst drugorzędny (Violet 300) |
| `--color-text-tertiary` | `#8b5cf6` | Tekst trzeciorzędny (Violet 500) |
| `--color-text-faint` | `#6d28d9` | Tekst stonowany (Violet 700) |
| `--color-border` | `#4c1d95` | Krawędzie (Violet 900) |
| `--color-border-subtle` | `rgba(217,70,239,0.2)` | Subtelne krawędzie (fuchsia) |
| `--color-border-faint` | `rgba(217,70,239,0.08)` | Najsubtelniejsze krawędzie |
| `--color-surface` | `#2a1860` | Tło kart (ciemny fiolet) |
| `--color-surface-hover` | `#3b1f8e` | Tło hover (jaśniejszy fiolet) |
| `--color-surface-alt` | `#251456` | Alternatywne tło |
| `--color-card-bg` | `rgba(42,24,96,0.8)` | Tło kart z przezroczystością |
| `--color-accent` | `#22d3ee` | Cyan-400 (drugorzędny neon) |
| `--color-glass-bg` | `rgba(30,16,70,0.85)` | Glassmorphism tło |
| `--color-glass-bg-light` | `rgba(30,16,70,0.6)` | Glassmorphism lekkie |
| `--color-glass-border` | `rgba(139,92,246,0.3)` | Glassmorphism border (violet) |
| `--color-overlay` | `rgba(10,5,20,0.6)` | Overlay ciemny |
| `--color-overlay-light` | `rgba(10,5,20,0.3)` | Overlay jasny |
| `--color-trace` | `#4c1d95` | Statyczne PCB traces (Violet 900) |
| `--color-vignette` | `#1e1046` | PCB winietka (głęboki fiolet) |
| `--color-grid-line` | `rgba(217,70,239,0.05)` | Linie siatki PCB |
| `--color-svg-fill` | `#ede9fe` | SVG fill (Violet 100) |

### Klasy semantyczne (Tailwind @theme)

| Klasa Tailwind | Token CSS | Opis |
|---------------|-----------|------|
| `bg-background` | `--color-background` | Tło strony |
| `text-foreground` | `--color-foreground` | Tekst główny |
| `bg-surface` | `--color-surface` | Tło kart |
| `bg-glass-bg` | `--color-glass-bg` | Glassmorphism |
| `border-glass-border` | `--color-glass-border` | Border glassmorphism |
| `border-border-subtle` | `--color-border-subtle` | Subtelne krawędzie |
| `text-text-secondary` | `--color-text-secondary` | Tekst drugorzędny |
| `text-text-tertiary` | `--color-text-tertiary` | Tekst trzeciorzędny |
| `stroke-trace` | `--color-trace` | PCB static traces |

### Glow Effects

```css
/* Dark mode */
.glow-emerald {
  box-shadow: 0 0 20px rgba(39, 201, 109, 0.15);
}
/* Deep Vaporwave — neonowy glow fuksja */
html.light .glow-emerald {
  box-shadow: 0 0 20px rgba(217, 70, 239, 0.2);
}
```

SVG traces: `filter: drop-shadow(0 0 6px #10b981)` (emerald) / `drop-shadow(0 0 6px #d946ef)` (fuchsia/vaporwave)

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
| Body text | `text-sm font-mono text-text-secondary` |
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
bg-glass-bg backdrop-blur-md
border border-glass-border
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

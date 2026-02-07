# PCB Background — Dokumentacja techniczna

## Stan implementacji

**Komponent:** `next-app/src/components/ui/PCBBackground.tsx`
**Status:** Zaimplementowany (Phase 1 complete)

---

## Architektura

```
┌────────────────────────────────────────────────────┐
│  PCBBackground (fixed inset-0 z-0)                 │
│                                                    │
│  Warstwa 1: Noise texture (opacity 3%)             │
│  Warstwa 2: Vignette + grid pattern                │
│  Warstwa 3: SVG circuit traces                     │
│  Warstwa 4: HTML pads (kropki lutownicze)          │
└────────────────────────────────────────────────────┘
```

### SVG: viewBox="0 0 100 100" + preserveAspectRatio="none"

Współrzędne = procenty viewportu. Element (50, 40) = 50% od lewej, 40% od góry.

---

## Circuit Traces

### Emerald trace (dynamiczny)

```
Ścieżka: M 50 0 V 40 L ${edgeX} 75 V 100

(50%, 0%)  ──── start: center top
    │
    V 40     ──── segment 1: pionowo ↓ do (50%, 40%)
    │
    L edgeX 75 ── segment 2: diagonalnie ↙ do (edgeX%, 75%)
    │
    V 100    ──── segment 3: pionowo ↓ do (edgeX%, 100%)
```

**edgeX** = dynamicznie obliczany przez hook `useContainerEdge(12)`:
- Oblicza lewą krawędź Tailwind `container mx-auto` na bieżącym viewporcie
- Odejmuje 12px offset — trace biegnie tuż obok lewej krawędzi kontentu
- Reaguje na resize

| Viewport | Container max-w | edgeX |
|----------|----------------|-------|
| 1920px | 1536px (2xl) | ~10.6% |
| 1440px | 1280px (xl) | ~6.4% |
| 1280px | 1280px (xl) | ~0.9% |
| 768px | 768px (md) | ~1.6% |

### Cyan trace (stały)

```
Ścieżka: M 80 0 V 28 L 60 46 V 100

(80%, 0%)  ──── start: right area
    │
    V 28     ──── segment 1: pionowo ↓ do (80%, 28%)
    │
    L 60 46  ──── segment 2: diagonalnie ↙ do (60%, 46%)
    │
    V 100    ──── segment 3: pionowo ↓ do (60%, 100%)
```

### Ślepa trasa (stała, statyczna)

```
M 8 0 V 18 L 25 33 — lewy górny narożnik, bez animacji
```

---

## Animacje

### Flowing pulse (strokeDashoffset)

Oba traces (emerald + cyan) używają tego samego mechanizmu:

```
pathLength={1}              — normalizuje długość ścieżki do 1
strokeDasharray="0.35 0.65" — 35% widoczne, 65% przerwa
animate={{ strokeDashoffset: [1, -1] }}  — puls płynie wzdłuż ścieżki
```

| Parametr | Emerald | Cyan |
|----------|---------|------|
| Duration | 5s | 7s |
| Delay | 0s | 1s |
| strokeWidth | 0.2 | 0.2 |
| Glow | `drop-shadow(0 0 6px #10b981)` | `drop-shadow(0 0 6px #06b6d4)` |

### Pads (kropki lutownicze)

HTML `<div>` zamiast SVG `<circle>` — unika deformacji przy `preserveAspectRatio="none"`.

| Pad | Pozycja | Kolor | Animacja |
|-----|---------|-------|----------|
| Emerald 1 | (50%, 40%) stały | emerald-500/50 | opacity pulse 5s |
| Emerald 2 | (edgeX%, 75%) dynamiczny | emerald-500/50 | opacity pulse 5s |
| Cyan 1 | (80%, 28%) stały | cyan-500/50 | opacity pulse 7s, delay 1s |
| Cyan 2 | (60%, 46%) stały | cyan-500/50 | opacity pulse 7s, delay 1s |

---

## Static traces (tło ścieżek)

Te same paths co animated, ale:
- `stroke-zinc-800` (ciemnoszary, subtelne tło)
- `strokeWidth="1"` + `vectorEffect="non-scaling-stroke"` — zawsze 1px

Animated traces nie mogą używać `vectorEffect` — łamie `strokeDasharray`.

---

## Warstwy tła

| Warstwa | Opis | Opacity |
|---------|------|---------|
| Noise | `bg-[url('/noise.svg')]` + mix-blend-overlay | 3% |
| Vignette | `radial-gradient(circle, transparent 0%, #050505 90%)` | 100% |
| Grid | Linear gradient 4rem x 4rem | 10% |

---

## Przyszłe rozszerzenia (niezaimplementowane)

Poniższe elementy z oryginalnego mockupu nie zostały jeszcze zaimplementowane:

- [ ] Scroll-linked current flow (powiązanie animacji ze scrollem)
- [ ] Particle system (burst particles)
- [ ] Section-based path highlighting (trace reaguje na aktywną sekcję)
- [ ] Mobile optimization (redukcja złożoności SVG na słabszych urządzeniach)
- [ ] `prefers-reduced-motion` support

---

> 📅 **Ostatnia aktualizacja:** 2026-02-07

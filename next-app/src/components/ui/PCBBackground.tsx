'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

/**
 * PCBBackground - Tech-Noir style PCB background
 *
 * Circuit trace layout (emerald):
 *   (50%, 0) → vertical ↓ → (50%, 40%) → diagonal ↙ → (edgeX, 75%) → vertical ↓ → (edgeX, 100%)
 *   edgeX = dynamicznie obliczana lewa krawędź Tailwind `container` minus offset (12px).
 *
 * viewBox="0 0 100 100" + preserveAspectRatio="none" = coordinates are viewport percentages.
 * Static traces use vectorEffect="non-scaling-stroke" for consistent 1px lines.
 * Animated traces use strokeDashoffset for flowing pulse effect (no vectorEffect — breaks dasharray).
 * Pads rendered as HTML divs to avoid ellipse distortion from non-uniform scaling.
 */

/** Tailwind default container max-widths (px) mapped to breakpoints */
const CONTAINER_BREAKPOINTS: [number, number][] = [
  [1536, 1536], // 2xl
  [1280, 1280], // xl
  [1024, 1024], // lg
  [768, 768],   // md
  [640, 640],   // sm
];

/**
 * Calculates the X position (as viewBox %) of the left edge of a Tailwind
 * `container mx-auto px-4 md:px-6` element, shifted left by `offsetPx`.
 */
function useContainerEdge(offsetPx: number = 12): number {
  const [edgeX, setEdgeX] = useState(10); // SSR fallback (~1920px)

  useEffect(() => {
    function calculate() {
      const vw = window.innerWidth;
      const maxW = CONTAINER_BREAKPOINTS.find(([bp]) => vw >= bp)?.[1] ?? vw;
      const padding = vw >= 768 ? 24 : 16; // md:px-6 : px-4
      const containerLeftPx = (vw - maxW) / 2 + padding;
      setEdgeX(Math.max(0, ((containerLeftPx - offsetPx) / vw) * 100));
    }

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, [offsetPx]);

  return edgeX;
}

export function PCBBackground() {
  const edgeX = useContainerEdge(12);
  const emeraldPath = `M 50 0 V 40 L ${edgeX} 75 V 100`;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Warstwa 1: Tekstura Szumu (Noise) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] mix-blend-overlay" />

      {/* Warstwa 2: Winieta i Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      {/* Warstwa 3: SVG Circuit Traces */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* --- STATIC TRACES (Tło ścieżek) - 1px --- */}
        <path
          d={emeraldPath}
          className="stroke-zinc-800"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 80 0 V 28 L 60 46 V 100"
          className="stroke-zinc-800"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Ślepa trasa - lewy górny narożnik */}
        <path
          d="M 8 0 V 18 L 25 33"
          className="stroke-zinc-800"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* --- ANIMATED FLOWS (Animowane przepływy prądu) --- */}
        {/* Emerald trace - puls przepływający całą ścieżką */}
        <motion.path
          d={emeraldPath}
          className="stroke-emerald-500"
          strokeWidth="0.2"
          fill="none"
          pathLength={1}
          strokeDasharray="0.35 0.65"
          opacity={0.85}
          style={{ filter: 'drop-shadow(0 0 6px #10b981)' }}
          animate={{ strokeDashoffset: [1, -1] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Cyan trace - puls przepływający całą ścieżką */}
        <motion.path
          d="M 80 0 V 28 L 60 46 V 100"
          className="stroke-cyan-400"
          strokeWidth="0.2"
          fill="none"
          pathLength={1}
          strokeDasharray="0.35 0.65"
          opacity={0.85}
          style={{ filter: 'drop-shadow(0 0 6px #06b6d4)' }}
          animate={{ strokeDashoffset: [1, -1] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'linear',
            delay: 1,
          }}
        />
      </svg>

      {/* --- PADS (Kropki lutownicze w punktach zmiany kierunku) --- */}
      {/* HTML divs zamiast SVG <circle> — brak deformacji przy preserveAspectRatio="none" */}

      {/* Emerald pad 1: punkt zmiany vertical → diagonal (50%, 40%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-zinc-900 border border-emerald-500/50"
        style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Emerald pad 2: punkt zmiany diagonal → vertical (edgeX%, 75%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-zinc-900 border border-emerald-500/50"
        style={{ left: `${edgeX}%`, top: '75%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cyan pad 1: punkt zmiany vertical → diagonal (80%, 28%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-zinc-900 border border-cyan-500/50"
        style={{ left: '80%', top: '28%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Cyan pad 2: punkt zmiany diagonal → vertical (60%, 46%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-zinc-900 border border-cyan-500/50"
        style={{ left: '60%', top: '46%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

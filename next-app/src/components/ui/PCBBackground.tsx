'use client';

import { motion } from 'framer-motion';
import { useContainerEdge } from './useContainerLayout';

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

export function PCBBackground() {
  const edgeX = useContainerEdge(12);
  const emeraldPath = `M 50 0 V 40 L ${edgeX} 75 V 100`;
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Warstwa 1: Tekstura Szumu (Noise) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] mix-blend-overlay" />

      {/* Warstwa 2: Winieta i Grid */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(circle at center, transparent 0%, var(--color-vignette) 90%)` }} />
      <div className="absolute inset-0 bg-[size:4rem_4rem] opacity-10" style={{ backgroundImage: `linear-gradient(var(--color-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-grid-line) 1px, transparent 1px)` }} />

      {/* Warstwa 3: SVG Circuit Traces */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* --- STATIC TRACES (Tło ścieżek) - 1px --- */}
        <path
          d={emeraldPath}
          className="stroke-trace"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 80 0 V 28 L 60 46 V 100"
          className="stroke-trace"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        {/* Ślepa trasa - lewy górny narożnik */}
        <path
          d="M 8 0 V 18 L 25 33"
          className="stroke-trace"
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
        className="absolute w-1.5 h-1.5 rounded-full bg-surface border border-emerald-500/50"
        style={{ left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Emerald pad 2: punkt zmiany diagonal → vertical (edgeX%, 75%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-surface border border-emerald-500/50"
        style={{ left: `${edgeX}%`, top: '75%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cyan pad 1: punkt zmiany vertical → diagonal (80%, 28%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-surface border border-cyan-500/50"
        style={{ left: '80%', top: '28%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Cyan pad 2: punkt zmiany diagonal → vertical (60%, 46%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-surface border border-cyan-500/50"
        style={{ left: '60%', top: '46%', transform: 'translate(-50%, -50%)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}

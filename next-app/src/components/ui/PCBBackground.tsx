'use client';

import { motion } from 'framer-motion';

/**
 * PCBBackground - Tech-Noir style PCB background
 *
 * Circuit trace layout (emerald):
 *   (50%, 0) → vertical ↓ → (50%, 40%) → diagonal ↙ → (15%, 75%) → vertical ↓ → (15%, 100%)
 *
 * viewBox="0 0 100 100" + preserveAspectRatio="none" = coordinates are viewport percentages.
 * vectorEffect="non-scaling-stroke" = stroke width in screen pixels, not viewBox units.
 * Pads rendered as HTML divs to avoid ellipse distortion from non-uniform scaling.
 */
export function PCBBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Warstwa 1: Tekstura Szumu (Noise) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] mix-blend-overlay" />

      {/* Warstwa 2: Winieta i Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      {/* Warstwa 3: SVG Circuit Traces */}
      <svg
        className="absolute inset-0 w-full h-full opacity-50"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* --- STATIC TRACES (Tło ścieżek) - 1px --- */}
        <path
          d="M 50 0 V 40 L 15 75 V 100"
          className="stroke-zinc-800"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 80 0 V 28 L 60 46 V 90"
          className="stroke-zinc-800"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M 20 100 V 74 L 40 56 V 37"
          className="stroke-zinc-800"
          strokeWidth="1"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />

        {/* --- ANIMATED FLOWS (Animowane przepływy prądu) --- */}
        {/* Emerald trace - środek → lewo */}
        <motion.path
          d="M 50 0 V 40 L 15 75 V 100"
          className="stroke-emerald-500"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'drop-shadow(0 0 3px #10b981)' }}
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.6, 0.6],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Cyan trace - prawa strona */}
        <motion.path
          d="M 80 0 V 28 L 60 46 V 90"
          className="stroke-cyan-400"
          strokeWidth="2"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ filter: 'drop-shadow(0 0 3px #06b6d4)' }}
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0.6, 0.6],
          }}
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

      {/* Emerald pad 2: punkt zmiany diagonal → vertical (15%, 75%) */}
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-zinc-900 border border-emerald-500/50"
        style={{ left: '15%', top: '75%', transform: 'translate(-50%, -50%)' }}
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

'use client';

import { motion } from 'framer-motion';

/**
 * PCBBackground - Tech-Noir style PCB background
 *
 * Features:
 * - Noise texture overlay
 * - Vignette and grid pattern
 * - Thin animated circuit traces (CSS keyframes)
 * - Animated pads at junction points
 */
export function PCBBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Warstwa 1: Tekstura Szumu (Noise) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')] mix-blend-overlay" />

      {/* Warstwa 2: Winieta i Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_90%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />

      {/* Warstwa 3: SVG Circuit - zachowuje proporcje jak w oryginale */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-50" 
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="trace-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#10b981" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* --- STATIC TRACES (Tło ścieżek) - cienkie linie 1px --- */}
        <path 
          d="M100 0 V150 L200 250 V800" 
          className="stroke-zinc-800" 
          strokeWidth="1" 
          fill="none" 
        />
        <path 
          d="M80% 0 V300 L60% 500 V900" 
          className="stroke-zinc-800" 
          strokeWidth="1" 
          fill="none" 
        />
        <path 
          d="M20% 100% V800 L40% 600 V400" 
          className="stroke-zinc-800" 
          strokeWidth="1" 
          fill="none" 
        />

        {/* --- ANIMATED FLOWS (Animowane przepływy prądu) --- */}
        {/* Emerald trace - lewa strona */}
        <motion.path
          d="M100 0 V150 L200 250 V800"
          className="stroke-emerald-500"
          strokeWidth="2"
          fill="none"
          style={{ filter: "drop-shadow(0 0 3px #10b981)" }}
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{ 
            pathLength: [0, 1],
            opacity: [0.6, 0.6]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Cyan trace - prawa strona */}
        <motion.path
          d="M80% 0 V300 L60% 500 V900"
          className="stroke-cyan-400"
          strokeWidth="2"
          fill="none"
          style={{ filter: "drop-shadow(0 0 3px #06b6d4)" }}
          initial={{ pathLength: 0, opacity: 0.6 }}
          animate={{ 
            pathLength: [0, 1],
            opacity: [0.6, 0.6]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />

        {/* --- PADS (Kropki lutownicze w węzłach) --- */}
        <circle cx="100" cy="0" r="3" className="fill-zinc-900 stroke-zinc-700" strokeWidth="1" />
        <circle cx="200" cy="250" r="3" className="fill-zinc-900 stroke-emerald-500/50" strokeWidth="1">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="60%" cy="500" r="3" className="fill-zinc-900 stroke-cyan-500/50" strokeWidth="1">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="7s" repeatCount="indefinite" begin="1s" />
        </circle>
      </svg>
    </div>
  );
}

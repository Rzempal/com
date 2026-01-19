'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

// Pill data with positions on PCB grid (1000x1000 viewBox)
const PILLS = [
  { id: 'robotyka', nodeX: 500, nodeY: 500, label: 'Robotyka_' },
  { id: 'aplikacje', nodeX: 350, nodeY: 750, label: 'APPS_' },
  { id: 'www', nodeX: 450, nodeY: 750, label: 'WWW_' },
  { id: 'studio', nodeX: 850, nodeY: 350, label: 'STUDIO_' },
] as const;

type PillId = (typeof PILLS)[number]['id'];

interface PCBShowcaseProps {
  onPillClick?: (pillId: PillId) => void;
}

export function PCBShowcase({ onPillClick }: PCBShowcaseProps) {
  const t = useTranslations('pcb');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activePill, setActivePill] = useState<PillId | null>(null);

  const handlePillClick = (pillId: PillId) => {
    setActivePill(pillId);
    onPillClick?.(pillId);
  };

  return (
    <section
      id="pcb"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 bg-zinc-950 overflow-hidden"
    >
      {/* PCB Container */}
      <div className="relative w-full max-w-4xl aspect-square mx-auto">
        {/* SVG Circuit Board */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="w-full h-full pcb-board"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            {/* Gradient for traces */}
            <linearGradient id="traceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
            </linearGradient>

            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Strong glow for active elements */}
            <filter id="glowStrong">
              <feGaussianBlur stdDeviation="6" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Ground plane pattern */}
            <pattern id="groundPlane" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 20 20 M 20 0 L 0 20" stroke="#06b6d4" strokeWidth="0.5" opacity="0.1" />
            </pattern>
          </defs>

          {/* PCB Substrate */}
          <rect x="0" y="0" width="1000" height="1000" fill="#0a0a0f" opacity="0.95" />

          {/* Ground zones */}
          <g className="zone-fills" opacity="0.2">
            <rect x="30" y="30" width="400" height="300" fill="url(#groundPlane)" rx="5" />
            <rect x="570" y="30" width="400" height="300" fill="url(#groundPlane)" rx="5" />
            <rect x="30" y="670" width="940" height="300" fill="url(#groundPlane)" rx="5" />
          </g>

          {/* Circuit Traces */}
          <g className="circuit-traces" stroke="url(#traceGradient)" fill="none" strokeLinecap="round">
            {/* Power traces (thick) */}
            <path className="pcb-trace" d="M 150 500 L 500 500 L 550 550 L 900 550" strokeWidth="4.5" data-index="0" />
            <path className="pcb-trace" d="M 500 100 L 500 450 L 550 500 L 550 850" strokeWidth="4.5" data-index="1" />

            {/* Signal traces (medium) */}
            <path className="pcb-trace" d="M 100 300 L 400 300 L 450 350 L 850 350" strokeWidth="3" data-index="2" />
            <path className="pcb-trace" d="M 750 50 L 750 350 L 800 400 L 800 800" strokeWidth="3" data-index="3" />

            {/* Thin traces */}
            <path className="pcb-trace" d="M 50 150 L 300 150 L 350 200 L 650 200" strokeWidth="2" data-index="4" />
            <path className="pcb-trace" d="M 50 700 L 350 700 L 400 750 L 750 750" strokeWidth="2" data-index="5" />
            <path className="pcb-trace" d="M 200 50 L 200 400 L 250 450 L 250 850" strokeWidth="2.5" data-index="6" />

            {/* Decorative curves */}
            <path className="pcb-trace" d="M 100 100 Q 300 100 400 250 T 600 400" strokeWidth="2" data-index="7" />
            <path className="pcb-trace" d="M 800 200 Q 700 300 650 450 T 500 650" strokeWidth="2" data-index="8" />
          </g>

          {/* Mounting holes */}
          <g className="mounting-holes">
            {[[60, 60], [940, 60], [60, 940], [940, 940]].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="15" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.4" />
                <circle cx={cx} cy={cy} r="8" fill="#0a0a0f" opacity="0.9" />
              </g>
            ))}
          </g>

          {/* Via holes */}
          <g className="via-holes" fill="#0a0a0f" opacity="0.7">
            <circle cx="150" cy="150" r="3" />
            <circle cx="300" cy="150" r="2.5" />
            <circle cx="650" cy="200" r="3" />
            <circle cx="450" cy="350" r="2.5" />
            <circle cx="500" cy="500" r="4" />
            <circle cx="250" cy="450" r="2.5" />
            <circle cx="400" cy="750" r="2.5" />
          </g>

          {/* SMD Components */}
          <g className="smd-components" opacity="0.6">
            {[
              { x: 270, y: 147, w: 20, h: 6, label: 'R1' },
              { x: 370, y: 297, w: 20, h: 6, label: 'R2' },
              { x: 720, y: 347, w: 20, h: 6, label: 'R3' },
              { x: 220, y: 447, w: 20, h: 6, label: 'R4' },
            ].map((r, i) => (
              <g key={i}>
                <rect x={r.x} y={r.y} width={r.w} height={r.h} fill="#1a2332" stroke="#06b6d4" strokeWidth="0.5" rx="1" />
                <text x={r.x + r.w / 2} y={r.y - 3} fontSize="6" fill="#06b6d4" opacity="0.5" textAnchor="middle" fontFamily="monospace">{r.label}</text>
              </g>
            ))}
            {[
              { x: 120, y: 148, w: 15, h: 4, label: 'C1' },
              { x: 420, y: 347, w: 15, h: 4, label: 'C2' },
              { x: 580, y: 520, w: 15, h: 4, label: 'C3' },
            ].map((c, i) => (
              <g key={i}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} fill="#2a3545" stroke="#06b6d4" strokeWidth="0.5" rx="0.5" />
                <text x={c.x + c.w / 2} y={c.y - 2} fontSize="5" fill="#06b6d4" opacity="0.5" textAnchor="middle" fontFamily="monospace">{c.label}</text>
              </g>
            ))}
          </g>

          {/* Connection pads */}
          <g className="circuit-pads" fill="#06b6d4" stroke="#06b6d4" strokeWidth="1.5" opacity="0.5">
            <circle className="pcb-pad" cx="150" cy="150" r="8" />
            <circle className="pcb-pad" cx="300" cy="150" r="6" />
            <circle className="pcb-pad" cx="650" cy="200" r="8" />
            <circle className="pcb-pad" cx="450" cy="350" r="6" />
            <circle className="pcb-pad" cx="500" cy="500" r="10" />
            <circle className="pcb-pad" cx="750" cy="350" r="8" />
            <circle className="pcb-pad" cx="350" cy="750" r="8" />
            <circle className="pcb-pad" cx="450" cy="750" r="8" />
            <circle className="pcb-pad" cx="850" cy="350" r="8" />
          </g>

          {/* Pill anchor points (glowing) */}
          <g className="pill-anchors">
            {PILLS.map((pill) => (
              <g key={pill.id}>
                <circle
                  cx={pill.nodeX}
                  cy={pill.nodeY}
                  r="14"
                  fill="#06b6d4"
                  filter="url(#glow)"
                  opacity={activePill === pill.id ? 1 : 0.7}
                  className="pcb-pill-anchor"
                />
                <circle
                  cx={pill.nodeX}
                  cy={pill.nodeY}
                  r="20"
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="1.5"
                  opacity={activePill === pill.id ? 0.8 : 0.3}
                />
              </g>
            ))}
          </g>

          {/* Silk screen labels */}
          <g className="silk-screen" fill="#ffffff" opacity="0.6" fontFamily="monospace">
            <text x="510" y="520" fontSize="8" fontWeight="600">TP1</text>
            <text x="860" y="365" fontSize="8" fontWeight="600">TP2</text>
            <text x="460" y="765" fontSize="8" fontWeight="600">TP3</text>
            <text x="850" y="970" fontSize="9" fontWeight="700" letterSpacing="1">MR PCB</text>
            <text x="900" y="985" fontSize="7" opacity="0.7">v2.0</text>
            <text x="50" y="985" fontSize="6" opacity="0.5">© 2025</text>
          </g>
        </motion.svg>

        {/* Interactive Pills Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {PILLS.map((pill, index) => (
            <motion.button
              key={pill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring', stiffness: 200 }}
              onClick={() => handlePillClick(pill.id)}
              className={`absolute pointer-events-auto px-4 py-2 rounded-full font-mono text-sm
                bg-zinc-900/80 backdrop-blur-sm border transition-all duration-300
                hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]
                ${activePill === pill.id
                  ? 'border-cyan-400 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
                  : 'border-cyan-500/30 text-cyan-500 hover:border-cyan-400'
                }`}
              style={{
                left: `${pill.nodeX / 10}%`,
                top: `${pill.nodeY / 10}%`,
                transform: 'translate(-50%, -50%)',
              }}
              aria-label={pill.label}
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                {pill.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute bottom-12 left-0 right-0 text-center"
      >
        <p className="text-zinc-500 text-sm font-mono">
          {t('hint')}
        </p>
      </motion.div>
    </section>
  );
}

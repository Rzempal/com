'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * PCBBackground - Fixed background layer with circuit board design
 *
 * This component renders a large SVG circuit board that stays fixed
 * while content scrolls over it. It creates a tech aesthetic backdrop
 * for the entire page.
 *
 * Features:
 * - Fixed position (doesn't scroll with content)
 * - Subtle opacity (15-20%) to not overpower content
 * - Responsive on mobile (18% opacity for better visibility)
 * - Extended height to cover full page scroll
 */
export function PCBBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="fixed inset-0 -z-10 pointer-events-none opacity-[0.15] md:opacity-[0.18]"
      aria-hidden="true"
    >
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="w-full h-full"
        viewBox="0 0 1920 4000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Gradient for traces */}
          <linearGradient id="bgTraceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>

          {/* Emerald gradient */}
          <linearGradient id="bgEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="bgGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Ground plane pattern */}
          <pattern id="bgGroundPlane" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 40 40 M 40 0 L 0 40" stroke="#06b6d4" strokeWidth="0.8" opacity="0.15" />
          </pattern>

          {/* Solder mask texture */}
          <filter id="bgSolderMask">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" result="noise" />
            <feColorMatrix in="noise" type="saturate" values="0.05" result="desaturatedNoise" />
            <feComponentTransfer in="desaturatedNoise" result="opacity">
              <feFuncA type="table" tableValues="0 0.03" />
            </feComponentTransfer>
            <feBlend in="SourceGraphic" in2="opacity" mode="overlay" />
          </filter>
        </defs>

        {/* PCB Substrate - deep black cyberpunk background */}
        <rect x="0" y="0" width="1920" height="4000" fill="#0a0a0f" opacity="0.95" />

        {/* Ground Zones - Background layer with hatched pattern */}
        <g className="zone-fills" opacity="0.3" filter="url(#bgSolderMask)">
          {/* Top section zones */}
          <rect x="100" y="100" width="700" height="600" fill="url(#bgGroundPlane)" stroke="#06b6d4" strokeWidth="1" opacity="0.2" rx="10" />
          <rect x="1120" y="100" width="700" height="600" fill="url(#bgGroundPlane)" stroke="#06b6d4" strokeWidth="1" opacity="0.2" rx="10" />

          {/* Mid-top zones */}
          <rect x="100" y="800" width="800" height="700" fill="url(#bgGroundPlane)" stroke="#10b981" strokeWidth="1" opacity="0.15" rx="10" />
          <rect x="1020" y="800" width="800" height="700" fill="url(#bgGroundPlane)" stroke="#06b6d4" strokeWidth="1" opacity="0.2" rx="10" />

          {/* Middle zones */}
          <rect x="200" y="1600" width="600" height="700" fill="url(#bgGroundPlane)" stroke="#06b6d4" strokeWidth="1" opacity="0.2" rx="10" />
          <rect x="1120" y="1600" width="600" height="700" fill="url(#bgGroundPlane)" stroke="#10b981" strokeWidth="1" opacity="0.15" rx="10" />

          {/* Lower zones */}
          <rect x="100" y="2400" width="700" height="700" fill="url(#bgGroundPlane)" stroke="#10b981" strokeWidth="1" opacity="0.15" rx="10" />
          <rect x="1120" y="2400" width="700" height="700" fill="url(#bgGroundPlane)" stroke="#06b6d4" strokeWidth="1" opacity="0.2" rx="10" />

          {/* Bottom zones */}
          <rect x="100" y="3200" width="1720" height="700" fill="url(#bgGroundPlane)" stroke="#06b6d4" strokeWidth="1" opacity="0.2" rx="10" />
        </g>

        {/* Circuit Traces - Complex network of paths */}
        <g className="circuit-traces" fill="none" strokeLinecap="round" filter="url(#bgSolderMask)">
          {/* Vertical power traces - main spine */}
          <path
            className="power-trace"
            d="M 960 200 L 960 800 L 920 840 L 920 1600 L 960 1640 L 960 2400 L 1000 2440 L 1000 3200 L 960 3240 L 960 3800"
            stroke="url(#bgTraceGradient)"
            strokeWidth="6"
            opacity="0.5"
          />

          {/* Left vertical trace */}
          <path
            className="power-trace"
            d="M 400 200 L 400 1200 L 450 1250 L 450 2200 L 400 2250 L 400 3200 L 450 3250 L 450 3800"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="5"
            opacity="0.5"
          />

          {/* Right vertical trace */}
          <path
            className="signal-trace"
            d="M 1520 400 L 1520 1400 L 1480 1440 L 1480 2600 L 1520 2640 L 1520 3800"
            stroke="url(#bgTraceGradient)"
            strokeWidth="4"
            opacity="0.4"
          />

          {/* Horizontal interconnects - Hero section area */}
          <path
            className="signal-trace"
            d="M 200 400 L 700 400 L 750 450 L 1400 450"
            stroke="url(#bgTraceGradient)"
            strokeWidth="4"
            opacity="0.4"
          />
          <path
            className="signal-trace"
            d="M 300 600 L 600 600 L 650 650 L 1200 650"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="3.5"
            opacity="0.4"
          />

          {/* Two Pillars section area (y: 800-1600) */}
          <path
            className="signal-trace"
            d="M 200 1000 L 800 1000 L 850 1050 L 1600 1050"
            stroke="url(#bgTraceGradient)"
            strokeWidth="4"
            opacity="0.4"
          />
          <path
            className="signal-trace"
            d="M 150 1200 L 500 1200 L 550 1250 L 960 1250"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="3"
            opacity="0.4"
          />
          <path
            className="signal-trace"
            d="M 960 1400 L 1400 1400 L 1450 1450 L 1700 1450"
            stroke="url(#bgTraceGradient)"
            strokeWidth="3.5"
            opacity="0.4"
          />

          {/* Section 03 area (Robotyka - y: 1600-2400) */}
          <path
            className="signal-trace"
            d="M 300 1800 L 700 1800 L 750 1850 L 1200 1850"
            stroke="url(#bgTraceGradient)"
            strokeWidth="4"
            opacity="0.4"
          />
          <path
            className="signal-trace"
            d="M 200 2000 L 600 2000 L 650 2050 L 1400 2050"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="3.5"
            opacity="0.4"
          />
          <path
            className="thin-trace"
            d="M 100 2200 L 450 2200 L 500 2250 L 960 2250"
            stroke="url(#bgTraceGradient)"
            strokeWidth="2.5"
            opacity="0.4"
          />

          {/* Section 04 area (APPS - y: 2400-3200) */}
          <path
            className="signal-trace"
            d="M 250 2600 L 750 2600 L 800 2650 L 1500 2650"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="4"
            opacity="0.4"
          />
          <path
            className="signal-trace"
            d="M 150 2800 L 550 2800 L 600 2850 L 1300 2850"
            stroke="url(#bgTraceGradient)"
            strokeWidth="3.5"
            opacity="0.4"
          />
          <path
            className="thin-trace"
            d="M 200 3000 L 500 3000 L 550 3050 L 1000 3050"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="2.5"
            opacity="0.4"
          />

          {/* Section 05/06 area (WWW/STUDIO - y: 3200-4000) */}
          <path
            className="signal-trace"
            d="M 300 3400 L 800 3400 L 850 3450 L 1600 3450"
            stroke="url(#bgTraceGradient)"
            strokeWidth="4"
            opacity="0.4"
          />
          <path
            className="signal-trace"
            d="M 200 3600 L 700 3600 L 750 3650 L 1400 3650"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="3.5"
            opacity="0.4"
          />

          {/* Decorative curved traces */}
          <path
            className="thin-trace"
            d="M 200 300 Q 500 300 700 600 T 1100 1000"
            stroke="url(#bgTraceGradient)"
            strokeWidth="2.5"
            opacity="0.3"
          />
          <path
            className="thin-trace"
            d="M 1600 500 Q 1400 700 1200 1100 T 800 1800"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="2.5"
            opacity="0.3"
          />
          <path
            className="thin-trace"
            d="M 400 1500 Q 700 1700 1000 2000 T 1400 2600"
            stroke="url(#bgTraceGradient)"
            strokeWidth="2.5"
            opacity="0.3"
          />
          <path
            className="thin-trace"
            d="M 1500 2200 Q 1200 2400 900 2800 T 500 3400"
            stroke="url(#bgEmeraldGradient)"
            strokeWidth="2.5"
            opacity="0.3"
          />
        </g>

        {/* Mounting Holes - 4 corners for realistic PCB look */}
        <g className="mounting-holes">
          {[
            [120, 120], [1800, 120],
            [120, 3880], [1800, 3880]
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="30" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.6" />
              <circle cx={cx} cy={cy} r="18" fill="#0a0a0f" opacity="0.9" />
            </g>
          ))}
        </g>

        {/* Via Holes - distributed throughout the board */}
        <g className="via-holes" fill="#0a0a0f" opacity="0.7">
          {/* Hero area vias */}
          <circle cx="300" cy="400" r="4" />
          <circle cx="700" cy="450" r="3.5" />
          <circle cx="1400" cy="450" r="4" />
          <circle cx="600" cy="650" r="3" />
          <circle cx="1200" cy="650" r="4" />

          {/* Two Pillars area vias */}
          <circle cx="800" cy="1000" r="4" />
          <circle cx="1600" cy="1050" r="4" />
          <circle cx="500" cy="1200" r="3.5" />
          <circle cx="960" cy="1250" r="5" />
          <circle cx="1400" cy="1400" r="3.5" />

          {/* Robotyka area vias */}
          <circle cx="700" cy="1800" r="4" />
          <circle cx="1200" cy="1850" r="4" />
          <circle cx="600" cy="2000" r="3.5" />
          <circle cx="450" cy="2200" r="3" />

          {/* APPS area vias */}
          <circle cx="750" cy="2600" r="4" />
          <circle cx="1500" cy="2650" r="4" />
          <circle cx="550" cy="2800" r="3.5" />
          <circle cx="500" cy="3000" r="3" />

          {/* WWW/STUDIO area vias */}
          <circle cx="800" cy="3400" r="4" />
          <circle cx="1600" cy="3450" r="4" />
          <circle cx="700" cy="3600" r="3.5" />
        </g>

        {/* SMD Components - Resistors and Capacitors */}
        <g className="smd-components" opacity="0.6">
          {/* Resistors - distributed across the board */}
          {[
            { x: 540, y: 397, label: 'R1' },
            { x: 740, y: 597, label: 'R2' },
            { x: 640, y: 997, label: 'R3' },
            { x: 1240, y: 1047, label: 'R4' },
            { x: 540, y: 1247, label: 'R5' },
            { x: 540, y: 1797, label: 'R6' },
            { x: 1040, y: 1847, label: 'R7' },
            { x: 540, y: 2597, label: 'R8' },
            { x: 1240, y: 2647, label: 'R9' },
            { x: 640, y: 3397, label: 'R10' },
            { x: 1240, y: 3447, label: 'R11' },
          ].map((r, i) => (
            <g key={`r-${i}`}>
              <rect x={r.x} y={r.y} width="40" height="12" fill="#1a2332" stroke="#06b6d4" strokeWidth="1" opacity="0.8" rx="2" />
              <text x={r.x + 20} y={r.y - 6} fontSize="12" fill="#06b6d4" opacity="0.5" textAnchor="middle" fontFamily="monospace">{r.label}</text>
            </g>
          ))}

          {/* Capacitors */}
          {[
            { x: 240, y: 398, label: 'C1' },
            { x: 840, y: 648, label: 'C2' },
            { x: 340, y: 998, label: 'C3' },
            { x: 1140, y: 1248, label: 'C4' },
            { x: 340, y: 1798, label: 'C5' },
            { x: 840, y: 1998, label: 'C6' },
            { x: 390, y: 2598, label: 'C7' },
            { x: 740, y: 2798, label: 'C8' },
            { x: 440, y: 3398, label: 'C9' },
          ].map((c, i) => (
            <g key={`c-${i}`}>
              <rect x={c.x} y={c.y} width="30" height="8" fill="#2a3545" stroke="#06b6d4" strokeWidth="1" opacity="0.8" rx="1" />
              <text x={c.x + 15} y={c.y - 4} fontSize="10" fill="#06b6d4" opacity="0.5" textAnchor="middle" fontFamily="monospace">{c.label}</text>
            </g>
          ))}
        </g>

        {/* Connection Pads - nodes for current flow animation */}
        <g className="circuit-pads" fill="#06b6d4" stroke="#06b6d4" strokeWidth="2" opacity="0.5">
          {/* Hero area pads */}
          <circle className="pcb-pad" cx="300" cy="400" r="12" data-pad="hero-1" />
          <circle className="pcb-pad" cx="700" cy="450" r="10" data-pad="hero-2" />
          <circle className="pcb-pad" cx="1400" cy="450" r="12" data-pad="hero-3" />
          <circle className="pcb-pad" cx="600" cy="650" r="10" data-pad="hero-4" />
          <circle className="pcb-pad" cx="960" cy="800" r="14" data-pad="hero-main" />

          {/* Two Pillars area pads */}
          <circle className="pcb-pad" cx="800" cy="1000" r="12" data-pad="pillars-1" />
          <circle className="pcb-pad" cx="1600" cy="1050" r="12" data-pad="pillars-2" />
          <circle className="pcb-pad" cx="960" cy="1250" r="16" data-pad="pillars-main" />
          <circle className="pcb-pad" cx="1400" cy="1400" r="10" data-pad="pillars-3" />

          {/* Robotyka area pads */}
          <circle className="pcb-pad" cx="700" cy="1800" r="12" data-pad="robotyka-1" />
          <circle className="pcb-pad" cx="1200" cy="1850" r="12" data-pad="robotyka-2" />
          <circle className="pcb-pad" cx="960" cy="2000" r="14" data-pad="robotyka-main" />

          {/* APPS area pads */}
          <circle className="pcb-pad" cx="750" cy="2600" r="12" data-pad="apps-1" />
          <circle className="pcb-pad" cx="1500" cy="2650" r="12" data-pad="apps-2" />
          <circle className="pcb-pad" cx="960" cy="2800" r="14" data-pad="apps-main" />

          {/* WWW area pads */}
          <circle className="pcb-pad" cx="800" cy="3400" r="12" data-pad="www-1" />
          <circle className="pcb-pad" cx="1600" cy="3450" r="12" data-pad="www-2" />
          <circle className="pcb-pad" cx="960" cy="3600" r="14" data-pad="www-main" />
        </g>

        {/* Silk Screen Layer - Labels and markings */}
        <g className="silk-screen" fill="#ffffff" opacity="0.6" fontFamily="monospace">
          {/* Test points labels */}
          <text x="970" cy="820" fontSize="16" fontWeight="600">TP1</text>
          <text x="970" cy="1270" fontSize="16" fontWeight="600">TP2</text>
          <text x="970" cy="2020" fontSize="16" fontWeight="600">TP3</text>
          <text x="970" cy="2820" fontSize="16" fontWeight="600">TP4</text>
          <text x="970" cy="3620" fontSize="16" fontWeight="600">TP5</text>

          {/* Board info */}
          <text x="1700" cy="3940" fontSize="18" fontWeight="700" letterSpacing="2">MR PCB</text>
          <text x="1800" cy="3970" fontSize="14" opacity="0.7">v2.0</text>
          <text x="100" cy="3970" fontSize="12" opacity="0.5">© 2025</text>

          {/* Mounting hole labels */}
          <text x="150" cy="130" fontSize="12" opacity="0.5">H1</text>
          <text x="1770" cy="130" fontSize="12" opacity="0.5">H2</text>
          <text x="150" cy="3890" fontSize="12" opacity="0.5">H3</text>
          <text x="1770" cy="3890" fontSize="12" opacity="0.5">H4</text>

          {/* Ground zone labels */}
          <text x="120" cy="140" fontSize="14" opacity="0.5">GND</text>
          <text x="1140" cy="140" fontSize="14" opacity="0.5">GND</text>
          <text x="120" cy="840" fontSize="14" opacity="0.5">GND</text>
          <text x="1040" cy="840" fontSize="14" opacity="0.5">GND</text>
          <text x="220" cy="1640" fontSize="14" opacity="0.5">GND</text>
          <text x="1140" cy="1640" fontSize="14" opacity="0.5">GND</text>
          <text x="120" cy="2440" fontSize="14" opacity="0.5">GND</text>
          <text x="1140" cy="2440" fontSize="14" opacity="0.5">GND</text>
          <text x="120" cy="3240" fontSize="14" opacity="0.5">GND</text>
        </g>
      </motion.svg>
    </div>
  );
}

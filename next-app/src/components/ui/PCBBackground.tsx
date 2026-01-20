'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * PCBBackground - Static green PCB grid starting below Hero
 *
 * Features:
 * - Starts at Two Pillars section (y: 1000+)
 * - Green solder mask colors (authentic PCB look)
 * - Maze-like grid with dead ends
 * - One main path from top to bottom
 * - No glow effects (static, subtle)
 */
export function PCBBackground() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ top: '100vh', zIndex: -1 }}
      aria-hidden="true"
    >
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="w-full h-full"
        viewBox="0 0 1920 3000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Green PCB solder mask gradient */}
          <linearGradient id="pcbGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="50%" stopColor="#059669" stopOpacity="1" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
          </linearGradient>

          {/* Darker green for traces */}
          <linearGradient id="traceGreen" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#065f46" stopOpacity="1" />
            <stop offset="100%" stopColor="#047857" stopOpacity="1" />
          </linearGradient>

          {/* Ground plane pattern */}
          <pattern id="groundPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 40 40 M 40 0 L 0 40" stroke="#047857" strokeWidth="0.5" opacity="0.3" />
          </pattern>
        </defs>

        {/* PCB Substrate - dark green base */}
        <rect x="0" y="0" width="1920" height="3000" fill="#064e3b" opacity="0.9" />

        {/* Ground zones with hatched pattern */}
        <g className="ground-zones" opacity="0.4">
          {/* Two Pillars area zones */}
          <rect x="100" y="50" width="700" height="500" fill="url(#groundPattern)" stroke="#10b981" strokeWidth="1" opacity="0.3" rx="8" />
          <rect x="1120" y="50" width="700" height="500" fill="url(#groundPattern)" stroke="#10b981" strokeWidth="1" opacity="0.3" rx="8" />

          {/* Robotyka area zones */}
          <rect x="200" y="650" width="600" height="500" fill="url(#groundPattern)" stroke="#059669" strokeWidth="1" opacity="0.3" rx="8" />
          <rect x="1020" y="650" width="700" height="500" fill="url(#groundPattern)" stroke="#059669" strokeWidth="1" opacity="0.3" rx="8" />

          {/* APPS area zones */}
          <rect x="100" y="1250" width="800" height="500" fill="url(#groundPattern)" stroke="#10b981" strokeWidth="1" opacity="0.3" rx="8" />
          <rect x="1020" y="1250" width="800" height="500" fill="url(#groundPattern)" stroke="#10b981" strokeWidth="1" opacity="0.3" rx="8" />

          {/* WWW area zones */}
          <rect x="150" y="1850" width="650" height="500" fill="url(#groundPattern)" stroke="#047857" strokeWidth="1" opacity="0.3" rx="8" />
          <rect x="1120" y="1850" width="650" height="500" fill="url(#groundPattern)" stroke="#047857" strokeWidth="1" opacity="0.3" rx="8" />

          {/* STUDIO area zones */}
          <rect x="100" y="2450" width="1720" height="500" fill="url(#groundPattern)" stroke="#10b981" strokeWidth="1" opacity="0.3" rx="8" />
        </g>

        {/* Main path - always leads to the end (central spine) */}
        <g className="main-path" stroke="url(#traceGreen)" fill="none" strokeWidth="8" opacity="0.6">
          <path id="mainPath" d="
            M 960 0
            L 960 400
            L 920 440
            L 920 800
            L 960 840
            L 960 1200
            L 1000 1240
            L 1000 1600
            L 960 1640
            L 960 2000
            L 920 2040
            L 920 2400
            L 960 2440
            L 960 3000
          " strokeLinecap="butt" />
        </g>

        {/* Circuit grid - maze-like with dead ends */}
        <g className="circuit-grid" stroke="url(#traceGreen)" fill="none" strokeWidth="4" opacity="0.5" strokeLinecap="butt">
          {/* Left side branches - some dead ends */}
          <path d="M 200 100 L 500 100 L 540 140 L 540 300" />
          <path d="M 540 300 L 700 300" /> {/* Dead end */}
          <path d="M 540 140 L 800 140 L 840 180 L 840 400" />
          <path d="M 840 400 L 920 400 L 920 440" /> {/* Connects to main */}

          <path d="M 150 500 L 450 500 L 490 540 L 490 700" />
          <path d="M 490 700 L 300 700" /> {/* Dead end */}
          <path d="M 490 540 L 700 540 L 740 580 L 740 800" />
          <path d="M 740 800 L 920 800" /> {/* Connects to main */}

          <path d="M 250 900 L 550 900 L 590 940 L 590 1100" />
          <path d="M 590 1100 L 400 1100" /> {/* Dead end */}
          <path d="M 590 940 L 800 940 L 840 980 L 840 1200" />
          <path d="M 840 1200 L 960 1200" /> {/* Connects to main */}

          <path d="M 200 1300 L 600 1300 L 640 1340 L 640 1500" />
          <path d="M 640 1500 L 450 1500" /> {/* Dead end */}
          <path d="M 640 1340 L 850 1340 L 890 1380 L 890 1600" />
          <path d="M 890 1600 L 1000 1600" /> {/* Connects to main */}

          <path d="M 300 1700 L 650 1700 L 690 1740 L 690 1900" />
          <path d="M 690 1900 L 500 1900" /> {/* Dead end */}
          <path d="M 690 1740 L 880 1740 L 920 1780 L 920 2000" />
          <path d="M 920 2000 L 960 2000" /> {/* Connects to main */}

          <path d="M 250 2100 L 600 2100 L 640 2140 L 640 2300" />
          <path d="M 640 2300 L 400 2300" /> {/* Dead end */}
          <path d="M 640 2140 L 850 2140 L 890 2180 L 890 2400" />
          <path d="M 890 2400 L 920 2400" /> {/* Connects to main */}

          {/* Right side branches - some dead ends */}
          <path d="M 1420 100 L 1120 100 L 1080 140 L 1080 300" />
          <path d="M 1080 300 L 1280 300" /> {/* Dead end */}
          <path d="M 1080 140 L 980 140 L 940 180 L 940 400" />
          <path d="M 940 400 L 920 400" /> {/* Connects to main */}

          <path d="M 1470 500 L 1170 500 L 1130 540 L 1130 700" />
          <path d="M 1130 700 L 1330 700" /> {/* Dead end */}
          <path d="M 1130 540 L 980 540 L 940 580 L 940 800" />
          <path d="M 940 800 L 920 800" /> {/* Connects to main */}

          <path d="M 1370 900 L 1070 900 L 1030 940 L 1030 1100" />
          <path d="M 1030 1100 L 1230 1100" /> {/* Dead end */}
          <path d="M 1030 940 L 1000 940 L 1000 1200" />
          <path d="M 1000 1200 L 960 1200" /> {/* Connects to main */}

          <path d="M 1420 1300 L 1020 1300 L 980 1340 L 980 1500" />
          <path d="M 980 1500 L 1180 1500" /> {/* Dead end */}
          <path d="M 980 1340 L 1000 1340 L 1000 1600" />
          <path d="M 1000 1600 L 960 1600" /> {/* Connects to main */}

          <path d="M 1320 1700 L 970 1700 L 930 1740 L 930 1900" />
          <path d="M 930 1900 L 1130 1900" /> {/* Dead end */}
          <path d="M 930 1740 L 940 1740 L 940 2000" />
          <path d="M 940 2000 L 960 2000" /> {/* Connects to main */}

          <path d="M 1370 2100 L 1020 2100 L 980 2140 L 980 2300" />
          <path d="M 980 2300 L 1180 2300" /> {/* Dead end */}
          <path d="M 980 2140 L 940 2140 L 940 2400" />
          <path d="M 940 2400 L 920 2400" /> {/* Connects to main */}

          {/* Horizontal interconnects */}
          <path d="M 300 250 L 700 250" />
          <path d="M 1220 250 L 1620 250" />
          <path d="M 250 650 L 650 650" />
          <path d="M 1270 650 L 1670 650" />
          <path d="M 350 1050 L 750 1050" />
          <path d="M 1170 1050 L 1570 1050" />
          <path d="M 300 1450 L 700 1450" />
          <path d="M 1220 1450 L 1620 1450" />
          <path d="M 400 1850 L 800 1850" />
          <path d="M 1120 1850 L 1520 1850" />
          <path d="M 350 2250 L 750 2250" />
          <path d="M 1170 2250 L 1570 2250" />
        </g>

        {/* Via holes at junctions */}
        <g className="vias" fill="#064e3b" stroke="#10b981" strokeWidth="1" opacity="0.7">
          <circle cx="540" cy="140" r="4" />
          <circle cx="840" cy="400" r="4" />
          <circle cx="490" cy="540" r="4" />
          <circle cx="740" cy="800" r="4" />
          <circle cx="590" cy="940" r="4" />
          <circle cx="840" cy="1200" r="4" />
          <circle cx="640" cy="1340" r="4" />
          <circle cx="890" cy="1600" r="4" />
          <circle cx="690" cy="1740" r="4" />
          <circle cx="920" cy="2000" r="4" />
          <circle cx="640" cy="2140" r="4" />
          <circle cx="890" cy="2400" r="4" />

          <circle cx="1080" cy="140" r="4" />
          <circle cx="940" cy="400" r="4" />
          <circle cx="1130" cy="540" r="4" />
          <circle cx="940" cy="800" r="4" />
          <circle cx="1030" cy="940" r="4" />
          <circle cx="1000" cy="1200" r="4" />
          <circle cx="980" cy="1340" r="4" />
          <circle cx="1000" cy="1600" r="4" />
          <circle cx="930" cy="1740" r="4" />
          <circle cx="940" cy="2000" r="4" />
          <circle cx="980" cy="2140" r="4" />
          <circle cx="940" cy="2400" r="4" />

          {/* Main path vias */}
          <circle cx="960" cy="400" r="6" />
          <circle cx="920" cy="800" r="6" />
          <circle cx="960" cy="1200" r="6" />
          <circle cx="1000" cy="1600" r="6" />
          <circle cx="960" cy="2000" r="6" />
          <circle cx="920" cy="2400" r="6" />
        </g>

        {/* SMD components at key points */}
        <g className="smd-components" opacity="0.5">
          {/* Resistors */}
          {[
            { x: 460, y: 247 },
            { x: 660, y: 537 },
            { x: 760, y: 937 },
            { x: 560, y: 1337 },
            { x: 610, y: 1737 },
            { x: 560, y: 2137 },
          ].map((r, i) => (
            <rect key={`r${i}`} x={r.x} y={r.y} width="30" height="8" fill="#1a1a1a" stroke="#10b981" strokeWidth="0.5" rx="1" />
          ))}

          {/* Capacitors */}
          {[
            { x: 360, y: 98 },
            { x: 310, y: 648 },
            { x: 410, y: 1048 },
            { x: 360, y: 1448 },
            { x: 460, y: 1848 },
            { x: 410, y: 2248 },
          ].map((c, i) => (
            <rect key={`c${i}`} x={c.x} y={c.y} width="20" height="6" fill="#2a2a2a" stroke="#059669" strokeWidth="0.5" rx="0.5" />
          ))}
        </g>

        {/* Silk screen labels */}
        <g className="silk-screen" fill="#ffffff" opacity="0.4" fontFamily="monospace" fontSize="10">
          <text x="970" y="420">TP1</text>
          <text x="930" y="820">TP2</text>
          <text x="970" y="1220">TP3</text>
          <text x="1010" y="1620">TP4</text>
          <text x="970" y="2020">TP5</text>
          <text x="930" y="2420">TP6</text>

          <text x="100" y="80">GND</text>
          <text x="100" y="680">GND</text>
          <text x="100" y="1280">GND</text>
          <text x="100" y="1880">GND</text>
          <text x="100" y="2480">GND</text>

          <text x="1700" y="2970" fontSize="14" fontWeight="700">MR PCB v3.0</text>
          <text x="100" y="2970" fontSize="9">© 2025</text>
        </g>
      </motion.svg>
    </div>
  );
}

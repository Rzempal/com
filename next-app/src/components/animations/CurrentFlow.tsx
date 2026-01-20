'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

/**
 * CurrentFlow - Single cyan current line following scroll
 *
 * Features:
 * - ONE cyan current (not particle - a line segment)
 * - Follows mainPath from PCBBackground
 * - 100% scroll-dependent
 * - Starts below Hero (at Two Pillars)
 */
export function CurrentFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll to path progress (0-100%)
  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Detect low-end devices for performance optimization
  useEffect(() => {
    const checkDevice = () => {
      const isLowEnd =
        (navigator as any).hardwareConcurrency < 4 ||
        (navigator as any).deviceMemory < 4;
      setIsLowEndDevice(isLowEnd);
    };

    checkDevice();
  }, []);

  // Main path - same as in PCBBackground (adjusted for new viewBox)
  const mainPathData = `
    M 960 -1000
    L 960 -600
    L 920 -560
    L 920 -200
    L 960 -160
    L 960 200
    L 1000 240
    L 1000 600
    L 960 640
    L 960 1000
    L 920 1040
    L 920 1400
    L 960 1440
    L 960 2000
  `;

  // Calculate path length for strokeDashoffset animation
  const pathLength = 3200;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <motion.svg
        className="w-full h-full"
        viewBox="0 -1000 1920 4000"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 25%, black 25%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 25%, black 25%, black 100%)',
        }}
      >
        <defs>
          {/* Cyan current gradient */}
          <linearGradient id="cyanCurrent" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          {/* Strong glow filter for current */}
          <filter id="currentGlow">
            <feGaussianBlur stdDeviation={isLowEndDevice ? '4' : '8'} result="blur" />
            <feComponentTransfer in="blur">
              <feFuncA type="linear" slope="2.5" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Single cyan current line - reveals with scroll */}
        <motion.path
          d={mainPathData}
          stroke="url(#cyanCurrent)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="butt"
          filter="url(#currentGlow)"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: useTransform(
              pathProgress,
              [0, 100],
              [pathLength, 0]
            ),
          }}
          opacity={0.8}
        />
      </motion.svg>
    </div>
  );
}

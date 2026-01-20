'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

/**
 * CurrentFlow - Scroll-linked electrical current animation
 *
 * Features:
 * - Dual paths (cyan + emerald) flowing from Hero scroll indicator
 * - Pulsating bursts (1.2s interval)
 * - Scroll-linked progress
 * - Pad highlighting along current path
 * - Responsive with mobile optimizations
 */
export function CurrentFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [burstActive, setBurstActive] = useState(false);
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

  // Pulsating burst system - 1.2s interval
  useEffect(() => {
    const burstInterval = setInterval(() => {
      setBurstActive(true);
      setTimeout(() => setBurstActive(false), 600);
    }, 1200);

    return () => clearInterval(burstInterval);
  }, []);

  // Path definitions - starting from Hero scroll indicator (~y: 800)
  // Cyan path - left flow
  const cyanPathData = `
    M 400 800
    L 400 1200
    Q 400 1300 450 1350
    L 450 1600
    Q 450 1700 500 1750
    L 500 1800
    Q 500 1900 550 1950
    L 550 2400
    Q 550 2500 600 2550
    L 600 3000
    Q 600 3100 650 3150
    L 650 3600
  `;

  // Emerald path - right flow
  const emeraldPathData = `
    M 1520 800
    L 1520 1200
    Q 1520 1300 1470 1350
    L 1470 1600
    Q 1470 1700 1420 1750
    L 1420 1800
    Q 1420 1900 1370 1950
    L 1370 2400
    Q 1370 2500 1320 2550
    L 1320 3000
    Q 1320 3100 1270 3150
    L 1270 3600
  `;

  // Calculate path lengths for strokeDashoffset animation
  const cyanPathLength = 3200; // Approximate SVG path length
  const emeraldPathLength = 3200;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <motion.svg
        className="w-full h-full"
        viewBox="0 0 1920 4000"
        preserveAspectRatio="xMidYMid slice"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <defs>
          {/* Cyan current gradient - animated glow */}
          <linearGradient id="cyanCurrentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="30%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          {/* Emerald current gradient */}
          <linearGradient id="emeraldCurrentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="30%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
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

          {/* Motion blur effect for speed */}
          <filter id="motionBlur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0,4" />
          </filter>
        </defs>

        {/* Cyan current path */}
        <motion.path
          d={cyanPathData}
          stroke="url(#cyanCurrentGradient)"
          strokeWidth={burstActive ? '10' : '6'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#currentGlow)"
          opacity={burstActive ? 0.9 : 0.6}
          style={{
            strokeDasharray: cyanPathLength,
            strokeDashoffset: useTransform(
              pathProgress,
              [0, 100],
              [cyanPathLength, 0]
            ),
          }}
          transition={{
            strokeWidth: { duration: 0.3, ease: 'easeOut' },
            opacity: { duration: 0.3, ease: 'easeOut' },
          }}
        />

        {/* Emerald current path */}
        <motion.path
          d={emeraldPathData}
          stroke="url(#emeraldCurrentGradient)"
          strokeWidth={burstActive ? '10' : '6'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#currentGlow)"
          opacity={burstActive ? 0.9 : 0.6}
          style={{
            strokeDasharray: emeraldPathLength,
            strokeDashoffset: useTransform(
              pathProgress,
              [0, 100],
              [emeraldPathLength, 0]
            ),
          }}
          transition={{
            strokeWidth: { duration: 0.3, ease: 'easeOut' },
            opacity: { duration: 0.3, ease: 'easeOut' },
          }}
        />

        {/* Particle system - only on high-end devices */}
        {!isLowEndDevice && (
          <g className="current-particles">
            {/* Cyan particles */}
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={`cyan-${i}`}
                r="4"
                fill="#06b6d4"
                filter="url(#currentGlow)"
                opacity={burstActive ? 1 : 0.7}
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={cyanPathData}
                  begin={`${i * 0.25}s`}
                />
              </motion.circle>
            ))}

            {/* Emerald particles */}
            {[...Array(12)].map((_, i) => (
              <motion.circle
                key={`emerald-${i}`}
                r="4"
                fill="#10b981"
                filter="url(#currentGlow)"
                opacity={burstActive ? 1 : 0.7}
              >
                <animateMotion
                  dur="3s"
                  repeatCount="indefinite"
                  path={emeraldPathData}
                  begin={`${i * 0.25}s`}
                />
              </motion.circle>
            ))}
          </g>
        )}

        {/* Pad highlights - glow when current passes */}
        <g className="pad-highlights">
          {/* Hero area pads */}
          <motion.circle
            cx="400"
            cy="800"
            r="16"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            opacity={burstActive ? 0.9 : 0}
            filter="url(#currentGlow)"
            animate={{
              scale: burstActive ? [1, 1.3, 1] : 1,
              opacity: burstActive ? [0, 0.9, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />
          <motion.circle
            cx="1520"
            cy="800"
            r="16"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            opacity={burstActive ? 0.9 : 0}
            filter="url(#currentGlow)"
            animate={{
              scale: burstActive ? [1, 1.3, 1] : 1,
              opacity: burstActive ? [0, 0.9, 0] : 0,
            }}
            transition={{
              duration: 0.6,
              ease: 'easeOut',
            }}
          />

          {/* Two Pillars area pads */}
          <motion.circle
            cx="450"
            cy="1350"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [15, 20], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />
          <motion.circle
            cx="1470"
            cy="1350"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [15, 20], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />

          {/* Robotyka area pads */}
          <motion.circle
            cx="500"
            cy="1750"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [35, 42], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />
          <motion.circle
            cx="1420"
            cy="1750"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [35, 42], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />

          {/* APPS area pads */}
          <motion.circle
            cx="550"
            cy="2400"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [55, 62], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />
          <motion.circle
            cx="1370"
            cy="2400"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [55, 62], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />

          {/* WWW/STUDIO area pads */}
          <motion.circle
            cx="600"
            cy="3000"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [75, 82], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />
          <motion.circle
            cx="1320"
            cy="3000"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            style={{
              opacity: useTransform(pathProgress, [75, 82], [0, 0.8]),
            }}
            filter="url(#currentGlow)"
          />
        </g>
      </motion.svg>
    </div>
  );
}

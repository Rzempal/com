'use client';

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

/**
 * CurrentFlow - Scroll-linked electrical current animation
 *
 * Features:
 * - Dual paths (cyan + emerald) flowing from Hero scroll indicator
 * - 100% scroll-dependent (no time-based animations)
 * - Leading particles that follow scroll position
 * - Pad highlighting along current path
 * - Responsive with mobile optimizations
 */
export function CurrentFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  const prevScrollProgress = useMotionValue(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);

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

  // Detect scroll velocity for burst effect
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const velocity = Math.abs(latest - prevScrollProgress.get());
      setScrollVelocity(velocity);
      prevScrollProgress.set(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress, prevScrollProgress]);

  // Path definitions - straight paths without curves for PCB aesthetic
  // Cyan path - left flow (starting from y:800)
  const cyanPathData = `
    M 400 800
    L 400 1200
    L 450 1250
    L 450 1600
    L 500 1650
    L 500 1800
    L 550 1850
    L 550 2400
    L 600 2450
    L 600 3000
    L 650 3050
    L 650 3600
  `;

  // Emerald path - right flow (starting from y:800)
  const emeraldPathData = `
    M 1520 800
    L 1520 1200
    L 1470 1250
    L 1470 1600
    L 1420 1650
    L 1420 1800
    L 1370 1850
    L 1370 2400
    L 1320 2450
    L 1320 3000
    L 1270 3050
    L 1270 3600
  `;

  // Calculate path lengths for strokeDashoffset animation
  const cyanPathLength = 3000;
  const emeraldPathLength = 3000;

  // Helper function to get point on path at percentage
  const getPointAtPercent = (pathData: string, percent: number) => {
    if (typeof document === 'undefined') return { x: 0, y: 0 };

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    const length = path.getTotalLength();
    const point = path.getPointAtLength((percent / 100) * length);
    return point;
  };

  // Scroll-based burst effect (intensity based on scroll velocity)
  const burstIntensity = scrollVelocity > 0.01 ? 1 : 0.6;
  const burstWidth = scrollVelocity > 0.01 ? 10 : 6;

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
          {/* Cyan current gradient */}
          <linearGradient id="cyanCurrentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          {/* Emerald current gradient */}
          <linearGradient id="emeraldCurrentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="40%" stopColor="#10b981" stopOpacity="0.9" />
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

          {/* Radial gradient for leading particles */}
          <radialGradient id="cyanParticleGradient">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="emeraldParticleGradient">
            <stop offset="0%" stopColor="#10b981" stopOpacity="1" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Cyan current path - scroll-based reveal */}
        <motion.path
          d={cyanPathData}
          stroke="url(#cyanCurrentGradient)"
          strokeWidth={burstWidth}
          fill="none"
          strokeLinecap="butt"
          filter="url(#currentGlow)"
          opacity={burstIntensity}
          style={{
            strokeDasharray: cyanPathLength,
            strokeDashoffset: useTransform(
              pathProgress,
              [0, 100],
              [cyanPathLength, 0]
            ),
          }}
          transition={{
            strokeWidth: { duration: 0.2, ease: 'easeOut' },
            opacity: { duration: 0.2, ease: 'easeOut' },
          }}
        />

        {/* Emerald current path - scroll-based reveal */}
        <motion.path
          d={emeraldPathData}
          stroke="url(#emeraldCurrentGradient)"
          strokeWidth={burstWidth}
          fill="none"
          strokeLinecap="butt"
          filter="url(#currentGlow)"
          opacity={burstIntensity}
          style={{
            strokeDasharray: emeraldPathLength,
            strokeDashoffset: useTransform(
              pathProgress,
              [0, 100],
              [emeraldPathLength, 0]
            ),
          }}
          transition={{
            strokeWidth: { duration: 0.2, ease: 'easeOut' },
            opacity: { duration: 0.2, ease: 'easeOut' },
          }}
        />

        {/* Leading particles - scroll-based position (not time-based) */}
        {!isLowEndDevice && (
          <g className="leading-particles">
            {/* Cyan leading particle */}
            <motion.circle
              r="6"
              fill="url(#cyanParticleGradient)"
              filter="url(#currentGlow)"
              style={{
                cx: useTransform(pathProgress, (p) => {
                  const point = getPointAtPercent(cyanPathData, p);
                  return point.x;
                }),
                cy: useTransform(pathProgress, (p) => {
                  const point = getPointAtPercent(cyanPathData, p);
                  return point.y;
                }),
                opacity: useTransform(pathProgress, [0, 2, 98, 100], [0, 1, 1, 0]),
              }}
            />

            {/* Emerald leading particle */}
            <motion.circle
              r="6"
              fill="url(#emeraldParticleGradient)"
              filter="url(#currentGlow)"
              style={{
                cx: useTransform(pathProgress, (p) => {
                  const point = getPointAtPercent(emeraldPathData, p);
                  return point.x;
                }),
                cy: useTransform(pathProgress, (p) => {
                  const point = getPointAtPercent(emeraldPathData, p);
                  return point.y;
                }),
                opacity: useTransform(pathProgress, [0, 2, 98, 100], [0, 1, 1, 0]),
              }}
            />
          </g>
        )}

        {/* Pad highlights - glow when current passes - scroll-based */}
        <g className="pad-highlights">
          {/* Hero area pads - start point */}
          <motion.circle
            cx="400"
            cy="800"
            r="16"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="3"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [0, 5], [0.9, 0]),
            }}
          />
          <motion.circle
            cx="1520"
            cy="800"
            r="16"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [0, 5], [0.9, 0]),
            }}
          />

          {/* Two Pillars area pads */}
          <motion.circle
            cx="450"
            cy="1250"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [15, 20, 25], [0, 0.8, 0]),
            }}
          />
          <motion.circle
            cx="1470"
            cy="1250"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [15, 20, 25], [0, 0.8, 0]),
            }}
          />

          {/* Robotyka area pads */}
          <motion.circle
            cx="500"
            cy="1650"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [35, 42, 47], [0, 0.8, 0]),
            }}
          />
          <motion.circle
            cx="1420"
            cy="1650"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [35, 42, 47], [0, 0.8, 0]),
            }}
          />

          {/* APPS area pads */}
          <motion.circle
            cx="550"
            cy="1850"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [55, 62, 67], [0, 0.8, 0]),
            }}
          />
          <motion.circle
            cx="1370"
            cy="1850"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [55, 62, 67], [0, 0.8, 0]),
            }}
          />

          {/* WWW area pads */}
          <motion.circle
            cx="600"
            cy="2450"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [75, 82, 87], [0, 0.8, 0]),
            }}
          />
          <motion.circle
            cx="1320"
            cy="2450"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [75, 82, 87], [0, 0.8, 0]),
            }}
          />

          {/* STUDIO area pads */}
          <motion.circle
            cx="650"
            cy="3050"
            r="14"
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [90, 95, 100], [0, 0.8, 0]),
            }}
          />
          <motion.circle
            cx="1270"
            cy="3050"
            r="14"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            filter="url(#currentGlow)"
            style={{
              opacity: useTransform(pathProgress, [90, 95, 100], [0, 0.8, 0]),
            }}
          />
        </g>
      </motion.svg>
    </div>
  );
}

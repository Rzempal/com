'use client';

import { useState, useEffect } from 'react';

/** Tailwind default container max-widths (px) mapped to breakpoints */
const CONTAINER_BREAKPOINTS: [number, number][] = [
  [1536, 1536], // 2xl
  [1280, 1280], // xl
  [1024, 1024], // lg
  [768, 768],   // md
  [640, 640],   // sm
];

/**
 * Returns the width (px) of a Tailwind `container mx-auto px-4 md:px-6` element.
 * Reacts to window resize.
 */
export function useContainerWidth(): number {
  const [width, setWidth] = useState(1280); // SSR fallback

  useEffect(() => {
    function calculate() {
      const vw = window.innerWidth;
      const maxW = CONTAINER_BREAKPOINTS.find(([bp]) => vw >= bp)?.[1] ?? vw;
      const padding = vw >= 768 ? 24 : 16; // md:px-6 : px-4
      setWidth(Math.min(maxW, vw) - padding * 2);
    }

    calculate();
    window.addEventListener('resize', calculate);
    return () => window.removeEventListener('resize', calculate);
  }, []);

  return width;
}

/**
 * Calculates the X position (as viewBox %) of the left edge of a Tailwind
 * `container mx-auto px-4 md:px-6` element, shifted left by `offsetPx`.
 */
export function useContainerEdge(offsetPx: number = 12): number {
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

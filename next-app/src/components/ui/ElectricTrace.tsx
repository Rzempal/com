"use client";

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);

interface ElectricTraceProps {
    path: string;
    trigger: boolean;
    onComplete?: () => void;
    color?: string;
}

export const ElectricTrace = ({ path, trigger, onComplete, color = '#48D2E7' }: ElectricTraceProps) => {
    const pathRef = useRef<SVGPathElement>(null);

    useGSAP(() => {
        if (trigger && pathRef.current) {
            const el = pathRef.current;
            const length = el.getTotalLength();

            // Implementacja 6 faz animacji "Comet"
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            gsap.set(el, {
                strokeDasharray: length,
                strokeDashoffset: length,
                opacity: 0,
                stroke: color
            });

            tl.to(el, { strokeDashoffset: length * 0.6, opacity: 0.7, duration: 0.3, ease: 'power2.in' }) // Phase 1
                .to(el, { strokeDashoffset: length * 0.2, strokeWidth: 4, stroke: '#FFFFFF', opacity: 1, duration: 0.25 }) // Phase 2
                .to(el, { strokeDashoffset: 0, strokeWidth: 5, stroke: '#FFFFFF', duration: 0.25 }) // Phase 3 (Peak)
                .to(el, { strokeWidth: 3, stroke: color, opacity: 0.9, duration: 0.3 }) // Phase 4
                .to(el, { strokeWidth: 2, stroke: color, opacity: 0.6, duration: 0.4 }) // Phase 5
                .to(el, { opacity: 0, duration: 0.5 }); // Phase 6
        }
    }, [trigger, path, color]);

    return (
        <path
            ref={pathRef}
            d={path}
            fill="none"
            strokeWidth="2"
            className="pointer-events-none"
            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
        />
    );
};

'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Hero() {
  const t = useTranslations('hero');
  const sectionRef = useRef<HTMLElement>(null);

  // Canvas Shrink effect - scroll-linked
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Typewriter effect
  const subtitle = t('subtitle');
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      if (index < subtitle.length) {
        setDisplayText(subtitle.slice(0, index + 1));
        index++;
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [subtitle]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-black" />

        {/* Emerald glow - top right */}
        <div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #27C96D 0%, transparent 70%)' }}
        />

        {/* Emerald glow - bottom left */}
        <div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content with Canvas Shrink effect */}
      <motion.div
        className="relative z-10 text-center px-6"
        style={{ scale, opacity, y }}
      >
        {/* Title with Glitch effect */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white glitch">
          {t('title')}
        </h1>

        {/* Subtitle with Typewriter effect */}
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 font-mono tracking-wide h-8">
          <span>{displayText}</span>
          <span className={`${isTypingComplete ? 'typewriter-cursor' : ''}`} />
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ opacity }}
      >
        <span className="text-sm text-zinc-500 tracking-wide">
          {t('scrollCta')}
        </span>
        <div className="relative w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-emerald-500 rounded-full mt-2 animate-bounce-subtle" />
          {/* Glow effect */}
          <div className="absolute w-1.5 h-3 bg-emerald-500 rounded-full mt-2 blur-sm opacity-50 animate-bounce-subtle" />
        </div>
      </motion.div>
    </section>
  );
}

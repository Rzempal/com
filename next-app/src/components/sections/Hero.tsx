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

  // Hero → Card transformation (scroll-linked)
  // Width: 100% on mobile, 100% → 85% on desktop
  const cardWidth = useTransform(scrollYProgress, [0, 0.15], ['100%', '100%']);
  // Border radius: 0 → 32px (rounded-2xl)
  const borderRadius = useTransform(scrollYProgress, [0, 0.15], [0, 32]);
  // Card border opacity: 0 → 1
  const cardBorderOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  // Horizontal margin for centering (0 on mobile)
  const cardMargin = useTransform(scrollYProgress, [0, 0.15], ['0%', '0%']);
  // Vertical margin for floating card effect
  const cardMarginVertical = useTransform(scrollYProgress, [0, 0.15], ['0%', '5%']);
  // Top padding compresses → content shifts up → gap shrinks
  const cardPaddingTop = useTransform(scrollYProgress, [0, 0.15], ['25svh', '10svh']);
  // Card height shrinks → bottom edge moves up → card visually smaller
  const cardHeight = useTransform(scrollYProgress, [0, 0.15], ['100%', '60%']);

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
      id="hero"
      ref={sectionRef}
      className="relative h-svh flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Animated Card Wrapper - transforms from full-width to card */}
      <motion.div
        className="relative w-full flex flex-col justify-start overflow-hidden"
        style={{
          width: cardWidth,
          height: cardHeight,
          paddingTop: cardPaddingTop,
          marginLeft: cardMargin,
          marginRight: cardMargin,
          marginTop: cardMarginVertical,
          marginBottom: cardMarginVertical,
          borderRadius,
          willChange: 'width, height, margin, border-radius, padding-top',
        }}
      >
        {/* Card border - appears on scroll */}
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] border border-zinc-700/50"
          style={{ opacity: cardBorderOpacity }}
        />

        {/* Gradient Mesh Background */}
        <div className="absolute inset-0 -z-10 rounded-[inherit] overflow-hidden">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-black" />

          {/* Emerald glow - top right */}
          <div
            className="absolute -top-1/4 -right-1/4 w-2/3 h-2/3 rounded-full opacity-40 blur-[80px]"
            style={{ background: 'radial-gradient(circle, #27C96D 0%, transparent 70%)' }}
          />

          {/* Emerald glow - bottom left */}
          <div
            className="absolute -bottom-1/4 -left-1/4 w-2/3 h-2/3 rounded-full opacity-30 blur-[60px]"
            style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
          />

          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
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

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ scale, willChange: 'transform' }}
        >
          {/* Title with Glitch effect */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white glitch">
            {t('title')}
          </h1>

          {/* Subtitle with Typewriter effect */}
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 font-mono tracking-wide max-w-xs mx-auto">
            <span>{displayText}</span>
            <span className={`${isTypingComplete ? 'typewriter-cursor' : ''}`} />
          </p>
        </motion.div>

        {/* Scroll Indicator - SCROLL text + animated circuit-trace line */}
        <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          {/* SCROLL text - fades out while line holds */}
          <motion.span
            className="text-xs font-mono tracking-[0.3em] uppercase text-emerald-500/70"
            style={{ textShadow: '0 0 6px rgba(16, 185, 129, 0.4)' }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            scroll
          </motion.span>
          {/* Animated line - grows down from top, collapses from top leaving dot at bottom */}
          <motion.div
            className="w-px h-10 sm:h-14 bg-emerald-500"
            style={{ boxShadow: '0 0 6px #10b981' }}
            animate={{
              clipPath: [
                'inset(0 0 100% 0)',
                'inset(0 0 0% 0)',
                'inset(0 0 0% 0)',
                'inset(92% 0 0 0)',
                'inset(100% 0 0 0)',
                'inset(100% 0 0 0)',
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              times: [0, 0.15, 0.3, 0.55, 0.6, 1],
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Marquee Ticker */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-3">
          <div className="animate-marquee whitespace-nowrap">
            <span className="inline-block text-xs sm:text-sm font-mono text-zinc-500 uppercase tracking-widest">
              Robotyka&nbsp;&nbsp;//&nbsp;&nbsp;Symulacja&nbsp;&nbsp;//&nbsp;&nbsp;Engineering&nbsp;&nbsp;//&nbsp;&nbsp;Programowanie&nbsp;&nbsp;//&nbsp;&nbsp;Aplikacje&nbsp;&nbsp;//&nbsp;&nbsp;Strony internetowe&nbsp;&nbsp;//&nbsp;&nbsp;
              Robotyka&nbsp;&nbsp;//&nbsp;&nbsp;Symulacja&nbsp;&nbsp;//&nbsp;&nbsp;Engineering&nbsp;&nbsp;//&nbsp;&nbsp;Programowanie&nbsp;&nbsp;//&nbsp;&nbsp;Aplikacje&nbsp;&nbsp;//&nbsp;&nbsp;Strony internetowe&nbsp;&nbsp;//&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

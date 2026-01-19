'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

// RTK Logo SVG Component with animations
function RTKLogo() {
  return (
    <svg viewBox="0 0 400 60" className="rtk-logo w-full max-w-[320px] h-auto">
      {/* Neural network nodes */}
      <circle cx="5" cy="15" r="2" className="rtk-node rtk-n1" />
      <circle cx="20" cy="5" r="2" className="rtk-node rtk-n2" />
      <circle cx="10" cy="30" r="2" className="rtk-node rtk-n3" />
      {/* Neural links */}
      <line x1="5" y1="15" x2="20" y2="5" className="rtk-link rtk-l1" />
      <line x1="20" y1="5" x2="10" y2="30" className="rtk-link rtk-l2" />
      <line x1="5" y1="15" x2="10" y2="30" className="rtk-link rtk-l3" />
      {/* Flow path */}
      <path d="M 10 30 L 40 30" className="rtk-path" />
      {/* Prompt */}
      <text x="48" y="38" className="rtk-cmd">&gt;_</text>
      {/* Typing command */}
      <text x="86" y="38" className="rtk-url">cd resztatokod.pl</text>
      {/* Cursor */}
      <g className="rtk-cursor-g">
        <rect x="86" y="16" width="14" height="26" className="rtk-cursor" />
      </g>
      {/* External link icon */}
      <g className="rtk-external" transform="translate(350, 18)">
        <path
          d="M15 11v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <polyline
          points="12 2 18 2 18 8"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="8" y1="12" x2="18" y2="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

// Robotics Card Component
function RoboticsCard({ t, className = '' }: { t: ReturnType<typeof useTranslations<'pillars'>>; className?: string }) {
  return (
    <motion.a
      href="https://robotyka.michalrapala.com"
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative block rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
        bg-zinc-900/50 backdrop-blur-md
        border border-zinc-800
        hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(39,201,109,0.15)] ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent" />
      </div>

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-mono text-emerald-500 tracking-wider uppercase">
            {t('robotics.tag')}
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src="/images/global/logo_robotyka.png"
          alt="Robotyka - symulacje przemysłowe"
          fill
          className="object-contain p-4"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="p-6 pt-4">
        <h3 className="font-display text-lg sm:text-xl font-semibold text-white mb-3 leading-tight">
          {t('robotics.headline')}
        </h3>

        <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-mono">
          <span className="text-emerald-500/70">&gt;</span> {t('robotics.description')}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-2 text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors">
          {t('robotics.cta')}
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
            />
            <polyline points="15 3 21 3 21 9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            <line x1="10" y1="14" x2="21" y2="3" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent" />
        <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-emerald-500/50 to-transparent" />
      </div>
    </motion.a>
  );
}

// Dev Card Component with RTK Logo
function DevCard({ t, className = '' }: { t: ReturnType<typeof useTranslations<'pillars'>>; className?: string }) {
  return (
    <motion.a
      href="https://resztatokod.pl"
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative block rounded-2xl overflow-hidden cursor-pointer transition-all duration-300
        bg-zinc-900/50 backdrop-blur-md
        border border-zinc-800
        hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-transparent" />
      </div>

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs font-mono text-amber-500 tracking-wider uppercase">
            {t('dev.tag')}
          </span>
        </div>
      </div>

      {/* Big Headline */}
      <div className="px-6 py-8">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-none tracking-tighter">
          <span className="block text-cyan-400 glitch" data-text={t('dev.headline1')}>
            {t('dev.headline1')}
          </span>
          <span className="block text-white">{t('dev.headline2')}</span>
          <span className="block text-white">{t('dev.headline3')}</span>
          <span className="block text-white">
            {t('dev.headline4')}
            <span className="text-amber-500">.</span>
          </span>
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 pt-0">
        <h3 className="font-display text-lg font-semibold text-white mb-3">
          {t('dev.subheadline')}
        </h3>

        <p className="text-zinc-400 text-sm mb-6 leading-relaxed font-mono">
          <span className="text-amber-500/70">&gt;</span> {t('dev.description')}
        </p>

        {/* RTK Logo Animation as CTA */}
        <div className="rtk-cta-container group-hover:opacity-100 opacity-80 transition-opacity">
          <RTKLogo />
        </div>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-amber-500/50 to-transparent" />
        <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-amber-500/50 to-transparent" />
      </div>
    </motion.a>
  );
}

export function TwoPillars() {
  const t = useTranslations('pillars');
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasPeeked, setHasPeeked] = useState(false);

  // Handle scroll to detect active card
  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const cardWidth = container.offsetWidth;
    const newIndex = Math.round(scrollLeft / cardWidth);

    if (newIndex !== activeIndex && newIndex >= 0 && newIndex <= 1) {
      setActiveIndex(newIndex);
    }
  }, [activeIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Auto-peek animation - slide card slightly to hint at swipe
  useEffect(() => {
    if (!isInView || hasPeeked) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    // Wait for enter animation to complete
    const peekTimer = setTimeout(() => {
      // Peek: scroll right 40px
      container.scrollTo({ left: 40, behavior: 'smooth' });

      // Return: scroll back after 400ms
      setTimeout(() => {
        container.scrollTo({ left: 0, behavior: 'smooth' });
        setHasPeeked(true);
      }, 400);
    }, 800);

    return () => clearTimeout(peekTimer);
  }, [isInView, hasPeeked]);

  // Navigate to card via dots
  const scrollToCard = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cardWidth = container.offsetWidth;
    container.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className="relative min-h-screen flex items-center py-24 bg-zinc-950"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 blur-[150px]"
          style={{
            background: 'radial-gradient(ellipse at center, #27C96D 0%, transparent 60%)',
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-xl sm:text-2xl md:text-3xl text-zinc-300 mb-16 font-light tracking-wide"
        >
          {t('heading')}
        </motion.h2>

        {/* Desktop: Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          <RoboticsCard t={t} />
          <DevCard t={t} />
        </motion.div>

        {/* Mobile: CSS Scroll-Snap Carousel with auto-peek hint */}
        <div className="md:hidden relative">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-6 px-6"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex-none w-full snap-center">
              <RoboticsCard t={t} />
            </div>
            <div className="flex-none w-full snap-center">
              <DevCard t={t} />
            </div>
          </motion.div>

          {/* Navigation dots */}
          <nav className="flex justify-center gap-3 mt-6" aria-label="Carousel navigation">
            {[0, 1].map((index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'w-6 bg-emerald-500'
                    : 'w-2 bg-zinc-600 hover:bg-zinc-500'
                }`}
                aria-label={`Slide ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : 'false'}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

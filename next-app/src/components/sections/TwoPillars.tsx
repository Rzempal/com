'use client';

import { useTranslations } from 'next-intl';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
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
    </svg>
  );
}

// Tech Tags Component
function TechTags({ tags, color }: { tags: string[]; color: 'emerald' | 'cyan' }) {
  const borderColor = color === 'emerald' ? 'border-emerald-500/30' : 'border-cyan-500/30';
  const textColor = color === 'emerald' ? 'text-emerald-400/80' : 'text-cyan-400/80';

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`text-[10px] font-mono px-2 py-1 rounded border ${borderColor} ${textColor} bg-black/30`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// Robotics Card Component - CYAN accent
function RoboticsCard({ t, className = '' }: { t: ReturnType<typeof useTranslations<'pillars'>>; className?: string }) {
  const techTags = ['KUKA', 'ABB', 'FANUC', 'TECNOMATIX', 'OEM'];

  return (
    <div
      className={`group relative block rounded-2xl overflow-hidden
        bg-zinc-900/90 backdrop-blur-md
        border border-zinc-800
        hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] ${className}`}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-transparent" />
      </div>

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs font-mono text-cyan-500 tracking-wider uppercase">
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

        <p className="text-zinc-400 text-sm mb-4 leading-relaxed font-mono">
          <span className="text-cyan-500/70">&gt;</span> {t('robotics.description')}
        </p>

        {/* Tech Tags */}
        <TechTags tags={techTags} color="cyan" />

        {/* CTA */}
        <a
          href="https://robotyka.michalrapala.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-6 text-cyan-400 font-medium hover:text-cyan-300 transition-colors"
        >
          {t('robotics.cta')}
          <svg
            className="w-4 h-4 transform hover:translate-x-1 transition-transform"
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
        </a>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-cyan-500/50 to-transparent" />
        <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-cyan-500/50 to-transparent" />
      </div>
    </div>
  );
}

// Dev Card Component with RTK Logo - EMERALD accent
function DevCard({ t, className = '' }: { t: ReturnType<typeof useTranslations<'pillars'>>; className?: string }) {
  const techTags = ['FLUTTER', 'NEXT.JS', 'AI'];

  return (
    <div
      className={`group relative block rounded-2xl overflow-hidden
        bg-zinc-900/90 backdrop-blur-md
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
            {t('dev.tag')}
          </span>
        </div>
      </div>

      {/* Big Headline */}
      <div className="px-6 py-8">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black leading-none tracking-tighter">
          <span className="block text-emerald-400 glitch" data-text={t('dev.headline1')}>
            {t('dev.headline1')}
          </span>
          <span className="block text-white">{t('dev.headline2')}</span>
          <span className="block text-white">{t('dev.headline3')}</span>
          <span className="block text-white">
            {t('dev.headline4')}
            <span className="text-emerald-500">.</span>
          </span>
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 pt-0">
        <h3 className="font-display text-lg font-semibold text-white mb-3">
          {t('dev.subheadline')}
        </h3>

        <p className="text-zinc-400 text-sm mb-4 leading-relaxed font-mono">
          <span className="text-emerald-500/70">&gt;</span> {t('dev.description')}
        </p>

        {/* Tech Tags */}
        <TechTags tags={techTags} color="emerald" />

        {/* RTK Logo Animation as CTA */}
        <a
          href="https://resztatokod.pl"
          target="_blank"
          rel="noopener noreferrer"
          className="rtk-cta-container block hover:opacity-100 opacity-80 transition-opacity mt-6"
        >
          <RTKLogo />
        </a>
      </div>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
        <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent" />
        <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-emerald-500/50 to-transparent" />
      </div>
    </div>
  );
}

// Desktop wrapper with motion
function DesktopRoboticsCard({ t }: { t: ReturnType<typeof useTranslations<'pillars'>> }) {
  return (
    <motion.div variants={cardVariants} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}>
      <RoboticsCard t={t} />
    </motion.div>
  );
}

function DesktopDevCard({ t }: { t: ReturnType<typeof useTranslations<'pillars'>> }) {
  return (
    <motion.div variants={cardVariants} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}>
      <DevCard t={t} />
    </motion.div>
  );
}

export function TwoPillars() {
  const t = useTranslations('pillars');
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  // Swipe state for mobile
  const [activeIndex, setActiveIndex] = useState(0); // 0 = Robotics, 1 = Dev
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Handle swipe end
  const handleDragEnd = useCallback(
    (_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
      const threshold = 80;
      const velocityThreshold = 500;

      const swipedX = Math.abs(info.offset.x) > threshold || Math.abs(info.velocity.x) > velocityThreshold;
      const swipedY = Math.abs(info.offset.y) > threshold || Math.abs(info.velocity.y) > velocityThreshold;

      if (swipedX || swipedY) {
        // Set direction for fly-out animation
        if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
          setSwipeDirection(info.offset.x > 0 ? 'right' : 'left');
        } else {
          setSwipeDirection(info.offset.y > 0 ? 'right' : 'left'); // y też triggeruje
        }

        // After animation, swap cards
        setTimeout(() => {
          setActiveIndex((prev) => (prev === 0 ? 1 : 0));
          setSwipeDirection(null);
        }, 300);
      }
    },
    []
  );

  // Card styles based on position
  const getCardStyle = (cardIndex: number) => {
    const isActive = activeIndex === cardIndex;
    const isFlying = swipeDirection !== null && isActive;

    return {
      zIndex: isActive ? 20 : 10,
      x: isFlying ? (swipeDirection === 'left' ? -500 : 500) : isActive ? 0 : 20,
      y: isActive ? 0 : 12,
      rotate: isActive ? 0 : 3,
      scale: isActive ? 1 : 0.95,
      opacity: isFlying ? 0 : 1,
      filter: isActive ? 'brightness(1) grayscale(0)' : 'brightness(0.5) grayscale(0.8)',
    };
  };

  return (
    <section
      id="pillars"
      ref={containerRef}
      className="relative bg-zinc-950"
      style={{ height: '200vh' }} // 2x viewport for scroll space
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

      {/* Sticky container */}
      <div className="sticky top-24 min-h-[80vh] flex flex-col justify-start py-8">
        <div className="container mx-auto px-6">
          {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-5xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Kompetencje <span className="text-emerald-500">{t('heading')}</span>
          </h2>
          <p className="text-zinc-500 font-mono text-sm">
            // CORE_EXPERTISE_MODULES
            <br />
            // SWIPE_TO_NAVIGATE
          </p>
        </motion.div>

        {/* Desktop: Grid layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          <DesktopRoboticsCard t={t} />
          <DesktopDevCard t={t} />
        </motion.div>

        {/* Mobile: Stacked Cards with swipe */}
        <div className="md:hidden relative" style={{ minHeight: '580px' }}>
          {/* Robotics Card */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-bottom-left"
            animate={getCardStyle(0)}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            drag={activeIndex === 0}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{
              cursor: activeIndex === 0 ? 'grab' : 'default',
              touchAction: 'auto',
            }}
            whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
          >
            <RoboticsCard t={t} />
          </motion.div>

          {/* Dev Card */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-bottom-left"
            animate={getCardStyle(1)}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            drag={activeIndex === 1}
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            style={{
              cursor: activeIndex === 1 ? 'grab' : 'default',
              touchAction: 'auto',
            }}
            whileDrag={{ cursor: 'grabbing', scale: 1.02 }}
          >
            <DevCard t={t} />
          </motion.div>
        </div>

        {/* Navigation dots */}
        <nav className="md:hidden flex justify-center gap-3 mt-6" aria-label="Card navigation">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-6 bg-emerald-500'
                  : 'w-2 bg-zinc-600 hover:bg-zinc-500'
              }`}
              aria-label={`Card ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : 'false'}
            />
          ))}
        </nav>
        </div>
      </div>
    </section>
  );
}


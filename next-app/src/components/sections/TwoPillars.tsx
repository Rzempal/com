'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cellVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
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
    <svg viewBox="0 0 400 60" className="rtk-logo w-full max-w-[280px] h-auto">
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
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`text-[10px] font-mono px-2 py-1 rounded border ${borderColor} ${textColor} bg-overlay-light`}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

// ENG Content Cell
function EngContentCell({ t }: { t: ReturnType<typeof useTranslations<'pillars'>> }) {
  const techTags = ['KUKA', 'FANUC', 'ABB'];

  return (
    <motion.div
      variants={cellVariants}
      className="cell-eng-content flex flex-col p-4 md:p-6 rounded-lg"
    >
      {/* Header */}
      <div className="pb-3 mb-3 border-b border-cyan-500/20">
        <h3 className="text-2xl md:text-3xl font-mono font-bold leading-tight flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse shrink-0" />
          <span><span className="text-cyan-400">ENG://</span><span className="text-foreground">{t('robotics.tag')}</span></span>
        </h3>
      </div>

      {/* Headline */}
      <h3 className="font-mono text-sm text-text-secondary mb-3 leading-relaxed">
        {t('robotics.headline')}
      </h3>

      {/* Description */}
      <p className="text-text-tertiary text-sm mb-3 leading-relaxed font-mono pl-3 border-l-2 border-cyan-500/30 flex-grow">
        <span className="text-cyan-500/70">&gt;</span> {t('robotics.description')}
      </p>

      {/* Tags */}
      <TechTags tags={techTags} color="cyan" />
    </motion.div>
  );
}

// ENG Media Cell (Image + CTA)
function EngMediaCell({ t }: { t: ReturnType<typeof useTranslations<'pillars'>> }) {
  const locale = useLocale();

  return (
    <motion.div
      variants={cellVariants}
      className="cell-eng-media flex flex-col items-center justify-center p-4 md:p-8 rounded-lg"
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        <Image
          src="/images/global/logo_robotyka.png"
          alt="Robotyka - symulacje przemysłowe"
          width={800}
          height={450}
          className="w-full h-auto rounded-lg object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
      <Link
        href={`/${locale}/robotyka`}
        className="inline-flex items-center justify-center gap-2 p-3 text-cyan-400 text-sm font-mono hover:text-cyan-300 transition-colors"
      >
        {t('robotics.cta')}
        <span>&rarr;</span>
      </Link>
    </motion.div>
  );
}

// DEV Media Cell (Video + RTK CTA)
function DevMediaCell() {
  const rtkRef = useRef<HTMLAnchorElement>(null);
  const rtkInView = useInView(rtkRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      variants={cellVariants}
      className="cell-dev-media flex flex-col items-center justify-center p-4 md:p-8 rounded-lg"
    >
      <div className="w-full overflow-hidden rounded-lg">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-auto rounded-lg"
        >
          <source
            src="/movies/resztatokod.webm"
            type="video/webm"
          />
        </video>
      </div>
      {/* RTK Logo CTA */}
      <a
        ref={rtkRef}
        href="https://resztatokod.pl"
        target="_blank"
        rel="noopener noreferrer"
        className={`rtk-cta-container block hover:opacity-100 opacity-80 transition-opacity mt-6 ${rtkInView ? 'rtk-animate' : ''}`}
      >
        <RTKLogo />
      </a>
    </motion.div>
  );
}

// DEV Content Cell
function DevContentCell({ t }: { t: ReturnType<typeof useTranslations<'pillars'>> }) {
  const techTags = ['NEXT.JS', 'REACT', 'AI'];

  return (
    <motion.div
      variants={cellVariants}
      className="cell-dev-content flex flex-col p-4 md:p-6 rounded-lg"
    >
      {/* Header */}
      <div className="pb-3 mb-3 border-b border-emerald-500/20">
        <h3 className="text-2xl md:text-3xl font-mono font-bold leading-tight flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span><span className="text-emerald-400">DEV://</span><span className="text-foreground">{t('dev.tag')}</span></span>
        </h3>
      </div>

      {/* Headline */}
      <h3 className="font-mono text-sm text-text-secondary mb-3 leading-relaxed">
        {t('dev.subheadline')}
      </h3>

      {/* Description */}
      <p className="text-text-tertiary text-sm mb-3 leading-relaxed font-mono pl-3 border-l-2 border-emerald-500/30 flex-grow">
        <span className="text-emerald-500/70">&gt;</span> {t('dev.description')}
      </p>

      {/* Tags */}
      <TechTags tags={techTags} color="emerald" />
    </motion.div>
  );
}

export function TwoPillars() {
  const t = useTranslations('pillars');
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="pillars"
      ref={containerRef}
      className="relative py-16 md:py-24"
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

      <div className="container mx-auto px-4 md:px-6">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-mono text-foreground leading-tight">
            <span className="text-text-tertiary">{'// '}</span>KLUCZOWE_KOMPETENCJE<br />
            <span className="text-text-tertiary">{'// '}</span>CORE_EXPERTISE
          </h2>
        </motion.div>

        {/* Unified Card - 2x2 Grid */}
        <motion.article
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="unified-card w-full mx-auto p-3 md:p-4 rounded-[32px]
            bg-glass-bg backdrop-blur-md
            border border-glass-border
            shadow-[0_0_30px_rgba(0,0,0,0.5)]"
        >
          {/* Desktop: 2x2 Grid */}
          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-3 md:gap-4"
            style={{
              gridTemplateAreas: `
                "eng-content eng-media"
                "dev-media dev-content"
              `,
            }}
          >
            <div style={{ gridArea: 'eng-content' }}>
              <EngContentCell t={t} />
            </div>
            <div style={{ gridArea: 'eng-media' }}>
              <EngMediaCell t={t} />
            </div>
            <div style={{ gridArea: 'dev-media' }}>
              <DevMediaCell />
            </div>
            <div style={{ gridArea: 'dev-content' }}>
              <DevContentCell t={t} />
            </div>
          </div>

          {/* Mobile: Single Column */}
          <div className="md:hidden flex flex-col gap-3">
            <EngContentCell t={t} />
            <EngMediaCell t={t} />
            <DevContentCell t={t} />
            <DevMediaCell />
          </div>
        </motion.article>
      </div>
    </section>
  );
}

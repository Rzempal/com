'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export interface ProjectShowcaseProps {
  id: string;
  sectionNumber: string;
  translationKey: string;
  accentColor?: 'cyan' | 'emerald';
}

/**
 * ProjectShowcase - Reusable project section component
 *
 * Displays a full-screen project showcase with:
 * - Image/logo
 * - Headline
 * - Description
 * - CTA link
 *
 * Features:
 * - Scroll-triggered fade-in animation
 * - Glassmorphism card design
 * - Responsive layout
 * - Accent color theming (cyan or emerald)
 */
export function ProjectShowcase({
  id,
  sectionNumber,
  translationKey,
  accentColor = 'cyan',
}: ProjectShowcaseProps) {
  const t = useTranslations(`projects.${translationKey}`);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Theme colors based on accent
  const colors = {
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-400',
      text: 'text-cyan-400',
      glow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]',
      glowHover: 'hover:shadow-[0_0_40px_rgba(6,182,212,0.4)]',
      dot: 'bg-cyan-400',
    },
    emerald: {
      border: 'border-emerald-500/30 hover:border-emerald-400',
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.3)]',
      glowHover: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.4)]',
      dot: 'bg-emerald-400',
    },
  };

  const theme = colors[accentColor];

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center py-24 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative w-full max-w-4xl"
      >
        {/* Section number indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-3 mb-8"
        >
          <span className={`font-mono text-sm tracking-wider ${theme.text}`}>
            —{sectionNumber}
          </span>
          <div className={`w-12 h-px ${theme.border.split(' ')[0].replace('/', '')}`} />
        </motion.div>

        {/* Glassmorphism card */}
        <div
          className={`
            relative p-8 md:p-12 rounded-2xl
            bg-zinc-900/40 backdrop-blur-md
            border ${theme.border}
            ${theme.glow} ${theme.glowHover}
            transition-all duration-500
          `}
        >
          {/* Corner accents */}
          <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 ${theme.border.split(' ')[0]} rounded-tl-2xl`} />
          <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${theme.border.split(' ')[0]} rounded-br-2xl`} />

          {/* Project title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
          >
            {t('title')}
          </motion.h2>

          {/* Image/Logo container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden bg-zinc-800/50"
          >
            <Image
              src={t('image')}
              alt={t('imageAlt')}
              fill
              className="object-contain p-8"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </motion.div>

          {/* Headline */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-xl md:text-2xl font-semibold text-zinc-200 mb-4"
          >
            {t('headline')}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-lg text-zinc-400 mb-8 leading-relaxed font-mono"
          >
            {t('description')}
          </motion.p>

          {/* CTA Button */}
          <motion.a
            href={t('ctaUrl')}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className={`
              inline-flex items-center gap-3 px-6 py-3 rounded-full
              font-mono text-sm font-semibold
              bg-zinc-800/50 backdrop-blur-sm
              border ${theme.border}
              ${theme.text}
              hover:scale-105 active:scale-95
              transition-all duration-300
              ${theme.glowHover}
            `}
          >
            <span className={`w-2 h-2 rounded-full ${theme.dot} animate-pulse`} />
            {t('cta')}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}

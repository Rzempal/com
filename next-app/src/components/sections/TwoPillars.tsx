'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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

export function TwoPillars() {
  const t = useTranslations('pillars');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const pillars = [
    {
      key: 'robotics',
      tag: t('robotics.tag'),
      title: t('robotics.title'),
      description: t('robotics.description'),
      cta: t('robotics.cta'),
      href: 'https://robotyka.michalrapala.com',
      icon: '⚙️',
    },
    {
      key: 'dev',
      tag: t('dev.tag'),
      title: t('dev.title'),
      description: t('dev.description'),
      cta: t('dev.cta'),
      href: 'https://resztatokod.pl',
      icon: '💻',
    },
  ];

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

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto"
        >
          {pillars.map((pillar) => (
            <motion.a
              key={pillar.key}
              href={pillar.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative block rounded-2xl p-8 cursor-pointer transition-all duration-300
                bg-zinc-900/50 backdrop-blur-md
                border border-zinc-800
                hover:border-emerald-500/50 hover:shadow-[0_0_30px_rgba(39,201,109,0.15)]"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-transparent" />
              </div>

              {/* Tag */}
              <span className="inline-block text-xs font-mono text-emerald-500 tracking-wider uppercase mb-4">
                {pillar.tag}
              </span>

              {/* Title */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3 group-hover:text-emerald-50 transition-colors">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-zinc-400 mb-6 leading-relaxed">
                {pillar.description}
              </p>

              {/* CTA */}
              <span className="inline-flex items-center gap-2 text-emerald-400 font-medium group-hover:text-emerald-300 transition-colors">
                {pillar.cta}
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-2xl">
                <div className="absolute top-0 right-0 w-px h-8 bg-gradient-to-b from-emerald-500/50 to-transparent" />
                <div className="absolute top-0 right-0 w-8 h-px bg-gradient-to-l from-emerald-500/50 to-transparent" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ProjectFilter } from './ProjectFilter';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

function HeroSection() {
  const t = useTranslations('robotyka.projects');
  const locale = useLocale();

  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider text-emerald-neon border border-emerald-neon/30 rounded mb-6"
            >
              {t('heroTag')}
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              {t('heroTitle')}{' '}
              <span className="text-emerald-neon">{t('heroTitleAccent')}</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-text-muted font-mono text-sm leading-relaxed mb-8 max-w-lg">
              {t('heroDescription')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                href={`/${locale}#contact`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30 rounded font-mono text-sm hover:bg-emerald-neon/20 transition-colors"
              >
                {t('heroCta')}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden border border-glass-border">
              <Image
                src="/images/robotyka/projekty.jpg"
                alt="Projekty robotyki"
                width={600}
                height={400}
                className="w-full h-auto object-cover grayscale-[30%]"
                priority
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-glass-bg backdrop-blur-md border border-glass-border rounded font-mono text-xs text-emerald-neon">
                15+ Projektow
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const t = useTranslations('robotyka.projects');

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-baseline gap-4 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-mono">
            <span className="text-text-tertiary">{'// '}</span>
            {t('sectionTitle')}
          </h2>
          <span className="text-xs font-mono text-text-tertiary">{t('sectionCount')}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProjectFilter />
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations('robotyka.projects');
  const locale = useLocale();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-glass-border bg-glass-bg-light p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
        >
          <div className="flex-1">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('ctaTitle')}{' '}
              <span className="text-emerald-neon">{t('ctaTitleAccent')}</span>
            </h2>
            <p className="text-text-muted font-mono text-sm leading-relaxed max-w-lg">
              {t('ctaDescription')}
            </p>
          </div>
          <Link
            href={`/${locale}#contact`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30 rounded font-mono text-sm hover:bg-emerald-neon/20 transition-colors shrink-0"
          >
            {t('ctaButton')}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function RobotykaProjects() {
  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <CtaSection />
    </main>
  );
}

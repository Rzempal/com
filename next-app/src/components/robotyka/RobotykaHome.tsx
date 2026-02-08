'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

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
  const t = useTranslations('robotyka');
  const locale = useLocale();

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 text-xs font-mono uppercase tracking-wider text-emerald-neon border border-emerald-neon/30 rounded mb-6"
            >
              {t('hero.tag')}
            </motion.span>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
            >
              {t('hero.title')}{' '}
              <span className="text-emerald-neon">{t('hero.titleAccent')}</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-text-muted font-mono text-sm leading-relaxed mb-8 max-w-lg"
            >
              {t('hero.description')}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden border border-glass-border">
              <Image
                src="/images/robotyka/profilowe.jpg"
                alt="Michal Rapala"
                width={600}
                height={400}
                className="w-full h-auto object-cover grayscale-[30%]"
                priority
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-glass-bg backdrop-blur-md border border-glass-border rounded font-mono text-xs text-emerald-neon">
                Offline / Online
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const t = useTranslations('robotyka');
  const text = t('marquee');

  return (
    <div className="border-y border-glass-border bg-glass-bg-light py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-mono text-sm text-text-muted tracking-widest px-4">
          {text}{text}
        </span>
        <span className="font-mono text-sm text-text-muted tracking-widest px-4">
          {text}{text}
        </span>
      </div>
    </div>
  );
}

function StatsSection() {
  const t = useTranslations('robotyka.stats');

  const stats = [
    { value: t('years'), label: t('yearsLabel') },
    { value: t('projects'), label: t('projectsLabel') },
    { value: t('standards'), label: t('standardsLabel') },
    { value: t('possibilities'), label: t('possibilitiesLabel') },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center p-6 rounded-lg border border-glass-border bg-glass-bg-light"
            >
              <div className="text-3xl md:text-4xl font-bold text-emerald-neon mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-xs font-mono text-text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const t = useTranslations('robotyka.about');

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold font-mono">
            <span className="text-text-tertiary">{'// '}</span>
            {t('title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p
              variants={fadeInUp}
              className="text-text-muted font-mono text-sm leading-relaxed pl-4 border-l-2 border-emerald-neon/30"
            >
              {t('text1')}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-text-muted font-mono text-sm leading-relaxed pl-4 border-l-2 border-emerald-neon/30"
            >
              {t('text2')}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/images/robotyka/laptop.jpg"
              alt="Robotyka - Symulacja"
              width={300}
              height={200}
              className="w-full rounded-lg border border-glass-border grayscale-[50%]"
            />
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.p
              variants={fadeInUp}
              className="text-text-muted font-mono text-sm leading-relaxed pl-4 border-l-2 border-emerald-neon/30"
            >
              {t('text3')}
            </motion.p>
            <motion.p
              variants={fadeInUp}
              className="text-text-muted font-mono text-sm leading-relaxed pl-4 border-l-2 border-emerald-neon/30"
            >
              {t('text4')}
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/images/robotyka/programowanie_online2.jpg"
              alt="Programowanie robotow"
              width={300}
              height={200}
              className="w-full rounded-lg border border-glass-border grayscale-[50%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCta() {
  const t = useTranslations('robotyka');
  const locale = useLocale();

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={`/${locale}/robotyka/doswiadczenie`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30 rounded font-mono text-sm hover:bg-emerald-neon/20 transition-colors"
          >
            {t('hero.cta')}
            <span>&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations('robotyka.cta');

  return (
    <section className="py-16 md:py-24">
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
              {t('title')}{' '}
              <span className="text-emerald-neon">{t('titleAccent')}</span>
            </h2>
            <p className="text-text-muted font-mono text-sm leading-relaxed max-w-lg">
              {t('description')}
            </p>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30 rounded font-mono text-sm hover:bg-emerald-neon/20 transition-colors shrink-0"
          >
            {t('button')}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export function RobotykaHome() {
  return (
    <main>
      <HeroSection />
      <MarqueeSection />
      <StatsSection />
      <AboutSection />
      <ExperienceCta />
      <CtaSection />
    </main>
  );
}

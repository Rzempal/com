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
  const t = useTranslations('robotyka.experience');
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
                href={`/${locale}/robotyka/projekty`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30 rounded font-mono text-sm hover:bg-emerald-neon/20 transition-colors"
              >
                {t('heroCta')} <span>&rarr;</span>
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
                src="/images/robotyka/programowanie_online.jpg"
                alt="Programowanie robotow"
                width={600}
                height={400}
                className="w-full h-auto object-cover grayscale-[30%]"
                priority
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-glass-bg backdrop-blur-md border border-glass-border rounded font-mono text-xs text-emerald-neon">
                Engineering
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ExperienceSection() {
  const t = useTranslations('robotyka.experience');

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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-6"
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-lg border border-glass-border bg-glass-bg-light p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-emerald-neon mb-1">{t('exp1Title')}</h3>
            <p className="text-xs font-mono text-text-tertiary mb-4">{t('exp1Company')}</p>
            <p className="text-text-muted font-mono text-sm leading-relaxed mb-4">{t('exp1Intro')}</p>
            <ul className="space-y-2 pl-4">
              {(['exp1Resp1', 'exp1Resp2', 'exp1Resp3', 'exp1Resp4', 'exp1Resp5', 'exp1Resp6'] as const).map((key) => (
                <li key={key} className="text-text-muted font-mono text-sm leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-neon mt-1 shrink-0">&gt;</span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="rounded-lg border border-glass-border bg-glass-bg-light p-6 md:p-8"
          >
            <h3 className="text-lg font-bold text-emerald-neon mb-1">{t('exp2Title')}</h3>
            <p className="text-xs font-mono text-text-tertiary mb-4">{t('exp2Company')}</p>
            <div className="space-y-1 mb-4">
              <p className="text-text-muted font-mono text-sm font-bold">{t('exp2Role1')}</p>
              <p className="text-text-muted font-mono text-sm font-bold">{t('exp2Role2')}</p>
            </div>
            <p className="text-text-muted font-mono text-sm leading-relaxed">{t('exp2Desc')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsSection() {
  const t = useTranslations('robotyka.experience');

  const skillGroups = [
    { titleKey: 'skillsSimTitle' as const, tags: ['ProcessSimulate (++)', 'ProcessDesigner (++)', 'DELMIAV5 (+)', 'RobCad (+)'] },
    { titleKey: 'skillsRobotTitle' as const, tags: ['KUKA (Offline/Online, P1)', 'Fanuc (Offline)', 'ABB (Offline/Online)'] },
    { titleKey: 'skillsStandardsTitle' as const, tags: ['VW', 'Magna', 'BMW', 'JLR', 'Volvo', 'Audi', 'Opel', 'Daimler'] },
    { titleKey: 'skillsSoftTitle' as const, tags: [t('skillProblemSolving'), t('skillConflictMgmt'), t('skillEmpathy')] },
    { titleKey: 'skillsTeamMgmtTitle' as const, tags: [t('skillPlanning'), t('skillDelegation'), t('skillPrioritization'), t('skillTimeMgmt'), t('skillMonitoring')] },
  ];

  return (
    <section className="py-16">
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
            {t('skillsTitle')}
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {skillGroups.map((group) => (
            <motion.div key={group.titleKey} variants={fadeInUp} className="rounded-lg border border-glass-border bg-glass-bg-light p-5">
              <h3 className="text-sm font-bold text-emerald-neon mb-3 font-mono">{t(group.titleKey)}</h3>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded border border-emerald-neon/20 text-text-muted bg-surface">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CertsSection() {
  const t = useTranslations('robotyka.experience');
  const certs = [
    { key: 'certKuka' as const, icon: 'check', expired: false },
    { key: 'certVass' as const, icon: 'check', expired: true },
  ];

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
            {t('certsTitle')}
          </h2>
          <span className="text-xs font-mono text-text-tertiary">{t('certsCount')}</span>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="rounded-lg border border-glass-border bg-glass-bg-light p-6"
        >
          {certs.map((cert, i) => (
            <motion.div
              key={cert.key}
              variants={fadeInUp}
              className={`flex items-center gap-3 py-3 ${i < certs.length - 1 ? 'border-b border-glass-border' : ''}`}
            >
              <span className={`text-sm ${cert.icon === 'check' ? 'text-emerald-neon' : 'text-amber-400'}`}>
                {cert.icon === 'check' ? '\u2713' : '\u2605'}
              </span>
              <span className="text-text-muted font-mono text-sm">{t(cert.key)}</span>
              {cert.expired && (
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-amber-500/40 text-amber-400 bg-amber-500/10 uppercase tracking-wider">
                  {t('certExpired')}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CtaSection() {
  const t = useTranslations('robotyka.experience');
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
            href={`/${locale}/robotyka/projekty`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30 rounded font-mono text-sm hover:bg-emerald-neon/20 transition-colors shrink-0"
          >
            {t('ctaButton')} <span>&rarr;</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function RobotykaExperience() {
  return (
    <main>
      <HeroSection />
      <ExperienceSection />
      <SkillsSection />
      <CertsSection />
      <CtaSection />
    </main>
  );
}

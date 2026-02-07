'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Monitor, Waves, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers';
import Link from 'next/link';

const EMAIL = 'kontakt@michalrapala.com';

const NAV_LINKS = [
  { key: 'home', href: '#hero' },
  { key: 'pillars', href: '#pillars' },
  { key: 'projects', href: '#projects' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
] as const;

type Theme = 'system' | 'light' | 'dark';

const THEME_OPTIONS: { value: Theme; icon: typeof Monitor }[] = [
  { value: 'system', icon: Monitor },
  { value: 'light', icon: Waves },
  { value: 'dark', icon: Moon },
];

const socials = [
  {
    label: 'GitHub',
    value: 'Rzempal',
    href: 'https://github.com/Rzempal',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'michal-rapala',
    href: 'https://www.linkedin.com/in/michal-rapala',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export function SiteMap() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [copied, setCopied] = useState(false);

  const switchLocale = (nextLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.replace(`/${nextLocale}${pathWithoutLocale}`, { scroll: false });
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative z-10 py-16 px-6 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-10"
      >
        {/* Column 1: Sitemap */}
        <div>
          <h3 className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-6">
            {t('siteHeading')}
          </h3>
          <nav aria-label="Mapa strony" className="flex flex-col gap-2">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="group flex items-center gap-2 text-sm font-mono text-text-tertiary hover:text-cyan-400 transition-colors"
              >
                <span className="text-text-faint group-hover:text-cyan-600 transition-colors">
                  {'>_cd'}
                </span>
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>
        </div>

        {/* Column 2: Robotyka */}
        <div>
          <h3 className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-6">
            {t('robotykaHeading')}
          </h3>
          <nav aria-label="Mapa robotyki" className="flex flex-col gap-2">
            {([
              { key: 'about', href: '/robotyka' },
              { key: 'experience', href: '/robotyka/doswiadczenie' },
              { key: 'projects', href: '/robotyka/projekty' },
            ] as const).map(({ key, href }) => (
              <Link
                key={key}
                href={`/${locale}${href}`}
                className="group flex items-center gap-2 text-sm font-mono text-text-tertiary hover:text-cyan-400 transition-colors"
              >
                <span className="text-text-faint group-hover:text-cyan-600 transition-colors">
                  {'>_cd'}
                </span>
                {t(`robotykaNav.${key}`)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Column 3: Options */}
        <div>
          <h3 className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-6">
            {t('optionsHeading')}
          </h3>
          <div className="flex flex-col gap-4">
            {/* Language toggle */}
            <div className="flex items-center rounded-lg border border-border-subtle bg-glass-bg-light overflow-hidden w-fit">
              <button
                onClick={() => switchLocale('pl')}
                className={`px-3 py-2 text-xs font-mono transition-colors ${
                  locale === 'pl'
                    ? 'text-cyan-400 bg-surface-hover'
                    : 'text-text-tertiary hover:text-text-muted'
                }`}
              >
                PL
              </button>
              <div className="w-px h-5 bg-border-subtle" />
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-2 text-xs font-mono transition-colors ${
                  locale === 'en'
                    ? 'text-cyan-400 bg-surface-hover'
                    : 'text-text-tertiary hover:text-text-muted'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme toggle */}
            <div className="flex items-center rounded-lg border border-border-subtle bg-glass-bg-light overflow-hidden w-fit">
              {THEME_OPTIONS.map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`p-2 transition-colors ${
                    theme === value
                      ? 'text-cyan-400 bg-surface-hover'
                      : 'text-text-tertiary hover:text-text-muted'
                  }`}
                  aria-label={t(`theme.${value}`)}
                  title={t(`theme.${value}`)}
                >
                  <Icon size={16} strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="text-xs font-mono text-text-tertiary uppercase tracking-widest mb-6">
            {t('contactHeading')}
          </h3>
          <div className="flex flex-col gap-3">
            {/* Email row */}
            <div className="flex items-stretch rounded-lg border border-border-subtle bg-glass-bg-light overflow-hidden w-fit">
              <a
                href={`mailto:${EMAIL}`}
                className="group flex items-center gap-2 px-3 py-2 hover:bg-glass-bg transition-colors"
              >
                <span className="text-text-tertiary group-hover:text-cyan-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span className="text-xs text-foreground group-hover:text-cyan-400 transition-colors">
                  {EMAIL}
                </span>
              </a>
              <div className="w-px bg-border-subtle" />
              <button
                onClick={copyEmail}
                className="group flex items-center justify-center px-2 hover:bg-glass-bg text-text-tertiary hover:text-cyan-500 transition-colors"
                aria-label="Skopiuj email"
              >
                {copied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-cyan-500">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                )}
              </button>
            </div>

            {/* Social links */}
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-border-subtle bg-glass-bg-light hover:border-cyan-500/50 hover:bg-glass-bg transition-colors w-fit"
              >
                <span className="text-text-tertiary group-hover:text-cyan-500 transition-colors">
                  {social.icon}
                </span>
                <span className="text-xs text-foreground group-hover:text-cyan-400 transition-colors">
                  {social.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

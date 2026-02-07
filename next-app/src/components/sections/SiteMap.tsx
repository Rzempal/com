'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Monitor, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/providers';

const NAV_LINKS = [
  { key: 'home', href: '#hero' },
  { key: 'pillars', href: '#pillars' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
  { key: 'faq', href: '#faq' },
] as const;

type Theme = 'system' | 'light' | 'dark';

const THEME_OPTIONS: { value: Theme; icon: typeof Monitor }[] = [
  { value: 'system', icon: Monitor },
  { value: 'light', icon: Sun },
  { value: 'dark', icon: Moon },
];

export function SiteMap() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const switchLocale = (nextLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.replace(`/${nextLocale}${pathWithoutLocale}`, { scroll: false });
  };

  return (
    <section className="relative z-10 py-16 px-6 bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
      >
        {/* Column 1: Sitemap */}
        <div>
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
            {t('siteHeading')}
          </h3>
          <nav aria-label="Mapa strony" className="flex flex-col gap-2">
            {NAV_LINKS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                className="group flex items-center gap-2 text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
              >
                <span className="text-zinc-700 group-hover:text-cyan-600 transition-colors">
                  {'>_cd'}
                </span>
                {t(`nav.${key}`)}
              </a>
            ))}
          </nav>
        </div>

        {/* Column 2: Options */}
        <div>
          <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-6">
            {t('optionsHeading')}
          </h3>
          <div className="flex flex-col gap-4">
            {/* Language toggle */}
            <div className="flex items-center rounded-lg border border-white/10 bg-zinc-900/50 overflow-hidden w-fit">
              <button
                onClick={() => switchLocale('pl')}
                className={`px-3 py-2 text-xs font-mono transition-colors ${
                  locale === 'pl'
                    ? 'text-cyan-400 bg-zinc-800/80'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                PL
              </button>
              <div className="w-px h-5 bg-white/10" />
              <button
                onClick={() => switchLocale('en')}
                className={`px-3 py-2 text-xs font-mono transition-colors ${
                  locale === 'en'
                    ? 'text-cyan-400 bg-zinc-800/80'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme toggle */}
            <div className="flex items-center rounded-lg border border-white/10 bg-zinc-900/50 overflow-hidden w-fit">
              {THEME_OPTIONS.map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => setTheme(value)}
                  className={`p-2 transition-colors ${
                    theme === value
                      ? 'text-cyan-400 bg-zinc-800/80'
                      : 'text-zinc-500 hover:text-zinc-300'
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
      </motion.div>
    </section>
  );
}

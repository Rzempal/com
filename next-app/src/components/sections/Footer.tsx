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

export function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const switchLocale = (nextLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${nextLocale}${pathWithoutLocale}`);
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Sitemap navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          aria-label="Mapa strony"
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-12"
        >
          {NAV_LINKS.map(({ key, href }) => (
            <a
              key={key}
              href={href}
              className="text-sm font-mono text-zinc-500 hover:text-cyan-400 transition-colors"
            >
              {t(`nav.${key}`)}
            </a>
          ))}
        </motion.nav>

        {/* Options row: language + theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center justify-center gap-6 mb-16"
        >
          {/* Language toggle */}
          <div className="flex items-center rounded-lg border border-white/10 bg-zinc-900/50 overflow-hidden">
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
          <div className="flex items-center rounded-lg border border-white/10 bg-zinc-900/50 overflow-hidden">
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
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-xs font-mono text-zinc-600 tracking-wider"
        >
          {t('tagline')}
        </motion.p>
      </div>
    </footer>
  );
}

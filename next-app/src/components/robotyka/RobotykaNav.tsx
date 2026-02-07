'use client';

import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navItems = [
  { href: '/robotyka', key: 'home' },
  { href: '/robotyka/doswiadczenie', key: 'experience' },
  { href: '/robotyka/projekty', key: 'projects' },
] as const;

export function RobotykaNav() {
  const t = useTranslations('robotyka.nav');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const fullHref = `/${locale}${href}`;
    return pathname === fullHref;
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-glass-border bg-glass-bg backdrop-blur-xl">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-14">
          <Link
            href={`/${locale}/robotyka`}
            className="font-mono text-sm font-bold text-foreground hover:text-emerald-neon transition-colors"
          >
            <span className="text-emerald-neon">ENG://</span>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase tracking-wider transition-colors ${
                  isActive(item.href)
                    ? 'bg-emerald-neon/10 text-emerald-neon border border-emerald-neon/30'
                    : 'text-text-muted hover:text-foreground hover:bg-surface-hover'
                }`}
              >
                {t(item.key)}
              </Link>
            ))}
          </div>

          <Link
            href={`/${locale}`}
            className="text-xs font-mono text-text-tertiary hover:text-foreground transition-colors hidden sm:block"
          >
            &larr; michalrapala.com
          </Link>
        </div>
      </div>
    </nav>
  );
}

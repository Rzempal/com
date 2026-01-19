'use client';

import { useTranslations } from 'next-intl';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Mesh Background */}
      <div className="absolute inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-black" />

        {/* Emerald glow - top right */}
        <div
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full opacity-20 blur-[120px]"
          style={{ background: 'radial-gradient(circle, #27C96D 0%, transparent 70%)' }}
        />

        {/* Emerald glow - bottom left */}
        <div
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full opacity-15 blur-[100px]"
          style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white">
          {t('title')}
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-zinc-400 font-mono tracking-wide">
          {t('subtitle')}
        </p>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-sm text-zinc-500 tracking-wide">
          {t('scrollCta')}
        </span>
        <div className="relative w-6 h-10 border-2 border-zinc-700 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-emerald-500 rounded-full mt-2 animate-bounce-subtle" />
          {/* Glow effect */}
          <div className="absolute w-1.5 h-3 bg-emerald-500 rounded-full mt-2 blur-sm opacity-50 animate-bounce-subtle" />
        </div>
      </div>
    </section>
  );
}

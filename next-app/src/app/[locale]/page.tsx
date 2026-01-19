import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Hero Section - Etap 2 */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl md:text-8xl font-bold tracking-tight text-white">
            {t('hero.title')}
          </h1>
          <p className="mt-6 text-xl text-zinc-400 font-mono">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-sm text-zinc-500">{t('hero.scrollCta')}</span>
          <div className="w-6 h-10 border-2 border-zinc-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-emerald-500 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Two Pillars - Etap 3 */}
      <section className="min-h-screen bg-zinc-950 py-24">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-2xl md:text-3xl text-zinc-300 mb-16">
            {t('pillars.heading')}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Robotyka Card */}
            <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/50">
              <span className="text-xs font-mono text-emerald-500 tracking-wider">
                {t('pillars.robotics.tag')}
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold text-white">
                {t('pillars.robotics.title')}
              </h3>
              <p className="mt-2 text-zinc-400">
                {t('pillars.robotics.description')}
              </p>
              <button className="mt-6 text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                {t('pillars.robotics.cta')} →
              </button>
            </div>

            {/* Dev Card */}
            <div className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 backdrop-blur-sm transition-all hover:border-emerald-500/50">
              <span className="text-xs font-mono text-emerald-500 tracking-wider">
                {t('pillars.dev.tag')}
              </span>
              <h3 className="mt-4 font-display text-3xl font-bold text-white">
                {t('pillars.dev.title')}
              </h3>
              <p className="mt-2 text-zinc-400">
                {t('pillars.dev.description')}
              </p>
              <button className="mt-6 text-emerald-400 font-medium hover:text-emerald-300 transition-colors">
                {t('pillars.dev.cta')} →
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

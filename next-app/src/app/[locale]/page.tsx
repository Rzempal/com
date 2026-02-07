import { setRequestLocale } from 'next-intl/server';
import { Hero, TwoPillars, StickyProjectDeck, Contact, FAQ, SiteMap, Footer } from '@/components/sections';
import { PCBBackground } from '@/components/ui';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative bg-[#030303] min-h-screen text-white selection:bg-emerald-500/30">
      {/* Warstwa 0: Tło PCB */}
      <PCBBackground />

      {/* Warstwa Contentu */}
      <div className="relative z-10">
        <Hero />
        <TwoPillars />
        <StickyProjectDeck />
        <Contact />
        <FAQ />
        <SiteMap />
        <Footer />
      </div>
    </main>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { Hero, TwoPillars, ProjectShowcase } from '@/components/sections';
import { SectionProgress, PCBBackground } from '@/components/ui';
import { CurrentFlow } from '@/components/animations';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative">
      {/* Fixed PCB background layer */}
      <PCBBackground />

      {/* Animated current flow */}
      <CurrentFlow />

      {/* Scroll-spy navigation */}
      <SectionProgress />

      {/* Page sections */}
      <Hero />
      <TwoPillars />

      {/* Project showcases */}
      <ProjectShowcase
        id="robotyka"
        sectionNumber="03"
        translationKey="robotyka"
        accentColor="cyan"
      />
      <ProjectShowcase
        id="apps"
        sectionNumber="04"
        translationKey="apps"
        accentColor="emerald"
      />
      <ProjectShowcase
        id="www"
        sectionNumber="05"
        translationKey="www"
        accentColor="cyan"
      />
      <ProjectShowcase
        id="studio"
        sectionNumber="06"
        translationKey="studio"
        accentColor="emerald"
      />
    </main>
  );
}

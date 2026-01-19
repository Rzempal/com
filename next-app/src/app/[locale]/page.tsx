import { setRequestLocale } from 'next-intl/server';
import { Hero, TwoPillars, PCBShowcase } from '@/components/sections';
import { SectionProgress } from '@/components/ui';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <SectionProgress />
      <Hero />
      <TwoPillars />
      <PCBShowcase />
    </main>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections';
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
      {/* Two Pillars - Etap 3 */}
      {/* PCB Showcase - Etap 4 */}
    </main>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <Hero />
      {/* Two Pillars - Etap 3 */}
      {/* PCB Showcase - Etap 4 */}
    </main>
  );
}

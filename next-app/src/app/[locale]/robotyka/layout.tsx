import { setRequestLocale } from 'next-intl/server';
import { RobotykaNav } from '@/components/robotyka/RobotykaNav';
import { SiteMap, Footer } from '@/components/sections';

export default async function RobotykaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <RobotykaNav />
      {children}
      <SiteMap />
      <Footer />
    </div>
  );
}

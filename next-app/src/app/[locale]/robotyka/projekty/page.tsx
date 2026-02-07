import { setRequestLocale } from 'next-intl/server';
import { RobotykaProjects } from '@/components/robotyka/RobotykaProjects';

export default async function ProjektyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RobotykaProjects />;
}

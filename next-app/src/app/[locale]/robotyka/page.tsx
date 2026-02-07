import { setRequestLocale } from 'next-intl/server';
import { RobotykaHome } from '@/components/robotyka/RobotykaHome';

export default async function RobotykaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RobotykaHome />;
}

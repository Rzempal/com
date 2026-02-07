import { setRequestLocale } from 'next-intl/server';
import { RobotykaExperience } from '@/components/robotyka/RobotykaExperience';

export default async function DoswiadczeniePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <RobotykaExperience />;
}

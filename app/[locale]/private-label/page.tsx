import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PrivateLabelPageClient from './PrivateLabelEnPage';
import { privateLabelPageMetadata } from './privateLabelSeo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PrivateLabelPage.metadata' });
  return privateLabelPageMetadata(locale, t('title'), t('description'));
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

export default async function PrivateLabelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <PrivateLabelPageClient />;
}

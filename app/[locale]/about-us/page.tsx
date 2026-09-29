import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ALL_LOCALES, buildPageMetadata } from '@/lib/seo';
import AboutClient from './AboutClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About.metadata' });
  const title = t('title');
  const description = t('description');

  return buildPageMetadata({
    title,
    description,
    locale,
    path: '/about-us',
    hreflangLocales: [...ALL_LOCALES],
    titleAbsolute: true,
  });
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutClient />;
}

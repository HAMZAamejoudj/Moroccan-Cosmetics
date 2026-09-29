import { getTranslations, setRequestLocale } from 'next-intl/server';
import BenefitsHubPage from './BenefitsHubPage';
import { buildPageMetadata } from '@/lib/seo';
import { BENEFITS_HUB_OG_IMAGE } from './benefitsHubSeo';
import { buildBenefitsHubStructuredData } from './benefitsHubStructuredData';

const BENEFITS_HREFLANG = ['en', 'fr', 'ar'] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Benefits.hub.metadata' });

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/benefits',
    hreflangLocales: [...BENEFITS_HREFLANG],
    titleAbsolute: true,
    ogImage: BENEFITS_HUB_OG_IMAGE,
  });
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

export default async function BenefitsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Benefits.hub' });
  const tMeta = await getTranslations({ locale, namespace: 'Benefits.hub.metadata' });

  const faqItems = [1, 2, 3, 4].map((i) => ({
    question: t(`faq.q${i}`),
    answer: t(`faq.a${i}`),
  }));

  const structuredData = buildBenefitsHubStructuredData(locale, {
    pageTitle: t('title'),
    pageDescription: tMeta('description'),
    breadcrumbHome: t('breadcrumbHome'),
    breadcrumbCurrent: t('breadcrumbCurrent'),
    faqItems,
  });

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BenefitsHubPage locale={locale} />
    </main>
  );
}

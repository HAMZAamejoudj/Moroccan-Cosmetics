import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata } from '@/lib/seo';
import ArganOilBenefitsArticle from './ArganOilBenefitsArticle';
import {
  arganOilBenefitsMetadataDescription,
  arganOilBenefitsMetadataTitle,
  arganOilBenefitsStructuredData,
  ARGAN_OIL_BENEFITS_OG_IMAGE,
} from './arganOilBenefitsSeo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') {
    return {};
  }

  return buildPageMetadata({
    title: arganOilBenefitsMetadataTitle,
    description: arganOilBenefitsMetadataDescription,
    locale: 'en',
    path: '/benefits/argan-oil-benefits',
    hreflangLocales: ['en'],
    titleAbsolute: true,
    ogImage: ARGAN_OIL_BENEFITS_OG_IMAGE,
    ogType: 'article',
  });
}

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export default async function ArganOilBenefitsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'en') {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(arganOilBenefitsStructuredData) }}
      />
      <ArganOilBenefitsArticle />
    </main>
  );
}

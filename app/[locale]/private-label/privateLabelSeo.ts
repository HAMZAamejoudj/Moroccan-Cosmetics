import { absolutePageUrl, buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export const PRIVATE_LABEL_PATH = '/private-label';
export const PRIVATE_LABEL_OG_IMAGE = 'https://moroccan-cosmetics.com/images/benefits/benefits-hub-og.webp';

export function privateLabelPageMetadata(locale: string, title: string, description: string): Metadata {
  return buildPageMetadata({
    title,
    description,
    locale,
    path: PRIVATE_LABEL_PATH,
    hreflangLocales: ['en', 'fr', 'ar'],
    titleAbsolute: locale === 'en',
    ogImage: PRIVATE_LABEL_OG_IMAGE,
  });
}

export function privateLabelStructuredData(
  locale: string,
  pageTitle: string,
  pageDescription: string,
  breadcrumbHome: string,
  breadcrumbCurrent: string,
  faqEntities: { question: string; answer: string }[]
) {
  const pageUrl = absolutePageUrl(locale, PRIVATE_LABEL_PATH);
  const homeUrl = absolutePageUrl(locale, '/');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        name: pageTitle,
        url: pageUrl,
        description: pageDescription,
        isPartOf: { '@type': 'WebSite', name: 'Moroccan Cosmetics', url: homeUrl },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: breadcrumbCurrent, item: pageUrl },
        ],
      },
      ...(faqEntities.length >= 2
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: faqEntities.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: { '@type': 'Answer', text: item.answer },
              })),
            },
          ]
        : []),
    ],
  };
}

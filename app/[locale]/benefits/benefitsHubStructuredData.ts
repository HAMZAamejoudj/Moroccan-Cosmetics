import { siteOrganizationSchema } from './siteOrganization';

const ARGAN_BENEFITS_DETAIL_URL = 'https://moroccan-cosmetics.com/en/benefits/argan-oil-benefits/';

export type BenefitsHubFaqItem = { question: string; answer: string };

export function buildBenefitsHubStructuredData(
  locale: string,
  options: {
    pageTitle: string;
    pageDescription: string;
    breadcrumbHome: string;
    breadcrumbCurrent: string;
    faqItems: BenefitsHubFaqItem[];
  },
) {
  const hubUrl = `https://moroccan-cosmetics.com/${locale}/benefits/`;
  const homeUrl = `https://moroccan-cosmetics.com/${locale}/`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: options.pageTitle,
        url: hubUrl,
        description: options.pageDescription,
        publisher: siteOrganizationSchema,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Argan Oil Benefits',
              url: ARGAN_BENEFITS_DETAIL_URL,
            },
          ],
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: options.breadcrumbHome, item: homeUrl },
          { '@type': 'ListItem', position: 2, name: options.breadcrumbCurrent, item: hubUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: options.faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };
}

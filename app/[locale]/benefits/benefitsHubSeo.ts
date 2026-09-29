import { BENEFITS_HUB_URL } from './benefitsHreflang';
import { benefitsHubFaqItems } from './benefitsHubFaq';
import { siteOrganizationSchema } from './siteOrganization';

export const BENEFITS_HUB_CANONICAL = BENEFITS_HUB_URL;
export const BENEFITS_HUB_OG_IMAGE = 'https://moroccan-cosmetics.com/images/benefits/benefits-hub-og.webp';

export const BENEFITS_HUB_TITLE = 'Moroccan Beauty Ingredient Benefits: Argan, Clay and More';
export const BENEFITS_HUB_DESCRIPTION =
  'Honest, research-based benefits of argan oil, prickly pear oil, black soap, rhassoul clay and rose water - and what brands can safely claim.';

const ARGAN_BENEFITS_DETAIL_URL = 'https://moroccan-cosmetics.com/en/benefits/argan-oil-benefits/';

export const benefitsHubStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: 'Benefits of Moroccan Beauty Ingredients',
      url: BENEFITS_HUB_CANONICAL,
      description: 'Research-based benefits of Moroccan beauty ingredients and guidance on cosmetic claims.',
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
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moroccan-cosmetics.com/en/' },
        { '@type': 'ListItem', position: 2, name: 'Benefits', item: BENEFITS_HUB_CANONICAL },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: benefitsHubFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
};

import { BENEFITS_HUB_URL } from '../benefitsHreflang';
import { siteOrganizationSchema } from '../siteOrganization';
import { arganOilBenefitsFaqItems } from './arganOilBenefitsFaq';

export const ARGAN_OIL_BENEFITS_CANONICAL = 'https://moroccan-cosmetics.com/en/benefits/argan-oil-benefits/';
export const ARGAN_OIL_BENEFITS_OG_IMAGE =
  'https://moroccan-cosmetics.com/images/argan-oil-benefits/hero-argan-oil.webp';

export const ARGAN_CONTENT_PUBLISHED = '2026-09-28';

export const arganOilBenefitsStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      headline: 'Argan Oil Benefits for Skin and Hair: What the Research Actually Shows',
      description:
        'Argan oil benefits graded by evidence, common myths, and how brands can make defensible claims.',
      author: siteOrganizationSchema,
      publisher: siteOrganizationSchema,
      image: ARGAN_OIL_BENEFITS_OG_IMAGE,
      datePublished: ARGAN_CONTENT_PUBLISHED,
      dateModified: ARGAN_CONTENT_PUBLISHED,
      mainEntityOfPage: ARGAN_OIL_BENEFITS_CANONICAL,
      citation: [
        'Boucetta KQ et al. The effect of dietary and/or cosmetic argan oil on postmenopausal skin elasticity. Clin Interv Aging. 2015;10:339-349.',
        'Faria PM et al. Hair protective effect of argan oil and cupuassu butter post treatment with hair dye. J Cosmet Dermatol Sci Appl. 2013;3:40-44.',
        'Sharifi et al. Argan oil as a pretreatment of human hair before exposure to oxidative damage. J Cosmet Dermatol. 2022;21(10):5010-5017.',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: arganOilBenefitsFaqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://moroccan-cosmetics.com/en/' },
        { '@type': 'ListItem', position: 2, name: 'Benefits', item: BENEFITS_HUB_URL },
        { '@type': 'ListItem', position: 3, name: 'Argan Oil Benefits', item: ARGAN_OIL_BENEFITS_CANONICAL },
      ],
    },
  ],
};

export const arganOilBenefitsMetadataTitle =
  'Argan Oil Benefits for Skin and Hair: What the Research Shows';
export const arganOilBenefitsMetadataDescription =
  'Which argan oil benefits are backed by studies, which are myths, and how brands can make claims they can defend. An honest guide from a Moroccan producer.';

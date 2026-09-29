export const homeBestSellerIds = [
  'blackSeed',
  'cyperus',
  'frankincense',
  'akerFassi',
  'roseWater',
  'arganCosmetic',
  'arganCulinary',
  'nila',
  'pricklyPear',
  'blackSoap',
  'ghassoul',
  'sidr',
] as const;

export type HomeBestSellerId = (typeof homeBestSellerIds)[number];

/** Promotional bulk images from /public/images/prodcut (mapped per product). */
export const homeBestSellerImages: Record<HomeBestSellerId, string> = {
  blackSeed: '/images/bestsellers/black-seed.webp',
  cyperus: '/images/bestsellers/cyperus.webp',
  frankincense: '/images/bestsellers/frankincense.webp',
  akerFassi: '/images/bestsellers/aker-fassi.webp',
  roseWater: '/images/bestsellers/rose-water.webp',
  arganCosmetic: '/images/bestsellers/argan-cosmetic.webp',
  arganCulinary: '/images/bestsellers/argan-culinary.webp',
  nila: '/images/bestsellers/nila.webp',
  pricklyPear: '/images/bestsellers/prickly-pear.webp',
  blackSoap: '/images/bestsellers/black-soap.webp',
  ghassoul: '/images/bestsellers/ghassoul.webp',
  sidr: '/images/bestsellers/sidr.webp',
};

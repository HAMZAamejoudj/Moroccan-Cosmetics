import { ProductItem } from './types';
import { HomeBestSellerId } from '../homeBestSellers';
import { blackSeedProduct } from './items/blackSeed';
import { cyperusProduct } from './items/cyperus';
import { frankincenseProduct } from './items/frankincense';
import { akerFassiProduct } from './items/akerFassi';
import { roseWaterProduct } from './items/roseWater';
import { arganCosmeticProduct } from './items/arganCosmetic';
import { arganCulinaryProduct } from './items/arganCulinary';
import { nilaProduct } from './items/nila';
import { pricklyPearProduct } from './items/pricklyPear';
import { blackSoapProduct } from './items/blackSoap';
import { ghassoulProduct } from './items/ghassoul';
import { sidrProduct } from './items/sidr';

export * from './types';

export const productsList: ProductItem[] = [
  blackSeedProduct,
  cyperusProduct,
  frankincenseProduct,
  akerFassiProduct,
  roseWaterProduct,
  arganCosmeticProduct,
  arganCulinaryProduct,
  nilaProduct,
  pricklyPearProduct,
  blackSoapProduct,
  ghassoulProduct,
  sidrProduct,
];

export function getAllProducts(): ProductItem[] {
  return productsList;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return productsList.find((p) => p.slug === slug);
}

export function getProductById(id: HomeBestSellerId): ProductItem | undefined {
  return productsList.find((p) => p.id === id);
}

export function getRelatedProducts(currentSlug: string, count: number = 3): ProductItem[] {
  return productsList.filter((p) => p.slug !== currentSlug).slice(0, count);
}

export function getAllProductStaticParams(): { locale: string; slug: string }[] {
  const locales = ['en', 'fr', 'ar'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const product of productsList) {
      params.push({ locale, slug: product.slug });
    }
  }

  return params;
}


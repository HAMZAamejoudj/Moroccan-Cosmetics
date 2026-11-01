import { HomeBestSellerId } from '../homeBestSellers';

export type ProductCategory = 'oils' | 'powders' | 'traditional' | 'hydrosols';

export interface ProductBenefit {
  title: string;
  desc: string;
}

export interface ProductFaq {
  q: string;
  a: string;
}

export interface ProductLocalizedContent {
  name: string;
  subtitle: string;
  badge: string;
  shortDesc: string;
  headline: string;
  description: string[];
  keyBenefits: ProductBenefit[];
  applications: string[];
  bulkPackaging: string[];
  privateLabelOptions: string[];
  faqs: ProductFaq[];
}

export interface ProductItem {
  id: HomeBestSellerId;
  slug: string;
  image: string;
  category: ProductCategory;
  botanicalName: string;
  inciName: string;
  casNumber?: string;
  origin: string;
  extraction: string;
  shelfLife: string;
  moq: string;
  certifications: string[];
  en: ProductLocalizedContent;
  fr: ProductLocalizedContent;
  ar: ProductLocalizedContent;
}


import type { BlogPost } from './types';
import type { BlogContentLocale } from './locales';

const SITE = 'https://moroccan-cosmetics.com';

export function blogPostUrl(slug: string, locale: string): string {
  return `${SITE}/${locale}/blog/${slug}/`;
}

function blogPostPath(slug: string, locale: BlogContentLocale): string {
  return `/${locale}/blog/${slug}/`;
}

type PhraseMap = { phrase: string; slug: string }[];

const PHRASES_EN: PhraseMap = [
  { phrase: 'our guide on how to choose an argan oil supplier', slug: 'how-to-choose-argan-oil-supplier' },
  { phrase: 'our guide on importing argan oil from Morocco', slug: 'import-argan-oil-from-morocco' },
  { phrase: 'our guide on how to spot fake argan oil', slug: 'how-to-spot-fake-argan-oil' },
  { phrase: 'See our guide on how to spot fake argan oil', slug: 'how-to-spot-fake-argan-oil' },
  { phrase: 'our wholesale price guide', slug: 'argan-oil-wholesale-price' },
  { phrase: 'wholesale price guide', slug: 'argan-oil-wholesale-price' },
  { phrase: 'how to choose an argan oil supplier', slug: 'how-to-choose-argan-oil-supplier' },
  { phrase: 'how to import argan oil from Morocco', slug: 'import-argan-oil-from-morocco' },
  { phrase: 'import argan oil from Morocco', slug: 'import-argan-oil-from-morocco' },
  { phrase: 'how to start your own argan oil brand', slug: 'how-to-start-argan-oil-brand' },
  { phrase: 'Moroccan hammam products', slug: 'moroccan-hammam-products-wholesale' },
  { phrase: 'argan oil wholesale price', slug: 'argan-oil-wholesale-price' },
];

const PHRASES_FR: PhraseMap = [
  { phrase: 'notre guide pour repérer la fausse huile d’argan', slug: 'how-to-spot-fake-argan-oil' },
  { phrase: 'notre guide des prix de gros', slug: 'argan-oil-wholesale-price' },
  { phrase: 'choisir un fournisseur d’huile d’argan', slug: 'how-to-choose-argan-oil-supplier' },
  { phrase: 'importer l’huile d’argan du Maroc', slug: 'import-argan-oil-from-morocco' },
  { phrase: 'lancer votre marque d’huile d’argan', slug: 'how-to-start-argan-oil-brand' },
  { phrase: 'produits hammam marocains', slug: 'moroccan-hammam-products-wholesale' },
];

const PHRASES_AR: PhraseMap = [
  { phrase: 'دليلنا للتعرف على زيت الأرغان المزيف', slug: 'how-to-spot-fake-argan-oil' },
  { phrase: 'دليل أسعار الجملة', slug: 'argan-oil-wholesale-price' },
  { phrase: 'اختيار مورد زيت الأرغان', slug: 'how-to-choose-argan-oil-supplier' },
  { phrase: 'استيراد زيت الأرغان من المغرب', slug: 'import-argan-oil-from-morocco' },
  { phrase: 'إطلاق علامة زيت الأرغان', slug: 'how-to-start-argan-oil-brand' },
  { phrase: 'منتجات الحمام المغربي', slug: 'moroccan-hammam-products-wholesale' },
];

function phrasesFor(locale: BlogContentLocale): PhraseMap {
  if (locale === 'fr') return PHRASES_FR;
  if (locale === 'ar') return PHRASES_AR;
  return PHRASES_EN;
}

const PRIVATE_LABEL: Record<BlogContentLocale, RegExp> = {
  en: /\bprivate label\b/i,
  fr: /\bmarque blanche\b/i,
  ar: /العلامة الخاصة|ماركة خاصة/i,
};

export function applyInternalLinks(
  markdown: string,
  publishedSlugs: Set<string>,
  locale: BlogContentLocale,
  currentSlug?: string
): string {
  let result = markdown;

  for (const { phrase, slug } of phrasesFor(locale)) {
    if (!publishedSlugs.has(slug)) continue;
    if (currentSlug && slug === currentSlug) continue;
    const path = blogPostPath(slug, locale);
    const re = new RegExp(`(?<!\\[)${escapeRegExp(phrase)}(?!\\])(?![^(]*\\))`, 'i');
    result = result.replace(re, (match) => `[${match}](${path})`);
  }

  const plPath = `/${locale}/private-label/`;
  if (!result.includes(plPath) && !result.includes(`${SITE}/${locale}/private-label/`)) {
    const plPattern = PRIVATE_LABEL[locale];
    const m = plPattern.exec(result);
    if (m) {
      result =
        result.slice(0, m.index) + `[${m[0]}](${plPath})` + result.slice(m.index + m[0].length);
    }
  }

  if (locale === 'en') {
    const benefitsPath = '/en/benefits/argan-oil-benefits/';
    const benefitsPhrase = /Argan Oil Benefits/g;
    if (benefitsPhrase.test(result) && !result.includes(benefitsPath)) {
      result = result.replace(benefitsPhrase, `[Argan Oil Benefits](${benefitsPath})`);
    }
  }

  return result;
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getRelatedPosts(all: BlogPost[], current: BlogPost, limit = 3): BlogPost[] {
  return all
    .filter((p) => p.slug !== current.slug && p.category === current.category)
    .sort((a, b) => b.resolvedDate.localeCompare(a.resolvedDate))
    .slice(0, limit);
}

import { SITE_ORIGIN, absolutePageUrl } from '@/lib/seo';
import { blogPostUrl } from './internalLinks';
import type { BlogPost } from './types';
import type { BlogContentLocale } from './locales';

const INDEX_META: Record<
  BlogContentLocale,
  { title: string; description: string; breadcrumbBlog: string; breadcrumbHome: string }
> = {
  en: {
    title: 'Blog: Argan Oil Sourcing, Private Label and Regulations',
    description:
      'Practical guides for beauty brands and buyers: sourcing argan oil from Morocco, private label, EU and US rules, certifications and Moroccan ingredients.',
    breadcrumbHome: 'Home',
    breadcrumbBlog: 'Blog',
  },
  fr: {
    title: 'Blog : sourcing argan, marque blanche et réglementation',
    description:
      'Guides pratiques pour les marques beauté et acheteurs : sourcer l’huile d’argan au Maroc, marque blanche, règles UE et USA, certifications et ingrédients marocains.',
    breadcrumbHome: 'Accueil',
    breadcrumbBlog: 'Blog',
  },
  ar: {
    title: 'المدونة: توريد الأرغان، العلامة الخاصة واللوائح',
    description:
      'أدلة عملية لعلامات التجميل والمشترين: توريد زيت الأرغان من المغرب، العلامة الخاصة، قواعد الاتحاد الأوروبي والولايات المتحدة، الشهادات والمكونات المغربية.',
    breadcrumbHome: 'الرئيسية',
    breadcrumbBlog: 'المدونة',
  },
};

export function getBlogIndexMeta(locale: BlogContentLocale) {
  return INDEX_META[locale] ?? INDEX_META.en;
}

export function buildBlogIndexJsonLd(posts: BlogPost[], locale: BlogContentLocale) {
  const meta = getBlogIndexMeta(locale);
  const indexUrl = absolutePageUrl(locale, '/blog');

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        name: meta.title,
        description: meta.description,
        url: indexUrl,
        inLanguage: locale,
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: blogPostUrl(p.slug, locale),
          datePublished: p.resolvedDate,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: meta.breadcrumbHome, item: absolutePageUrl(locale, '/') },
          { '@type': 'ListItem', position: 2, name: meta.breadcrumbBlog, item: indexUrl },
        ],
      },
    ],
  };
}

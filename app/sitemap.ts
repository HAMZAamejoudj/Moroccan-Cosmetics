import { MetadataRoute } from 'next';
import { getPublishedPosts } from '@/lib/blog/posts';
import { sitemapDateForPath } from '@/lib/sitemapLastModified';
import { BLOG_CONTENT_LOCALES } from '@/lib/blog/locales';
import { productsList } from '@/lib/productsData';

export const dynamic = 'force-static';

const locales = ['en', 'fr', 'ar'];
const baseUrl = 'https://moroccan-cosmetics.com';

const pages = [
  '',
  '/products',
  '/about-us',
  '/benefits',
  '/benefits/argan-oil-benefits',
  '/private-label',
  '/blog',
  '/faq',
  '/contact',
];

const enOnlyPages = new Set(['/benefits/argan-oil-benefits']);

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  pages.forEach((page) => {
    const pageLocales = enOnlyPages.has(page) ? ['en'] : locales;
    pageLocales.forEach((locale) => {
      const pathKey = page === '' ? '' : page;
      sitemapEntries.push({
        url: page === '' ? `${baseUrl}/${locale}/` : `${baseUrl}/${locale}${page}/`,
        lastModified: sitemapDateForPath(pathKey),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: enOnlyPages.has(page)
            ? {
                en: `${baseUrl}/en${page === '' ? '/' : `${page}/`}`,
                'x-default': `${baseUrl}/en${page === '' ? '/' : `${page}/`}`,
              }
            : {
                en: `${baseUrl}/en${page === '' ? '/' : `${page}/`}`,
                fr: `${baseUrl}/fr${page === '' ? '/' : `${page}/`}`,
                ar: `${baseUrl}/ar${page === '' ? '/' : `${page}/`}`,
              },
        },
      });
    });
  });

  const productSlugs = productsList.map((p) => p.slug);
  for (const slug of productSlugs) {
    const path = `/products/${slug}`;
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${path}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
        alternates: {
          languages: {
            en: `${baseUrl}/en${path}/`,
            fr: `${baseUrl}/fr${path}/`,
            ar: `${baseUrl}/ar${path}/`,
            'x-default': `${baseUrl}/en${path}/`,
          },
        },
      });
    }
  }

  const slugs = getPublishedPosts('en').map((p) => p.slug);
  for (const slug of slugs) {
    const path = `/blog/${slug}`;
    const post = getPublishedPosts('en').find((p) => p.slug === slug);
    const lastMod = post ? new Date(post.resolvedDate) : sitemapDateForPath('/blog');
    sitemapEntries.push({
      url: `${baseUrl}/en${path}/`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en${path}/`,
          fr: `${baseUrl}/fr${path}/`,
          ar: `${baseUrl}/ar${path}/`,
          'x-default': `${baseUrl}/en${path}/`,
        },
      },
    });
  }

  return sitemapEntries;
}

import { SITE_ORIGIN, absolutePageUrl } from '@/lib/seo';
import { siteOrganizationSchema } from '@/app/[locale]/benefits/siteOrganization';
import { blogPostUrl } from './internalLinks';
import { extractFaqFromMarkdown } from './faqFromMarkdown';
import { getBlogIndexMeta } from './blogIndexSeo';
import { getBlogAuthor } from './blogConfig';
import type { BlogPost } from './types';
import type { BlogContentLocale } from './locales';

export function postCanonical(slug: string, locale: BlogContentLocale): string {
  return blogPostUrl(slug, locale);
}

export function postOgImage(slug: string, imagePath: string): string {
  if (imagePath.startsWith('http')) return imagePath;
  return `${SITE_ORIGIN}${imagePath}`;
}

export function buildBlogPostJsonLd(post: BlogPost, imagePath: string) {
  const locale = post.locale as BlogContentLocale;
  const url = postCanonical(post.slug, locale);
  const image = postOgImage(post.slug, imagePath);
  const faqItems = extractFaqFromMarkdown(post.body);
  const indexMeta = getBlogIndexMeta(locale);
  const authorConfig = getBlogAuthor(locale);
  const authorSchema: Record<string, unknown> = {
    '@type': 'Person',
    name: post.resolvedAuthor,
  };
  if (authorConfig.role && authorConfig.role !== 'TODO') {
    authorSchema.jobTitle = authorConfig.role;
  }
  if (authorConfig.photo && authorConfig.photo !== 'TODO') {
    authorSchema.image = authorConfig.photo.startsWith('http')
      ? authorConfig.photo
      : `${SITE_ORIGIN}${authorConfig.photo}`;
  }

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      image,
      datePublished: post.resolvedDate,
      dateModified: post.resolvedDate,
      author: authorSchema,
      publisher: siteOrganizationSchema,
      mainEntityOfPage: url,
      url,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: indexMeta.breadcrumbHome, item: absolutePageUrl(locale, '/') },
        { '@type': 'ListItem', position: 2, name: indexMeta.breadcrumbBlog, item: absolutePageUrl(locale, '/blog') },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  if (faqItems.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

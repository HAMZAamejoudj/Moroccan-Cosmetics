import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildPageMetadata, ALL_LOCALES } from '@/lib/seo';
import BlogArticle from '@/components/blog/BlogArticle';
import {
  assertBlogLocale,
  blogImagePath,
  getAllBlogStaticParams,
  getPostBySlug,
  getPublishedPosts,
  getPublishedSlugSet,
} from '@/lib/blog/posts';
import { renderBlogMarkdown } from '@/lib/blog/renderMarkdown';
import { getRelatedPosts } from '@/lib/blog/internalLinks';
import { buildBlogPostJsonLd, postOgImage } from '@/lib/blog/blogPostSeo';
import { BLOG_CONTENT_LOCALES } from '@/lib/blog/locales';
import { getBlogAuthor } from '@/lib/blog/blogConfig';

export function generateStaticParams() {
  return getAllBlogStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!BLOG_CONTENT_LOCALES.includes(locale as (typeof BLOG_CONTENT_LOCALES)[number])) {
    return {};
  }
  const blogLocale = assertBlogLocale(locale);
  const post = getPostBySlug(slug, blogLocale);
  if (!post) return {};

  const imagePath = blogImagePath(slug);
  const ogImage = postOgImage(slug, imagePath);

  return buildPageMetadata({
    title: post.seoTitle,
    description: post.description,
    locale,
    path: `/blog/${slug}`,
    hreflangLocales: [...ALL_LOCALES],
    titleAbsolute: true,
    ogType: 'article',
    ogImage,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!BLOG_CONTENT_LOCALES.includes(locale as (typeof BLOG_CONTENT_LOCALES)[number])) {
    notFound();
  }
  const blogLocale = assertBlogLocale(locale);
  setRequestLocale(locale);

  const post = getPostBySlug(slug, blogLocale);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const publishedSlugs = getPublishedSlugSet(blogLocale);
  const html = renderBlogMarkdown(post.body, publishedSlugs, blogLocale, post.slug);
  const related = getRelatedPosts(getPublishedPosts(blogLocale), post);
  const jsonLd = buildBlogPostJsonLd(post, blogImagePath(slug));
  const author = getBlogAuthor(blogLocale);

  const categoryLabel = t(`categories.${post.category}` as 'categories.Buying & Sourcing');
  const labels = {
    breadcrumbHome: t('article.breadcrumbHome'),
    breadcrumbBlog: t('article.breadcrumbBlog'),
    onThisPage: t('article.onThisPage'),
    minRead: t('article.minRead', { minutes: post.readingTimeMinutes }),
    relatedTitle: t('article.relatedTitle'),
    allGuides: t('article.allGuides'),
    authorCtaTitle: t('article.authorCtaTitle'),
    authorCtaQuote: t('article.authorCtaQuote'),
    authorCtaPrivateLabel: t('article.authorCtaPrivateLabel'),
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogArticle
        post={post}
        html={html}
        related={related}
        imagePath={blogImagePath(slug)}
        relatedImagePaths={Object.fromEntries(
          related.map((r) => [r.slug, blogImagePath(r.slug)])
        )}
        author={author}
        labels={labels}
        locale={locale}
        categoryLabel={categoryLabel}
      />
    </main>
  );
}

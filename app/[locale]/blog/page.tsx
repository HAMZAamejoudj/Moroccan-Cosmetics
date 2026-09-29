import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { buildPageMetadata, ALL_LOCALES } from '@/lib/seo';
import { blogImagePath, getPublishedPosts } from '@/lib/blog/posts';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogCategoryFilter from '@/components/blog/BlogCategoryFilter';
import { buildBlogIndexJsonLd } from '@/lib/blog/blogIndexSeo';
import { assertBlogLocale } from '@/lib/blog/posts';
import { BLOG_CONTENT_LOCALES } from '@/lib/blog/locales';

const LIST_ID = 'blog-post-list';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!BLOG_CONTENT_LOCALES.includes(locale as (typeof BLOG_CONTENT_LOCALES)[number])) {
    return {};
  }
  const t = await getTranslations({ locale, namespace: 'Blog' });

  return buildPageMetadata({
    title: t('index.metaTitle'),
    description: t('index.metaDescription'),
    locale,
    path: '/blog',
    hreflangLocales: [...ALL_LOCALES],
    titleAbsolute: true,
  });
}

export function generateStaticParams() {
  return BLOG_CONTENT_LOCALES.map((locale) => ({ locale }));
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!BLOG_CONTENT_LOCALES.includes(locale as (typeof BLOG_CONTENT_LOCALES)[number])) {
    notFound();
  }
  const blogLocale = assertBlogLocale(locale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'Blog' });
  const posts = getPublishedPosts(blogLocale);
  const jsonLd = buildBlogIndexJsonLd(posts, blogLocale);

  const linkBtnPrimary =
    'inline-flex items-center justify-center rounded-full font-semibold px-8 py-3.5 bg-sunrise text-deep-navy shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200';
  const linkBtnSecondary =
    'inline-flex items-center justify-center rounded-full font-semibold px-8 py-3.5 border-2 border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white transition-colors duration-200';

  const [featuredPost, ...regularPosts] = posts;

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 md:pt-36">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-deep-navy leading-tight mb-6 max-w-4xl">
            {t('index.title')}
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-3xl leading-relaxed">{t('index.intro')}</p>
        </header>

        <BlogCategoryFilter listId={LIST_ID} />

        <div id={LIST_ID}>
          {/* Featured Post takes full width, and handles its own category filtering via CSS */}
          {featuredPost && (
            <div className="mb-10">
              <BlogPostCard
                post={featuredPost}
                imagePath={blogImagePath(featuredPost.slug)}
                priorityImage={true}
                variant="featured"
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {regularPosts.map((post) => (
              <BlogPostCard
                key={post.slug}
                post={post}
                imagePath={blogImagePath(post.slug)}
                priorityImage={false}
              />
            ))}
          </div>
        </div>

        <section
          className="mt-28 rounded-[2.5rem] border border-sand bg-gradient-to-br from-[#F8FAFC] to-sand/20 p-10 md:p-16 text-center shadow-sm relative overflow-hidden"
          aria-label="Call to action"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <p className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mb-10 relative z-10 max-w-2xl mx-auto leading-snug">{t('index.ctaTitle')}</p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
            <Link href="/quote" className={linkBtnPrimary}>{t('index.ctaQuote')}</Link>
            <Link href="/private-label" className={linkBtnSecondary}>{t('index.ctaPrivateLabel')}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}

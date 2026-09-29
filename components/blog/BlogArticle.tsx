import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { type BlogAuthorConfig, isBlogAuthorConfigured } from '@/lib/blog/blogConfig';
import type { BlogPost } from '@/lib/blog/types';
import { defaultBlogImagePath } from '@/lib/blog/blogImages';
import { countH2InMarkdown, extractH2Headings, tocDisplayLabel } from '@/lib/blog/renderMarkdown';
import BlogPostCard from './BlogPostCard';
import { Clock, Tag, ChevronRight, User } from 'lucide-react';

const linkBtnPrimary =
  'inline-flex items-center justify-center rounded-full font-semibold px-8 py-3 bg-sunrise text-deep-navy shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200';

export type BlogArticleLabels = {
  breadcrumbHome: string;
  breadcrumbBlog: string;
  onThisPage: string;
  minRead: string;
  relatedTitle: string;
  allGuides: string;
  authorCtaTitle: string;
  authorCtaQuote: string;
  authorCtaPrivateLabel: string;
};

type Props = {
  post: BlogPost;
  html: string;
  related: BlogPost[];
  imagePath: string;
  relatedImagePaths: Record<string, string>;
  author: BlogAuthorConfig;
  labels: BlogArticleLabels;
  locale: string;
  categoryLabel: string;
};

export default function BlogArticle({
  post,
  html,
  related,
  imagePath,
  relatedImagePaths,
  author,
  labels,
  locale,
  categoryLabel,
}: Props) {
  const h2Count = countH2InMarkdown(post.body);
  const headings = extractH2Headings(post.body);
  const showToc = h2Count >= 3; // Show TOC earlier if there are 3+ headings
  const showAuthorBox = isBlogAuthorConfigured(author);
  const isRtl = locale === 'ar';
  const dateLocale = locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-MA' : 'en-GB';

  return (
    <div className="min-h-screen bg-white" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Header */}
      <header className="bg-soft-white border-b border-sand/50 pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm font-medium flex items-center justify-center flex-wrap gap-2 text-muted">
            <Link href="/" className="hover:text-ocean transition-colors">{labels.breadcrumbHome}</Link>
            <ChevronRight className="w-4 h-4 text-muted-light shrink-0" />
            <Link href="/blog" className="hover:text-ocean transition-colors">{labels.breadcrumbBlog}</Link>
            <ChevronRight className="w-4 h-4 text-muted-light shrink-0" />
            <span className="text-deep-navy line-clamp-1 max-w-[12rem] sm:max-w-[20rem]" aria-current="page">
              {post.title}
            </span>
          </nav>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-sand shadow-sm text-ocean px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
            <Tag className="w-3.5 h-3.5" />
            {categoryLabel}
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-deep-navy leading-tight mb-8">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-muted-light font-medium">
            {showAuthorBox && (
              <>
                <span className="flex items-center gap-1.5 text-deep-navy/80"><User className="w-4 h-4" /> {author.name}</span>
                <span aria-hidden="true" className="w-1 h-1 rounded-full bg-sand"></span>
              </>
            )}
            <time dateTime={post.resolvedDate}>
              {new Date(post.resolvedDate + 'T12:00:00').toLocaleDateString(dateLocale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-sand"></span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {labels.minRead}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <figure className="mb-16 -mt-24 md:-mt-32 relative z-10 rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-sand shadow-2xl bg-white p-2">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-xl md:rounded-[2rem] overflow-hidden bg-sand/30">
            <Image
              src={imagePath}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
              priority
            />
          </div>
        </figure>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          {/* TOC Sidebar */}
          {showToc && (
            <aside className="lg:w-[280px] shrink-0 w-full lg:sticky lg:top-32 order-2 lg:order-1">
              <nav
                aria-label="Table of contents"
                className="rounded-3xl border border-sand bg-[#F8FAFC]/50 p-6 shadow-sm"
              >
                <p className="font-serif font-bold text-deep-navy mb-5 text-lg pb-4 border-b border-sand/80">{labels.onThisPage}</p>
                <ol className="flex flex-col gap-3 text-sm leading-relaxed list-none p-0 m-0">
                  {headings.map((h, i) => (
                    <li key={h.id} className="group">
                      <a
                        href={`#${h.id}`}
                        className="flex items-start gap-3 text-muted hover:text-ocean transition-colors"
                      >
                        <span className="shrink-0 w-5 h-5 rounded bg-white border border-sand text-[10px] font-bold text-ocean flex items-center justify-center mt-0.5 group-hover:border-ocean/30 transition-colors">
                          {i + 1}
                        </span>
                        <span className="pt-px">{tocDisplayLabel(h.text, i)}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>
          )}

          {/* Article Body */}
          <div className={`order-1 lg:order-2 ${showToc ? 'lg:w-[calc(100%-280px-4rem)] max-w-3xl' : 'max-w-3xl mx-auto w-full'}`}>
            <div className="blog-prose mb-16" dangerouslySetInnerHTML={{ __html: html }} />

            <div className="border-t border-sand/80 pt-10">
              {showAuthorBox && (
                <aside className="rounded-3xl border border-sand bg-white p-6 md:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm mb-10 text-center sm:text-left">
                  <Image
                    src={author.photo}
                    alt=""
                    width={96}
                    height={96}
                    className="rounded-full object-cover shrink-0 w-20 h-20 md:w-24 md:h-24 shadow-sm border border-sand"
                  />
                  <div>
                    <p className="font-bold text-deep-navy text-lg mb-1">{author.name}</p>
                    <p className="text-sm font-semibold text-ocean uppercase tracking-wider mb-3">{author.role}</p>
                    <p className="text-sm leading-relaxed text-muted">{author.bio}</p>
                  </div>
                </aside>
              )}

              <div className="p-8 md:p-12 rounded-[2rem] border border-sand text-center space-y-6 bg-gradient-to-br from-soft-white to-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sunrise/10 rounded-full blur-3xl"></div>
                <p className="text-2xl font-serif font-bold text-deep-navy relative z-10">{labels.authorCtaTitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link href="/quote" className={linkBtnPrimary}>{labels.authorCtaQuote}</Link>
                  <Link
                    href="/private-label"
                    className="inline-flex items-center justify-center rounded-full font-semibold px-8 py-3 border-2 border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white transition-colors"
                  >
                    {labels.authorCtaPrivateLabel}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section
          className="border-t border-sand/50 bg-soft-white py-20"
          aria-labelledby="related-guides"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <h2 id="related-guides" className="text-3xl font-serif font-bold text-deep-navy">
                {labels.relatedTitle}
              </h2>
              <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-bold text-ocean hover:text-sunrise transition-colors bg-white px-5 py-2.5 rounded-full border border-sand shadow-sm hover:shadow">
                {labels.allGuides} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div
              className={`grid gap-6 lg:gap-8 ${
                related.length === 1
                  ? 'grid-cols-1 max-w-md'
                  : related.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {related.map((r) => (
                <BlogPostCard
                  key={r.slug}
                  post={r}
                  imagePath={relatedImagePaths[r.slug] ?? defaultBlogImagePath(r.slug)}
                  headingLevel="h3"
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

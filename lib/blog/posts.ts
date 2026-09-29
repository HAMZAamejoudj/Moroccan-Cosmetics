import 'server-only';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {
  AUTHOR_PLACEHOLDER,
  DATE_PLACEHOLDER,
  getBlogAuthor,
} from './blogConfig';
import { BLOG_PUBLISH_DATE_OVERRIDES } from './blogPublishDates';
import { BLOG_IMAGE_BY_SLUG, BLOG_PLACEHOLDER_IMAGE } from './blogImages';
import { readingTimeMinutes, countWords } from './readingTime';
import type { BlogPost, BlogPostFrontMatter } from './types';
import { BLOG_CONTENT_LOCALES, type BlogContentLocale, isBlogContentLocale } from './locales';

function contentDir(locale: BlogContentLocale): string {
  return path.join(process.cwd(), 'content', 'blog', locale);
}

function resolveDate(slug: string, fmDate: string): string {
  if (fmDate && fmDate !== DATE_PLACEHOLDER && /^\d{4}-\d{2}-\d{2}$/.test(fmDate)) {
    return fmDate;
  }
  const override = BLOG_PUBLISH_DATE_OVERRIDES[slug];
  if (override && /^\d{4}-\d{2}-\d{2}$/.test(override)) {
    return override;
  }
  throw new Error(
    `Missing publish date for "${slug}". Set front matter date or add BLOG_PUBLISH_DATE_OVERRIDES in lib/blog/blogPublishDates.ts`
  );
}

function resolveAuthor(fmAuthor: string, locale: BlogContentLocale): string {
  if (!fmAuthor || fmAuthor === AUTHOR_PLACEHOLDER) {
    return getBlogAuthor(locale).name;
  }
  return fmAuthor;
}

function parseFile(fileName: string, locale: BlogContentLocale): BlogPost {
  const raw = fs.readFileSync(path.join(contentDir(locale), fileName), 'utf8');
  const { data, content } = matter(raw);
  const fm = data as BlogPostFrontMatter;
  const slug = fm.slug || fileName.replace(/^\d+-/, '').replace(/\.md$/, '');
  const wordCount = countWords(content);
  const resolvedDate =
    fm.status === 'published' ? resolveDate(slug, fm.date) : fm.date || '1970-01-01';
  return {
    ...fm,
    slug,
    locale,
    fileName,
    body: content,
    resolvedDate,
    resolvedAuthor: resolveAuthor(fm.author, locale),
    wordCount,
    readingTimeMinutes: readingTimeMinutes(wordCount),
  };
}

export function getAllPosts(locale: BlogContentLocale): BlogPost[] {
  const dir = contentDir(locale);
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  return files.map((f) => parseFile(f, locale));
}

export function getPublishedPosts(locale: BlogContentLocale): BlogPost[] {
  return getAllPosts(locale)
    .filter((p) => p.status === 'published')
    .sort((a, b) => b.resolvedDate.localeCompare(a.resolvedDate));
}

export function getPublishedSlugs(locale: BlogContentLocale): string[] {
  return getPublishedPosts(locale).map((p) => p.slug);
}

export function getPostBySlug(slug: string, locale: BlogContentLocale): BlogPost | undefined {
  const post = getAllPosts(locale).find((p) => p.slug === slug);
  if (!post || post.status !== 'published') return undefined;
  return post;
}

export function getLatestPublishedPosts(limit: number, locale: BlogContentLocale): BlogPost[] {
  return getPublishedPosts(locale).slice(0, limit);
}

export function getPublishedSlugSet(locale: BlogContentLocale): Set<string> {
  return new Set(getPublishedSlugs(locale));
}

export function blogImagePath(slug: string): string {
  const override = BLOG_IMAGE_BY_SLUG[slug];
  if (override) return override;

  const filePath = path.join(process.cwd(), 'public', 'blog', `${slug}.webp`);
  if (fs.existsSync(filePath)) {
    return `/blog/${slug}.webp`;
  }
  return BLOG_PLACEHOLDER_IMAGE;
}

export function listMissingBlogImages(locale: BlogContentLocale = 'en'): string[] {
  return getPublishedPosts(locale)
    .filter((p) => {
      if (BLOG_IMAGE_BY_SLUG[p.slug]) return false;
      return !fs.existsSync(path.join(process.cwd(), 'public', 'blog', `${p.slug}.webp`));
    })
    .map((p) => p.slug);
}

export function getAllBlogStaticParams(): { locale: string; slug: string }[] {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of BLOG_CONTENT_LOCALES) {
    for (const post of getPublishedPosts(locale)) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export function assertBlogLocale(locale: string): BlogContentLocale {
  if (!isBlogContentLocale(locale)) {
    throw new Error(`Unsupported blog locale: ${locale}`);
  }
  return locale;
}

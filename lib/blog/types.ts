import type { BlogCategory } from './categories';

export type BlogPostFrontMatter = {
  title: string;
  seoTitle: string;
  slug: string;
  description: string;
  excerpt: string;
  category: BlogCategory | string;
  primaryKeyword: string;
  author: string;
  date: string;
  status: 'published' | 'draft' | string;
};

export type BlogPost = BlogPostFrontMatter & {
  locale: string;
  fileName: string;
  body: string;
  resolvedDate: string;
  resolvedAuthor: string;
  readingTimeMinutes: number;
  wordCount: number;
};

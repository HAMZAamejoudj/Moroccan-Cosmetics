export const BLOG_CONTENT_LOCALES = ['en', 'fr', 'ar'] as const;
export type BlogContentLocale = (typeof BLOG_CONTENT_LOCALES)[number];

export function isBlogContentLocale(locale: string): locale is BlogContentLocale {
  return (BLOG_CONTENT_LOCALES as readonly string[]).includes(locale);
}

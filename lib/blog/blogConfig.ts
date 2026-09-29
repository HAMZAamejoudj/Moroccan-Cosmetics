import type { BlogContentLocale } from './locales';

export type BlogAuthorConfig = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

/** Fill these before release — check:blog fails while any field is TODO. */
const authors: Record<BlogContentLocale, BlogAuthorConfig> = {
  en: {
    name: 'TODO',
    role: 'TODO',
    bio: 'TODO',
    photo: 'TODO',
  },
  fr: {
    name: 'TODO',
    role: 'TODO',
    bio: 'TODO',
    photo: 'TODO',
  },
  ar: {
    name: 'TODO',
    role: 'TODO',
    bio: 'TODO',
    photo: 'TODO',
  },
};

export function getBlogAuthor(locale: BlogContentLocale): BlogAuthorConfig {
  return authors[locale] ?? authors.en;
}

const INCOMPLETE_AUTHOR = new Set(['', 'TODO']);

export function isBlogAuthorConfigured(config: BlogAuthorConfig): boolean {
  return (
    !INCOMPLETE_AUTHOR.has(config.name.trim()) &&
    !INCOMPLETE_AUTHOR.has(config.role.trim()) &&
    !INCOMPLETE_AUTHOR.has(config.bio.trim()) &&
    !INCOMPLETE_AUTHOR.has(config.photo.trim()) &&
    config.name !== 'Moroccan Cosmetics Export Team'
  );
}

export const AUTHOR_PLACEHOLDER = '[AUTHOR NAME]';
export const DATE_PLACEHOLDER = '[YYYY-MM-DD]';

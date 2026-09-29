export const BLOG_CATEGORIES = [
  'Buying & Sourcing',
  'Private Label & Brand Building',
  'Regulations & Certifications',
  'Ingredients & Rituals',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function isBlogCategory(value: string): value is BlogCategory {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}

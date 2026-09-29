/** Per-post cover images (WebP) under /public/images/blog/. */
export const BLOG_IMAGE_BY_SLUG: Record<string, string> = {
  'how-to-start-argan-oil-brand': '/images/blog/how-to-start-argan-oil-brand.webp',
  'how-to-choose-argan-oil-supplier': '/images/blog/how-to-choose-argan-oil-supplier.webp',
  'import-argan-oil-from-morocco': '/images/blog/import-argan-oil-from-morocco.webp',
  'argan-oil-wholesale-price': '/images/blog/argan-oil-wholesale-price.webp',
  'how-to-spot-fake-argan-oil': '/images/blog/how-to-spot-fake-argan-oil.webp',
  'moroccan-hammam-products-wholesale': '/images/blog/moroccan-hammam-products-wholesale.webp',
};

export const BLOG_PLACEHOLDER_IMAGE = '/blog/placeholder.webp';

/** Client-safe image path (overrides, then legacy /blog/{slug}.webp). */
export function defaultBlogImagePath(slug: string): string {
  return BLOG_IMAGE_BY_SLUG[slug] ?? `/blog/${slug}.webp`;
}

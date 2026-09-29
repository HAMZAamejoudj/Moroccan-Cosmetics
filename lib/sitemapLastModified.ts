/** Fixed lastModified dates for sitemap (avoid `new Date()` on every build). */
export const SITEMAP_PAGE_LAST_MODIFIED: Record<string, string> = {
  '': '2026-09-28',
  '/about-us': '2026-06-01',
  '/benefits': '2026-09-28',
  '/benefits/argan-oil-benefits': '2026-09-28',
  '/private-label': '2026-06-01',
  '/blog': '2026-09-28',
  '/faq': '2026-06-01',
  '/contact': '2026-06-01',
  '/quote': '2026-06-01',
};

export function sitemapDateForPath(path: string): Date {
  const key = path === '/' ? '' : path.replace(/\/$/, '') || '';
  const iso = SITEMAP_PAGE_LAST_MODIFIED[key] ?? '2026-09-28';
  return new Date(iso);
}

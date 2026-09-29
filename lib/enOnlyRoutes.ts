/** Routes that exist only under `/en/` (no `/fr` or `/ar` static pages). */
export const EN_ONLY_PATHS = ['/benefits/argan-oil-benefits'] as const;

export function isEnOnlyPath(path: string): boolean {
  const normalized = path.replace(/\/$/, '') || '/';
  if (normalized === '/benefits/argan-oil-benefits') return true;
  return false;
}

/** Absolute on-site URL with trailing slash (for plain `<a>` when locale is not EN). */
export function enOnlyAbsoluteHref(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  const withTrailing = p.endsWith('/') ? p : `${p}/`;
  return `https://moroccan-cosmetics.com/en${withTrailing === '/' ? '/' : withTrailing}`;
}

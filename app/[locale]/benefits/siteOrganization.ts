/** Publisher name from `app/[locale]/layout.tsx` (openGraph.siteName / authors) */
export const SITE_ORGANIZATION_NAME = 'Moroccan Cosmetics';
export const SITE_LOGO_URL = 'https://moroccan-cosmetics.com/logo.webp';

export const siteOrganizationSchema = {
  '@type': 'Organization' as const,
  name: SITE_ORGANIZATION_NAME,
  logo: { '@type': 'ImageObject' as const, url: SITE_LOGO_URL },
};

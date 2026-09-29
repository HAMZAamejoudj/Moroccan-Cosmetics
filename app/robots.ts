import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const SITEMAP = 'https://moroccan-cosmetics.com/sitemap.xml';

const PUBLIC_ALLOW = {
  allow: '/',
  disallow: ['/api/', '/_next/'],
} as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', ...PUBLIC_ALLOW },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: SITEMAP,
  };
}

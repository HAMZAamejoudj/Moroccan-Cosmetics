import type { Metadata } from 'next';

export const SITE_ORIGIN = 'https://moroccan-cosmetics.com';
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/about-hero-v2.webp`;

/** Normalize to `/benefits/` style (leading slash, trailing slash). */
export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const withSlash = path.startsWith('/') ? path : `/${path}`;
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`;
}

export function localePath(locale: string, path: string): string {
  const p = normalizePath(path);
  return p === '/' ? `/${locale}/` : `/${locale}${p}`;
}

export function absolutePageUrl(locale: string, path: string): string {
  return `${SITE_ORIGIN}${localePath(locale, path)}`;
}

export type BuildAlternatesOptions = {
  /** Locales that have an equivalent page (included in hreflang). */
  hreflangLocales: string[];
  /** x-default target locale; defaults to `en` if listed, else first hreflang locale. */
  xDefaultLocale?: string;
};

export function buildAlternates(
  locale: string,
  path: string,
  options: BuildAlternatesOptions
): NonNullable<Metadata['alternates']> {
  const { hreflangLocales } = options;
  const canonical = absolutePageUrl(locale, path);
  const languages: Record<string, string> = {};

  for (const loc of hreflangLocales) {
    languages[loc] = absolutePageUrl(loc, path);
  }

  const xDefault =
    options.xDefaultLocale ??
    (hreflangLocales.includes('en') ? 'en' : hreflangLocales[0]);
  if (xDefault && hreflangLocales.includes(xDefault)) {
    languages['x-default'] = absolutePageUrl(xDefault, path);
  }

  return { canonical, languages };
}

export type PageOpenGraphInput = {
  title: string;
  description: string;
  locale: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export function buildOpenGraph(input: PageOpenGraphInput): Metadata['openGraph'] {
  const url = absolutePageUrl(input.locale, input.path);
  const image = input.image ?? DEFAULT_OG_IMAGE;
  const ogLocale =
    input.locale === 'fr' ? 'fr_FR' : input.locale === 'ar' ? 'ar_MA' : 'en_US';

  return {
    title: input.title,
    description: input.description,
    url,
    siteName: 'Moroccan Cosmetics',
    locale: ogLocale,
    type: input.type ?? 'website',
    images: [{ url: image, width: 1200, height: 630, alt: input.title }],
  };
}

export function buildTwitter(title: string, description: string, image?: string): Metadata['twitter'] {
  return {
    card: 'summary_large_image',
    title,
    description,
    images: [image ?? DEFAULT_OG_IMAGE],
  };
}

/** Standard metadata bundle for a localized route. */
export function buildPageMetadata(input: {
  title: string;
  description: string;
  locale: string;
  path: string;
  hreflangLocales: string[];
  xDefaultLocale?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  titleAbsolute?: boolean;
}): Metadata {
  const alternates = buildAlternates(input.locale, input.path, {
    hreflangLocales: input.hreflangLocales,
    xDefaultLocale: input.xDefaultLocale,
  });

  return {
    title: input.titleAbsolute ? { absolute: input.title } : input.title,
    description: input.description,
    alternates,
    openGraph: buildOpenGraph({
      title: input.title,
      description: input.description,
      locale: input.locale,
      path: input.path,
      image: input.ogImage,
      type: input.ogType,
    }),
    twitter: buildTwitter(input.title, input.description, input.ogImage),
  };
}

/** All main marketing locales. */
export const ALL_LOCALES = ['en', 'fr', 'ar'] as const;

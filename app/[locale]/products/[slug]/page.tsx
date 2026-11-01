import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata, ALL_LOCALES, SITE_ORIGIN } from '@/lib/seo';
import { getProductBySlug, getAllProductStaticParams } from '@/lib/productsData';
import ProductDetailView from '@/components/products/ProductDetailView';

export function generateStaticParams() {
  return getAllProductStaticParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};

  const currentLocale = (ALL_LOCALES.includes(locale as (typeof ALL_LOCALES)[number])
    ? locale
    : 'en') as 'en' | 'fr' | 'ar';
  const content = product[currentLocale] || product.en;

  const seoTitleSuffix =
    currentLocale === 'ar'
      ? ' | مستحضرات تجميل مغربية بالجملة'
      : currentLocale === 'fr'
      ? ' | Vrac & Marque Blanche Maroc'
      : ' | Moroccan Cosmetics Wholesale & Private Label';

  return buildPageMetadata({
    title: `${content.name}${seoTitleSuffix}`,
    description: content.shortDesc,
    locale,
    path: `/products/${slug}`,
    hreflangLocales: [...ALL_LOCALES],
    titleAbsolute: true,
    ogImage: product.image,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!ALL_LOCALES.includes(locale as (typeof ALL_LOCALES)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  const currentLocale = locale as 'en' | 'fr' | 'ar';
  const content = product[currentLocale] || product.en;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: content.name,
    image: `${SITE_ORIGIN}${product.image}`,
    description: content.shortDesc,
    brand: {
      '@type': 'Brand',
      name: 'Moroccan Cosmetics',
    },
    category: product.category,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Moroccan Cosmetics',
      },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} locale={currentLocale} />
    </main>
  );
}


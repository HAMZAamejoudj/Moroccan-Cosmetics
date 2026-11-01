import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { buildPageMetadata, ALL_LOCALES } from '@/lib/seo';
import ProductsCatalogClient from '@/components/products/ProductsCatalogClient';

export function generateStaticParams() {
  return ALL_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = (ALL_LOCALES.includes(locale as (typeof ALL_LOCALES)[number])
    ? locale
    : 'en') as 'en' | 'fr' | 'ar';

  const titles = {
    en: 'Moroccan Cosmetic Products & Bulk Wholesale Ingredients',
    fr: 'Produits Cosmétiques & Ingrédients en Vrac du Maroc',
    ar: 'منتجات ومستحضرات تجميل ومواد خام مغربية بالجملة',
  };

  const descriptions = {
    en: 'Browse our complete catalog of organic Moroccan argan oil, prickly pear seed oil, black soap, rhassoul clay, and rose water for wholesale and private label.',
    fr: 'Découvrez notre catalogue complet d’huile d’argan, huile de figue de barbarie, savon noir, rhassoul et eau de rose en gros et marque blanche.',
    ar: 'تصفح كتالوج مستحضرات التجميل المغربية الطبيعية بالجملة: زيت الأركان، التين الشوكي، الصابون البلدي، الغاسول، وماء الورد مع شهادات التصدير.',
  };

  return buildPageMetadata({
    title: titles[currentLocale],
    description: descriptions[currentLocale],
    locale,
    path: '/products',
    hreflangLocales: [...ALL_LOCALES],
    titleAbsolute: true,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!ALL_LOCALES.includes(locale as (typeof ALL_LOCALES)[number])) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <main>
      <ProductsCatalogClient locale={locale as 'en' | 'fr' | 'ar'} />
    </main>
  );
}


import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { ALL_LOCALES, buildPageMetadata } from '@/lib/seo';
import QuotePageClient from './QuotePageClient';

const QUOTE_META: Record<string, { title: string; description: string }> = {
  en: {
    title: 'Request a Quote | Moroccan Cosmetics',
    description:
      'Request wholesale or private label pricing for Moroccan argan oil, black soap, rhassoul, rose water and more.',
  },
  fr: {
    title: 'Demander un devis | Cosmétiques Marocains',
    description:
      'Demandez un devis pour l’achat en gros ou en marque blanche : huile d’argan, savon noir, ghassoul et plus.',
  },
  ar: {
    title: 'طلب عرض سعر | مستحضرات تجميل مغربية',
    description: 'اطلب عرض سعر للجملة أو العلامة الخاصة: زيت الأركان، الصابون البلدي، الغاسول والمزيد.',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const meta = QUOTE_META[locale] ?? QUOTE_META.en;

  return buildPageMetadata({
    title: meta.title,
    description: meta.description,
    locale,
    path: '/quote',
    hreflangLocales: [...ALL_LOCALES],
  });
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

export default async function QuotePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div className="pt-32 pb-24 min-h-[50vh]" />}>
      <QuotePageClient />
    </Suspense>
  );
}

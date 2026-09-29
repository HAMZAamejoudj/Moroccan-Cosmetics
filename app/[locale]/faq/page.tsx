import React from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ALL_LOCALES, buildPageMetadata } from '@/lib/seo';
import FAQClient, { type FAQSection, type FaqIconType } from './FAQClient';

const FAQ_LAYOUT: { sectionKey: string; items: { itemKey: string; iconType: FaqIconType }[] }[] = [
  {
    sectionKey: 'ordersPricing',
    items: [
      { itemKey: 'moq', iconType: 'package' },
      { itemKey: 'samples', iconType: 'flask' },
      { itemKey: 'pricing', iconType: 'settings' },
      { itemKey: 'payment', iconType: 'shield' },
    ],
  },
  {
    sectionKey: 'privateLabel',
    items: [
      { itemKey: 'smallQty', iconType: 'package' },
      { itemKey: 'labels', iconType: 'settings' },
      { itemKey: 'plLeadTime', iconType: 'clock' },
      { itemKey: 'customFormula', iconType: 'flask' },
    ],
  },
  {
    sectionKey: 'qualityCompliance',
    items: [
      { itemKey: 'organic', iconType: 'shield' },
      { itemKey: 'coaMsds', iconType: 'shield' },
      { itemKey: 'crueltyVegan', iconType: 'refresh' },
      { itemKey: 'registration', iconType: 'message' },
    ],
  },
  {
    sectionKey: 'shipping',
    items: [
      { itemKey: 'countries', iconType: 'truck' },
      { itemKey: 'deliveryTime', iconType: 'clock' },
      { itemKey: 'customs', iconType: 'truck' },
    ],
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FAQ.metadata' });

  return buildPageMetadata({
    title: t('title'),
    description: t('description'),
    locale,
    path: '/faq',
    hreflangLocales: [...ALL_LOCALES],
    titleAbsolute: true,
  });
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'FAQ' });

  const sections: FAQSection[] = FAQ_LAYOUT.map((block) => ({
    title: t(`sections.${block.sectionKey}`),
    faqs: block.items.map(({ itemKey, iconType }) => ({
      question: t(`items.${itemKey}.question`),
      answer: t(`items.${itemKey}.answer`),
      iconType,
    })),
  }));

  const flatFaqs = sections.flatMap((s) => s.faqs);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: flatFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  const clientTranslations = {
    heroTitle: (
      <>
        {t('hero.title')} <span className="text-sunrise italic">{t('hero.titleAccent')}</span>
      </>
    ),
    heroDesc: t('hero.description'),
    ctaTitle: t('cta.title'),
    ctaDesc: t('cta.description'),
    ctaQuoteBtn: t('cta.quoteBtn'),
    ctaBtn: t('cta.btn'),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FAQClient sections={sections} t={clientTranslations} />
    </>
  );
}

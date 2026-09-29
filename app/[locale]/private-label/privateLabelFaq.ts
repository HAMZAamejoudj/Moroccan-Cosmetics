import { flagVisible, privateLabelConfig } from '@/lib/privateLabelConfig';

export type PrivateLabelFaqItem = { question: string; answer: string };

type FaqTranslator = (key: string, values?: Record<string, string | number>) => string;

export function buildPrivateLabelFaq(t: FaqTranslator, leadTimeRange: string | null): PrivateLabelFaqItem[] {
  const items: (PrivateLabelFaqItem & { show: boolean })[] = [];

  if (privateLabelConfig.minimumOrderUnits != null) {
    items.push({
      show: true,
      question: t('faq.moq.q'),
      answer: t('faq.moq.a', { units: privateLabelConfig.minimumOrderUnits }),
    });
  }

  items.push({
    show: true,
    question: t('faq.mix.q'),
    answer: t('faq.mix.a'),
  });

  items.push({
    show: true,
    question: t('faq.leadTime.q'),
    answer: leadTimeRange ? t('faq.leadTime.aRange', { range: leadTimeRange }) : t('faq.leadTime.aDefault'),
  });

  if (flagVisible(privateLabelConfig.samplesAvailable)) {
    items.push({
      show: true,
      question: t('faq.samples.q'),
      answer: privateLabelConfig.samplePolicyText ?? t('faq.samples.aDefault'),
    });
  }

  if (flagVisible(privateLabelConfig.designService)) {
    items.push({
      show: true,
      question: t('faq.labelDesign.q'),
      answer: t('faq.labelDesign.aFull'),
    });
  } else {
    items.push({
      show: true,
      question: t('faq.labelDesign.q'),
      answer: t('faq.labelDesign.aBasic'),
    });
  }

  items.push({
    show: true,
    question: t('faq.organic.q'),
    answer: t('faq.organic.a'),
  });

  items.push({
    show: true,
    question: t('faq.registration.q'),
    answer: t('faq.registration.a'),
  });

  if (privateLabelConfig.paymentTermsText) {
    items.push({
      show: true,
      question: t('faq.payment.q'),
      answer: privateLabelConfig.paymentTermsText,
    });
  }

  items.push({
    show: true,
    question: t('faq.prices.q'),
    answer: t('faq.prices.a'),
  });

  return items.filter((i) => i.show);
}

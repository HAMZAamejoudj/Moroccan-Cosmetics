/** Exact CTA tokens in Markdown — excluded from placeholder checks. */
export const CTA_TOKENS_ALL = [
  '[Request a Quote]',
  '[Request Samples]',
  '[Start My Brand]',
  '[request our sample pack and batch COA]',
  '[Demander un devis]',
  '[Demander des échantillons]',
  '[Lancer ma marque]',
  '[demander notre pack échantillons et COA]',
  '[طلب عرض سعر]',
  '[طلب عينات]',
  '[إطلاق علامتي]',
  '[طلب حزمة العينات وشهادة التحليل]',
] as const;

export function getCtaHrefs(locale: string): Record<string, string> {
  const prefix = `/${locale}`;
  return {
    '[Request a Quote]': `${prefix}/quote/`,
    '[Request Samples]': `${prefix}/quote/?type=samples`,
    '[Start My Brand]': `${prefix}/private-label/`,
    '[request our sample pack and batch COA]': `${prefix}/quote/?type=samples`,
    '[Demander un devis]': `${prefix}/quote/`,
    '[Demander des échantillons]': `${prefix}/quote/?type=samples`,
    '[Lancer ma marque]': `${prefix}/private-label/`,
    '[demander notre pack échantillons et COA]': `${prefix}/quote/?type=samples`,
    '[طلب عرض سعر]': `${prefix}/quote/`,
    '[طلب عينات]': `${prefix}/quote/?type=samples`,
    '[إطلاق علامتي]': `${prefix}/private-label/`,
    '[طلب حزمة العينات وشهادة التحليل]': `${prefix}/quote/?type=samples`,
  };
}

/** @deprecated use getCtaHrefs */
export const CTA_BUTTON_CLASS = 'blog-cta-btn';

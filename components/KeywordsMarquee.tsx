'use client';

import { useTranslations } from 'next-intl';

export const keywordKeys = [
  'natural',
  'skincare',
  'privateLabel',
  'factory',
  'exporter',
  'supplier',
  'wholesale',
  'beauty',
  'moroccan',
  'cosmetics',
  'manufacturer',
  'argan',
  'b2b',
  'bulk',
  'organic',
] as const;

function PillRow({
  keys,
  idPrefix,
  direction,
}: {
  keys: readonly string[];
  idPrefix: string;
  direction: 'ltr' | 'rtl';
}) {
  const t = useTranslations('Keywords');

  const pills = keys.map((key) => ({
    key,
    label: t(key),
  }));

  const renderGroup = (suffix: string) => (
    <div className="flex flex-nowrap shrink-0 items-center gap-3 pr-3">
      {pills.map((pill) => (
        <span
          key={`${idPrefix}-${suffix}-${pill.key}`}
          className="shrink-0 px-5 py-2 rounded-full text-sm font-medium text-[#3B4758] bg-[#F4F6FA] border border-[#06142B]/6 whitespace-nowrap"
        >
          {pill.label}
        </span>
      ))}
    </div>
  );

  return (
    <div
      className={`keywords-marquee-track flex flex-nowrap ${
        direction === 'ltr' ? 'keywords-marquee-ltr' : 'keywords-marquee-rtl'
      }`}
    >
      {renderGroup('a')}
      {renderGroup('b')}
    </div>
  );
}

const KeywordsMarquee = () => {
  const mid = Math.ceil(keywordKeys.length / 2);
  const row1 = keywordKeys.slice(0, mid);
  const row2 = keywordKeys.slice(mid);

  return (
    <section className="py-10 md:py-12 bg-white overflow-hidden" aria-label="SEO topics">
      <div className="space-y-4">
        <div className="keywords-marquee-mask">
          <PillRow keys={row1} idPrefix="r1" direction="ltr" />
        </div>
        <div className="keywords-marquee-mask">
          <PillRow keys={row2} idPrefix="r2" direction="rtl" />
        </div>
      </div>
    </section>
  );
};

export default KeywordsMarquee;

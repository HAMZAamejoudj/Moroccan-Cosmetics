'use client';

import { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import { FaAward, FaGlobe, FaHeart, FaBoxesStacked, FaLeaf } from 'react-icons/fa6';

const itemKeys = ['certified', 'shipping', 'crueltyFree', 'moq', 'organic'] as const;

const icons: Record<(typeof itemKeys)[number], IconType> = {
  certified: FaAward,
  shipping: FaGlobe,
  crueltyFree: FaHeart,
  moq: FaBoxesStacked,
  organic: FaLeaf,
};

function MarqueeGroup({
  items,
  idPrefix,
  hidden,
}: {
  items: { key: string; label: string; Icon: IconType }[];
  idPrefix: string;
  hidden?: boolean;
}) {
  return (
    <div
      className="flex flex-nowrap shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item) => (
        <div
          key={`${idPrefix}-${item.key}`}
          className="flex items-center gap-3 shrink-0 px-6 md:px-10 text-white"
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-[#FF9F68] ring-1 ring-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
          >
            <item.Icon className="h-[1.125rem] w-[1.125rem]" aria-hidden />
          </span>
          <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em] whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

const TrustMarquee = () => {
  const t = useTranslations('HomeTrustBar');

  const items = itemKeys.map((key) => ({
    key,
    label: t(key),
    Icon: icons[key],
  }));

  return (
    <section
      className="relative overflow-hidden bg-[#06142B] border-y border-white/10 py-3.5 md:py-4"
      aria-label={t('ariaLabel')}
    >
      <div className="trust-marquee-mask">
        <div className="trust-marquee-track flex flex-nowrap">
          <MarqueeGroup items={items} idPrefix="a" />
          <MarqueeGroup items={items} idPrefix="b" hidden />
        </div>
      </div>
    </section>
  );
};

export default TrustMarquee;

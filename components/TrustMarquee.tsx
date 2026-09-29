'use client';

import { useTranslations } from 'next-intl';
import { FaGlobe } from 'react-icons/fa6';

/** Single trust signal — no duplicated marquee text in HTML (SEO). */
const TrustMarquee = () => {
  const t = useTranslations('HomeTrustBar');

  return (
    <section
      className="relative overflow-hidden bg-[#06142B] border-y border-white/10 py-3.5 md:py-4"
      aria-label={t('ariaLabel')}
    >
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3 text-white">
        <span
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] text-[#FF9F68] ring-1 ring-white/15"
          aria-hidden
        >
          <FaGlobe className="h-[1.125rem] w-[1.125rem]" />
        </span>
        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.14em]">
          {t('shipping')}
        </span>
      </div>
    </section>
  );
};

export default TrustMarquee;

'use client';

import { useTranslations } from 'next-intl';
import { FaGlobe } from 'react-icons/fa6';
import { SHOW_TRUST_BAR_MARKETING_CLAIMS } from '@/lib/marketingDisplay';

/** Single trust signal in HTML by default — optional marketing ticker is off for SEO. */
const TrustMarquee = () => {
  const t = useTranslations('HomeTrustBar');
  const marketingClaims = SHOW_TRUST_BAR_MARKETING_CLAIMS
    ? (t.raw('marketingClaims') as string[] | undefined)
    : undefined;
  const showMarketing =
    SHOW_TRUST_BAR_MARKETING_CLAIMS &&
    Array.isArray(marketingClaims) &&
    marketingClaims.length > 0;

  return (
    <section
      className="relative overflow-hidden bg-[#06142B] border-y border-white/10 py-3.5 md:py-4"
      aria-label={t('ariaLabel')}
    >
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center gap-2 text-white">
        <div className="flex items-center justify-center gap-3">
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
        {showMarketing ? (
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em] text-white/70 text-center">
            {marketingClaims!.join(' · ')}
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default TrustMarquee;

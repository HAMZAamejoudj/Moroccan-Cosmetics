'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShoppingBag, FileText, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const HERO_IMAGE = '/images/home-hero-products.webp';

const Hero = () => {
  const t = useTranslations('Hero');

  const trustItems = [t('trustCert'), t('trustCoa'), t('trustMoq'), t('trustShipping')];

  return (
    <section
      id="home"
      className="hero-gradient text-white pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 min-h-[min(92vh,820px)] flex items-center"
    >
      <div className="hero-gradient__media">
        <Image
          src={HERO_IMAGE}
          alt={t('heroImageAlt')}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center]"
        />
      </div>
      <div className="hero-gradient__content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-md sm:max-w-lg md:max-w-[30rem] rounded-2xl border border-white/15 bg-[#06142B]/60 backdrop-blur-md shadow-2xl shadow-black/30 p-6 sm:p-7 md:p-8 space-y-4 sm:space-y-5"
        >
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-[#E8F4FF]">
            {t('badge')}
          </p>

          <h1 className="text-[1.65rem] sm:text-3xl md:text-[2rem] font-bold leading-[1.2] tracking-tight">
            <span className="text-white">{t('title')}</span>
            <br />
            <span className="text-[#FF9F68]">{t('titleAccent')}</span>
            {t('titleEnd') ? (
              <>
                <br />
                <span className="text-white text-[1.35rem] sm:text-2xl">{t('titleEnd')}</span>
              </>
            ) : null}
          </h1>

          <p className="text-sm sm:text-[0.9375rem] text-white/90 leading-relaxed">
            {t('description')}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-2 pt-1">
            {trustItems.map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs sm:text-[13px] text-white/85 leading-snug">
                <Check className="w-3.5 h-3.5 text-[#2EC4B6] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-1">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full text-sm font-semibold px-6 py-3 bg-gradient-to-r from-[#2EC4B6] to-[#FF9F68] text-white shadow-lg hover:scale-[1.02] transition-transform gap-2"
            >
              {t('ctaQuote')} <FileText size={18} />
            </Link>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-full text-sm font-semibold px-6 py-3 border border-white/80 text-white bg-white/10 hover:bg-white/15 transition-colors gap-2"
            >
              {t('ctaCatalog')} <ShoppingBag size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

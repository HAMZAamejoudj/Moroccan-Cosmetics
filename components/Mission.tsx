'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const Mission = () => {
  const t = useTranslations('Mission');
  const features = [t('iso'), t('gmp'), t('private'), t('bulk')];

  return (
    <section id="manufacturing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-sunrise">
              {t('badge')}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-serif text-deep-navy">
              {t('title')} <span className="text-sunrise">{t('titleAccent')}</span>
              {t('titleEnd') ? ` ${t('titleEnd')}` : null}
            </h2>
            <p className="text-lg mb-8 text-muted leading-relaxed">
              {t('description')}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sunrise/20 flex items-center justify-center text-sunrise">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-muted font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image
                src="/images/benefits/benefits-hub-hero.webp"
                alt="Moroccan argan oil, rose water, black soap and rhassoul clay"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 flex gap-4">
              <div className="px-6 py-4 rounded-2xl bg-deep-navy/90 backdrop-blur-md border border-white/20 text-center shadow-xl">
                <span className="block text-2xl font-bold text-sunrise">{t('b2bExport')}</span>
                <span className="text-xs text-soft-white uppercase tracking-wider">{t('b2bSub')}</span>
              </div>
              <div className="px-6 py-4 rounded-2xl bg-deep-navy/90 backdrop-blur-md border border-white/20 text-center shadow-xl">
                <span className="block text-2xl font-bold text-sunrise">{t('bulkSupply')}</span>
                <span className="text-xs text-soft-white uppercase tracking-wider">{t('bulkSub')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mission;

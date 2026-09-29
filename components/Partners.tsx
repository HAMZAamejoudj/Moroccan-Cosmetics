'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

const Partners = () => {
  const t = useTranslations('Footer');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-serif font-bold mb-8 text-sunrise">{t('payment')}</h3>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:bg-white transition-all duration-300 group">
          <Image
            src="/images/payment.webp"
            alt="Payment Methods"
            width={400}
            height={150}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-serif font-bold mb-8 text-sunrise">{t('logistics')}</h3>
        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 hover:bg-white transition-all duration-300 group">
          <Image
            src="/images/transport-partner.webp"
            alt="Logistics Partners"
            width={400}
            height={150}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Partners;

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { homeBestSellerIds, homeBestSellerImages } from '@/lib/homeBestSellers';

const ProductGrid = () => {
  const t = useTranslations('Products');

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.2em] mb-3 text-[#2EC4B6]">
            {t('badge')}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-[#1a1a1a]">
            {t('title')}{' '}
            <span className="text-[#2EC4B6]">{t('titleAccent')}</span>
          </h2>
          <p className="text-lg md:text-xl text-[#2EC4B6] italic font-medium">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {homeBestSellerIds.map((id, index) => (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              viewport={{ once: true }}
              className="bg-white rounded-sm shadow-md overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow"
            >
              <div className="relative aspect-[4/3] w-full bg-[#f5f5f5]">
                <Image
                  src={homeBestSellerImages[id]}
                  alt={t(`${id}.name`)}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain object-center p-1 sm:p-2"
                  priority={index < 3}
                />
              </div>
              <div className="px-5 pb-6 pt-4 flex flex-col flex-grow text-center border-t border-gray-100">
                <p className="text-base font-bold text-[#1a1a1a] mb-3 leading-snug min-h-[3rem]">
                  {t(`${id}.name`)}
                </p>
                <p className="text-sm text-[#4b5563] leading-relaxed flex-grow">
                  {t(`${id}.desc`)}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

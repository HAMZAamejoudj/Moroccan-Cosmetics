'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { homeBestSellerIds, homeBestSellerImages } from '@/lib/homeBestSellers';
import { getProductById } from '@/lib/productsData';

const ProductGrid = () => {
  const t = useTranslations('Products');
  const locale = useLocale() as 'en' | 'fr' | 'ar';
  const isAr = locale === 'ar';
  const isFr = locale === 'fr';

  const viewDetailsLabel = isAr
    ? 'تفاصيل المنتج وعرض السعر'
    : isFr
    ? 'Détails & Devis en gros'
    : 'View Details & Specs';

  const allProductsLabel = isAr
    ? 'استكشف كتالوج المنتجات المغربية الكامل'
    : isFr
    ? 'Découvrir tout le catalogue des produits marocains'
    : 'Explore Full Moroccan Products Catalog';

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
          {homeBestSellerIds.map((id, index) => {
            const product = getProductById(id);
            const slug = product?.slug || id;

            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group"
              >
                {/* Clickable Image to Product Detail */}
                <Link
                  href={`/products/${slug}`}
                  className="relative aspect-[4/3] w-full bg-[#f9fafb] overflow-hidden block"
                >
                  <Image
                    src={homeBestSellerImages[id]}
                    alt={t(`${id}.name`)}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    priority={index < 3}
                  />
                </Link>

                {/* Card Body */}
                <div className="px-5 pb-5 pt-4 flex flex-col flex-grow text-center border-t border-gray-100">
                  {product?.botanicalName && (
                    <span className="text-[11px] font-semibold text-gray-400 italic mb-1">
                      {product.botanicalName}
                    </span>
                  )}
                  <Link href={`/products/${slug}`}>
                    <p className="text-base font-bold text-[#1a1a1a] mb-2 leading-snug min-h-[2.75rem] hover:text-[#2EC4B6] transition-colors">
                      {t(`${id}.name`)}
                    </p>
                  </Link>
                  <p className="text-xs sm:text-sm text-[#4b5563] leading-relaxed flex-grow line-clamp-2 mb-4">
                    {t(`${id}.desc`)}
                  </p>

                  {/* Direct Link Button */}
                  <Link
                    href={`/products/${slug}`}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg text-xs font-bold text-[#2EC4B6] bg-[#2EC4B6]/10 hover:bg-[#2EC4B6] hover:text-white transition-all w-full text-center"
                  >
                    <span>{viewDetailsLabel}</span>
                    <ArrowRight size={14} className={isAr ? 'rotate-180' : ''} />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* View All Products Catalog CTA */}
        <div className="mt-14 text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-[#040B1A] hover:bg-[#123A63] shadow-md transition-all hover:scale-105 text-sm sm:text-base"
          >
            <span>{allProductsLabel}</span>
            <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;

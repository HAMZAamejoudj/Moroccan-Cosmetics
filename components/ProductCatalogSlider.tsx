'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { catalogSliderItems } from '@/lib/homeCatalogSlider';
import { Link } from '@/i18n/navigation';

function getPerView(width: number) {
  if (width >= 1280) return 4;
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

const ProductCatalogSlider = () => {
  const t = useTranslations('HomeCatalog');
  const locale = useLocale() as 'en' | 'fr' | 'ar';
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(4);

  useEffect(() => {
    const update = () => setPerView(getPerView(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const pageCount = Math.max(1, Math.ceil(catalogSliderItems.length / perView));

  const go = useCallback(
    (direction: -1 | 1) => {
      setPage((p) =>
        direction === 1 ? (p + 1) % pageCount : (p - 1 + pageCount) % pageCount
      );
    },
    [pageCount]
  );

  useEffect(() => {
    if (page >= pageCount) setPage(0);
  }, [pageCount, page]);

  useEffect(() => {
    if (pageCount <= 1) return;

    const intervalMs = 3500;
    const id = window.setInterval(() => {
      setPage((p) => (p + 1) % pageCount);
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [pageCount]);

  const offsetPercent = page * (100 / pageCount);

  return (
    <section className="py-16 md:py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#2EC4B6] mb-3">
            {t('badge')}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">
            {t('title')}
          </h2>
          <p className="text-[#4b5563] leading-relaxed">{t('description')}</p>
        </div>

        <div className="flex justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t('prev')}
            className="w-11 h-11 rounded-full border-2 border-[#2EC4B6] text-[#2EC4B6] flex items-center justify-center hover:bg-[#2EC4B6]/10 transition-colors"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t('next')}
            className="w-11 h-11 rounded-full border-2 border-[#2EC4B6] text-[#2EC4B6] flex items-center justify-center hover:bg-[#2EC4B6]/10 transition-colors"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              width: `${pageCount * 100}%`,
              transform: `translateX(-${offsetPercent}%)`,
            }}
          >
            {Array.from({ length: pageCount }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="grid gap-5 px-0.5"
                style={{
                  width: `${100 / pageCount}%`,
                  gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))`,
                }}
              >
                {catalogSliderItems
                  .slice(pageIndex * perView, pageIndex * perView + perView)
                  .map((item) => (
                    <article
                      key={item.id}
                      className="rounded-[1.75rem] overflow-hidden shadow-md bg-white flex flex-col h-full"
                    >
                      <div className="relative aspect-square bg-[#fafafa]">
                        <Image
                          src={item.image}
                          alt={item.names[locale] ?? item.names.en}
                          fill
                          sizes="(max-width: 640px) 100vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="bg-[#f3f4f6] px-5 py-5 flex flex-col flex-grow min-h-[7.5rem]">
                        <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
                          {t('category')}
                        </span>
                        <p className="text-sm md:text-base font-bold text-[#166534] leading-snug line-clamp-2 flex-grow">
                          {item.names[locale] ?? item.names.en}
                        </p>
                        <Link
                          href="/quote"
                          className="mt-4 self-end w-9 h-9 rounded-full bg-[#2EC4B6] text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0"
                          aria-label={t('viewProduct')}
                        >
                          <ArrowRight size={16} />
                        </Link>
                      </div>
                    </article>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 mt-10">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${t('page')} ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all ${
                i === page ? 'w-8 bg-[#166534]' : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCatalogSlider;

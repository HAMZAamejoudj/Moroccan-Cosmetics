'use client';

import { useState } from 'react';
import { BLOG_CATEGORIES } from '@/lib/blog/categories';
import { useTranslations } from 'next-intl';

type Props = {
  listId: string;
};

export default function BlogCategoryFilter({ listId }: Props) {
  const t = useTranslations('Blog');
  const [active, setActive] = useState<string>('all');

  const applyFilter = (category: string) => {
    setActive(category);
    const list = document.getElementById(listId);
    if (!list) return;
    const cards = list.querySelectorAll<HTMLElement>('[data-category]');
    cards.forEach((card) => {
      const match = category === 'all' || card.dataset.category === category;
      card.style.display = match ? '' : 'none';
    });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter by category">
      <button
        type="button"
        onClick={() => applyFilter('all')}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
          active === 'all'
            ? 'bg-deep-navy text-white'
            : 'bg-sand/30 text-deep-navy hover:bg-sand/50'
        }`}
      >
        {t('index.filterAll')}
      </button>
      {BLOG_CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => applyFilter(cat)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            active === cat
              ? 'bg-deep-navy text-white'
              : 'bg-sand/30 text-deep-navy hover:bg-sand/50'
          }`}
        >
          {t(`categories.${cat}` as 'categories.Buying & Sourcing')}
        </button>
      ))}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export type FaqAccordionItem = {
  question: string;
  answer: string;
};

type FaqAccordionGridProps = {
  items: FaqAccordionItem[];
  defaultOpenIndex?: number | null;
  className?: string;
};

export default function FaqAccordionGrid({
  items,
  defaultOpenIndex = null,
  className = '',
}: FaqAccordionGridProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(defaultOpenIndex);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 items-start ${className}`}>
      {items.map((item, index) => {
        const isOpen = openFaq === index;
        return (
          <div
            key={item.question}
            className="bg-white rounded-2xl border border-sand overflow-hidden shadow-sm hover:border-sunrise/30 transition-colors self-start"
          >
            <button
              type="button"
              onClick={() => setOpenFaq(isOpen ? null : index)}
              className="w-full flex items-start justify-between gap-4 p-5 md:p-6 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-deep-navy text-sm md:text-base leading-snug">{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-sunrise shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-6 text-muted text-sm leading-relaxed border-t border-sand/80 pt-4">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

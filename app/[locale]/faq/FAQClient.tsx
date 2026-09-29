'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
  Settings,
  Clock,
  FlaskConical,
  MessageSquare,
  RefreshCcw,
  Rocket,
  HelpCircle,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';

export const iconMap = {
  package: Package,
  truck: Truck,
  shield: ShieldCheck,
  settings: Settings,
  clock: Clock,
  flask: FlaskConical,
  message: MessageSquare,
  refresh: RefreshCcw,
  rocket: Rocket,
  help: HelpCircle,
};

export type FaqIconType = keyof typeof iconMap;

export type FAQItem = {
  question: string;
  answer: string;
  iconType: FaqIconType;
};

export type FAQSection = {
  title: string;
  faqs: FAQItem[];
};

interface FAQClientProps {
  sections: FAQSection[];
  t: {
    heroTitle: React.ReactNode;
    heroDesc: string;
    ctaTitle: string;
    ctaDesc: string;
    ctaQuoteBtn: string;
    ctaBtn: string;
  };
}

export default function FAQClient({ sections, t }: FAQClientProps) {
  const [openKey, setOpenKey] = useState<string | null>('0-0');

  return (
    <main className="min-h-screen bg-white">
      <section className="relative pt-32 pb-20 bg-deep-navy overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <div className="w-64 h-64 text-white border-8 border-white/20 rounded-full flex items-center justify-center text-9xl font-serif">
            ?
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">{t.heroTitle}</h1>
            <p className="text-xl text-white/70 font-light leading-relaxed">{t.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sand/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {sections.map((section, sectionIdx) => (
              <div key={section.title}>
                <h2 className="text-2xl md:text-3xl font-sans font-bold text-deep-navy mb-8 pb-3 border-b border-sand">
                  {section.title}
                </h2>
                <div className="space-y-6">
                  {section.faqs.map((faq, faqIdx) => {
                    const key = `${sectionIdx}-${faqIdx}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={key}
                        className="bg-white rounded-3xl border border-sand overflow-hidden hover:border-sunrise/30 transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="w-full flex items-center justify-between p-8 text-left group"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-center gap-6">
                            <div
                              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                                isOpen ? 'bg-sunrise text-white' : 'bg-sand/20 text-deep-navy group-hover:bg-sand/40'
                              }`}
                            >
                              {React.createElement(iconMap[faq.iconType] || HelpCircle, { className: 'w-6 h-6' })}
                            </div>
                            <span className="text-xl font-bold text-deep-navy group-hover:text-sunrise transition-colors">
                              {faq.question}
                            </span>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="w-6 h-6 text-sunrise shrink-0" />
                          ) : (
                            <ChevronDown className="w-6 h-6 text-muted group-hover:text-sunrise shrink-0" />
                          )}
                        </button>

                        {isOpen ? (
                          <div className="px-8 pb-8 pt-0 animate-in fade-in slide-in-from-top-4 duration-300">
                            <div className="pl-[4.5rem]">
                              <div className="w-full h-px bg-sand/50 mb-6" />
                              <p className="text-muted leading-relaxed text-lg">{faq.answer}</p>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 p-12 bg-white rounded-[3rem] border border-sand shadow-2xl shadow-sand/20 text-center space-y-8">
            <h2 className="text-3xl font-serif font-bold text-deep-navy">{t.ctaTitle}</h2>
            <p className="text-muted max-w-xl mx-auto text-lg">{t.ctaDesc}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href="/quote"
                className="px-10 py-5 bg-sunrise text-deep-navy rounded-full font-bold hover:scale-[1.02] transition-all inline-flex items-center justify-center gap-3"
              >
                {t.ctaQuoteBtn}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/contact"
                className="px-12 py-5 bg-deep-navy text-white rounded-full font-bold hover:bg-sunrise hover:text-deep-navy transition-all flex items-center justify-center gap-3 group"
              >
                {t.ctaBtn}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

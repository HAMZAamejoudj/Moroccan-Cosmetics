'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ClipboardList, FlaskConical, BadgeCheck, Truck } from 'lucide-react';

const processSteps = ['step1', 'step2', 'step3', 'step4'] as const;

const stepIcons = [ClipboardList, FlaskConical, BadgeCheck, Truck];

const HomeProcess = () => {
  const t = useTranslations('HomeProcess');

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-baseline justify-center gap-x-2 text-4xl lg:text-5xl font-bold font-serif leading-[1.1]"
          >
            <span className="text-[#06142B]">{t('title')}</span>
            <span className="text-[#FF9F68] whitespace-nowrap">{t('titleAccent')}</span>
          </motion.h2>
        </div>

        <div className="relative">
          <div
            className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#2EC4B6]/50 to-transparent"
            aria-hidden
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {processSteps.map((key, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#2EC4B6] to-[#FF9F68] p-[2px] shadow-lg shadow-[#2EC4B6]/20 rotate-3"
                    >
                      <div className="w-full h-full rounded-[14px] bg-white flex items-center justify-center -rotate-3">
                        <Icon className="w-6 h-6 text-[#06142B]" strokeWidth={1.75} />
                      </div>
                    </div>
                    <span
                      className="absolute -top-2 -right-2 min-w-[1.75rem] h-7 px-1.5 rounded-full bg-[#06142B] text-white text-xs font-bold flex items-center justify-center shadow-md"
                    >
                      {index + 1}
                    </span>
                  </div>

                  <div
                    className="w-full flex-1 p-6 rounded-2xl border border-[#06142B]/8 bg-white shadow-[0_12px_40px_rgba(6,20,43,0.06)] hover:shadow-[0_20px_50px_rgba(6,20,43,0.1)] hover:border-[#FF9F68]/25 transition-all duration-300 min-h-[8.5rem] flex items-center justify-center"
                  >
                    <p className="text-sm md:text-[0.9375rem] text-[#3B4758] leading-relaxed">
                      {t(key)}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HomeProcess;

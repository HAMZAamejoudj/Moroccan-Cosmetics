'use client';

import { FlaskConical, Award, Package, Globe2, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const WhyChooseUs = () => {
  const t = useTranslations('WhyChoose');

  const reasons = [
    {
      title: t('qualityTitle'),
      description: t('qualityDesc'),
      icon: <FlaskConical className="w-8 h-8" />,
      delay: 0,
    },
    {
      title: t('certTitle'),
      description: t('certDesc'),
      icon: <Award className="w-8 h-8" />,
      delay: 0.1,
    },
    {
      title: t('moqTitle'),
      description: t('moqDesc'),
      icon: <Package className="w-8 h-8" />,
      delay: 0.2,
    },
    {
      title: t('exportTitle'),
      description: t('exportDesc'),
      icon: <Globe2 className="w-8 h-8" />,
      delay: 0.3,
    },
    {
      title: t('responseTitle'),
      description: t('responseDesc'),
      icon: <MessageCircle className="w-8 h-8" />,
      delay: 0.4,
    },
  ];

  return (
    <section id="wholesale" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-muted"
          >
            <span className="w-9 h-px bg-sunrise"></span>
            {t('badge')}
            <span className="w-9 h-px bg-sunrise"></span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mt-6 mb-4 font-serif text-deep-navy"
          >
            {t('title')} <span className="text-sunrise">{t('titleAccent')}</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-3xl mx-auto text-muted"
          >
            {t('description')}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-4 items-stretch">
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: reason.delay }}
              viewport={{ once: true }}
              className="wholesale-card text-center h-full flex flex-col lg:px-4 lg:py-6"
            >
              <div className="w-14 h-14 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-sunrise/20 to-teal/20 border border-black/5 text-sunrise shrink-0 [&_svg]:w-7 [&_svg]:h-7 lg:[&_svg]:w-6 lg:[&_svg]:h-6">
                {reason.icon}
              </div>
              <p className="text-lg lg:text-base font-serif font-bold mb-2 text-sunrise min-h-[2.75rem] lg:min-h-[2.5rem] flex items-center justify-center leading-snug">
                {reason.title}
              </p>
              <p className="text-sm text-muted leading-relaxed flex-grow">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

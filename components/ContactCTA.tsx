'use client';

import { Mail, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

const ContactCTA = () => {
  const t = useTranslations('ContactCTA');

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Abstract background blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF9F68]/10 rounded-full blur-[100px] -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2EC4B6]/10 rounded-full blur-[100px] -ml-64 -mb-64"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-[#06142B]/5">
          <div className="grid md:grid-cols-2 gap-12 items-center p-8 md:p-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center gap-4">
                <span className="w-12 h-[2px] bg-[#FF9F68]"></span>
                <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#FF9F68]">{t('badge')}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold font-serif text-[#06142B] leading-tight">
                {t('title')} <br />
                <span className="text-[#FF9F68]">{t('titleAccent')}</span>
              </h2>
              
              <p className="text-lg text-[#3B4758] leading-relaxed opacity-90">
                {t('description')}
              </p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-[#06142B] text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-[#123A63] hover:scale-105 shadow-xl shadow-[#06142B]/20"
                >
                  <Mail size={20} />
                  {t('contactBtn')}
                </Link>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 border-2 border-[#06142B] text-[#06142B] px-8 py-4 rounded-full font-bold transition-all hover:bg-[#06142B] hover:text-white hover:scale-105"
                >
                  <FileText size={20} />
                  {t('quoteBtn')}
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative justify-self-center"
            >
              <div className="relative w-[320px] sm:w-[380px] aspect-[4/5] p-3 rounded-[3rem] bg-gradient-to-br from-[#123A63]/50 to-[#FF9F68]/40 shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-4 rounded-[2.5rem] border border-white/40 z-10 pointer-events-none"></div>
                <Image
                  src="/images/contact-promo.webp"
                  alt="B2B Wholesale Partnership"
                  width={380}
                  height={460}
                  className="w-full h-full object-cover rounded-[2.5rem]"
                />
              </div>
              {/* Shadow effect */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-black/20 blur-2xl rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;

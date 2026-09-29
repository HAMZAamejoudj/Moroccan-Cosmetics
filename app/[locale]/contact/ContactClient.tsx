'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { siteConfig } from '@/lib/siteConfig';

export default function ContactClient() {
  const t = useTranslations('Contact');

  const contactCards = [
    { 
      title: t('cards.whatsapp.title'), 
      info: t('cards.whatsapp.info'), 
      link: siteConfig.whatsappUrl,
      icon: MessageCircle,
      color: "bg-teal/10 text-teal",
      sub: t('cards.whatsapp.sub')
    },
    { 
      title: t('cards.email.title'), 
      info: t('cards.email.info'), 
      link: "mailto:contact@moroccancosmetics.com",
      icon: Mail,
      color: "bg-sunrise/10 text-sunrise",
      sub: t('cards.email.sub')
    },
    { 
      title: t('cards.location.title'), 
      info: t('cards.location.info'), 
      link: "#",
      icon: MapPin,
      color: "bg-deep-navy/10 text-deep-navy",
      sub: t('cards.location.sub')
    }
  ];

  const helpItems = [
    t('help.item1'),
    t('help.item2'),
    t('help.item3'),
    t('help.item4')
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-deep-navy overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <MessageCircle className="w-64 h-64 text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
              {t('hero.title')} <span className="text-sunrise italic">{t('hero.titleAccent')}</span>
            </h1>
            <p className="text-xl text-white/80 font-light leading-relaxed mb-8">
              {t('hero.p1')}
            </p>
            <p className="text-lg text-white/60 font-light">
              {t('hero.p2')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="relative -mt-16 z-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactCards.map((card, idx) => (
            <a 
              href={card.link} 
              key={idx} 
              className="bg-white p-10 rounded-[3rem] border border-sand shadow-2xl shadow-sand/20 hover:border-sunrise/30 hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className={`w-16 h-16 ${card.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <card.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-deep-navy mb-2">{card.title}</h3>
              <p className="text-muted font-medium mb-1">{card.info}</p>
              <p className="text-sm text-muted/60">{card.sub}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            
            {/* Left: Content */}
            <div className="space-y-16">
              <div className="space-y-8">
                <h2 className="text-4xl font-serif font-bold text-deep-navy">{t('help.title')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {helpItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-6 bg-sand/5 rounded-2xl border border-sand/30">
                      <CheckCircle2 className="w-6 h-6 text-sunrise shrink-0" />
                      <p className="text-deep-navy font-medium text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-3 p-4 bg-teal/5 text-teal rounded-xl inline-flex">
                  <Clock className="w-5 h-5" />
                  <span className="font-bold">{t('help.response')}</span>
                </div>
              </div>

              <div className="p-12 bg-sand/10 rounded-[4rem] border border-sand relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <h3 className="text-3xl font-sans font-bold text-deep-navy">{t('b2b.title')}</h3>
                  <p className="text-muted leading-relaxed">
                    {t('b2b.p1')}
                  </p>
                  <p className="text-muted leading-relaxed">
                    {t('b2b.p2')}
                  </p>
                  <div className="flex items-center gap-2 text-deep-navy font-bold pt-4">
                    <span>{t('b2b.cta')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white p-12 rounded-[4rem] border border-sand shadow-2xl relative">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Send className="w-32 h-32" />
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-2 text-center lg:text-left">
                  <h3 className="text-3xl font-serif font-bold text-deep-navy">{t('form.title')}</h3>
                  <p className="text-muted">{t('form.description')}</p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-deep-navy ml-4">{t('form.labels.name')}</label>
                      <input 
                        type="text" 
                        placeholder={t('form.placeholders.name')} 
                        className="w-full px-8 py-5 bg-sand/10 border-none rounded-full text-deep-navy placeholder:text-muted/50 focus:ring-2 focus:ring-sunrise outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-deep-navy ml-4">{t('form.labels.email')}</label>
                      <input 
                        type="email" 
                        placeholder={t('form.placeholders.email')} 
                        className="w-full px-8 py-5 bg-sand/10 border-none rounded-full text-deep-navy placeholder:text-muted/50 focus:ring-2 focus:ring-sunrise outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-deep-navy ml-4">{t('form.labels.subject')}</label>
                      <input 
                        type="text" 
                        placeholder={t('form.placeholders.subject')} 
                        className="w-full px-8 py-5 bg-sand/10 border-none rounded-full text-deep-navy placeholder:text-muted/50 focus:ring-2 focus:ring-sunrise outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-deep-navy ml-4">{t('form.labels.phone')}</label>
                      <input 
                        type="text" 
                        placeholder={t('form.placeholders.phone')} 
                        className="w-full px-8 py-5 bg-sand/10 border-none rounded-full text-deep-navy placeholder:text-muted/50 focus:ring-2 focus:ring-sunrise outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-deep-navy ml-4">{t('form.labels.message')}</label>
                    <textarea 
                      rows={4} 
                      placeholder={t('form.placeholders.message')} 
                      className="w-full px-8 py-6 bg-sand/10 border-none rounded-[2rem] text-deep-navy placeholder:text-muted/50 focus:ring-2 focus:ring-sunrise outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button className="w-full py-6 bg-deep-navy text-white rounded-full font-bold text-lg hover:bg-sunrise hover:text-deep-navy transition-all shadow-xl flex items-center justify-center gap-3 group">
                    {t('form.btn')}
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}

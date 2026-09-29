import React from 'react';
import Image from 'next/image';
import {
  Package,
  Settings,
  Truck,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Users,
  Palette,
  Beaker,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function PrivateLabelLegacyPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'PrivateLabel' });

  const processSteps = [
    { title: t('journey.step1.title'), desc: t('journey.step1.desc'), icon: Beaker, color: 'bg-ocean/10 text-ocean' },
    { title: t('journey.step2.title'), desc: t('journey.step2.desc'), icon: Palette, color: 'bg-sunrise/10 text-sunrise' },
    { title: t('journey.step3.title'), desc: t('journey.step3.desc'), icon: Settings, color: 'bg-teal/10 text-teal' },
    { title: t('journey.step4.title'), desc: t('journey.step4.desc'), icon: Truck, color: 'bg-deep-navy/5 text-deep-navy' },
  ];

  const availableProducts = [
    t('ready.products.argan'),
    t('ready.products.prickly'),
    t('ready.products.soap'),
    t('ready.products.ghassoul'),
    t('ready.products.rose'),
    t('ready.products.aker'),
    t('ready.products.nila'),
    t('ready.products.essential'),
    t('ready.products.naturalSoap'),
    t('ready.products.kessa'),
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/private-label-hero.webp"
          alt="Private Label Skincare Production"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-deep-navy/50 backdrop-blur-[1px]" />
        <div className="relative z-10 text-center max-w-5xl px-4 mx-auto space-y-8 pt-24">
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight">
            {t('hero.title')} <br />
            <span className="text-sunrise italic font-normal">{t('hero.titleAccent')}</span> {t('hero.titleEnd')}
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto font-light leading-relaxed">{t('hero.description')}</p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-deep-navy">{t('intro.title')}</h2>
          <div className="w-24 h-1 bg-sunrise mx-auto" />
          <p className="text-xl text-muted leading-relaxed font-light italic">&quot;{t('intro.quote')}&quot;</p>
        </div>
      </section>

      <section className="py-24 bg-sand/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-ocean font-bold tracking-widest uppercase text-xs">{t('journey.badge')}</span>
            <h2 className="text-4xl font-serif font-bold text-deep-navy mt-4">{t('journey.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div
                  className={`w-20 h-20 rounded-3xl ${step.color} flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-lg`}
                >
                  <step.icon className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-deep-navy mb-4">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-serif font-bold text-deep-navy">{t('ready.title')}</h2>
            <p className="text-lg text-muted">{t('ready.description')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {availableProducts.map((product, idx) => (
                <div key={idx} className="flex items-center gap-3 p-4 bg-sand/20 rounded-2xl border border-sand/50">
                  <CheckCircle2 className="w-5 h-5 text-teal" />
                  <span className="text-sm font-medium text-deep-navy">{product}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/2 relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl">
            <Image src="/images/private-label-packaging-legacy.webp" alt="Packaging Showcase" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-deep-navy text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5">
          <Package className="w-64 h-64" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold">{t('why.title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-sunrise/20 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10 text-sunrise" />
              </div>
              <h3 className="text-2xl font-bold">{t('why.quality.title')}</h3>
              <p className="text-white/70 leading-relaxed">{t('why.quality.desc')}</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-ocean/20 rounded-full flex items-center justify-center mx-auto">
                <Globe className="w-10 h-10 text-ocean" />
              </div>
              <h3 className="text-2xl font-bold">{t('why.moq.title')}</h3>
              <p className="text-white/70 leading-relaxed">{t('why.moq.desc')}</p>
            </div>
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-teal/20 rounded-full flex items-center justify-center mx-auto">
                <Users className="w-10 h-10 text-teal" />
              </div>
              <h3 className="text-2xl font-bold">{t('why.support.title')}</h3>
              <p className="text-white/70 leading-relaxed">{t('why.support.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-deep-navy leading-tight">
            {t('cta.title')} <br />
            <span className="text-sunrise italic font-normal">{t('cta.titleAccent')}</span> {t('cta.titleEnd')}
          </h2>
          <p className="text-xl text-muted font-light leading-relaxed">{t('cta.description')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/contact"
              className="px-12 py-5 bg-sunrise text-deep-navy rounded-full font-bold hover:bg-deep-navy hover:text-white transition-all hover:scale-105 shadow-xl flex items-center gap-3"
            >
              {t('cta.btn')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

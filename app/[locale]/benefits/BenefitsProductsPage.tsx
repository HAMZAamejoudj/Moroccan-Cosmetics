import React from 'react';
import Image from 'next/image';
import {
  Droplet,
  Sparkles,
  Leaf,
  ShieldCheck,
  Heart,
  Wind,
  Waves,
  CheckCircle2,
  Zap,
  FlaskConical,
  Sprout,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function BenefitsProductsPage({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Benefits' });

  const benefitsData = [
    {
      id: 1,
      title: t('products.arganCosmetic.title'),
      subtitle: t('products.arganCosmetic.subtitle'),
      icon: Droplet,
      image: '/images/argan-oil-cosmetic.webp',
      color: 'bg-sunrise/10 text-sunrise',
      benefits: [
        t('products.arganCosmetic.benefit1'),
        t('products.arganCosmetic.benefit2'),
        t('products.arganCosmetic.benefit3'),
      ],
      perfectFor: t('products.arganCosmetic.perfect'),
    },
    {
      id: 2,
      title: t('products.arganFood.title'),
      subtitle: t('products.arganFood.subtitle'),
      icon: Sprout,
      image: '/images/argan-oil-cosmetic.webp',
      color: 'bg-teal/10 text-teal',
      benefits: [
        t('products.arganFood.benefit1'),
        t('products.arganFood.benefit2'),
        t('products.arganFood.benefit3'),
      ],
      perfectFor: t('products.arganFood.perfect'),
    },
    {
      id: 3,
      title: t('products.pricklyPear.title'),
      subtitle: t('products.pricklyPear.subtitle'),
      icon: Zap,
      image: '/images/prickly-pear-seed-oil.webp',
      color: 'bg-ocean/10 text-ocean',
      benefits: [
        t('products.pricklyPear.benefit1'),
        t('products.pricklyPear.benefit2'),
        t('products.pricklyPear.benefit3'),
      ],
      perfectFor: t('products.pricklyPear.perfect'),
    },
    {
      id: 4,
      title: t('products.nila.title'),
      subtitle: t('products.nila.subtitle'),
      icon: Sparkles,
      image: '/images/benefits/ingredient-nila-powder.webp',
      color: 'bg-deep-navy/5 text-deep-navy',
      benefits: [
        t('products.nila.benefit1'),
        t('products.nila.benefit2'),
        t('products.nila.benefit3'),
      ],
      perfectFor: t('products.nila.perfect'),
    },
    {
      id: 5,
      title: t('products.akerFassi.title'),
      subtitle: t('products.akerFassi.subtitle'),
      icon: Heart,
      image: '/images/catalog-slider/25-aker-fassi.webp',
      color: 'bg-sunrise/10 text-sunrise',
      benefits: [
        t('products.akerFassi.benefit1'),
        t('products.akerFassi.benefit2'),
        t('products.akerFassi.benefit3'),
      ],
      perfectFor: t('products.akerFassi.perfect'),
    },
    {
      id: 6,
      title: t('products.essentialOils.title'),
      subtitle: t('products.essentialOils.subtitle'),
      icon: Wind,
      image: '/images/benefits-hero.webp',
      color: 'bg-teal/10 text-teal',
      benefits: [
        t('products.essentialOils.benefit1'),
        t('products.essentialOils.benefit2'),
        t('products.essentialOils.benefit3'),
      ],
      perfectFor: t('products.essentialOils.perfect'),
    },
    {
      id: 7,
      title: t('products.blackSoap.title'),
      subtitle: t('products.blackSoap.subtitle'),
      icon: ShieldCheck,
      image: '/images/moroccan-black-soap.webp',
      color: 'bg-deep-navy/10 text-deep-navy',
      benefits: [
        t('products.blackSoap.benefit1'),
        t('products.blackSoap.benefit2'),
        t('products.blackSoap.benefit3'),
      ],
      perfectFor: t('products.blackSoap.perfect'),
    },
    {
      id: 8,
      title: t('products.naturalSoap.title'),
      subtitle: t('products.naturalSoap.subtitle'),
      icon: Leaf,
      image: '/images/benefits-hero.webp',
      color: 'bg-ocean/10 text-ocean',
      benefits: [
        t('products.naturalSoap.benefit1'),
        t('products.naturalSoap.benefit2'),
        t('products.naturalSoap.benefit3'),
      ],
      perfectFor: t('products.naturalSoap.perfect'),
    },
    {
      id: 9,
      title: t('products.ghassoul.title'),
      subtitle: t('products.ghassoul.subtitle'),
      icon: FlaskConical,
      image: '/images/ghassoul-clay.webp',
      color: 'bg-sunrise/10 text-sunrise',
      benefits: [
        t('products.ghassoul.benefit1'),
        t('products.ghassoul.benefit2'),
        t('products.ghassoul.benefit3'),
      ],
      perfectFor: t('products.ghassoul.perfect'),
    },
    {
      id: 10,
      title: t('products.kessa.title'),
      subtitle: t('products.kessa.subtitle'),
      icon: Waves,
      image: '/images/benefits-hero.webp',
      color: 'bg-deep-navy/5 text-deep-navy',
      benefits: [
        t('products.kessa.benefit1'),
        t('products.kessa.benefit2'),
        t('products.kessa.benefit3'),
      ],
      perfectFor: t('products.kessa.perfect'),
    },
    {
      id: 11,
      title: t('products.roseWater.title'),
      subtitle: t('products.roseWater.subtitle'),
      icon: Waves,
      image: '/images/moroccan-rose-water-bulk.webp',
      color: 'bg-teal/10 text-teal',
      benefits: [
        t('products.roseWater.benefit1'),
        t('products.roseWater.benefit2'),
        t('products.roseWater.benefit3'),
      ],
      perfectFor: t('products.roseWater.perfect'),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/benefits-hero.webp"
          alt="Natural Moroccan Ingredients"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-deep-navy/40 backdrop-blur-[2px]" />

        <div className="relative z-10 text-center max-w-5xl px-4 mx-auto space-y-6">
          <span className="text-sunrise font-bold tracking-[0.3em] uppercase text-sm animate-fade-in">
            {t('hero.badge')}
          </span>
          <h1 className="text-4xl md:text-7xl font-serif font-bold text-white leading-tight">
            {t('hero.title')} <br />
            <span className="text-sunrise italic font-normal">{t('hero.titleAccent')}</span>{' '}
            {t('hero.titleEnd')}
          </h1>
          <p className="text-white/90 text-xl max-w-2xl mx-auto font-light leading-relaxed">
            {t('hero.description')}
          </p>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <div className="inline-block px-4 py-1.5 bg-ocean/5 text-ocean rounded-full text-sm font-semibold uppercase tracking-wider">
            {t('intro.badge')}
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy">{t('intro.title')}</h2>
          <p className="text-lg text-muted leading-relaxed">{t('intro.description')}</p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefitsData.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-sand hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-3`}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white text-2xl font-serif font-bold">{item.title}</h3>
                  <p className="text-white/80 text-sm font-light italic">{item.subtitle}</p>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <ul className="space-y-4 mb-8 flex-grow">
                  {item.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex gap-3 text-sm text-muted leading-relaxed">
                      <CheckCircle2 className="w-5 h-5 text-sunrise shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-6 border-t border-sand/50">
                  <div className="flex items-center gap-2 text-xs font-bold text-deep-navy uppercase tracking-wider mb-2">
                    <Heart className="w-3.5 h-3.5 text-sunrise" /> {t('products.perfectFor')}
                  </div>
                  <p className="text-sm text-muted italic">{item.perfectFor}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white border-t border-sand">
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-deep-navy">
          <h2 className="text-4xl font-serif font-bold mb-16">{t('why.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-sunrise/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8 text-sunrise" />
              </div>
              <h3 className="text-xl font-bold">{t('why.natural')}</h3>
              <p className="text-muted text-sm leading-relaxed">{t('why.naturalDesc')}</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-ocean" />
              </div>
              <h3 className="text-xl font-bold">{t('why.cruelty')}</h3>
              <p className="text-muted text-sm leading-relaxed">{t('why.crueltyDesc')}</p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-teal" />
              </div>
              <h3 className="text-xl font-bold">{t('why.holistic')}</h3>
              <p className="text-muted text-sm leading-relaxed">{t('why.holisticDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

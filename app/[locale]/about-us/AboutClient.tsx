'use client';

import FaqAccordionGrid from '@/components/FaqAccordionGrid';
import Image from 'next/image';
import {
  ShieldCheck,
  Leaf,
  Globe,
  Users,
  Factory,
  ArrowRight,
  Award,
  Heart,
  Recycle,
  Eye,
  Handshake,
  HelpCircle,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'] as const;

const AboutClient = () => {
  const t = useTranslations('About');
  const tFaq = useTranslations('About.faq');
  const milestones = [1, 2, 3, 4] as const;

  const valueIconClass = 'bg-sunrise/10 text-sunrise';

  const values = [
    {
      title: t('values.quality'),
      desc: t('values.qualityDesc'),
      icon: Award,
    },
    {
      title: t('values.sustainability'),
      desc: t('values.sustainabilityDesc'),
      icon: Recycle,
    },
    {
      title: t('values.community'),
      desc: t('values.communityDesc'),
      icon: Heart,
    },
    {
      title: t('values.globalReach'),
      desc: t('values.globalReachDesc'),
      icon: Globe,
    },
  ];

  const coreValues = [
    { title: t('core.authenticity'), desc: t('core.authenticityDesc'), icon: ShieldCheck },
    { title: t('core.transparency'), desc: t('core.transparencyDesc'), icon: Eye },
    { title: t('core.sustainability'), desc: t('core.sustainabilityDesc'), icon: Leaf },
    { title: t('core.partnership'), desc: t('core.partnershipDesc'), icon: Handshake },
  ];

  const stats = [
    { label: t('stats.organic'), icon: Leaf },
    { label: t('stats.countries'), icon: Globe },
    { label: t('stats.ingredients'), icon: Factory },
    { label: t('stats.support'), icon: Users },
  ];

  return (
    <div className="bg-white overflow-hidden">
      <section className="relative h-[72vh] min-h-[560px] md:min-h-[640px] lg:min-h-[720px] flex items-center justify-center">
        <Image
          src="/images/about-hero-v2.webp"
          alt="Moroccan cosmetics manufacturing"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-deep-navy/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold text-white mb-8 leading-[1.12] max-w-5xl mx-auto">
            <span className="block">{t('hero.title')}</span>
            <span className="block mt-3 md:mt-4">
              <span className="text-sunrise italic font-normal">{t('hero.titleAccent')}</span>
              <span className="text-white font-bold not-italic"> {t('hero.titleEnd')}</span>
            </span>
          </h1>
          <div className="w-24 h-1 bg-sunrise mx-auto" />
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1.5 bg-sand text-sunrise rounded-full text-sm font-semibold uppercase tracking-wider">
              {t('whoWeAre.badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy leading-tight">
              {t('whoWeAre.title')}
            </h2>
            <div className="space-y-6 text-muted leading-relaxed">
              <p>{t('whoWeAre.p1')}</p>
              <p>{t('whoWeAre.p2')}</p>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-sm aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10 border-8 border-white">
              <Image
                src="/images/benefits/benefits-hub-hero.webp"
                alt="Moroccan argan oil, rose water, black soap and rhassoul"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="/images/catalog-slider/20-argan-oil-trio.webp"
              alt="Pure cold-pressed argan oil in artisan bottles"
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="order-1 lg:order-2 space-y-6">
            <span className="inline-block px-4 py-1.5 bg-[#F4F6FA] text-teal rounded-full text-sm font-semibold uppercase tracking-wider">
              {t('story.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy">{t('story.title')}</h2>
            <p className="text-muted leading-relaxed">{t('story.p1')}</p>
            <p className="text-muted leading-relaxed">{t('story.p2')}</p>
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-sunrise">{t('milestones.badge')}</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy">{t('milestones.title')}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((i) => (
            <div key={i} className="relative p-8 rounded-3xl bg-white border border-sand shadow-sm hover:shadow-lg transition-shadow">
              <span className="text-3xl font-bold text-sunrise">{t(`milestones.m${i}Year`)}</span>
              <h3 className="text-lg font-bold text-deep-navy mt-4 mb-3">{t(`milestones.m${i}Title`)}</h3>
              <p className="text-sm text-muted leading-relaxed">{t(`milestones.m${i}Desc`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sunrise font-bold uppercase tracking-widest text-sm">{t('facility.badge')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy">{t('facility.title')}</h2>
            <p className="text-muted leading-relaxed">{t('facility.description')}</p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[#06142B]/10 shadow-md">
            <Image
              src="/images/home-hero-products.webp"
              alt="Moroccan cosmetics manufacturing and bulk products in Agadir"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[3rem] border border-[#06142B]/8 p-10 md:p-16 grid lg:grid-cols-2 gap-12 items-center bg-white shadow-sm">
          <div className="space-y-6">
            <p className="text-teal font-bold uppercase tracking-widest text-sm">{t('cooperatives.badge')}</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy">{t('cooperatives.title')}</h2>
            <p className="text-muted leading-relaxed">{t('cooperatives.description')}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {coreValues.map((item) => (
              <div key={item.title} className="p-6 bg-white rounded-2xl shadow-sm">
                <item.icon className="w-8 h-8 text-sunrise mb-4" />
                <h3 className="font-bold text-deep-navy mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-ocean mb-3">{t('values.badge')}</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy">{t('values.title')}</h2>
          <p className="text-muted max-w-2xl mx-auto mt-4">{t('values.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value) => (
            <div key={value.title} className="p-8 rounded-[2rem] bg-white border-2 border-sand/50 hover:shadow-xl transition-all text-center">
              <div className={`w-16 h-16 rounded-2xl ${valueIconClass} flex items-center justify-center mb-6 mx-auto`}>
                <value.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-serif font-bold text-deep-navy mb-3">{value.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{value.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 text-teal font-bold uppercase tracking-widest text-xs">
              <HelpCircle className="w-4 h-4" />
              {tFaq('badge')}
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy">{tFaq('title')}</h2>
          </div>
          <FaqAccordionGrid
            defaultOpenIndex={0}
            items={faqKeys.map((key) => ({
              question: tFaq(`${key}.question`),
              answer: tFaq(`${key}.answer`),
            }))}
          />
          <p className="text-center mt-10">
            <Link href="/faq" className="inline-flex items-center gap-2 font-semibold text-sunrise hover:underline">
              {tFaq('seeAll')} <ArrowRight className="w-4 h-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-[#06142B]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl md:text-3xl font-serif font-bold text-deep-navy mb-12">{t('stats.title')}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-[#06142B]/10 shadow-sm"
              >
                <stat.icon className="w-10 h-10 text-sunrise mb-4" />
                <p className="text-deep-navy font-semibold leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden group rounded-b-[4rem] md:rounded-b-[8rem] mb-16 shadow-2xl">
        <Image
          src="/images/about-cta-bg.webp"
          alt="Partner with Moroccan Cosmetics"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-deep-navy/80 via-deep-navy/60 to-deep-navy/90" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-4">
              <span className="text-sunrise font-bold tracking-[0.4em] uppercase text-sm">{t('cta.badge')}</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
                {t('cta.title')}{' '}
                <span className="text-sunrise italic font-normal">{t('cta.titleAccent')}</span>
              </h2>
            </div>
            <p className="text-xl text-muted-light/90 leading-relaxed font-light">{t('cta.description')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-12 py-5 bg-sunrise text-deep-navy rounded-full font-bold hover:bg-white transition-all hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
              >
                {t('cta.btnContact')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/quote"
                className="w-full sm:w-auto px-12 py-5 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-deep-navy transition-all"
              >
                {t('cta.btnQuote')}
              </Link>
            </div>
            <p className="text-sm text-white/70">{t('cta.visitNote')}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutClient;

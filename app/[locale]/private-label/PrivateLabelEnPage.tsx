'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import PrivateLabelCta from './PrivateLabelCta';
import FaqAccordionGrid from '@/components/FaqAccordionGrid';
import { buildPrivateLabelFaq } from './privateLabelFaq';
import { privateLabelStructuredData } from './privateLabelSeo';
import {
  facilityCityLabel,
  flagVisible,
  privateLabelConfig,
} from '@/lib/privateLabelConfig';
import {
  Store, Tent, ShoppingBag, Truck, BadgeCheck,
  CheckCircle2, Box, Bath, Brush, Tag,
  Droplets, FlaskConical, SprayCan,
  Euro, Crown, Landmark, MapPinned,
} from 'lucide-react';

const HERO_IMAGE = '/images/ghassoul-clay.webp';
/** Packaging section — product flacons (no facility blur). */
const PACKAGING_IMAGE = '/images/catalog-slider/private-label-packaging.webp';

function useConfigLabels() {
  const t = useTranslations('PrivateLabelPage.config');
  const moq = () =>
    privateLabelConfig.minimumOrderUnits != null
      ? t('moqUnits', { units: privateLabelConfig.minimumOrderUnits })
      : t('onRequest');
  const leadTime = () => {
    const { leadTimeWeeksMin, leadTimeWeeksMax } = privateLabelConfig;
    if (leadTimeWeeksMin != null && leadTimeWeeksMax != null) {
      return t('weeksRange', { min: leadTimeWeeksMin, max: leadTimeWeeksMax });
    }
    if (leadTimeWeeksMin != null) return t('weeksSingle', { min: leadTimeWeeksMin });
    if (leadTimeWeeksMax != null) return t('weeksSingle', { min: leadTimeWeeksMax });
    return t('onRequest');
  };
  const quoteHours = () => {
    if (privateLabelConfig.quoteResponseHours == null) return null;
    return t('hours', { hours: privateLabelConfig.quoteResponseHours });
  };
  const leadTimeRange = () => {
    const { leadTimeWeeksMin, leadTimeWeeksMax } = privateLabelConfig;
    if (leadTimeWeeksMin != null && leadTimeWeeksMax != null) {
      return t('weeksRange', { min: leadTimeWeeksMin, max: leadTimeWeeksMax });
    }
    return null;
  };
  return { moq, leadTime, quoteHours, leadTimeRange };
}

function HeroTrustChips() {
  const t = useTranslations('PrivateLabelPage.chips');
  const { leadTime } = useConfigLabels();
  const chips: string[] = [];
  chips.push(
    privateLabelConfig.minimumOrderUnits != null
      ? t('moqFrom', { units: privateLabelConfig.minimumOrderUnits })
      : t('moqOnRequest')
  );
  chips.push(t('readyIn', { time: leadTime() }));
  if (flagVisible(privateLabelConfig.coaEveryBatch) && flagVisible(privateLabelConfig.msdsProvided)) {
    chips.push(t('coaMsds'));
  }
  if (privateLabelConfig.certificationsLabel) {
    chips.push(privateLabelConfig.certificationsLabel);
  }
  if (privateLabelConfig.countriesShippedCount != null) {
    chips.push(t('shippingCountries', { count: privateLabelConfig.countriesShippedCount }));
  }
  if (chips.length < 2) return null;
  return (
    <ul className="flex flex-wrap justify-center gap-2 text-xs sm:text-sm max-w-3xl mx-auto">
      {chips.map((c) => (
        <li
          key={c}
          className="rounded-full bg-white/20 px-3 py-1.5 border border-white/40 text-white font-medium backdrop-blur-sm"
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

function RegulationsSection() {
  const t = useTranslations('PrivateLabelPage.regulations');
  const regions = [
    { key: 'eu' as const, icon: Euro },
    { key: 'uk' as const, icon: Crown },
    { key: 'us' as const, icon: Landmark },
    { key: 'other' as const, icon: MapPinned },
  ];

  return (
    <section className="py-20 bg-white border-t border-sand/40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
           <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-4">{t('title')}</h2>
           <p className="text-muted max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {regions.map(({ key, icon: RegionIcon }) => (
             <div key={key} className="flex flex-col h-full bg-white border border-sand rounded-2xl p-5 lg:p-6 shadow-sm hover:border-ocean/25 transition-colors">
                <h3 className="font-bold text-deep-navy flex items-center gap-3 text-base lg:text-lg mb-5 pb-4 border-b border-sand/60">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sand/40" aria-hidden>
                    <RegionIcon className="h-5 w-5 text-ocean" strokeWidth={1.75} />
                  </span>
                  <span className="text-ocean leading-snug">{t(`regions.${key}.name`)}</span>
                </h3>
                <div className="flex flex-col gap-5 flex-grow">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-light mb-2 block">{t('ownerLabel')}</span>
                    <p className="text-xs sm:text-sm text-deep-navy leading-relaxed">{t(`regions.${key}.owner`)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-light mb-2 block">{t('provideLabel')}</span>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">{t(`regions.${key}.us`)}</p>
                  </div>
                </div>
             </div>
          ))}
        </div>
        <div className="mt-10 max-w-4xl mx-auto bg-white border border-sand p-6 lg:p-8 rounded-2xl text-center shadow-sm">
          <p className="text-sm text-muted">
            {t.rich('claims', {
              strong: (chunks) => <strong className="text-deep-navy">{chunks}</strong>,
              link: (chunks) => (
                <Link href="/benefits/argan-oil-benefits" className="text-ocean font-bold hover:text-sunrise underline underline-offset-4">
                  {chunks}
                </Link>
              ),
            })}
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const t = useTranslations('PrivateLabelPage.pricing');
  const factors = ['product', 'packaging', 'quantity', 'customization', 'shipping'] as const;

  return (
    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="bg-white border border-sand rounded-[2rem] p-8 md:p-12 lg:p-14 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sunrise/10 rounded-full blur-3xl" aria-hidden />
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-8 relative z-10">{t('title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 mb-10 text-left relative z-10 items-stretch">
          {factors.map((key) => (
             <div key={key} className="flex flex-col h-full bg-white p-4 lg:p-5 rounded-2xl border border-sand shadow-sm hover:border-ocean/20 transition-colors">
                <strong className="block text-deep-navy mb-2 text-sm lg:text-base">{t(`factors.${key}.title`)}</strong>
                <span className="text-xs sm:text-sm text-muted leading-relaxed">{t(`factors.${key}.desc`)}</span>
             </div>
          ))}
        </div>
        <div className="relative z-10 space-y-4">
          {privateLabelConfig.startingPriceExample ? (
            <p className="text-muted text-sm bg-white inline-block px-6 py-2.5 rounded-full border border-sand font-medium">{privateLabelConfig.startingPriceExample}</p>
          ) : null}
          <p className="text-ocean font-bold block">{t('quoteCta')}</p>
        </div>
      </div>
    </section>
  );
}

function WhoIsItForSection() {
  const t = useTranslations('PrivateLabelPage.whoIsItFor');
  const audienceKeys = ['newBrands', 'spas', 'online', 'distributors', 'established'] as const;
  const icons = [Store, Tent, ShoppingBag, Truck, BadgeCheck];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-4">{t('title')}</h2>
          <p className="text-muted max-w-3xl mx-auto">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5 items-stretch">
          {audienceKeys.map((key, idx) => {
            const Icon = icons[idx];
            return (
            <div
              key={key}
              className="flex flex-col h-full gap-3 p-5 lg:p-6 rounded-3xl bg-white border border-sand hover:border-ocean/20 transition-colors shadow-sm"
            >
              <div className="bg-sand/30 p-3 rounded-2xl w-fit shrink-0"><Icon className="w-6 h-6 text-ocean" /></div>
              <div className="min-w-0">
                <h3 className="font-bold text-deep-navy mb-2 text-base lg:text-lg leading-snug">{t(`audiences.${key}.title`)}</h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed">{t(`audiences.${key}.desc`)}</p>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WaysToStartSection() {
  const t = useTranslations('PrivateLabelPage.ways');
  const { moq, leadTime } = useConfigLabels();

  return (
    <section className="py-20 max-w-6xl mx-auto px-4">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-4">{t('title')}</h2>
        <p className="text-muted max-w-2xl mx-auto text-lg">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {/* Card 1 */}
        <div className="bg-white rounded-3xl p-8 border border-sand shadow-sm hover:shadow-xl transition-all relative overflow-hidden group flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-ocean transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <div className="bg-sand/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <Tag className="w-6 h-6 text-ocean" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-deep-navy mb-3">{t('level1.title')}</h3>
          <p className="text-muted mb-8 flex-grow">{t('level1.desc')}</p>
          <div className="space-y-4 pt-6 border-t border-sand/60 text-sm mt-auto">
            <div className="flex justify-between items-center"><span className="text-muted-light font-medium uppercase tracking-wider text-xs">{t('moq')}</span><span className="font-bold text-deep-navy">{moq()}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-light font-medium uppercase tracking-wider text-xs">{t('leadTime')}</span><span className="font-bold text-deep-navy">{leadTime()}</span></div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-ocean rounded-3xl p-8 shadow-2xl relative overflow-hidden text-white transform md:-translate-y-4 flex flex-col group">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-sunrise transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          <div className="bg-white/95 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative z-10 shadow-sm">
            <Box className="w-6 h-6 text-ocean" />
          </div>
          <h3 className="text-2xl font-serif font-bold mb-3 relative z-10">{t('level2.title')}</h3>
          <p className="text-white/80 mb-8 flex-grow relative z-10">{t('level2.desc')}</p>
          <div className="space-y-4 pt-6 border-t border-white/20 text-sm mt-auto relative z-10">
            <div className="flex justify-between items-center"><span className="text-white/60 font-medium uppercase tracking-wider text-xs">{t('moq')}</span><span className="font-bold">{moq()}</span></div>
            <div className="flex justify-between items-center"><span className="text-white/60 font-medium uppercase tracking-wider text-xs">{t('leadTime')}</span><span className="font-bold">{leadTime()}</span></div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white rounded-3xl p-8 border border-sand shadow-sm hover:shadow-xl transition-all relative overflow-hidden group flex flex-col">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-ocean transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
          <div className="bg-sand/50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
            <FlaskConical className="w-6 h-6 text-ocean" />
          </div>
          <h3 className="text-2xl font-serif font-bold text-deep-navy mb-3">{t('level3.title')}</h3>
          <p className="text-muted mb-8 flex-grow">{t('level3.desc')}</p>
          <div className="space-y-4 pt-6 border-t border-sand/60 text-sm mt-auto">
            <div className="flex justify-between items-center"><span className="text-muted-light font-medium uppercase tracking-wider text-xs">{t('moq')}</span><span className="font-bold text-deep-navy">{moq()}</span></div>
            <div className="flex justify-between items-center"><span className="text-muted-light font-medium uppercase tracking-wider text-xs">{t('leadTime')}</span><span className="font-bold text-deep-navy">{leadTime()}</span></div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm text-muted mt-10 max-w-2xl mx-auto leading-relaxed">{t('footnote')}</p>
    </section>
  );
}

function ProductsSection() {
  const t = useTranslations('PrivateLabelPage.products');
  const sizeBlack = privateLabelConfig.blackSoapSizes;
  const sizeRhassoul = privateLabelConfig.rhassoulSizes;
  const sizeRose = privateLabelConfig.roseWaterSizes;
  const sizePowders = privateLabelConfig.powdersSizes;
  const blends = privateLabelConfig.arganBlendsList;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-4">{t('title')}</h2>
          <p className="text-muted max-w-2xl mx-auto text-lg">{t('subtitle')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Moroccan Oils */}
          <div className="bg-white p-8 lg:p-10 rounded-[2rem] border border-sand shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-sunrise/10 p-3 rounded-2xl">
                 <Droplets className="w-8 h-8 text-sunrise" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-deep-navy">{t('oils.title')}</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-navy block text-lg mb-1">{t('oils.arganTitle')}</strong>
                  <span className="text-muted text-sm leading-relaxed block">
                    {t.rich('oils.arganDesc', {
                      link: (chunks) => (
                        <Link href="/benefits/argan-oil-benefits" className="text-ocean font-medium hover:underline">{chunks}</Link>
                      ),
                    })}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-navy block text-lg mb-1">{t('oils.pricklyTitle')}</strong>
                  <span className="text-muted text-sm leading-relaxed block">{t('oils.pricklyDesc')}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-navy block text-lg mb-1">{t('oils.blendsTitle')}</strong>
                  <span className="text-muted text-sm leading-relaxed block">{t('oils.blendsDesc')}{blends ? ` ${blends}` : ''}</span>
                </div>
              </li>
            </ul>
          </div>
          
          {/* Hammam Essentials */}
          <div className="bg-white p-8 lg:p-10 rounded-[2rem] border border-sand shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-teal/10 p-3 rounded-2xl">
                 <Bath className="w-8 h-8 text-teal" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-deep-navy">{t('hammam.title')}</h3>
            </div>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-navy block text-lg mb-1">{t('hammam.soapTitle')}</strong>
                  <span className="text-muted text-sm leading-relaxed block">{t('hammam.soapDesc')}{sizeBlack ? ` ${sizeBlack}` : ''}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-navy block text-lg mb-1">{t('hammam.rhassoulTitle')}</strong>
                  <span className="text-muted text-sm leading-relaxed block">{t('hammam.rhassoulDesc')}{sizeRhassoul ? ` ${sizeRhassoul}` : ''}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-navy block text-lg mb-1">{t('hammam.kessaTitle')}</strong>
                  <span className="text-muted text-sm leading-relaxed block">{t('hammam.kessaDesc')}</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                <div>
                  <strong className="text-deep-navy block text-lg mb-1">{t('hammam.giftTitle')}</strong>
                  <span className="text-muted text-sm leading-relaxed block">{t('hammam.giftDesc')}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Floral Waters & Powders */}
          <div className="bg-white p-8 lg:p-10 rounded-[2rem] border border-sand shadow-sm md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10 hover:shadow-md transition-shadow">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-ocean/5 p-3 rounded-2xl">
                   <SprayCan className="w-8 h-8 text-ocean" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-deep-navy">{t('floral.title')}</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-deep-navy block text-lg mb-1">{t('floral.roseTitle')}</strong>
                    <span className="text-muted text-sm leading-relaxed block">{t('floral.roseDesc')}{sizeRose ? ` ${sizeRose}` : ''}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-sunrise/10 p-3 rounded-2xl">
                   <Brush className="w-8 h-8 text-sunrise" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-deep-navy">{t('powders.title')}</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-ocean shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-deep-navy block text-lg mb-1">{t('powders.nilaTitle')}</strong>
                    <span className="text-muted text-sm leading-relaxed block">{t('powders.nilaDesc')}{sizePowders ? ` ${sizePowders}` : ''}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
           <div className="bg-white border border-sand px-8 py-5 rounded-full shadow-sm text-center">
            <span className="text-muted mr-2">{t('ctaMissing')}</span>
            <Link href="/contact" className="text-ocean font-bold hover:text-sunrise">{t('ctaContact')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PackagingSection() {
  const t = useTranslations('PrivateLabelPage.packaging');

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 lg:items-start">
        <div className="lg:w-1/2 min-w-0 order-2 lg:order-1">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-6">{t('title')}</h2>
          <p className="text-lg text-muted mb-10">{t('intro')}</p>
          <ul className="space-y-8">
            <li className="flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-sand/60 flex items-center justify-center shrink-0">
                <Box className="w-6 h-6 text-sunrise" />
              </div>
              <div>
                <strong className="text-deep-navy block text-lg mb-1">{t('bottlesTitle')}</strong>
                <span className="text-muted leading-relaxed block">{t('bottlesDesc')}</span>
              </div>
            </li>
            <li className="flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-sand/60 flex items-center justify-center shrink-0">
                <Tag className="w-6 h-6 text-sunrise" />
              </div>
              <div>
                <strong className="text-deep-navy block text-lg mb-1">{t('labelsTitle')}</strong>
                <span className="text-muted leading-relaxed block">{t('labelsDesc')}</span>
              </div>
            </li>
            <li className="flex gap-5">
              <div className="w-12 h-12 rounded-2xl bg-sand/60 flex items-center justify-center shrink-0">
                <Brush className="w-6 h-6 text-sunrise" />
              </div>
              <div>
                <strong className="text-deep-navy block text-lg mb-1">{t('designTitle')}</strong>
                <span className="text-muted leading-relaxed block">
                  {flagVisible(privateLabelConfig.designService) ? t('designDescIncluded') : t('designDescAsk')}
                </span>
              </div>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 w-full min-w-0 shrink-0 order-1 lg:order-2 lg:mt-20 xl:mt-28">
          <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-sand shadow-2xl bg-[#f4f6fa]">
            <Image
              src={PACKAGING_IMAGE}
              alt={t('imageAlt')}
              width={960}
              height={720}
              className="w-full h-auto object-cover object-center brightness-[0.97] contrast-[1.05] saturate-[1.08]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const t = useTranslations('PrivateLabelPage.howItWorks');
  const { quoteHours, leadTimeRange } = useConfigLabels();
  const leadRange = leadTimeRange();
  const hoursLabel = quoteHours();

  const briefDesc = `${t('steps.brief.desc')} ${hoursLabel ? t('steps.brief.replyHours', { hours: hoursLabel }) : t('steps.brief.replyDefault')}`;
  const docDesc =
    flagVisible(privateLabelConfig.coaEveryBatch) || flagVisible(privateLabelConfig.msdsProvided)
      ? t('steps.documents.descFull')
      : t('steps.documents.descBasic');

  const steps = [
    { title: t('steps.brief.title'), time: t('steps.brief.time'), desc: briefDesc },
    { title: t('steps.samples.title'), time: t('steps.samples.time'), desc: t('steps.samples.desc') },
    { title: t('steps.quote.title'), time: t('steps.quote.time'), desc: t('steps.quote.desc') },
    {
      title: t('steps.production.title'),
      time: leadRange ? t('steps.production.timeRange', { range: leadRange }) : t('steps.production.timeQuote'),
      desc: t('steps.production.desc'),
    },
    { title: t('steps.documents.title'), time: t('steps.documents.time'), desc: docDesc },
    { title: t('steps.shipping.title'), time: t('steps.shipping.time'), desc: t('steps.shipping.desc') },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-16 text-center">{t('title')}</h2>
        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[1.375rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-ocean/20 before:via-ocean/20 before:to-transparent">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-sunrise text-white font-bold text-lg shadow-md shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110">
                {idx + 1}
              </div>
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl border border-sand bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
                  <h3 className="font-bold text-deep-navy text-xl">{step.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-wide bg-sand/60 text-ocean px-3 py-1.5 rounded-full w-fit">{step.time}</span>
                </div>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-white p-8 rounded-3xl border border-sand text-center max-w-2xl mx-auto shadow-sm">
          <p className="text-muted leading-relaxed">
            <strong className="text-deep-navy block mb-2 text-lg">{t('needFromYouTitle')}</strong> {t('needFromYou')}
          </p>
        </div>
      </div>
    </section>
  );
}

function IntroSection() {
  const t = useTranslations('PrivateLabelPage.intro');
  const moq = privateLabelConfig.minimumOrderUnits;
  return (
    <section className="py-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-deep-navy mb-6">{t('title')}</h2>
        <p className="text-lg text-muted leading-relaxed mb-6">{t('body', { city: facilityCityLabel() })}</p>
        {moq != null ? (
          <div className="mb-6 space-y-3">
            <p className="inline-flex items-center justify-center rounded-full border border-ocean/20 bg-sand/40 px-6 py-3 text-base font-bold text-deep-navy shadow-sm">
              {t('moqBadge', { units: moq })}
            </p>
            <p className="text-sm text-muted max-w-2xl mx-auto leading-relaxed">{t('moqNote')}</p>
          </div>
        ) : null}
        {privateLabelConfig.yourStorySentence ? <p className="text-lg text-muted leading-relaxed">{privateLabelConfig.yourStorySentence}</p> : null}
    </section>
  );
}

function useHeroIntroParagraph() {
  const t = useTranslations('PrivateLabelPage.hero');
  let text = t('introBase');
  if (privateLabelConfig.minimumOrderUnits != null) {
    text += t('introMoqStart', { units: privateLabelConfig.minimumOrderUnits });
    if (flagVisible(privateLabelConfig.coaEveryBatch)) {
      text += t('introMoqCoa');
    } else {
      text += t('introMoqEnd');
    }
  } else if (flagVisible(privateLabelConfig.coaEveryBatch)) {
    text += t('introCoaOnly');
  } else {
    text += t('introQuote');
  }
  return text;
}

export default function PrivateLabelPage() {
  const locale = useLocale();
  const t = useTranslations('PrivateLabelPage');
  const tMeta = useTranslations('PrivateLabelPage.metadata');
  const { leadTimeRange } = useConfigLabels();
  const faqItems = buildPrivateLabelFaq(
    (key, values) => t(key, values as Record<string, string | number>),
    leadTimeRange()
  );
  const structuredData = privateLabelStructuredData(
    locale,
    tMeta('title'),
    tMeta('description'),
    t('breadcrumb.home'),
    t('breadcrumb.current'),
    faqItems.length >= 2 ? faqItems : []
  );
  const showSamplesCta = flagVisible(privateLabelConfig.samplesAvailable);
  const { quoteHours } = useConfigLabels();
  const hoursLabel = quoteHours();
  const heroIntro = useHeroIntroParagraph();

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-32 text-deep-navy">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <nav aria-label="Breadcrumb" className="max-w-4xl mx-auto px-4 text-sm text-muted mb-8">
        <ol className="flex flex-wrap gap-2 items-center">
          <li><Link href="/" className="hover:text-ocean transition-colors">{t('breadcrumb.home')}</Link></li>
          <li aria-hidden className="text-muted-light">/</li>
          <li className="font-medium text-deep-navy">{t('breadcrumb.current')}</li>
        </ol>
      </nav>

      <header className="relative max-w-6xl mx-auto px-4 mb-12 md:mb-16">
        <div className="relative min-h-[min(72vh,520px)] md:min-h-[480px] rounded-[2.5rem] overflow-hidden shadow-xl flex flex-col justify-end">
          <Image src={HERO_IMAGE} alt={t('hero.imageAlt')} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/95 via-deep-navy/75 to-deep-navy/35" />
          <div className="relative z-10 max-w-3xl mx-auto w-full text-center px-6 sm:px-10 pb-10 md:pb-14 pt-28 md:pt-32 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-white">
              {t('hero.title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/95 leading-relaxed max-w-2xl mx-auto">
              {heroIntro}
            </p>
            <HeroTrustChips />
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 pt-2">
              <PrivateLabelCta
                kind="quote"
                location="hero"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sunrise text-deep-navy font-bold hover:bg-white transition-colors shadow-lg"
              >
                {t('hero.ctaQuote')}
              </PrivateLabelCta>
              {showSamplesCta ? (
                <PrivateLabelCta
                  kind="samples"
                  location="hero"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-white text-white font-bold hover:bg-white hover:text-deep-navy transition-colors"
                >
                  {t('hero.ctaSamples')}
                </PrivateLabelCta>
              ) : null}
            </div>
          </div>
        </div>
      </header>

      <IntroSection />
      
      <WhoIsItForSection />
      
      <WaysToStartSection />
      
      <ProductsSection />
      
      <PackagingSection />
      
      <HowItWorksSection />
      
      <RegulationsSection />
      
      <PricingSection />

      {faqItems.length >= 2 ? (
        <section className="py-24 bg-white" aria-labelledby="pl-faq-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 id="pl-faq-heading" className="text-3xl md:text-4xl font-serif font-bold text-deep-navy text-center mb-12">
              {t('faq.title')}
            </h2>
            <FaqAccordionGrid items={faqItems} defaultOpenIndex={0} />
          </div>
        </section>
      ) : null}

      <section className="py-24 bg-white border-t border-sand/40 text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-6 text-deep-navy">{t('finalCta.title')}</h2>
          <p className="text-lg text-muted mb-10 leading-relaxed">
            {t('finalCta.body')}
            {hoursLabel ? t('finalCta.replyHours', { hours: hoursLabel }) : t('finalCta.replyDefault')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <PrivateLabelCta kind="quote" location="final" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-sunrise text-deep-navy font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
              {t('hero.ctaQuote')}
            </PrivateLabelCta>
            {showSamplesCta ? (
              <PrivateLabelCta kind="samples" location="final" className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full border-2 border-ocean/20 bg-white text-ocean font-bold hover:border-ocean transition-all hover:-translate-y-1 shadow-sm">
                {t('hero.ctaSamples')}
              </PrivateLabelCta>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { enOnlyAbsoluteHref } from '@/lib/enOnlyRoutes';

const tableWrap = 'my-8 overflow-x-auto rounded-xl border border-sand/80';

const linkBtnPrimary =
  'inline-flex items-center justify-center rounded-full font-semibold px-8 py-3 bg-gradient-to-r from-[#2EC4B6] to-[#FF9F68] text-white shadow-lg hover:scale-[1.02] transition-transform';
const linkBtnSecondary =
  'inline-flex items-center justify-center rounded-full font-semibold px-8 py-3 border-2 border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white transition-colors';

const INGREDIENT_CONFIG = [
  {
    key: 'argan',
    image: '/images/benefits/ingredient-argan-oil.webp',
    readHref: '/benefits/argan-oil-benefits',
  },
  { key: 'pricklyPear', image: '/images/benefits/ingredient-prickly-pear.webp' },
  { key: 'blackSoap', image: '/images/benefits/ingredient-black-soap.webp' },
  { key: 'rhassoul', image: '/images/ghassoul-clay.webp' },
  { key: 'roseWater', image: '/images/bestsellers/rose-water.webp' },
  { key: 'nila', image: '/images/benefits/ingredient-nila-powder.webp' },
  { key: 'akerFassi', image: '/images/catalog-slider/25-aker-fassi.webp' },
] as const;

const MATCHER_ROW_KEYS = [
  'drySkin',
  'lightOil',
  'oilySkin',
  'frizzyHair',
  'hammam',
  'toner',
] as const;

function BenefitsHubFaqCard({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  return (
    <details
      className="group w-full bg-white rounded-2xl border border-sand overflow-hidden shadow-sm hover:border-ocean/30 hover:shadow-md transition-all duration-300 open:border-ocean/25 open:shadow-md"
      open={defaultOpen}
    >
      <summary
        className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 md:p-6 text-left [&::-webkit-details-marker]:hidden"
      >
        <h3 className="text-base md:text-lg font-serif font-bold text-deep-navy group-open:text-ocean transition-colors pr-2">
          {question}
        </h3>
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sand/30 text-deep-navy group-open:bg-ocean/10 group-open:text-ocean transition-colors"
          aria-hidden
        >
          <ChevronDown className="h-5 w-5 group-open:rotate-180 transition-transform duration-300" />
        </span>
      </summary>
      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
        <div className="border-t border-sand/60 pt-4">
          <p className="text-muted leading-relaxed text-sm md:text-base">{answer}</p>
        </div>
      </div>
    </details>
  );
}

type BenefitsHubPageProps = {
  locale: string;
};

export default async function BenefitsHubPage({ locale }: BenefitsHubPageProps) {
  const t = await getTranslations({ locale, namespace: 'Benefits.hub' });

  const faqItems = [1, 2, 3, 4].map((i) => ({
    question: t(`faq.q${i}`),
    answer: t(`faq.a${i}`),
  }));
  const faqColumnLeft = faqItems.filter((_, index) => index % 2 === 0);
  const faqColumnRight = faqItems.filter((_, index) => index % 2 === 1);

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-32 md:pb-16 text-muted leading-relaxed">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="text-ocean hover:text-sunrise transition-colors">
              {t('breadcrumbHome')}
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-light">/</li>
          <li className="font-medium text-deep-navy" aria-current="page">{t('breadcrumbCurrent')}</li>
        </ol>
      </nav>

      <figure className="mb-10 rounded-2xl overflow-hidden border border-sand/80 shadow-sm">
        <Image
          src="/images/benefits/benefits-hub-hero.webp"
          alt={t('heroImageAlt')}
          width={1600}
          height={600}
          className="w-full h-auto object-cover max-h-[280px]"
          priority
        />
      </figure>

      <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif font-bold text-deep-navy leading-tight mb-8">
        {t('title')}
      </h1>

      <p className="mb-4">{t('introP1')}</p>
      <p className="mb-4">
        {t('introP2Before')}{' '}
        <em>{t('introP2Emphasis')}</em>{' '}
        {t('introP2After')}
      </p>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        {t('evidenceTitle')}
      </h2>
      <p className="mb-4">{t('evidenceIntro')}</p>
      <div className={`${tableWrap} max-w-3xl`}>
        <table className="min-w-[520px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#F4F6FA] text-deep-navy">
              <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">
                {t('evidenceColLabel')}
              </th>
              <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">
                {t('evidenceColMeaning')}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/80">
            <tr>
              <td className="px-4 py-3">{t('evidenceRow1Label')}</td>
              <td className="px-4 py-3">{t('evidenceRow1Meaning')}</td>
            </tr>
            <tr>
              <td className="px-4 py-3">{t('evidenceRow2Label')}</td>
              <td className="px-4 py-3">{t('evidenceRow2Meaning')}</td>
            </tr>
            <tr>
              <td className="px-4 py-3">{t('evidenceRow3Label')}</td>
              <td className="px-4 py-3">{t('evidenceRow3Meaning')}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        {t('ingredientsTitle')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch">
        {INGREDIENT_CONFIG.map((item) => {
          const prefix = `ingredients.${item.key}`;
          const readHref = 'readHref' in item ? item.readHref : undefined;

          return (
            <section
              key={item.key}
              className="group flex h-full min-h-0 flex-col rounded-[2rem] overflow-hidden border border-sand/80 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[#E8ECF4]">
                <Image
                  src={item.image}
                  alt={t(`${prefix}.imageAlt`)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700"
                />
                <div className="absolute inset-x-0 bottom-0 h-2/5 max-h-36 bg-gradient-to-t from-deep-navy/90 via-deep-navy/35 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white drop-shadow-md leading-snug">
                    {t(`${prefix}.title`)}
                  </h3>
                </div>
              </div>
              <div className="flex flex-col flex-grow p-5 md:p-6">
                <p className="mb-3 text-sm leading-relaxed flex-grow">{t(`${prefix}.body`)}</p>
                <p className="mb-4 text-sm">
                  <strong>{t('bestForLabel')}</strong> {t(`${prefix}.bestFor`)}
                </p>
                <div className="flex flex-col gap-2 text-sm font-semibold mt-auto pt-4 border-t border-sand/50">
                  {readHref ? (
                    locale === 'en' ? (
                      <Link
                        href={readHref}
                        className="text-ocean hover:text-sunrise underline-offset-2 hover:underline"
                      >
                        {t(`${prefix}.readLink`)}
                      </Link>
                    ) : (
                      <a
                        href={enOnlyAbsoluteHref(readHref)}
                        className="text-ocean hover:text-sunrise underline-offset-2 hover:underline"
                      >
                        {t(`${prefix}.readLink`)}
                      </a>
                    )
                  ) : (
                    <span className="text-muted font-normal">{t('guideComingSoon')}</span>
                  )}
                  <Link href="/quote" className="text-ocean hover:text-sunrise underline-offset-2 hover:underline">
                    {t(`${prefix}.shopLink`)}
                  </Link>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-16 max-w-4xl mx-auto" aria-labelledby="benefits-brands-heading">
        <h2
          id="benefits-brands-heading"
          className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mb-6 text-center"
        >
          {t('brandsTitle')}
        </h2>
        <p className="text-muted leading-relaxed mb-4">{t('brandsP1')}</p>
        <p className="text-muted leading-relaxed mb-4">{t('brandsP2')}</p>
        <p className="text-muted leading-relaxed mb-4">
          {t('brandsP3Before')}{' '}
          <Link href="/private-label" className="text-ocean font-medium hover:text-sunrise underline-offset-2 hover:underline">
            {t('brandsP3Link')}
          </Link>{' '}
          {t('brandsP3After')}
        </p>
      </section>

      <section className="mt-12 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mb-6 max-w-2xl">
          {t('matcherTitle')}
        </h2>
        <div className={`${tableWrap} w-full max-w-4xl text-left`}>
          <table className="min-w-[640px] w-full text-sm border-collapse">
            <thead>
              <tr className="bg-[#F4F6FA] text-deep-navy">
                <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">
                  {t('matcherColNeed')}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">
                  {t('matcherColIngredient')}
                </th>
                <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">
                  {t('matcherColWhy')}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/80">
              {MATCHER_ROW_KEYS.map((rowKey) => (
                <tr key={rowKey}>
                  <td className="px-4 py-3">{t(`matcherRows.${rowKey}.need`)}</td>
                  <td className="px-4 py-3">{t(`matcherRows.${rowKey}.ingredient`)}</td>
                  <td className="px-4 py-3">{t(`matcherRows.${rowKey}.why`)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="benefits-hub-faq-heading">
        <h2
          id="benefits-hub-faq-heading"
          className="text-2xl md:text-3xl font-serif font-bold text-deep-navy text-center mb-8"
        >
          {t('faqTitle')}
        </h2>
        <div className="flex flex-col gap-4 md:hidden">
          {faqItems.map((item, index) => (
            <BenefitsHubFaqCard
              key={item.question}
              question={item.question}
              answer={item.answer}
              defaultOpen={index === 0}
            />
          ))}
        </div>
        <div className="hidden md:flex md:gap-6 lg:gap-8">
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {faqColumnLeft.map((item, index) => (
              <BenefitsHubFaqCard
                key={item.question}
                question={item.question}
                answer={item.answer}
                defaultOpen={index === 0}
              />
            ))}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            {faqColumnRight.map((item) => (
              <BenefitsHubFaqCard key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 mb-4 flex flex-col items-center text-center">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mb-8 max-w-2xl">
          {t('ctaTitle')}
        </h2>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
          <Link href="/quote" className={linkBtnPrimary}>{t('ctaQuote')}</Link>
          <Link href="/private-label" className={linkBtnSecondary}>{t('ctaPrivateLabel')}</Link>
        </div>
      </section>
    </article>
  );
}

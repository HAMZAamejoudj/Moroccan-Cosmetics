import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { arganOilBenefitsFaqItems } from './arganOilBenefitsFaq';

const tableWrap = 'my-8 overflow-x-auto rounded-xl border border-sand/80';

export default function ArganOilBenefitsArticle() {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 md:pt-32 md:pb-16 text-muted leading-relaxed">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="text-ocean hover:text-sunrise transition-colors">
              Home
            </Link>
          </li>
          <li aria-hidden="true" className="text-muted-light">/</li>
          <li>
            <Link href="/benefits" className="text-ocean hover:text-sunrise transition-colors">Benefits</Link>
          </li>
          <li aria-hidden="true" className="text-muted-light">/</li>
          <li className="font-medium text-deep-navy" aria-current="page">Argan Oil Benefits</li>
        </ol>
      </nav>

      {/* TODO: Add named author and reviewer when provided */}
      <aside
        className="mb-10 rounded-2xl border border-sand bg-[#F8FAFC] p-6 text-sm space-y-2"
        aria-label="Article author and review"
      >
        <p>
          <span className="font-semibold text-deep-navy">[AUTHOR NAME]</span>
          <span className="text-muted"> — [ROLE]</span>
        </p>
        <p className="text-muted-light">Last updated: 28 September 2026</p>
      </aside>

      <figure className="mb-10 rounded-2xl overflow-hidden border border-sand/80 shadow-sm">
        <Image
          src="/images/argan-oil-benefits/hero-argan-oil.webp"
          alt="Pure cosmetic argan oil in a glass bottle with argan kernels on a neutral background"
          width={1200}
          height={675}
          className="w-full h-auto object-cover"
          priority
        />
      </figure>

      <h1 className="text-3xl md:text-4xl lg:text-[2.5rem] font-serif font-bold text-deep-navy leading-tight mb-8">
        Argan Oil Benefits for Skin and Hair: What the Research Actually Shows
      </h1>

      <p className="mb-4">
        <Link href="/about-us" className="text-ocean font-medium hover:text-sunrise underline-offset-2 hover:underline">
          We press argan oil
        </Link>{' '}
        for a living, so you might expect us to tell you it does everything. It doesn&apos;t. And the brands we supply are
        better off knowing exactly what it does well.
      </p>
      <p className="mb-4">
        Some of argan oil&apos;s reputation is backed by real clinical studies. Some is reasonable but not yet proven.
        And a few popular claims have no evidence at all. This page sorts them out, in plain language.
      </p>
      {/* TODO: YOUR STORY: one or two sentences, e.g. the most common "miracle" claim new clients ask you to print on their labels, and why you talk them out of it. */}

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        What&apos;s Actually in Argan Oil
      </h2>
      <p className="mb-4">
        Argan oil is almost entirely fatty acids, mostly <strong>oleic acid</strong> (omega-9) and{' '}
        <strong>linoleic acid</strong> (omega-6). That balance explains why it feels nourishing but absorbs faster than
        heavier oils like olive oil.
      </p>
      <p className="mb-4">The interesting part is the small fraction that isn&apos;t fat:</p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          <strong>Tocopherols (vitamin E),</strong> mostly in the gamma form. They are antioxidants that also protect
          the oil itself from going rancid.
        </li>
        <li>
          <strong>Plant sterols,</strong> especially schottenol and spinasterol. They are rare in other oils and help
          explain argan&apos;s skin-conditioning feel.
        </li>
        <li>
          <strong>Polyphenols and squalene,</strong> which add antioxidant and emollient properties.
        </li>
      </ul>
      <p className="mb-4">
        This minor fraction is also the most fragile. Refining, heat and poor storage destroy it first. We come back to
        that below, because it&apos;s where cheap oil loses its benefits.
      </p>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        Argan Oil Benefits for Skin
      </h2>

      <h3 className="text-xl font-serif font-bold text-deep-navy mt-8 mb-4">
        Hydration and barrier support: the best-supported benefit
      </h3>
      <p className="mb-4">
        This is where the research is strongest. Moroccan researchers found that daily topical use of argan oil in
        postmenopausal women significantly reduced water loss through the skin and increased the water content of the
        outer skin layer.
      </p>
      <p className="mb-4">
        In a separate trial, 30 healthy postmenopausal women applied argan oil every night for two months. The results
        showed the same moisturizing effect: less water loss and more hydration.
      </p>
      <p className="mb-4">
        In practical terms, argan oil helps skin hold on to its own moisture. That&apos;s why it works well as the last
        step of a routine, over a water-based serum or toner.
      </p>

      <h3 className="text-xl font-serif font-bold text-deep-navy mt-8 mb-4">
        Skin elasticity: promising, with limits
      </h3>
      <p className="mb-4">
        A 2015 study followed 60 postmenopausal women for 60 days. Half ate argan oil daily and half ate olive oil as a
        control, and all of them applied argan oil to one forearm. Several elasticity measurements improved
        significantly, with both the eaten and the applied oil.
      </p>
      <p className="mb-4">
        Be fair about the limits. It&apos;s one small study, in one age group, measured on the forearm rather than the
        face. It supports &quot;helps improve skin elasticity.&quot; It does not support &quot;erases wrinkles.&quot;
      </p>

      <h3 className="text-xl font-serif font-bold text-deep-navy mt-8 mb-4">Dry and sensitive skin</h3>
      <p className="mb-4">
        Dermatologists do recommend argan oil for dry, sensitive skin, with one important condition: the oil must be free
        of added fragrance and preservatives, because these can make conditions like eczema worse.
      </p>
      <p className="mb-4">
        This matches what we see: pure oil tends to be well tolerated, while &quot;argan&quot; blends heavy with perfume
        cause complaints.
      </p>

      <h3 className="text-xl font-serif font-bold text-deep-navy mt-8 mb-4">
        Oily and acne-prone skin: go carefully
      </h3>
      <p className="mb-4">
        Argan oil is lighter than many oils, and people with combination skin often use it happily. But the evidence for
        acne benefits is thin. The honest advice: patch-test first, use two or three drops, not more, and stop if
        breakouts increase.
      </p>
      {/* TODO: YOUR STORY: feedback from a spa or brand client with oily-skin customers, if you have it. */}

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        Argan Oil Benefits for Hair
      </h2>

      <figure className="my-8 rounded-2xl overflow-hidden border border-sand/80">
        <Image
          src="/images/argan-oil-benefits/hair-argan-oil.webp"
          alt="Argan oil applied to the lengths of hair to illustrate shine and frizz control"
          width={1200}
          height={800}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>

      <h3 className="text-xl font-serif font-bold text-deep-navy mt-8 mb-4">
        Protecting colored and chemically treated hair
      </h3>
      <p className="mb-4">
        Hair dye damages the protein structure of the hair shaft, and argan oil has been tested for exactly this. In a
        2013 Brazilian study, hair bleached with an ultra-blond dye was then treated with a basic hair-care formula. A
        version containing only 1% argan oil was compared with the same formula without it, and with a version
        containing cupuassu butter.
      </p>
      <p className="mb-4">
        A 2022 study tested argan oil as a pre-treatment before oxidative damage. Hair treated with argan oil first
        lost significantly less protein, and oil remained on the hair even after washing.
      </p>
      <p className="mb-4">
        This is one of argan oil&apos;s most practical selling points for haircare brands, and one that competitors
        rarely mention.
      </p>

      <h3 className="text-xl font-serif font-bold text-deep-navy mt-8 mb-4">Frizz, shine and split ends</h3>
      <p className="mb-4">
        This is argan oil&apos;s everyday job. A few drops on the lengths and ends smooth the cuticle, reduce frizz and
        add shine. It won&apos;t repair a split end permanently, since no product can. But it makes ends look and feel
        healthier and less likely to snag and break.
      </p>

      <h3 className="text-xl font-serif font-bold text-deep-navy mt-8 mb-4">The scalp: less is more</h3>
      <p className="mb-4">
        Many people rub argan oil into the scalp. Be careful: dermatologists warn that oils can promote dandruff
        (seborrheic dermatitis) when overused, especially with oily hair. For the scalp, a small amount once a week is
        plenty. Or keep the oil on the lengths only.
      </p>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">The Evidence at a Glance</h2>
      <div className={tableWrap}>
        <table className="min-w-[640px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#F4F6FA] text-deep-navy">
              <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">Benefit</th>
              <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">Evidence level</th>
              <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">What that means</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/80">
            <tr>
              <td className="px-4 py-3">Skin hydration / barrier support</td>
              <td className="px-4 py-3">Good (human clinical studies)</td>
              <td className="px-4 py-3">Safe to highlight</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Skin elasticity</td>
              <td className="px-4 py-3">Moderate (one small clinical study)</td>
              <td className="px-4 py-3">Say &quot;helps improve elasticity&quot;, not &quot;anti-wrinkle&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Soothing dry, sensitive skin</td>
              <td className="px-4 py-3">Moderate (dermatologist consensus)</td>
              <td className="px-4 py-3">Only with pure, fragrance-free oil</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Protecting dyed / chemically treated hair</td>
              <td className="px-4 py-3">Moderate (lab studies on hair fibers)</td>
              <td className="px-4 py-3">Strong selling point for haircare</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Frizz, shine, softer ends</td>
              <td className="px-4 py-3">Well established (cosmetic effect)</td>
              <td className="px-4 py-3">Everyday benefit, easy to demonstrate</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Acne improvement</td>
              <td className="px-4 py-3">Weak</td>
              <td className="px-4 py-3">Don&apos;t promise it</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Hair growth</td>
              <td className="px-4 py-3">No evidence</td>
              <td className="px-4 py-3">Don&apos;t claim it</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Stretch mark removal</td>
              <td className="px-4 py-3">No evidence</td>
              <td className="px-4 py-3">Don&apos;t claim it</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        Three Myths We Hear Every Week
      </h2>
      <p className="mb-4">
        <strong>&quot;Argan oil makes hair grow.&quot;</strong> There&apos;s no evidence for this. Healthier hair breaks
        less, so hair may seem to grow longer, but the oil doesn&apos;t act on the follicle.
      </p>
      <p className="mb-4">
        <strong>&quot;It removes stretch marks.&quot;</strong> Very popular, and not proven. There&apos;s no strong
        evidence that any topical product reliably reduces stretch marks.
      </p>
      <p className="mb-4">
        <strong>&quot;It cures eczema.&quot;</strong> Pure argan oil can make dry, irritated skin more comfortable. But
        &quot;cures&quot; is a medical claim, and it can get a cosmetic brand into legal trouble (see below).
      </p>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        How to Use Argan Oil to Get Real Results
      </h2>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          <strong>Face:</strong> 2-3 drops, warmed between the fingertips and pressed onto slightly damp skin at night. On
          very dry days, add a drop to your moisturizer.
        </li>
        <li>
          <strong>Hair:</strong> 1-3 drops on the lengths and ends, on damp or dry hair. Use more only if hair is thick
          and very dry.
        </li>
        <li>
          <strong>Before coloring:</strong> apply a little to the lengths a few hours before a color treatment, based on
          the pre-treatment research above.
        </li>
        <li>
          <strong>Body:</strong> massage into skin right after a shower, while it&apos;s still damp.
        </li>
        <li>
          <strong>Nails and cuticles:</strong> one drop per hand, rubbed in at night.
        </li>
      </ul>
      <p className="mb-4">
        <strong>Common mistakes:</strong> using too much, so it feels greasy and people give up. Putting it on bone-dry
        skin, where it has less water to lock in. Loading the scalp daily. Storing the bottle in a sunny bathroom.
      </p>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        Why the Quality of the Oil Changes the Benefits
      </h2>

      <figure className="my-8 rounded-2xl overflow-hidden border border-sand/80">
        <Image
          src="/images/argan-oil-benefits/quality-argan-oil.webp"
          alt="Cold-pressed cosmetic argan oil in dark glass packaging for wholesale quality control"
          width={1200}
          height={800}
          loading="lazy"
          className="w-full h-auto object-cover"
        />
      </figure>

      <p className="mb-4">
        Everything above depends on having real, well-handled argan oil. The vitamin E and sterols that make argan special
        are the first things lost when oil is refined, overheated, diluted with cheaper oils, or stored in clear bottles.
      </p>
      <ul className="list-disc pl-6 mb-4 space-y-2">
        <li>
          {/* TODO: Link when /products/argan-oil-wholesale/ exists */}
          Cosmetic oil comes from unroasted kernels. Culinary oil is roasted and made for food.
        </li>
        <li>
          <strong>Buy it in dark glass,</strong> not clear plastic.
        </li>
        <li>
          <strong>For bulk purchases, </strong>
          {/* TODO: Link when /quality-certifications/ exists */}
          ask for a batch COA.{' '}
          <a
            href="https://moroccan-cosmetics.com/en/blog/how-to-spot-fake-argan-oil/"
            className="text-ocean font-medium hover:text-sunrise underline-offset-2 hover:underline"
          >
            See our guide on how to spot fake argan oil
          </a>
          .
        </li>
      </ul>
      {/* TODO: YOUR STORY: how you protect the oil in production, e.g. cold pressing, nitrogen flushing or storage temperature - only if true. */}

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">
        For Brands: Turning Benefits Into Claims You Can Defend
      </h2>
      <p className="mb-4">If you sell argan oil products, your benefit claims are regulated.</p>
      <p className="mb-4">
        <strong>In the EU,</strong> cosmetic claims must meet the common criteria of Regulation (EU) No 655/2013: legal
        compliance, truthfulness, evidential support, honesty, fairness and informed decision-making. You must be able
        to back up what you say.
      </p>
      <p className="mb-4">
        <strong>In the US,</strong> the line between a cosmetic and a drug depends on the claim. &quot;Moisturizes dry
        skin&quot; is cosmetic. &quot;Treats eczema&quot; or &quot;stops hair loss&quot; makes the product an unapproved
        drug in the FDA&apos;s eyes.
      </p>
      <div className={tableWrap}>
        <table className="min-w-[520px] w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-[#F4F6FA] text-deep-navy">
              <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">Say this</th>
              <th scope="col" className="px-4 py-3 font-semibold border-b border-sand">Not this</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand/80">
            <tr>
              <td className="px-4 py-3">&quot;Helps skin retain moisture&quot;</td>
              <td className="px-4 py-3">&quot;Heals dry skin conditions&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3">&quot;Helps improve skin elasticity&quot;</td>
              <td className="px-4 py-3">&quot;Erases wrinkles&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3">&quot;Helps protect color-treated hair&quot;</td>
              <td className="px-4 py-3">&quot;Repairs damaged hair permanently&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3">&quot;Tames frizz and adds shine&quot;</td>
              <td className="px-4 py-3">&quot;Makes hair grow faster&quot;</td>
            </tr>
            <tr>
              <td className="px-4 py-3">&quot;Suitable for dry, sensitive skin&quot;</td>
              <td className="px-4 py-3">&quot;Cures eczema / psoriasis&quot;</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mb-4 mt-6">
        <strong>For formulators:</strong> typical use levels suggested by ingredient suppliers are 1-4% in skincare and
        0.2-2% in shampoos and conditioners. Pure argan oil products are, of course, 100%.
      </p>
      <p className="mb-4">
        We give every{' '}
        <Link href="/private-label" className="text-ocean font-medium hover:text-sunrise underline-offset-2 hover:underline">
          private label client
        </Link>{' '}
        a copy of the table above with their samples.
      </p>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">The Honest Bottom Line</h2>
      <p className="mb-4">
        Argan oil earns its reputation for hydration, softness, shine and protecting treated hair. The evidence for
        elasticity is encouraging. It is not a cure, and it doesn&apos;t grow hair.
      </p>
      <p className="mb-8">
        Sell it for what it does well, and make sure the oil is real. That&apos;s how brands build customers who reorder.
      </p>
      <p className="mb-10 text-lg font-medium text-deep-navy">
        <strong>Want samples with a batch COA and our claims guide?</strong>{' '}
        <Link
          href="/quote"
          className="inline-flex items-center justify-center mt-4 sm:mt-0 sm:ml-2 rounded-full font-semibold px-8 py-3 bg-gradient-to-r from-[#2EC4B6] to-[#FF9F68] text-white shadow-lg hover:scale-[1.02] transition-transform"
        >
          Request a Quote
        </Link>
      </p>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-8">
        {arganOilBenefitsFaqItems.map((item) => (
          <div key={item.question}>
            <h3 className="text-lg font-serif font-bold text-deep-navy mb-2">{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl md:text-3xl font-serif font-bold text-deep-navy mt-12 mb-6">Sources</h2>
      <ul className="list-disc pl-6 space-y-3 text-sm">
        <li>
          Boucetta KQ et al. The effect of dietary and/or cosmetic argan oil on postmenopausal skin elasticity. Clinical
          Interventions in Aging, 2015;10:339-349.
        </li>
        <li>
          Boucetta KQ et al. Studies on topical and dietary argan oil and postmenopausal skin hydration (transepidermal
          water loss). [ADD FULL REFERENCE]
        </li>
        <li>
          Faria PM et al. Hair protective effect of argan oil and cupuassu butter post treatment with hair dye. J Cosmet
          Dermatol Sci Appl, 2013;3:40-44.
        </li>
        <li>
          Sharifi et al. Argan oil as a pretreatment of human hair before exposure to oxidative damage. J Cosmet Dermatol,
          2022;21(10):5010-5017.
        </li>
        <li>
          Regulation (EU) No 655/2013 laying down common criteria for the justification of claims used in relation to
          cosmetic products.
        </li>
      </ul>
    </article>
  );
}

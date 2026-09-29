'use client';

import Hero from '@/components/Hero';
import TrustMarquee from '@/components/TrustMarquee';
import KeywordsMarquee from '@/components/KeywordsMarquee';
import Mission from '@/components/Mission';
import WhyChooseUs from '@/components/WhyChooseUs';
import ProductGrid from '@/components/ProductGrid';
import ProductCatalogSlider from '@/components/ProductCatalogSlider';
import ContactCTA from '@/components/ContactCTA';
import HomeProcess from '@/components/HomeProcess';
import PromoModal from '@/components/PromoModal';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Boxes, Tags, ArrowRight } from 'lucide-react';
import BlogPostCard from '@/components/blog/BlogPostCard';
import type { BlogPost } from '@/lib/blog/types';

type HomeGuideCard = { post: BlogPost; imagePath: string };

type HomeClientProps = {
  latestGuides?: HomeGuideCard[];
};

export default function HomeClient({ latestGuides = [] }: HomeClientProps) {
  const tWays = useTranslations('HomeWays');
  const tBlog = useTranslations('Blog');
  return (
    <div className="overflow-hidden">
      <Hero />
      <TrustMarquee />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Mission />
        <ProductGrid />
        <ProductCatalogSlider />

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center font-serif text-[#06142B]">
              {tWays('title')} <span className="text-[#FF9F68]">{tWays('titleAccent')}</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-10 rounded-3xl bg-white border border-[#06142B]/10 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#06142B] text-[#FF9F68] flex items-center justify-center mb-6">
                  <Boxes size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#06142B]">{tWays('wholesaleTitle')}</h3>
                <p className="text-[#3B4758] leading-relaxed mb-6">{tWays('wholesaleDesc')}</p>
                <Link href="/quote" className="inline-flex items-center gap-2 font-semibold text-[#FF9F68] hover:gap-3 transition-all">
                  {tWays('wholesaleLink')} <ArrowRight size={18} />
                </Link>
              </div>
              <div className="p-10 rounded-3xl bg-white border border-[#06142B]/10 shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-[#06142B] text-[#FF9F68] flex items-center justify-center mb-6">
                  <Tags size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#06142B]">{tWays('privateTitle')}</h3>
                <p className="text-[#3B4758] leading-relaxed mb-6">{tWays('privateDesc')}</p>
                <Link href="/private-label" className="inline-flex items-center gap-2 font-semibold text-[#FF9F68] hover:gap-3 transition-all">
                  {tWays('privateLink')} <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <WhyChooseUs />

        <HomeProcess />

        {latestGuides.length > 0 && (
          <section className="py-24 bg-white border-y border-sand/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
                <h2 className="text-4xl font-serif font-bold text-deep-navy">{tBlog('index.latestGuides')}</h2>
                <Link href="/blog" className="text-ocean font-semibold hover:text-sunrise transition-colors">
                  {tBlog('index.viewAllGuides')}
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                {latestGuides.map(({ post, imagePath }, index) => (
                  <BlogPostCard
                    key={post.slug}
                    post={post}
                    imagePath={imagePath}
                    priorityImage={index === 0}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactCTA />

        <KeywordsMarquee />
      </motion.div>

      <PromoModal />
    </div>
  );
}

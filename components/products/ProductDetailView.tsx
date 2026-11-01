'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaWhatsapp } from 'react-icons/fa';
import {
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Droplets,
  Leaf,
  Package,
  FileCheck,
  Truck,
  HelpCircle,
  Layers,
  ChevronDown,
  Building2,
  Clock,
  ExternalLink,
  Globe,
} from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ProductItem, getRelatedProducts } from '@/lib/productsData';
import { siteConfig } from '@/lib/siteConfig';

interface ProductDetailViewProps {
  product: ProductItem;
  locale: 'en' | 'fr' | 'ar';
}

export default function ProductDetailView({ product, locale }: ProductDetailViewProps) {
  const isAr = locale === 'ar';
  const isFr = locale === 'fr';

  const content = product[locale];
  const relatedProducts = getRelatedProducts(product.slug, 3);

  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'packaging' | 'specs'>('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Labels dictionary for UI chrome
  const ui = {
    home: isAr ? 'الرئيسية' : isFr ? 'Accueil' : 'Home',
    products: isAr ? 'المنتجات' : isFr ? 'Produits' : 'Products',
    requestQuote: isAr ? 'طلب عرض سعر بالجملة' : isFr ? 'Demander un devis en gros' : 'Request Wholesale Quote',
    whatsappInquiry: isAr ? 'استفسار عبر واتساب' : isFr ? 'Contacter par WhatsApp' : 'Inquire via WhatsApp',
    originLabel: isAr ? 'بلد المنشأ' : isFr ? 'Origine' : 'Origin',
    extractionLabel: isAr ? 'طريقة الاستخلاص' : isFr ? 'Méthode d’extraction' : 'Extraction',
    shelfLifeLabel: isAr ? 'مدة الصلاحية' : isFr ? 'Durée de conservation' : 'Shelf Life',
    moqLabel: isAr ? 'الحد الأدنى للطلب (MOQ)' : isFr ? 'Commande minimum (MOQ)' : 'Minimum Order (MOQ)',
    inciLabel: isAr ? 'الاسم العلمي INCI' : isFr ? 'Nom INCI' : 'INCI Name',
    casLabel: isAr ? 'رقم CAS' : isFr ? 'Numéro CAS' : 'CAS Number',
    botanicalLabel: isAr ? 'الاسم النباتي' : isFr ? 'Nom botanique' : 'Botanical Name',
    tabOverview: isAr ? 'الوصف والمزايا' : isFr ? 'Description & Bienfaits' : 'Overview & Benefits',
    tabApplications: isAr ? 'الاستخدامات ومجالات التطبيق' : isFr ? 'Applications & Utilisations' : 'Applications & Uses',
    tabPackaging: isAr ? 'التعبئة والعلامة الخاصة' : isFr ? 'Conditionnement & Marque Blanche' : 'Bulk & Private Label',
    tabSpecs: isAr ? 'المواصفات الفنية والشهادات' : isFr ? 'Spécifications & Certifications' : 'Technical Specifications',
    keyBenefitsTitle: isAr ? 'أهم الفوائد والخصائص العلاجية' : isFr ? 'Principaux Bienfaits & Propriétés' : 'Key Benefits & Performance',
    applicationsTitle: isAr ? 'مجالات وتطبيقات التركيبات التجميلية' : isFr ? 'Applications en Formulation Cosmétique' : 'Cosmetic Formulation Applications',
    bulkTitle: isAr ? 'خيارات التوريد بالجملة (Bulk Supply)' : isFr ? 'Formats Vrac Industriel (Bulk)' : 'Industrial Bulk Supply Options',
    privateLabelTitle: isAr ? 'حلول العلامة الخاصة الجاهزة (Private Label)' : isFr ? 'Solutions Clé en Main (Marque Blanche)' : 'Turnkey Private Label Packaging',
    faqTitle: isAr ? 'أسئلة شائعة حول هذا المنتج' : isFr ? 'Questions Fréquentes sur ce Produit' : 'Frequently Asked Questions',
    relatedTitle: isAr ? 'منتجات مغربية مماثلة بالجملة' : isFr ? 'Produits Marocains Similaires' : 'Related Moroccan Bestsellers',
    relatedDesc: isAr ? 'اكتشف المزيد من المواد الخام ومستحضرات التجميل المغربية الطبيعية 100%' : isFr ? 'Découvrez d’autres matières premières et soins marocains 100% naturels' : 'Explore more 100% pure authentic Moroccan bulk ingredients and cosmetics',
    viewProduct: isAr ? 'عرض التفاصيل' : isFr ? 'Voir les détails' : 'View Details',
    exportReady: isAr ? 'جاهز للتصدير الدولي' : isFr ? 'Prêt pour l’export international' : 'Export Ready Worldwide',
    coaIncluded: isAr ? 'شهادة التحليل المخبري COA و MSDS متوفرة' : isFr ? 'Analyses COA & FDS fournies avec chaque lot' : 'COA & MSDS Batch Certified',
    freeSamples: isAr ? 'عينات مخبرية مجانية للمشاريع والشركات' : isFr ? 'Échantillons disponibles pour laboratoires & marques' : 'Lab Samples available for verified brands',
    ctaBannerTitle: isAr ? `هل ترغب في استيراد ${content.name} لعلامتك؟` : isFr ? `Prêt à commander ${content.name} pour votre marque ?` : `Ready to Source ${content.name} for Your Brand?`,
    ctaBannerDesc: isAr ? 'تواصل مع فريق خبراء التصدير لدينا للحصول على عينات، مواصفات فنية دقيقة وأسعار تنافسية مباشرة من المصنع بالمغرب.' : isFr ? 'Contactez nos spécialistes export pour obtenir vos échantillons, fiches techniques et tarifs directs d’usine.' : 'Contact our export specialists for lab samples, technical data sheets, and competitive direct-from-origin Moroccan wholesale pricing.',
  };

  const whatsappMessage = encodeURIComponent(
    isAr
      ? `مرحباً، أود الاستفسار عن توريد ${content.name} بالجملة / بالعلامة الخاصة.`
      : isFr
      ? `Bonjour, je souhaite obtenir un devis en gros / marque blanche pour : ${content.name}.`
      : `Hello, I would like to request a wholesale / private label quote for: ${content.name}.`
  );

  return (
    <div className={`min-h-screen bg-[#fafbfc] ${isAr ? 'rtl' : 'ltr'}`}>
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav aria-label="Breadcrumb" className="flex items-center text-xs sm:text-sm text-gray-500 gap-1.5 flex-wrap">
            <Link href="/" className="hover:text-[#2EC4B6] transition-colors">
              {ui.home}
            </Link>
            <ChevronRight size={14} className={`text-gray-400 ${isAr ? 'rotate-180' : ''}`} />
            <Link href="/products" className="hover:text-[#2EC4B6] transition-colors">
              {ui.products}
            </Link>
            <ChevronRight size={14} className={`text-gray-400 ${isAr ? 'rotate-180' : ''}`} />
            <span className="text-gray-900 font-medium truncate max-w-[220px] sm:max-w-none">
              {content.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Hero Product Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Product Media Gallery */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="relative aspect-[4/3] w-full rounded-2xl bg-white shadow-sm border border-gray-200/80 overflow-hidden group">
                <Image
                  src={product.image}
                  alt={content.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Trust Certifications Banner */}
              <div className="bg-white rounded-xl border border-gray-200/70 p-4 shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2.5">
                  {isAr ? 'شهادات الجودة والاعتمادات الرسمية' : isFr ? 'Certifications & Accréditations' : 'Quality Accreditations & Standards'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert) => (
                    <span
                      key={cert}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-[#E8F4FF] text-[#123A63] border border-[#123A63]/10"
                    >
                      <ShieldCheck size={13} className="text-[#2EC4B6]" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* B2B Assurance Points */}
              <div className="grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div className="bg-white p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                  <FileCheck size={18} className="text-[#2EC4B6] shrink-0" />
                  <span>{ui.coaIncluded}</span>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-100 flex items-center gap-2">
                  <Truck size={18} className="text-[#2EC4B6] shrink-0" />
                  <span>{ui.exportReady}</span>
                </div>
              </div>
            </div>

            {/* Right: Product Specifications & Purchase Actions */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Botanical */}
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="text-xs uppercase tracking-widest font-bold text-[#2EC4B6] bg-[#2EC4B6]/10 px-2.5 py-0.5 rounded-full">
                  {product.botanicalName}
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Globe size={13} className="text-gray-400" />
                  {product.origin}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#040B1A] tracking-tight leading-snug mb-3">
                {content.name}
              </h1>

              {/* Subtitle / Headline */}
              <p className="text-base sm:text-lg text-[#123A63] font-medium mb-4">
                {content.subtitle}
              </p>

              {/* Short summary */}
              <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base border-l-3 border-[#2EC4B6] pl-3 rtl:border-l-0 rtl:border-r-3 rtl:pl-0 rtl:pr-3">
                {content.shortDesc}
              </p>

              {/* Quick Specs Grid */}
              <div className="bg-white rounded-xl border border-gray-200/80 p-5 mb-6 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  {isAr ? 'المواصفات الفورية للمنتج' : isFr ? 'Caractéristiques Clés' : 'Key Specifications'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">{ui.inciLabel}</span>
                    <span className="font-semibold text-gray-800 font-mono text-xs sm:text-sm">{product.inciName}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">{ui.originLabel}</span>
                    <span className="font-semibold text-gray-800">{product.origin}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">{ui.extractionLabel}</span>
                    <span className="font-semibold text-gray-800">{product.extraction}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">{ui.moqLabel}</span>
                    <span className="font-semibold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded-md inline-block w-fit">
                      {product.moq}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="bg-[#FFF3E9]/60 border border-[#FF9F68]/30 rounded-2xl p-5 sm:p-6 mb-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[#FF9F68] mb-1">
                  {isAr ? 'التوريد بالجملة والعلامة الخاصة' : isFr ? 'Approvisionnement & Marque Blanche' : 'Direct Sourcing & Turnkey Formulation'}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {ui.freeSamples}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Primary Quote CTA */}
                  <Link
                    href={`/quote?product=${encodeURIComponent(content.name)}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#2EC4B6] hover:bg-[#25a99c] shadow-md transition-all hover:shadow-lg text-sm sm:text-base text-center"
                  >
                    <span>{ui.requestQuote}</span>
                    <ArrowRight size={18} className={isAr ? 'rotate-180' : ''} />
                  </Link>

                  {/* WhatsApp Direct Chat */}
                  <a
                    href={`${siteConfig.whatsappUrl}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-[#25D366] hover:bg-[#20ba5a] shadow-sm transition-all hover:shadow-md text-sm sm:text-base text-center"
                  >
                    <FaWhatsapp className="w-5 h-5 shrink-0" />
                    <span>{ui.whatsappInquiry}</span>
                  </a>
                </div>
              </div>

              {/* Trust Bullet Guarantee */}
              <div className="flex items-center gap-6 text-xs text-gray-500 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  {isAr ? '100% طبيعي وأصيل' : isFr ? '100% Pur & Naturel' : '100% Pure & Authentic'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  {isAr ? 'شحن جوي وبحري سريع' : isFr ? 'Fret Aérien & Maritime' : 'Air & Sea Freight'}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  {isAr ? 'دعم كامل للتسجيل الجمركي' : isFr ? 'Documents d’export complets' : 'Full Export Documents'}
                </span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Structured Details Tabs Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Tabs Navigation */}
          <div className="flex border-b border-gray-200 gap-2 sm:gap-6 overflow-x-auto no-scrollbar mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-2 sm:px-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'overview'
                  ? 'text-[#2EC4B6]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {ui.tabOverview}
              {activeTab === 'overview' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2EC4B6]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('applications')}
              className={`pb-4 px-2 sm:px-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'applications'
                  ? 'text-[#2EC4B6]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {ui.tabApplications}
              {activeTab === 'applications' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2EC4B6]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('packaging')}
              className={`pb-4 px-2 sm:px-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'packaging'
                  ? 'text-[#2EC4B6]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {ui.tabPackaging}
              {activeTab === 'packaging' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2EC4B6]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-4 px-2 sm:px-4 text-sm sm:text-base font-bold whitespace-nowrap transition-colors relative ${
                activeTab === 'specs'
                  ? 'text-[#2EC4B6]'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              {ui.tabSpecs}
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2EC4B6]" />
              )}
            </button>
          </div>

          {/* Tab 1: Overview & Benefits */}
          {activeTab === 'overview' && (
            <div className="space-y-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#040B1A] mb-4">
                  {content.headline}
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed text-sm sm:text-base">
                  {content.description.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Benefits Cards Grid */}
              <div>
                <h3 className="text-lg font-bold text-[#040B1A] mb-5">
                  {ui.keyBenefitsTitle}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {content.keyBenefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#F8FAFC] border border-gray-100 flex items-start gap-4 hover:border-[#2EC4B6]/30 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#2EC4B6]/10 text-[#2EC4B6] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                        {idx + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-[#040B1A] text-sm sm:text-base mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Applications & Uses */}
          {activeTab === 'applications' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#040B1A] mb-4">
                {ui.applicationsTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.applications.map((app, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-gray-100"
                  >
                    <CheckCircle2 size={18} className="text-[#2EC4B6] shrink-0" />
                    <span className="text-sm sm:text-base text-gray-800 font-medium">
                      {app}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Bulk Packaging & Private Label */}
          {activeTab === 'packaging' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bulk Formats */}
              <div className="bg-[#F8FAFC] p-6 sm:p-7 rounded-2xl border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#040B1A]">{ui.bulkTitle}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {isAr ? 'للمصانع والمختبرات وموزعي الجملة' : isFr ? 'Pour laboratoires et distributeurs vrac' : 'For cosmetic labs & wholesale distributors'}
                  </p>
                </div>
                <ul className="space-y-3">
                  {content.bulkPackaging.map((format, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] mt-2 shrink-0" />
                      <span>{format}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Private Label Formats */}
              <div className="bg-[#F8FAFC] p-6 sm:p-7 rounded-2xl border border-gray-100">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-[#040B1A]">{ui.privateLabelTitle}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    {isAr ? 'عبوات جاهزة للبيع بالتجزئة بعلامتكم' : isFr ? 'Conditionnement prêt à la vente au détail' : 'Ready-to-retail custom brand packaging'}
                  </p>
                </div>
                <ul className="space-y-3">
                  {content.privateLabelOptions.map((opt, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2EC4B6] mt-2 shrink-0" />
                      <span>{opt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tab 4: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#040B1A] mb-4">
                {ui.tabSpecs}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-2xs">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <tbody className="divide-y divide-gray-100">
                    <tr className="bg-gray-50/50">
                      <td className="px-6 py-3.5 font-medium text-gray-500 w-1/3">{ui.botanicalLabel}</td>
                      <td className="px-6 py-3.5 font-semibold text-gray-900 italic">{product.botanicalName}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3.5 font-medium text-gray-500">{ui.inciLabel}</td>
                      <td className="px-6 py-3.5 font-mono text-xs sm:text-sm text-gray-900">{product.inciName}</td>
                    </tr>
                    {product.casNumber && (
                      <tr className="bg-gray-50/50">
                        <td className="px-6 py-3.5 font-medium text-gray-500">{ui.casLabel}</td>
                        <td className="px-6 py-3.5 font-mono text-xs sm:text-sm text-gray-900">{product.casNumber}</td>
                      </tr>
                    )}
                    <tr>
                      <td className="px-6 py-3.5 font-medium text-gray-500">{ui.originLabel}</td>
                      <td className="px-6 py-3.5 text-gray-900">{product.origin}</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-6 py-3.5 font-medium text-gray-500">{ui.extractionLabel}</td>
                      <td className="px-6 py-3.5 text-gray-900">{product.extraction}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-3.5 font-medium text-gray-500">{ui.shelfLifeLabel}</td>
                      <td className="px-6 py-3.5 text-gray-900">{product.shelfLife}</td>
                    </tr>
                    <tr className="bg-gray-50/50">
                      <td className="px-6 py-3.5 font-medium text-gray-500">{ui.moqLabel}</td>
                      <td className="px-6 py-3.5 font-semibold text-[#166534]">{product.moq}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Product FAQ Accordion Section */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="py-12 bg-[#F8FAFC] border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#040B1A]">
                {ui.faqTitle}
              </h2>
            </div>

            <div className="space-y-3">
              {content.faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-2xs transition-shadow"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-4 sm:p-5 text-left rtl:text-right font-bold text-gray-900 hover:text-[#2EC4B6] transition-colors"
                    >
                      <span className="text-sm sm:text-base pr-4 rtl:pr-0 rtl:pl-4">{faq.q}</span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? 'rotate-180 text-[#2EC4B6]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related Products Grid */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#040B1A] mb-2">
              {ui.relatedTitle}
            </h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              {ui.relatedDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {relatedProducts.map((rel) => {
              const relContent = rel[locale];
              return (
                <article
                  key={rel.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
                >
                  <Link href={`/products/${rel.slug}`} className="block relative aspect-[4/3] w-full bg-[#f9fafb] overflow-hidden">
                    <Image
                      src={rel.image}
                      alt={relContent.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-5 flex flex-col flex-grow text-center">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#2EC4B6] mb-1">
                      {rel.botanicalName}
                    </span>
                    <h3 className="font-bold text-[#040B1A] text-base mb-2 line-clamp-1">
                      {relContent.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 flex-grow">
                      {relContent.shortDesc}
                    </p>
                    <Link
                      href={`/products/${rel.slug}`}
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#2EC4B6] hover:text-[#25a99c] pt-2 border-t border-gray-100 w-full"
                    >
                      <span>{ui.viewProduct}</span>
                      <ArrowRight size={14} className={isAr ? 'rotate-180' : ''} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bg-gradient-to-br from-[#040B1A] via-[#123A63] to-[#040B1A] text-white py-14 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2EC4B6]/20 text-[#2EC4B6] mb-4">
            {isAr ? 'تصدير عالمي مباشر من المغرب' : isFr ? 'Export Direct du Maroc' : 'Direct Moroccan Export'}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            {ui.ctaBannerTitle}
          </h2>
          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            {ui.ctaBannerDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/quote?product=${encodeURIComponent(content.name)}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-[#2EC4B6] text-white hover:bg-[#25a99c] shadow-lg transition-transform hover:scale-105 text-sm sm:text-base text-center"
            >
              {ui.requestQuote}
            </Link>
            <a
              href={`${siteConfig.whatsappUrl}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-md transition-all text-sm sm:text-base text-center inline-flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5 shrink-0" />
              <span>{ui.whatsappInquiry}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

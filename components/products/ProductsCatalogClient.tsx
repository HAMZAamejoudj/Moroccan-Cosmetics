'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { ArrowRight, SlidersHorizontal, Search, X, ShieldCheck, Globe, CheckCircle2 } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { ProductItem, productsList, ProductCategory } from '@/lib/productsData';

interface ProductsCatalogClientProps {
  locale: 'en' | 'fr' | 'ar';
}

export default function ProductsCatalogClient({ locale }: ProductsCatalogClientProps) {
  const isAr = locale === 'ar';
  const isFr = locale === 'fr';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const ui = {
    badge: isAr ? 'كتالوج المنتجات المغربية الأصيلة' : isFr ? 'Catalogue Produits Maroc B2B' : 'Moroccan B2B Product Catalog',
    title: isAr ? 'مستحضرات تجميل ومواد خام مغربية' : isFr ? 'Matières Premières & Cosmétiques du Maroc' : 'Authentic Moroccan Bulk & Private Label',
    titleAccent: isAr ? 'بالجملة' : isFr ? 'en Gros' : 'Ingredients',
    description: isAr
      ? 'استكشف تشكيلتنا الكاملة من الزيوت النباتية النقية، الطين المعدني، ماء الورد ومستحضرات الحمام التقليدي مباشرة من مصدرها بالمغرب.'
      : isFr
      ? 'Découvrez notre gamme complète d’huiles pures, argiles minérales, eaux florales et soins traditionnels du hammam directement du Maroc.'
      : 'Explore our full range of single-origin carrier oils, mineral clays, pure hydrosols, and traditional hammam essentials direct from source in Morocco.',
    featurePure: isAr ? '100% نقية وعضوية موثقة' : isFr ? '100% Pures & Certifiées' : '100% Pure & Certified',
    featureBulk: isAr ? 'بالجملة والعلامة الخاصة' : isFr ? 'Vrac & Marque Blanche' : 'Bulk & Private Label',
    featureExport: isAr ? 'تصدير وشحن دولي مباشر' : isFr ? 'Export Direct International' : 'Worldwide Direct Export',
    searchPlaceholder: isAr ? 'ابحث عن منتج (أركان، تين شوكي، غاسول...)' : isFr ? 'Rechercher un produit (Argan, Figue de barbarie, Ghassoul...)' : 'Search products (Argan, Prickly Pear, Ghassoul...)...',
    allCategories: isAr ? 'جميع المنتجات' : isFr ? 'Tous les produits' : 'All Products',
    oils: isAr ? 'زيوت نباتية وعطرية' : isFr ? 'Huiles végétales & précieuses' : 'Carrier & Essential Oils',
    powders: isAr ? 'بودرات وأطيان معدنية' : isFr ? 'Poudres & Argiles' : 'Clays & Botanical Powders',
    traditional: isAr ? 'منتجات الحمام التقليدي' : isFr ? 'Soins traditionnels hammam' : 'Traditional Hammam Care',
    hydrosols: isAr ? 'مقطرات ومياه زهرية' : isFr ? 'Eaux florales & hydrolats' : 'Pure Hydrosols',
    viewDetails: isAr ? 'التفاصيل والطلب بالجملة' : isFr ? 'Détails & Devis en gros' : 'View Details & Specs',
    noResults: isAr ? 'لم يتم العثور على أي منتج مطابق لمعايير البحث الخاصة بك.' : isFr ? 'Aucun produit ne correspond à vos critères de recherche.' : 'No products matched your search criteria.',
    noResultsTitle: isAr ? 'لا توجد نتائج مطابقة' : isFr ? 'Aucun produit trouvé' : 'No products found',
    resetFilters: isAr ? 'إعادة ضبط التصفية' : isFr ? 'Réinitialiser les filtres' : 'Reset filters',
    filterByCat: isAr ? 'التصنيفات' : isFr ? 'Catégories' : 'Categories',
    productsAvailable: isAr ? 'منتج متوفر' : isFr ? 'produits disponibles' : 'products available',
    viewAll: isAr ? 'عرض جميع المنتجات' : isFr ? 'Voir tous les produits' : 'View all products',
    moq: isAr ? 'الحد الأدنى' : isFr ? 'MOQ' : 'MOQ',
  };

  const categories = [
    { id: 'all', label: ui.allCategories },
    { id: 'oils', label: ui.oils },
    { id: 'powders', label: ui.powders },
    { id: 'traditional', label: ui.traditional },
    { id: 'hydrosols', label: ui.hydrosols },
  ];

  const filteredProducts = useMemo(() => {
    return productsList.filter((item) => {
      const matchCat = selectedCategory === 'all' || item.category === selectedCategory;
      const content = item[locale];
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        content.name.toLowerCase().includes(q) ||
        content.shortDesc.toLowerCase().includes(q) ||
        item.botanicalName.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [selectedCategory, searchQuery, locale]);

  return (
    <div className={`min-h-screen bg-[#fafbfc] pt-28 sm:pt-32 lg:pt-36 pb-16 relative overflow-hidden ${isAr ? 'rtl' : 'ltr'}`}>
      {/* Decorative luxury ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#2EC4B6]/10 via-[#FF9F68]/5 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#2EC4B6]/10 text-[#0c7c72] border border-[#2EC4B6]/25 text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 shadow-2xs">
            <span>{ui.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#040B1A] mb-4 tracking-tight leading-[1.18]">
            {ui.title} <span className="text-[#2EC4B6]">{ui.titleAccent}</span>
          </h1>

          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            {ui.description}
          </p>

          {/* Trust Value Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 text-xs font-semibold text-gray-700 shadow-2xs">
              <CheckCircle2 size={13} className="text-[#2EC4B6]" />
              {ui.featurePure}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 text-xs font-semibold text-gray-700 shadow-2xs">
              <ShieldCheck size={13} className="text-[#2EC4B6]" />
              {ui.featureBulk}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-gray-200/90 text-xs font-semibold text-gray-700 shadow-2xs">
              <Globe size={13} className="text-[#2EC4B6]" />
              {ui.featureExport}
            </span>
          </div>
        </div>

        {/* Filter & Search Bar - Spacious, Clean & Responsive */}
        <div className="bg-white rounded-3xl border border-gray-200/90 shadow-sm p-4 sm:p-6 mb-10 space-y-4 sm:space-y-5">
          {/* Top Row: Centered Search Input + Results Count & Clear Button */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Left: Reset Filter Link (Desktop) */}
            <div className="hidden md:flex items-center justify-start md:col-span-3">
              {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-700 underline underline-offset-4 cursor-pointer transition-colors"
                >
                  {ui.resetFilters}
                </button>
              )}
            </div>

            {/* Center: Search Box */}
            <div className="col-span-1 md:col-span-6 flex justify-center">
              <div className="relative w-full max-w-xl">
                <Search
                  size={18}
                  className={`absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none ${
                    isAr ? 'right-3.5' : 'left-3.5'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  className={`w-full py-2.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-gray-50/70 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2EC4B6]/30 focus:border-[#2EC4B6] transition-all shadow-2xs ${
                    isAr ? 'pr-10 pl-9' : 'pl-10 pr-9'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className={`absolute top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors ${
                      isAr ? 'left-2.5' : 'right-2.5'
                    }`}
                  >
                    <X size={15} />
                  </button>
                )}
              </div>
            </div>

            {/* Right: Results Count (and Mobile Reset) */}
            <div className="col-span-1 md:col-span-3 flex items-center justify-between md:justify-end gap-3">
              <div className="md:hidden">
                {(selectedCategory !== 'all' || searchQuery.trim() !== '') && (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs font-semibold text-rose-500 hover:text-rose-700 underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    {ui.resetFilters}
                  </button>
                )}
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs sm:text-sm font-semibold shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#2EC4B6]" />
                <span>
                  {filteredProducts.length} {ui.productsAvailable}
                </span>
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-100 w-full" />

          {/* Category Filter Pills (wrap naturally with flex-wrap, no horizontal scrollbar!) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
              <SlidersHorizontal size={14} className="text-[#2EC4B6]" />
              <span>{ui.filterByCat}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const count =
                  cat.id === 'all'
                    ? productsList.length
                    : productsList.filter((p) => p.category === cat.id).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#2EC4B6] text-white shadow-xs ring-2 ring-[#2EC4B6]/25 font-semibold'
                        : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/80 hover:border-gray-300'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[11px] px-1.5 py-0.5 rounded-md font-bold transition-colors ${
                        isSelected
                          ? 'bg-white/25 text-white'
                          : 'bg-gray-200/80 text-gray-600'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-3xl border border-gray-200/80 shadow-xs max-w-lg mx-auto my-6">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400">
              <Search size={26} />
            </div>
            <h3 className="text-base font-bold text-[#040B1A] mb-1">
              {ui.noResultsTitle}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-5 leading-relaxed">
              {ui.noResults}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#2EC4B6] bg-[#2EC4B6]/10 hover:bg-[#2EC4B6] hover:text-white transition-all cursor-pointer"
            >
              {ui.viewAll}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => {
              const content = product[locale];
              return (
                <article
                  key={product.id}
                  className="bg-white rounded-2xl border border-gray-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Card Image */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative aspect-[4/3] w-full bg-[#f8fafc] overflow-hidden block"
                  >
                    <Image
                      src={product.image}
                      alt={content.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Card Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                      <span className="italic font-medium">{product.botanicalName}</span>
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-sm">
                        {ui.moq}: {product.moq.split('/')[0]}
                      </span>
                    </div>

                    <Link href={`/products/${product.slug}`}>
                      <h2 className="font-bold text-[#040B1A] text-base sm:text-lg mb-2 leading-snug hover:text-[#2EC4B6] transition-colors line-clamp-2">
                        {content.name}
                      </h2>
                    </Link>

                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5 flex-grow">
                      {content.shortDesc}
                    </p>

                    {/* View Details Button */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold text-[#2EC4B6] bg-[#2EC4B6]/10 hover:bg-[#2EC4B6] hover:text-white transition-all text-center"
                    >
                      <span>{ui.viewDetails}</span>
                      <ArrowRight size={14} className={isAr ? 'rotate-180' : ''} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}


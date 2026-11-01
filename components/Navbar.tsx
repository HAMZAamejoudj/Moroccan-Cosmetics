'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { enOnlyAbsoluteHref, isEnOnlyPath } from '@/lib/enOnlyRoutes';
import { GB, FR, MA } from 'country-flag-icons/react/3x2';

const Navbar = () => {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('products'), href: '/products' },
    { name: t('about'), href: '/about-us' },
    { name: t('benefits'), href: '/benefits' },
    { name: t('privateLabel'), href: '/private-label' },
    { name: t('blog'), href: '/blog' },
    { name: t('faq'), href: '/faq' },
    { name: t('contact'), href: '/contact' },
  ];

  const languages = [
    { code: 'en', name: 'English', Flag: GB },
    { code: 'fr', name: 'Français', Flag: FR },
    { code: 'ar', name: 'العربية', Flag: MA },
  ];

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  const handleLocaleChange = (newLocale: string) => {
    setLangMenuOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const renderNavLink = (
    href: string,
    label: string,
    className: string,
    onClick?: () => void
  ) => {
    if (locale !== 'en' && isEnOnlyPath(href)) {
      return (
        <a href={enOnlyAbsoluteHref(href)} className={className} onClick={onClick}>
          {label}
        </a>
      );
    }
    return (
      <Link href={href} className={className} onClick={onClick}>
        {label}
      </Link>
    );
  };

  return (
    <nav className={`fixed w-full z-50 top-0 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18" dir="ltr">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center" aria-label="Moroccan Cosmetics - home">
              <Image 
                src="/logo.webp" 
                alt="Moroccan Cosmetics - home" 
                width={220} 
                height={80} 
                className="h-11 md:h-14 w-auto rounded-sm"
                priority
              />
            </Link>
          </div>

          {/* Centered Links */}
          <div className="hidden md:flex flex-grow justify-center">
            <div className="flex items-baseline space-x-6 lg:space-x-8">
              {navLinks.map((link) =>
                renderNavLink(
                  link.href,
                  link.name,
                  'px-2 py-2 rounded-md text-sm font-medium text-deep-navy transition-colors hover:text-sunrise'
                )
              )}
            </div>
          </div>

          {/* Right-aligned CTA & Lang Switcher */}
          <div className="hidden md:flex items-center gap-6">
            {/* Language Switcher */}
            <div className="relative">
              <button 
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                aria-label="Change language"
                aria-expanded={langMenuOpen}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-sand hover:border-sunrise transition-all text-sm font-medium text-deep-navy bg-white"
              >
                <currentLang.Flag className="w-5 h-auto rounded-sm shadow-sm" />
                <span className="uppercase">{locale}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-xl border border-sand overflow-hidden"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLocaleChange(lang.code)}
                        className={`w-full flex items-center gap-4 px-5 py-4 text-sm hover:bg-sand/30 transition-colors ${locale === lang.code ? 'text-sunrise font-bold bg-sand/20' : 'text-deep-navy'}`}
                      >
                        <lang.Flag className="w-6 h-auto rounded-sm shadow-sm shrink-0" />
                        <span className="text-base">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/quote"
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105 shadow-md inline-block bg-gradient-to-r from-teal to-sunrise text-center"
            >
              {t('requestQuote')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2 sm:gap-4">
             {/* Simple Mobile Lang Switch */}
             <button 
              type="button"
              onClick={() => handleLocaleChange(locale === 'ar' ? 'en' : locale === 'en' ? 'fr' : 'ar')}
              aria-label="Change language"
              className="p-1 rounded-lg border border-sand flex items-center gap-1.5 pr-2 bg-white/50"
            >
              <currentLang.Flag className="w-5 h-auto rounded-sm" />
              <span className="text-[10px] font-bold uppercase">{locale}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="text-deep-navy hover:text-teal p-2 transition-colors"
            >
              {isOpen ? <X size={24} aria-hidden /> : <Menu size={24} aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
              {navLinks.map((link) =>
                renderNavLink(
                  link.href,
                  link.name,
                  'block px-3 py-3 text-base font-medium text-deep-navy hover:bg-gray-50 rounded-lg',
                  () => setIsOpen(false)
                )
              )}
              
              <div className="pt-4 border-t border-sand flex flex-wrap gap-2 px-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLocaleChange(lang.code)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all ${locale === lang.code ? 'bg-sunrise/10 border-sunrise text-sunrise font-bold' : 'border-sand text-deep-navy bg-white'}`}
                  >
                    <lang.Flag className="w-6 h-auto rounded-sm shadow-sm" />
                    <span className="text-sm">{lang.name}</span>
                  </button>
                ))}
              </div>

              <Link
                href="/quote"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center px-3 py-4 mt-6 text-base font-bold text-white rounded-xl bg-gradient-to-r from-teal to-sunrise"
              >
                {t('requestQuote')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

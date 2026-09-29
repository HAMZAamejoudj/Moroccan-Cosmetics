'use client';

import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa';
import Partners from './Partners';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/siteConfig';

const Footer = () => {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navbar');

  return (
    <footer className="bg-deep-navy text-white pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          {/* Branding Column */}
          <div className="space-y-8 lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Link
              href="/"
              className="block lg:inline-block lg:-mt-5 mx-auto lg:mx-0 rounded-md bg-white px-4 py-2.5 shadow-sm ring-1 ring-white/10"
            >
              <Image
                src="/logo.webp"
                alt="Moroccan Cosmetic Products"
                width={220}
                height={80}
                className="h-11 md:h-14 w-auto rounded-sm"
              />
            </Link>
            <p className="text-sm leading-relaxed text-muted-light">
              {t('description')}
            </p>
            <nav aria-label="Footer" className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm">
              <Link href="/benefits" className="text-muted-light hover:text-sunrise transition-colors">
                {tNav('benefits')}
              </Link>
            </nav>
            <div className="flex justify-center lg:justify-start space-x-5 rtl:space-x-reverse">
              <a 
                href="https://www.instagram.com/moroccanorganic/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sunrise transition-all hover:scale-110 text-white"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/moroccanorganica/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sunrise transition-all hover:scale-110 text-white"
              >
                <FaFacebookF size={16} />
              </a>
              <a 
                href="https://www.tiktok.com/@moroccanbeauty_shop" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sunrise transition-all hover:scale-110 text-white"
              >
                <FaTiktok size={16} />
              </a>
            </div>
          </div>

          {/* Dynamic Content (Partners) */}
          <div className="lg:col-span-2">
            <Partners />
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <h3 className="text-xl font-serif font-bold mb-8 text-sunrise w-full">{t('contact')}</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-sm text-muted-light">
                <MapPin className="text-sunrise flex-shrink-0" size={20} />
                <span>{t('facility')}<br />{t('location')}</span>
              </li>
              <li className="flex items-center gap-4 text-sm text-muted-light">
                <Phone className="text-sunrise flex-shrink-0" size={20} />
                <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-sunrise transition-colors">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-4 text-sm text-muted-light">
                <Mail className="text-sunrise flex-shrink-0" size={20} />
                <a href={`mailto:${siteConfig.exportEmail}`} className="hover:text-sunrise transition-colors">
                  {siteConfig.exportEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5 pt-12 text-center">
          <p className="text-sm text-muted-light opacity-60">
            &copy; {new Date().getFullYear()} Moroccan Beauty Products Manufacturer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

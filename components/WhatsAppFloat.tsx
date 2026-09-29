'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { siteConfig } from '@/lib/siteConfig';

/** Fixed WhatsApp chat button (site-wide). */
export default function WhatsAppFloat() {
  return (
    <a
      href={siteConfig.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 end-6 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/35 ring-2 ring-white/90 hover:scale-105 active:scale-95 transition-transform"
    >
      <FaWhatsapp className="h-7 w-7" aria-hidden />
    </a>
  );
}

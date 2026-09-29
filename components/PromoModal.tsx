'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/lib/siteConfig';

const PromoModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      const hasSeenModal = localStorage.getItem('hasSeenPromoModal');
      if (!hasSeenModal) {
        setIsVisible(true);
      }
    }, 5000); // Show after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const closeFooter = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenPromoModal', 'true');
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeFooter}
            className="absolute inset-0 bg-[#06142B]/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-[#0f1a34] rounded-[32px] p-8 w-full max-w-[420px] text-white shadow-2xl overflow-hidden"
          >
            <button
              onClick={closeFooter}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors text-white"
            >
              <X size={20} />
            </button>

            <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#FF9F68] mb-4">
              Moroccan Beauty Products
            </span>

            <div className="rounded-2xl overflow-hidden mb-6 border border-white/10">
              <Image
                src="/images/contact-promo.webp"
                alt="Premium Moroccan beauty products"
                width={400}
                height={220}
                className="w-full h-[200px] object-cover"
              />
            </div>

            <h3 className="text-2xl font-serif font-bold mb-3 leading-tight">
              Premium Moroccan Cosmetic Products
            </h3>
            
            <p className="text-sm text-white/80 leading-relaxed mb-8">
              Discover Moroccan Beauty Products crafted for private label and wholesale programs.
              Tap below to chat with our team and request tailored supply options.
            </p>

            <a
              href={siteConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-full font-bold transition-all hover:scale-[1.02] shadow-lg shadow-[#25D366]/20"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromoModal;

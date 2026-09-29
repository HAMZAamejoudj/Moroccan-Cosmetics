'use client';

import { Link } from '@/i18n/navigation';
import { trackEvent } from '@/lib/analytics';
import { siteConfig } from '@/lib/siteConfig';
import { ArrowRight, MessageCircle } from 'lucide-react';

type Location = 'hero' | 'mid' | 'final';

type PrivateLabelCtaProps = {
  kind: 'quote' | 'samples' | 'whatsapp';
  location: Location;
  className?: string;
  children: React.ReactNode;
};

export default function PrivateLabelCta({ kind, location, className, children }: PrivateLabelCtaProps) {
  const onClick = () => {
    if (kind === 'quote') trackEvent('cta_request_quote', { location });
    if (kind === 'samples') trackEvent('cta_sample_kit', { location });
    if (kind === 'whatsapp') trackEvent('cta_whatsapp', { location });
  };

  if (kind === 'whatsapp') {
    return (
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className={className}
      >
        <MessageCircle className="w-5 h-5" aria-hidden />
        {children}
      </a>
    );
  }

  const href = kind === 'samples' ? '/quote?type=samples' : '/quote?type=private-label';

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
      {kind === 'quote' ? <ArrowRight className="w-5 h-5" aria-hidden /> : null}
    </Link>
  );
}

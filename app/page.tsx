import type { Metadata } from 'next';
import Link from 'next/link';

const CANONICAL = 'https://moroccan-cosmetics.com/en/';

export const metadata: Metadata = {
  title: 'Moroccan Cosmetics Manufacturer | Wholesale & Private Label',
  description:
    'Wholesale argan oil, prickly pear seed oil, black soap, rhassoul clay and rose water from Morocco. Private label manufacturing for beauty brands, spas and distributors worldwide.',
  alternates: {
    canonical: CANONICAL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Fallback landing when a request hits `/` before server 301 to `/en/`. */
export default function RootPage() {
  return (
    <main
      style={{
        maxWidth: '42rem',
        margin: '4rem auto',
        padding: '0 1.25rem',
        fontFamily: 'system-ui, sans-serif',
        lineHeight: 1.6,
        color: '#040B1A',
      }}
    >
      <h1 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>
        Moroccan Cosmetics Manufacturer
      </h1>
      <p style={{ marginBottom: '1.5rem' }}>
        Authentic Moroccan beauty ingredients in bulk and private label — argan oil, hammam products,
        and more. Choose your language:
      </p>
      <nav aria-label="Language selection" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <Link href="/en/" style={{ fontWeight: 600 }}>
          English — Wholesale &amp; private label
        </Link>
        <Link href="/fr/" style={{ fontWeight: 600 }}>
          Français — grossiste et marque blanche
        </Link>
        <Link href="/ar/" style={{ fontWeight: 600 }}>
          العربية — الجملة والعلامة الخاصة
        </Link>
      </nav>
      <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: '#3B4758' }}>
        <a href="/en/">Continue to the English homepage</a>
      </p>
    </main>
  );
}

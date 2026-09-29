import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import DocumentLang from "@/components/DocumentLang";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const title = isFr 
    ? "fournisseur produits cosmitiques bio au maroc" 
    : "Moroccan Cosmetics | Authentic Organic Beauty Essentials";

  return {
    metadataBase: new URL('https://moroccan-cosmetics.com'),
    icons: {
      icon: '/logo.webp',
      shortcut: '/favicon.ico',
      apple: '/logo.webp',
    },
    title: {
      default: title,
      template: isFr ? "%s | Fournisseur Cosmétiques Bio" : "%s | Moroccan Cosmetics"
    },
    authors: [{ name: "Moroccan Cosmetics" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Enable static rendering
  setRequestLocale(locale);
  
  // Validate locale
  if (!['en', 'fr', 'ar'].includes(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({locale});

  return (
    <div className={locale === "ar" ? "font-arabic" : "font-sans"}>
      <DocumentLang locale={locale} />
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </NextIntlClientProvider>
      <GoogleAnalytics />
    </div>
  );
}

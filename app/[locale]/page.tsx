import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ALL_LOCALES, buildPageMetadata } from '@/lib/seo';
import HomeClient from './HomeClient';
import { blogImagePath, getLatestPublishedPosts, assertBlogLocale } from '@/lib/blog/posts';
import { isBlogContentLocale } from '@/lib/blog/locales';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home.metadata' });
  const title = t('title');
  const description = t('description');

  return buildPageMetadata({
    title,
    description,
    locale,
    path: '/',
    hreflangLocales: [...ALL_LOCALES],
    titleAbsolute: true,
  });
}

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }, { locale: 'ar' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const latestGuides = isBlogContentLocale(locale)
    ? getLatestPublishedPosts(3, assertBlogLocale(locale)).map((post) => ({
        post,
        imagePath: blogImagePath(post.slug),
      }))
    : [];
  return <HomeClient latestGuides={latestGuides} />;
}

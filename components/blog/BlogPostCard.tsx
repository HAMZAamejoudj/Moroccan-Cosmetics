'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import type { BlogPost } from '@/lib/blog/types';
import { ArrowRight, Clock } from 'lucide-react';

type Props = {
  post: BlogPost;
  imagePath: string;
  priorityImage?: boolean;
  headingLevel?: 'h2' | 'h3';
  /** Denser card for related guides on article pages, or large featured card */
  variant?: 'default' | 'compact' | 'featured';
};

export default function BlogPostCard({
  post,
  imagePath,
  priorityImage = false,
  headingLevel = 'h2',
  variant = 'default',
}: Props) {
  const t = useTranslations('Blog');
  const locale = useLocale();
  const imageSrc = imagePath;
  const TitleTag = headingLevel;
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  const dateLocale = locale === 'fr' ? 'fr-FR' : locale === 'ar' ? 'ar-MA' : 'en-GB';

  if (isFeatured) {
    return (
      <article
        className="group relative flex flex-col md:flex-row overflow-hidden rounded-[2rem] bg-white border border-sand shadow-sm hover:shadow-xl transition-all duration-300 md:col-span-full mb-4"
        data-category={post.category}
      >
        <div className="relative w-full md:w-1/2 aspect-video md:aspect-auto overflow-hidden bg-soft-white shrink-0">
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            priority={priorityImage}
          />
        </div>
        <div className="flex flex-col p-8 md:p-12 md:w-1/2 justify-center">
          <div className="flex flex-wrap items-center gap-3 text-muted-light text-xs font-medium uppercase tracking-wider mb-4">
            <time dateTime={post.resolvedDate}>
              {new Date(post.resolvedDate + 'T12:00:00').toLocaleDateString(dateLocale, {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-sand"></span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {t('article.minRead', { minutes: post.readingTimeMinutes })}</span>
          </div>
          <TitleTag className="font-serif font-bold text-deep-navy text-2xl md:text-3xl leading-snug mb-5">
            <Link href={`/blog/${post.slug}`} className="hover:text-ocean transition-colors">
              {post.title}
            </Link>
          </TitleTag>
          <p className="text-muted leading-relaxed text-base line-clamp-3 mb-8">
            {post.excerpt}
          </p>
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-ocean hover:text-sunrise transition-colors mt-auto w-fit"
          >
            {t('article.readGuide')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`group flex flex-col h-full overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 ${
        isCompact ? 'rounded-[1.5rem] border border-sand/60' : 'rounded-[2rem] border border-sand'
      }`}
      data-category={post.category}
    >
      <div
        className={`relative w-full shrink-0 overflow-hidden bg-soft-white ${
          isCompact ? 'aspect-[16/9]' : 'aspect-[16/10]'
        }`}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          priority={priorityImage}
        />
      </div>
      <div className={`flex flex-col flex-grow ${isCompact ? 'p-5' : 'p-6 lg:p-8'}`}>
        <div className={`flex flex-wrap items-center gap-2 text-muted-light font-medium ${
          isCompact ? 'text-[10px] mb-3' : 'text-xs mb-4'
        }`}>
          <time dateTime={post.resolvedDate}>
            {new Date(post.resolvedDate + 'T12:00:00').toLocaleDateString(dateLocale, {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </time>
          <span aria-hidden="true" className="w-1 h-1 rounded-full bg-sand"></span>
          <span>{t('article.minRead', { minutes: post.readingTimeMinutes })}</span>
        </div>
        <TitleTag
          className={`font-serif font-bold text-deep-navy leading-snug mb-3 ${
            isCompact ? 'text-lg line-clamp-2' : 'text-xl lg:text-2xl line-clamp-3'
          }`}
        >
          <Link
            href={`/blog/${post.slug}`}
            className="hover:text-ocean transition-colors"
          >
            {post.title}
          </Link>
        </TitleTag>
        <p
          className={`text-muted leading-relaxed flex-grow ${
            isCompact ? 'text-xs line-clamp-2 mb-4' : 'text-sm line-clamp-3 mb-6'
          }`}
        >
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className={`inline-flex items-center gap-2 font-bold text-ocean hover:text-sunrise transition-colors mt-auto w-fit ${
            isCompact ? 'text-xs' : 'text-sm'
          }`}
        >
          {t('article.readGuide')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}

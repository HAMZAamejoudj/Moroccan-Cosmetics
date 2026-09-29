import type { BlogContentLocale } from './locales';

export type BlogAuthorConfig = {
  name: string;
  role: string;
  bio: string;
  photo: string;
};

const authors: Record<BlogContentLocale, BlogAuthorConfig> = {
  en: {
    name: 'Moroccan Cosmetics',
    role: 'Export & Private Label Team',
    bio:
      'We produce and export argan oil, prickly pear seed oil, black soap, rhassoul clay and rose water from Agadir, Morocco. Our blog helps B2B buyers, brands and distributors source with clear specs, documentation and realistic claims.',
    photo: '/logo.webp',
  },
  fr: {
    name: 'Moroccan Cosmetics',
    role: 'Équipe export et marque blanche',
    bio:
      'Nous produisons et exportons huile d’argan, figue de barbarie, savon noir, rhassoul et eau de rose depuis Agadir. Ce blog aide les marques, distributeurs et acheteurs B2B à s’approvisionner avec des fiches claires et des allégations réalistes.',
    photo: '/logo.webp',
  },
  ar: {
    name: 'Moroccan Cosmetics',
    role: 'فريق التصدير والعلامة الخاصة',
    bio:
      'ننتج ونصدّر زيت الأركان، التين الشوكي، الصابون البلدي، الرصول وماء الورد من أكادير. يقدّم المدوّنة إرشادات للعلامات التجارية والموزعين ومشتري الجملة للتوريد بوثائق واضحة وادعاءات واقعية.',
    photo: '/logo.webp',
  },
};

export function getBlogAuthor(locale: BlogContentLocale): BlogAuthorConfig {
  return authors[locale] ?? authors.en;
}

const INCOMPLETE_AUTHOR = new Set(['', 'TODO']);

export function isBlogAuthorConfigured(config: BlogAuthorConfig): boolean {
  return (
    !INCOMPLETE_AUTHOR.has(config.name.trim()) &&
    !INCOMPLETE_AUTHOR.has(config.role.trim()) &&
    !INCOMPLETE_AUTHOR.has(config.bio.trim()) &&
    !INCOMPLETE_AUTHOR.has(config.photo.trim()) &&
    config.name !== 'Moroccan Cosmetics Export Team'
  );
}

export const AUTHOR_PLACEHOLDER = '[AUTHOR NAME]';
export const DATE_PLACEHOLDER = '[YYYY-MM-DD]';

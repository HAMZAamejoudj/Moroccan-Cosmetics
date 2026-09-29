import { marked } from 'marked';
import { slugifyHeading } from './slugify';
import { applyInternalLinks } from './internalLinks';
import { getCtaHrefs } from './ctaTokens';
import type { BlogContentLocale } from './locales';

const TABLE_WRAP_CLASS = 'my-8 overflow-x-auto rounded-xl border border-sand/80';

marked.setOptions({ gfm: true, breaks: false });

function addHeadingIds(html: string): string {
  return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/gi, (_match, depth: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, '');
    const id = slugifyHeading(text);
    return `<h${depth} id="${id}">${inner}</h${depth}>`;
  });
}

export function countH2InMarkdown(body: string): number {
  return body.split(/\r?\n/).filter((line) => /^##\s+/.test(line) && !/^###/.test(line)).length;
}

export function extractH2Headings(body: string): { id: string; text: string }[] {
  return body
    .split(/\r?\n/)
    .filter((line) => /^##\s+/.test(line) && !/^###/.test(line))
    .map((line) => {
      const text = line.replace(/^##\s+/, '').trim();
      return { id: slugifyHeading(text), text };
    });
}

/** TOC label: avoid "1." in the circle and "1." in the heading text. */
export function tocDisplayLabel(headingText: string, index: number): string {
  const stripped = headingText.replace(/^\d+\.\s+/, '');
  if (/^\d+\.\s+/.test(headingText) && stripped.length > 0) {
    return stripped;
  }
  return headingText;
}

function stripHtmlComments(input: string): string {
  return input.replace(/<!--[\s\S]*?-->/g, '');
}

/** Ensure GFM ordered lists start after a blank line so marked emits <ol>. */
function ensureOrderedListBlocks(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];
  for (const line of lines) {
    if (/^\d+\.\s/.test(line) && out.length > 0) {
      const prev = out[out.length - 1];
      if (
        prev.trim() !== '' &&
        !/^\d+\.\s/.test(prev) &&
        !/^[-*]\s/.test(prev) &&
        !/^\|/.test(prev) &&
        !/^#{1,6}\s/.test(prev)
      ) {
        out.push('');
      }
    }
    out.push(line);
  }
  return out.join('\n');
}

function wrapTables(html: string): string {
  return html.replace(/<table>/g, `<div class="${TABLE_WRAP_CLASS}"><table>`).replace(/<\/table>/g, '</table></div>');
}

function addTableHeaderScope(html: string): string {
  return html.replace(/<th(?![^>]*\bscope=)/gi, '<th scope="col"');
}

function replaceCtaTokens(html: string, locale: BlogContentLocale): string {
  let out = html;
  for (const [token, href] of Object.entries(getCtaHrefs(locale))) {
    const label = token.replace(/^\[|\]$/g, '');
    const anchor = `<a href="${href}" class="blog-cta-btn">${label}</a>`;
    out = out.split(token).join(anchor);
  }
  return out;
}

const MID_CTA: Record<BlogContentLocale, { title: string; text: string; btn: string }> = {
  en: {
    title: 'Launching your own line?',
    text: 'See our Private Label service — samples, MOQ and packaging for beauty brands.',
    btn: 'Private Label',
  },
  fr: {
    title: 'Vous lancez votre propre ligne ?',
    text: 'Découvrez notre service marque blanche — échantillons, MOQ et packaging pour les marques beauté.',
    btn: 'Marque blanche',
  },
  ar: {
    title: 'تطلقون خطكم الخاص؟',
    text: 'اكتشفوا خدمة العلامة الخاصة — عينات، حد أدنى للطلب وتغليف لعلامات التجميل.',
    btn: 'العلامة الخاصة',
  },
};

function midCtaHtml(locale: BlogContentLocale): string {
  const copy = MID_CTA[locale] ?? MID_CTA.en;
  const href = `/${locale}/private-label/`;
  return `
<aside class="blog-mid-cta not-prose" aria-label="Private label call to action">
  <p class="blog-mid-cta__title">${copy.title}</p>
  <p class="blog-mid-cta__text">${copy.text}</p>
  <a href="${href}" class="blog-cta-btn">${copy.btn}</a>
</aside>`;
}

/** Insert after the 3rd complete H2 section (before the 4th H2). */
function insertMidArticleCta(html: string, locale: BlogContentLocale): string {
  let pos = 0;
  let closed = 0;
  while (closed < 3) {
    const idx = html.indexOf('</h2>', pos);
    if (idx === -1) return html;
    closed += 1;
    pos = idx + 5;
  }
  const nextH2 = html.indexOf('<h2', pos);
  const insertAt = nextH2 === -1 ? html.length : nextH2;
  return html.slice(0, insertAt) + midCtaHtml(locale) + html.slice(insertAt);
}

export function renderBlogMarkdown(
  body: string,
  publishedSlugs: Set<string>,
  locale: BlogContentLocale,
  currentSlug?: string
): string {
  const withoutComments = stripHtmlComments(body);
  const listReady = ensureOrderedListBlocks(withoutComments);
  const linked = applyInternalLinks(listReady, publishedSlugs, locale, currentSlug);
  let html = marked.parse(linked) as string;
  html = addHeadingIds(html);
  html = addTableHeaderScope(html);
  html = wrapTables(html);
  html = replaceCtaTokens(html, locale);
  html = insertMidArticleCta(html, locale);
  return html;
}

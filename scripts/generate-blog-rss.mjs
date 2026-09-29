import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog', 'en');
const OUT_DIR = path.join(process.cwd(), 'public', 'en', 'blog');
const SITE = 'https://moroccan-cosmetics.com';

const overrides = {
  'how-to-choose-argan-oil-supplier': '2026-09-28',
  'how-to-start-argan-oil-brand': '2026-09-28',
  'import-argan-oil-from-morocco': '2026-09-28',
  'how-to-spot-fake-argan-oil': '2026-09-28',
  'argan-oil-wholesale-price': '2026-09-28',
  'moroccan-hammam-products-wholesale': '2026-09-28',
};

function resolveDate(slug, fmDate) {
  if (fmDate && fmDate !== '[YYYY-MM-DD]' && /^\d{4}-\d{2}-\d{2}$/.test(fmDate)) return fmDate;
  return overrides[slug] ?? '2026-09-28';
}

const posts = fs
  .readdirSync(CONTENT_DIR)
  .filter((f) => f.endsWith('.md'))
  .map((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'));
    if (data.status !== 'published') return null;
    const slug = data.slug;
    return {
      title: data.title,
      description: data.description,
      slug,
      date: resolveDate(slug, data.date),
      excerpt: data.excerpt,
    };
  })
  .filter(Boolean)
  .sort((a, b) => b.date.localeCompare(a.date));

const items = posts
  .map(
    (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE}/en/blog/${p.slug}/</link>
      <guid isPermaLink="true">${SITE}/en/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`
  )
  .join('');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Moroccan Cosmetics Blog</title>
    <link>${SITE}/en/blog/</link>
    <description>Guides for beauty brands sourcing from Morocco</description>
    <language>en</language>${items}
  </channel>
</rss>
`;

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'rss.xml'), xml.trim() + '\n', 'utf8');
console.log('Wrote public/en/blog/rss.xml');

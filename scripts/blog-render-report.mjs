import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
const { renderBlogMarkdown } = await import('../lib/blog/renderMarkdown.ts');
const { extractFaqFromMarkdown } = await import('../lib/blog/faqFromMarkdown.ts');
const { readingTimeMinutes, countWords } = await import('../lib/blog/readingTime.ts');

const dir = path.join(process.cwd(), 'content', 'blog', 'en');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
const posts = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(dir, file), 'utf8');
  const { data, content } = matter(raw);
  if (data.status !== 'published') continue;
  const slug = data.slug || file.replace(/^\d+-/, '').replace(/\.md$/, '');
  posts.push({ ...data, slug, body: content, wordCount: countWords(content), readingTimeMinutes: readingTimeMinutes(countWords(content)) });
}

const slugs = new Set(posts.map((p) => p.slug));

for (const p of posts) {
  const html = renderBlogMarkdown(p.body, slugs, 'en', p.slug);
  const hrefs = [...html.matchAll(/href="(\/en\/[^"]+)"/g)].map((m) => m[1]);
  const uniq = [...new Set(hrefs)].filter(
    (h) =>
      h.includes('/blog/') ||
      h.includes('/private-label') ||
      h.includes('/quote') ||
      h.includes('/benefits')
  );
  const faq = extractFaqFromMarkdown(p.body);
  console.log('---', p.slug);
  console.log('title:', p.title);
  console.log('seoTitle:', p.seoTitle);
  console.log('words:', p.wordCount, 'read:', p.readingTimeMinutes, 'min');
  console.log(
    'table:',
    html.includes('<table>'),
    'th scope:',
    html.includes('scope="col"'),
    'ol:',
    html.includes('<ol>')
  );
  console.log('mid-cta relative:', html.includes('href="/en/private-label/"'));
  console.log('internal links:', uniq.join(', ') || '(none)');
  console.log('FAQ count:', faq.length);
}

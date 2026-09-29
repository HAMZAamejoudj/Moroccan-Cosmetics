import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const ROOT = path.join(process.cwd(), 'content', 'blog', 'en');

marked.setOptions({ gfm: true, breaks: false });

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function readingTimeMinutes(wordCount) {
  return Math.max(1, Math.ceil(wordCount / 200));
}

function extractFaq(body) {
  const lines = body.split(/\r?\n/);
  let inFaq = false;
  let currentQuestion = null;
  let answerLines = [];
  const items = [];

  const flush = () => {
    if (currentQuestion && answerLines.length) {
      items.push({
        question: currentQuestion,
        answer: answerLines.join(' ').replace(/\s+/g, ' ').trim(),
      });
    }
    currentQuestion = null;
    answerLines = [];
  };

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      const title = h2[1].trim().toLowerCase();
      if (title === 'faq' || title === 'frequently asked questions') {
        flush();
        inFaq = true;
        continue;
      }
      if (inFaq) {
        flush();
        inFaq = false;
      }
      continue;
    }
    if (!inFaq) continue;
    const h3 = line.match(/^###\s+(.+)$/);
    if (h3) {
      flush();
      currentQuestion = h3[1].trim();
      continue;
    }
    if (currentQuestion && line.trim()) answerLines.push(line.trim());
  }
  flush();
  return items;
}

const linkRe = /\[([^\]]+)\]\((\/en\/blog\/[^)]+)\)/g;

const files = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.md'))
  .sort();

const published = [];
for (const file of files) {
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  const { data, content } = matter(raw);
  if (data.status !== 'published') continue;
  const wc = countWords(content);
  const links = [];
  let m;
  const seen = new Set();
  while ((m = linkRe.exec(content)) !== null) {
    const key = m[2];
    if (!seen.has(key)) {
      seen.add(key);
      links.push({ text: m[1], href: m[2] });
    }
  }
  const html = marked.parse(content);
  const hasTable = html.includes('<table>');
  const hasOl = html.includes('<ol>');
  published.push({
    slug: data.slug,
    title: data.title,
    seoTitle: data.seoTitle,
    wordCount: wc,
    readingTime: readingTimeMinutes(wc),
    links,
    faq: extractFaq(content),
    hasTable,
    hasOl,
  });
}

console.log(JSON.stringify({ published }, null, 2));

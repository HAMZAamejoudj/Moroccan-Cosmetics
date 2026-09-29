import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const ROOT = path.join(process.cwd(), 'content', 'blog');
const LOCALES = ['en', 'fr', 'ar'];
const CTA_TOKENS = new Set([
  '[Request a Quote]',
  '[Request Samples]',
  '[Start My Brand]',
  '[request our sample pack and batch COA]',
  '[Demander un devis]',
  '[Demander des échantillons]',
  '[Lancer ma marque]',
  '[demander notre pack échantillons et COA]',
  '[طلب عرض سعر]',
  '[طلب عينات]',
  '[إطلاق علامتي]',
  '[طلب حزمة العينات وشهادة التحليل]',
]);

const blogConfigPath = path.join(process.cwd(), 'lib', 'blog', 'blogConfig.ts');
const configSrc = fs.readFileSync(blogConfigPath, 'utf8');
const authorFields = ['name', 'role', 'bio', 'photo'];
const forbiddenAuthorValues = new Set(['TODO', 'Moroccan Cosmetics Export Team', '']);
let configOk = true;

for (const locale of LOCALES) {
  for (const field of authorFields) {
    const re = new RegExp(`${locale}:\\s*\\{[^}]*${field}:\\s*'([^']*)'`, 's');
    const m = configSrc.match(re);
    const value = m?.[1]?.trim() ?? '';
    if (!value || forbiddenAuthorValues.has(value)) {
      console.error(`blogConfig authors.${locale}.${field} must be filled (not TODO or placeholder). Current: "${value}"`);
      configOk = false;
    }
  }
}

const findings = [];

for (const locale of LOCALES) {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8');
    const { data, content } = matter(raw);
    if (data.status !== 'published') continue;

    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
      const matches = line.match(/\[([^\]]+)\]/g);
      if (!matches) return;
      for (const token of matches) {
        if (CTA_TOKENS.has(token)) continue;
        findings.push({ file: `${locale}/${file}`, line: index + 1, token });
      }
    });
  }
}

if (findings.length) {
  console.error('Placeholder brackets found in published posts:\n');
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}  ${f.token}`);
  }
}

if (!configOk || findings.length) {
  process.exit(1);
}

console.log('check:blog OK — no placeholders in published posts; author config filled.');

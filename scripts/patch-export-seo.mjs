import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'out');

if (!existsSync(outDir)) {
  console.error('patch-export-seo: missing out/ — run next build first.');
  process.exit(1);
}

const ROOT_FALLBACK_HTML = `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Moroccan Cosmetics Manufacturer | Wholesale &amp; Private Label</title>
  <meta name="description" content="Wholesale argan oil, prickly pear seed oil, black soap, rhassoul clay and rose water from Morocco. Private label manufacturing for beauty brands, spas and distributors worldwide."/>
  <link rel="canonical" href="https://moroccan-cosmetics.com/en/"/>
  <meta http-equiv="refresh" content="0; url=/en/"/>
  <style>
    body{font-family:system-ui,sans-serif;max-width:42rem;margin:4rem auto;padding:0 1.25rem;line-height:1.6;color:#040B1A}
    h1{font-size:1.75rem}
    nav a{margin-right:1rem;font-weight:600}
  </style>
</head>
<body>
  <main>
    <h1>Moroccan Cosmetics Manufacturer</h1>
    <p>Authentic Moroccan beauty ingredients in bulk and private label. Choose your language:</p>
    <nav aria-label="Language selection">
      <a href="/en/">English — Wholesale &amp; private label</a>
      <a href="/fr/">Français — grossiste et marque blanche</a>
      <a href="/ar/">العربية — الجملة والعلامة الخاصة</a>
    </nav>
    <p><a href="/en/">Continue to the English homepage</a></p>
  </main>
</body>
</html>
`;

function patchHtmlLang(filePath, locale) {
  let html = readFileSync(filePath, 'utf8');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const langAttr = `lang="${locale}" dir="${dir}"`;

  // Replace root layout default lang="en" on <html ...>
  html = html.replace(/<html\s+lang="en"/i, `<html ${langAttr}`);
  html = html.replace(/<html\s+lang="en"\s+dir="ltr"/i, `<html ${langAttr}`);
  html = html.replace(/<html\s+dir="ltr"\s+lang="en"/i, `<html ${langAttr}`);

  if (locale === 'ar' && !html.includes('dir="rtl"')) {
    html = html.replace(/<html\s+lang="ar"/i, `<html lang="ar" dir="rtl"`);
  }

  writeFileSync(filePath, html, 'utf8');
}

function walkHtml(dir, locale) {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walkHtml(full, locale);
      continue;
    }
    if (entry.endsWith('.html')) {
      patchHtmlLang(full, locale);
    }
  }
}

writeFileSync(join(outDir, 'index.html'), ROOT_FALLBACK_HTML, 'utf8');

for (const locale of ['en', 'fr', 'ar']) {
  walkHtml(join(outDir, locale), locale);
}

// Ensure .htaccess is present (copied from public/; rewrite if missing)
const htaccessSrc = join(process.cwd(), 'public', '.htaccess');
const htaccessOut = join(outDir, '.htaccess');
if (existsSync(htaccessSrc)) {
  writeFileSync(htaccessOut, readFileSync(htaccessSrc, 'utf8'), 'utf8');
}

console.log('patch-export-seo: root index.html, locale lang/dir on HTML, .htaccess OK.');

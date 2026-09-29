import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');

/** old public URL path → new public URL path */
const renames = [
  ['/images/argan oil.webp', '/images/argan-oil-cosmetic.webp'],
  ['/images/Prickly Pear Seed Oil.webp', '/images/prickly-pear-seed-oil.webp'],
  ['/images/black soap.webp', '/images/moroccan-black-soap.webp'],
  ['/images/Ghassoul Clay.webp', '/images/ghassoul-clay.webp'],
  ['/images/Moroccan Rose Water.webp', '/images/moroccan-rose-water-bulk.webp'],
  ['/images/img29.webp', '/images/contact-promo.webp'],
  ['/images/img2.webp', '/images/private-label-packaging-legacy.webp'],
  ['/images/benefits/bef1.webp', '/images/benefits/ingredient-argan-oil.webp'],
  ['/images/benefits/bef2.webp', '/images/benefits/ingredient-prickly-pear.webp'],
  ['/images/benefits/bef3.webp', '/images/benefits/ingredient-black-soap.webp'],
  ['/images/benefits/bef4.webp', '/images/benefits/ingredient-nila-powder.webp'],
  ['/images/bestsellers/nh.webp', '/images/home-hero-products.webp'],
  ['/images/blog/blog1.webp', '/images/blog/how-to-start-argan-oil-brand.webp'],
  ['/images/blog/blog2.webp', '/images/blog/argan-oil-wholesale-price.webp'],
  ['/images/blog/blog3.webp', '/images/blog/how-to-spot-fake-argan-oil.webp'],
  ['/images/blog/blog4.webp', '/images/blog/moroccan-hammam-products-wholesale.webp'],
  ['/images/blog/blog5.webp', '/images/blog/how-to-choose-argan-oil-supplier.webp'],
  ['/images/blog/blog6.webp', '/images/blog/import-argan-oil-from-morocco.webp'],
  [
    '/images/argan-oil-benefits/hero-placeholder.webp',
    '/images/argan-oil-benefits/hero-argan-oil.webp',
  ],
  [
    '/images/argan-oil-benefits/hair-section-placeholder.webp',
    '/images/argan-oil-benefits/hair-argan-oil.webp',
  ],
  [
    '/images/argan-oil-benefits/quality-section-placeholder.webp',
    '/images/argan-oil-benefits/quality-argan-oil.webp',
  ],
];

function toAbs(urlPath) {
  return path.join(publicDir, urlPath.replace(/^\//, '').split('/').join(path.sep));
}

for (const [from, to] of renames) {
  const src = toAbs(from);
  const dest = toAbs(to);
  if (!fs.existsSync(src)) {
    if (fs.existsSync(dest)) {
      console.log('skip (already renamed):', to);
      continue;
    }
    console.error('Missing source:', from);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  if (fs.existsSync(dest)) fs.unlinkSync(dest);
  fs.renameSync(src, dest);
  console.log(from, '→', to);
}

const skipDirs = new Set(['node_modules', '.next', 'out']);
const textExts = new Set(['.ts', '.tsx', '.css', '.mjs', '.json', '.md', '.xml']);
const skipFiles = new Set(['lighthouse-private-label.json', 'rename-used-images.mjs', 'unused-report.json']);

function walk(dir, files = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (skipDirs.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, files);
    else files.push(p);
  }
  return files;
}

const sorted = [...renames].sort((a, b) => b[0].length - a[0].length);

for (const file of walk(root)) {
  if (!textExts.has(path.extname(file))) continue;
  if (skipFiles.has(path.basename(file))) continue;
  if (file.startsWith(publicDir)) continue;

  let text = fs.readFileSync(file, 'utf8');
  let changed = false;
  for (const [from, to] of sorted) {
    if (text.includes(from)) {
      text = text.split(from).join(to);
      changed = true;
    }
  }
  if (changed) {
    fs.writeFileSync(file, text, 'utf8');
    console.log('patched', path.relative(root, file));
  }
}

console.log('Done.');

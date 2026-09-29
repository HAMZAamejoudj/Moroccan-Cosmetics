import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const publicDir = path.join(root, 'public', 'images');

const arganOut = path.join(publicDir, 'argan-oil-benefits');
const benefitsOut = path.join(publicDir, 'benefits');
await mkdir(arganOut, { recursive: true });
await mkdir(benefitsOut, { recursive: true });

async function toWebp(src, dest, width, quality = 72) {
  await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(dest);
  const { size } = await import('fs').then((fs) => fs.promises.stat(dest));
  console.log(dest, size, 'bytes');
}

await toWebp(path.join(publicDir, 'argan-oil-cosmetic.webp'), path.join(arganOut, 'hero-argan-oil.webp'), 1600, 70);
await toWebp(path.join(publicDir, 'prickly-pear-seed-oil.webp'), path.join(arganOut, 'hair-argan-oil.webp'), 1400, 68);
await toWebp(path.join(publicDir, 'moroccan-black-soap.webp'), path.join(arganOut, 'quality-argan-oil.webp'), 1400, 68);
await toWebp(path.join(publicDir, 'benefits-hero.webp'), path.join(benefitsOut, 'benefits-hub-hero.webp'), 1600, 72);
await sharp(path.join(publicDir, 'benefits-hero.webp'))
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .webp({ quality: 78, effort: 6 })
  .toFile(path.join(benefitsOut, 'benefits-hub-og.webp'));
const ogStat = await import('fs').then((fs) => fs.promises.stat(path.join(benefitsOut, 'benefits-hub-og.webp')));
console.log('OG', ogStat.size, 'bytes');

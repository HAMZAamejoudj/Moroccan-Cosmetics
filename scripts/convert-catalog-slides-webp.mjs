import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.join(process.cwd(), 'public', 'images', 'catalog-slider');

const files = [
  '01-hammam-sponges',
  '02-prickly-pear-scrub',
  '03-red-clay-mask',
  '04-rosemary-hair-mist',
  '05-black-soap-premium',
  '06-hammam-towels',
  '07-black-soap-argan',
  '08-night-argan-cream',
  '09-rose-scrub-mist',
  '10-rose-water-tradition',
  '11-argan-serum',
  '12-body-milk',
  '13-kohl-traditional',
  '14-hair-conditioner',
  '15-hair-balm',
  '16-argan-bottles',
  '17-kohl-authentic',
  '18-hair-conditioner-botanical',
  '19-hair-balm-argan',
  '20-argan-oil-trio',
];

for (let i = 0; i < files.length; i++) {
  const n = String(i + 1).padStart(2, '0');
  const src = path.join(dir, `slide-${n}.png`);
  const dest = path.join(dir, `${files[i]}.webp`);
  if (!fs.existsSync(src)) {
    console.error('Missing:', src);
    process.exit(1);
  }
  await sharp(src).webp({ quality: 88, effort: 4 }).toFile(dest);
  console.log('OK', path.basename(dest));
}

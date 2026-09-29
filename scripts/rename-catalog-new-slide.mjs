/**
 * Copy/rename ChatGPT exports from public/images/catalog-slider/new slide/
 * to public/images/catalog-slider/01-hammam-sponges.webp … 20-argan-oil-trio.webp
 *
 * Usage: node scripts/rename-catalog-new-slide.mjs
 */
import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'public', 'images', 'catalog-slider', 'new slide');
const destDir = path.join(process.cwd(), 'public', 'images', 'catalog-slider');

const destNames = [
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

const explicitSources = [
  'Image ChatGPT 29 sept. 2026, 12_06_35-1.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_38-2.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_39-3.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_40-4.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_42-5.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_43-6.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_45-7.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_47-8.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_48-9.webp',
  'Image ChatGPT 29 sept. 2026, 12_06_49-10.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_38-1.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_39-2.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_40-3.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_41-4.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_42-5.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_43-6.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_44-7.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_45-8.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_46-9.webp',
  'Image ChatGPT 29 sept. 2026, 12_39_47-10.webp',
];

function listSources() {
  if (!fs.existsSync(srcDir)) return null;
  const onDisk = fs
    .readdirSync(srcDir)
    .filter((f) => f.toLowerCase().endsWith('.webp') && f.includes('ChatGPT'))
    .sort((a, b) => a.localeCompare(b, 'en'));
  if (onDisk.length === destNames.length) return onDisk;
  const explicit = explicitSources.filter((f) => fs.existsSync(path.join(srcDir, f)));
  if (explicit.length === destNames.length) return explicit;
  return null;
}

const sources = listSources();
if (!sources) {
  const haveClean = destNames.every((n) => fs.existsSync(path.join(destDir, `${n}.webp`)));
  if (haveClean) {
    console.log('No new slide/ ChatGPT files found. Slider already uses clean names in catalog-slider/.');
    process.exit(0);
  }
  console.error('Expected 20 .webp files in catalog-slider/new slide/ (ChatGPT names) or 20 clean files in catalog-slider/.');
  process.exit(1);
}

for (let i = 0; i < destNames.length; i++) {
  const src = path.join(srcDir, sources[i]);
  const dest = path.join(destDir, `${destNames[i]}.webp`);
  fs.copyFileSync(src, dest);
  console.log(path.basename(src), '->', `${destNames[i]}.webp`);
}

fs.copyFileSync(
  path.join(destDir, '20-argan-oil-trio.webp'),
  path.join(destDir, 'private-label-packaging.webp')
);

for (const name of sources) {
  fs.unlinkSync(path.join(srcDir, name));
}

console.log('Done. Removed ChatGPT filenames from new slide/.');

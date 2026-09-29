import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const input = path.join(root, 'public/images/private-label-packaging-legacy.webp');
const outDir = path.join(root, 'public/images/private-label');

await mkdir(outDir, { recursive: true });

async function buildVariant({ name, crop, blurBand }) {
  const meta = await sharp(input).metadata();
  const w = meta.width ?? 1600;
  const h = meta.height ?? 1200;

  const left = Math.round(w * crop.left);
  const top = Math.round(h * crop.top);
  const width = Math.round(w * crop.width);
  const height = Math.round(h * crop.height);

  const cropped = await sharp(input).extract({ left, top, width, height }).toBuffer();
  const cm = await sharp(cropped).metadata();
  const cw = cm.width ?? width;
  const ch = cm.height ?? height;

  const bandTop = Math.round(ch * blurBand.top);
  const bandHeight = Math.round(ch * blurBand.height);
  const blurredBand = await sharp(cropped)
    .extract({ left: 0, top: bandTop, width: cw, height: bandHeight })
    .blur(32)
    .toBuffer();

  let out = await sharp(cropped)
    .composite([{ input: blurredBand, left: 0, top: bandTop }])
    .webp({ quality: 80, effort: 6 })
    .toBuffer();

  let quality = 80;
  while (out.length > 150 * 1024 && quality > 42) {
    quality -= 5;
    out = await sharp(cropped)
      .composite([{ input: blurredBand, left: 0, top: bandTop }])
      .webp({ quality, effort: 6 })
      .toBuffer();
  }

  const output = path.join(outDir, name);
  await sharp(out).toFile(output);
  console.log(`Wrote ${output} (${Math.round(out.length / 1024)} KB, q=${quality})`);
}

// General facility shot (packaging section + elsewhere)
await buildVariant({
  name: 'facility-production.webp',
  crop: { left: 0.04, top: 0.2, width: 0.92, height: 0.62 },
  blurBand: { top: 0.35, height: 0.55 },
});

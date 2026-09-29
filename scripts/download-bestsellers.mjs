import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const products = [
  { id: 'black-seed', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1773182378937-o059ram.webp' },
  { id: 'cyperus', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1773182235433-3ofh4vw.webp' },
  { id: 'frankincense', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1773181871631-iqwzyv3.webp' },
  { id: 'aker-fassi', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1772241733530-ypv37jt.webp' },
  { id: 'rose-water', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1773409335595-p4t173x.webp' },
  { id: 'argan-cosmetic', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1773409043697-gdhe5vk.jpeg' },
  { id: 'argan-culinary', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1773361456204-59rqf3n.jpeg' },
  { id: 'nila', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1772242512929-8sgv0fj.webp' },
  { id: 'prickly-pear', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1773413273885-z6gt6q5.webp' },
  { id: 'black-soap', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1772242760972-bl46dfs.webp' },
  { id: 'ghassoul', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1772242817362-xov0g5h.webp' },
  { id: 'sidr', url: 'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1772242137979-4bv7y61.webp' },
];

const outDir = join(process.cwd(), 'public', 'images', 'bestsellers');
await mkdir(outDir, { recursive: true });

for (const p of products) {
  const ext = p.url.split('.').pop();
  const res = await fetch(p.url);
  if (!res.ok) throw new Error(`Failed ${p.id}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const file = join(outDir, `${p.id}.${ext}`);
  await writeFile(file, buf);
  console.log('saved', file);
}

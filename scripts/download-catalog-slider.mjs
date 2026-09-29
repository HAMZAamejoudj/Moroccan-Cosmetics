import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const urls = [
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897077564-57lqndt.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897322214-bizcby1.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897189917-r16vkpz.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897420635-qtp685v.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897567449-21xnukn.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897655513-qyhjsut.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897802439-t8an9pk.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897887829-y8qvudw.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898217632-03fnzwy.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771899152123-g7vb8vt.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771896678916-zibggtp.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771896873170-y2ztk85.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898735189-f8zu64v.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771897959917-b19slck.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898677685-9faq41z.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898696943-dgh9f72.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898998326-3m4sa12.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771899048162-lqz29fc.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898852915-0jeae26.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898915563-c4a1kdy.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898007775-msg7i0f.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898133285-9fe4mx2.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898369965-nhsbota.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771898429493-59ybyna.jpg',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771893991799-wgx4zfp.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771894148861-k8mu3sc.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771894344839-6ri7lxb.webp',
  'https://cxrndkybpmaeswmjsahq.supabase.co/storage/v1/object/public/products/1771896980936-sbma5ty.webp',
];

const files = [
  '01-savon-noir-argan.webp',
  '02-gommage-cafe.webp',
  '03-nila-bleu.webp',
  '04-pierre-ponce.webp',
  '05-gommage-cactus.webp',
  '06-masque-argile-rouge.webp',
  '07-shampooing-romarin.webp',
  '08-savon-traditionnel.jpg',
  '09-kessa.jpg',
  '10-serum-ricin.jpg',
  '11-creme-verveine.webp',
  '12-masque-rhassoul-rose.webp',
  '13-rose-seche.webp',
  '14-argan-or-liquide.jpg',
  '15-jojoba.jpg',
  '16-khol.jpg',
  '17-apres-shampooing.jpg',
  '18-masque-karite.jpg',
  '19-argan-flacon.jpg',
  '20-savon-naturel.jpg',
  '21-savon-beldi.jpg',
  '22-eau-rose.jpg',
  '23-savon-ponce.jpg',
  '24-savon-eucalyptus.jpg',
  '25-aker-fassi.jpg',
  '26-rhassoul.jpg',
  '27-beauty-bulk.jpg',
  '28-argan-hair.webp',
];

const outDir = join(process.cwd(), 'public', 'images', 'catalog-slider');
await mkdir(outDir, { recursive: true });

for (let i = 0; i < urls.length; i++) {
  const res = await fetch(urls[i]);
  if (!res.ok) throw new Error(`Failed ${files[i]}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(outDir, files[i]), buf);
  console.log('saved', files[i]);
}

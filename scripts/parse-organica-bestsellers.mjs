const res = await fetch('https://www.moroccanorganica.com/fr');
const html = await res.text();

const titles = [
  'Organic black seed oil',
  'Cyperus rotundus oil morocco',
  'frankincense oil',
  'Moroccan Aker Fassi Powder',
  'Organic Moroccan Rose Water',
  'Argan Oil 100% Organic Cold-Pressed',
  'Organic Culinary Argan Oil',
  'Moroccan Nila Powder',
  'Organic Prickly Pear Seeds Oil',
  'Organic Moroccan Black Soap',
  'Moroccan Ghassoul Clay Powder',
  'Moroccan Sidr Powder',
];

for (const title of titles) {
  const idx = html.indexOf(title);
  if (idx === -1) {
    console.log('MISSING', title);
    continue;
  }
  const slice = html.slice(Math.max(0, idx - 2500), idx + 500);
  const imgs = [...slice.matchAll(/https:\/\/cxrndkybpmaeswmjsahq\.supabase\.co[^"'\s)]+/g)].map((x) => x[0]);
  const img = imgs.at(-1) ?? imgs[0] ?? 'none';
  console.log(title);
  console.log(img);
}

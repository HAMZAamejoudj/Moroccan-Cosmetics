const res = await fetch('https://www.moroccanorganica.com/fr');
const html = await res.text();

const titles = [
  'Savon noir au Maroc avec huile d’argan',
  'Savon noir au Maroc avec huile d\'argan',
  'Gommage corporel au café',
  'Poudre de nila bleu',
  'Pierre ponce artisanale en laine tricotée',
  'Gommage corporel au cactus',
  'Masque capillaire à l’argile rouge',
  'Shampooing au romarin anti-chute',
  'Savon noir traditionnel marocain',
  'Gant exfoliant hammam kessa marocain',
  'Sérum de croissance capillaire à l’huile de ricin',
  'Crème de nuit régénérante à l’extrait de verveine',
  'Masque visage argile Rhassoul & eau de rose',
  'Bourgeons et pétales de rose séchés bio',
  'Huile d’argan « Or liquide » pour peau, cheveux et ongles',
  'Huile de jojoba bio pressée à froid',
  'Poudre de khôl pour yeux + applicateur en bois',
  'Après-shampooing à la fleur d’oranger',
  'Masque capillaire au beurre de karité et miel',
  'Huile d’argan cosmétique pure — flacon artisanal',
  'Savon noir naturel',
  'Savon beldi noir à l’huile d’olive',
  'Eau de rose naturelle pure',
  'Savon noir avec pierre ponce et eucalyptus',
  'Savon noir à l’eucalyptus',
  'Aker fassi powder from Morocco',
  'Argile Rhassoul Marocaine',
  'Produits de Beauté Marocains en Gros',
  'Pure argan oil for hair',
];

const grossisteIdx = html.indexOf('Grossiste');
const bestsellerIdx = html.indexOf('Organic black seed oil');
const chunk = html.slice(grossisteIdx, bestsellerIdx > grossisteIdx ? bestsellerIdx : grossisteIdx + 200000);

const allImgs = [...chunk.matchAll(/https:\/\/cxrndkybpmaeswmjsahq\.supabase\.co\/storage\/v1\/object\/public\/products\/[^"'\s)]+/g)].map(
  (m) => m[0]
);
console.log('chunk imgs', allImgs.length);
console.log(JSON.stringify(allImgs, null, 2));

// Also try name attribute in HTML
const nameMatches = [...chunk.matchAll(/name\\":\\"([^\\"]+)\\"/g)].map((m) => m[1]);
console.log('escaped names', nameMatches.length, nameMatches.slice(0, 10));

const res = await fetch('https://www.moroccanorganica.com/fr');
const html = await res.text();
const matches = [...html.matchAll(/(?:src|srcset|data-src)=["']([^"']+)["']/gi)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0]));
const unique = [...new Set(matches)].filter((u) => /\.(jpg|jpeg|png|webp)/i.test(u) || u.includes('wp-content'));
console.log('len', html.length);
for (const u of unique.slice(0, 80)) console.log(u);

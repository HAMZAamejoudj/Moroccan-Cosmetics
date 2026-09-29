import fs from 'fs';
import path from 'path';

const root = path.resolve(import.meta.dirname, '..');
const publicDir = path.join(root, 'public');
const imageExts = new Set(['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']);

function walkImages(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkImages(p, acc);
    else if (imageExts.has(path.extname(e.name).toLowerCase())) acc.push(p);
  }
  return acc;
}

const codeExts = ['.ts', '.tsx', '.js', '.jsx', '.css', '.md', '.xml'];

function walkCode(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', 'public', 'scripts', 'out'].includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walkCode(p, acc);
    else if (codeExts.some((x) => e.name.endsWith(x)) && !e.name.includes('lighthouse')) acc.push(p);
  }
  return acc;
}

const files = walkImages(publicDir);
let corpus = '';
for (const f of walkCode(root)) {
  try {
    corpus += fs.readFileSync(f, 'utf8') + '\n';
  } catch {
    /* ignore */
  }
}

/** Paths may contain spaces (e.g. Ghassoul Clay.webp). */
const used = new Set();
const reList = [
  /\/images\/[^"'`)\]]+/g,
  /\/logo\.webp/g,
  /\/logo\.png/g,
  /\/favicon\.ico/g,
  /\/blog\/[^"'`)\]]+\.(webp|png|jpg)/gi,
  /moroccan-cosmetics\.com\/images\/[^"'`)\]]+/g,
];

for (const re of reList) {
  let m;
  while ((m = re.exec(corpus)) !== null) {
    let u = m[0].replace(/https?:\/\/[^/]+/, '').trim();
    u = u.replace(/[,;]+$/, '');
    used.add(u.split('?')[0]);
  }
}

// Blog slugs → legacy /blog/{slug}.webp
const contentBlog = path.join(root, 'content', 'blog');
if (fs.existsSync(contentBlog)) {
  for (const f of fs.readdirSync(contentBlog)) {
    if (f.endsWith('.md')) used.add(`/blog/${f.replace(/\.md$/, '')}.webp`);
  }
}

function normalizePublicPath(absFile) {
  return '/' + path.relative(publicDir, absFile).split(path.sep).join('/');
}

function isReferenced(publicPath) {
  if (used.has(publicPath)) return true;
  if (corpus.includes(publicPath) || corpus.includes(publicPath.slice(1))) return true;
  const encoded = publicPath.replace(/ /g, '%20');
  if (corpus.includes(encoded)) return true;
  return false;
}

const unused = [];
let saved = 0;

for (const f of files) {
  const rel = normalizePublicPath(f);
  if (!isReferenced(rel)) {
    const st = fs.statSync(f);
    unused.push({ rel, abs: f, size: st.size });
    saved += st.size;
  }
}

unused.sort((a, b) => b.size - a.size);

const summary = {
  totalImages: files.length,
  referencedPaths: used.size,
  unusedCount: unused.length,
  unusedMB: (saved / 1024 / 1024).toFixed(2),
  unused: unused.map((u) => ({ rel: u.rel, sizeKB: Math.round(u.size / 1024) })),
};

const deleteMode = process.argv.includes('--delete');
if (deleteMode) {
  let deleted = 0;
  let deletedBytes = 0;
  for (const u of unused) {
    fs.unlinkSync(u.abs);
    deleted++;
    deletedBytes += u.size;
  }
  // Remove empty directories under public/images
  function pruneEmpty(dir) {
    if (!fs.existsSync(dir)) return;
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) pruneEmpty(path.join(dir, e.name));
    }
    if (dir !== publicDir && fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir);
    }
  }
  pruneEmpty(path.join(publicDir, 'images'));
  summary.deleted = deleted;
  summary.deletedMB = (deletedBytes / 1024 / 1024).toFixed(2);
}

console.log(JSON.stringify(summary, null, 2));

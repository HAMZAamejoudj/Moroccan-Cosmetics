import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const root = process.cwd();
const publicDir = path.join(root, 'public');
const RASTER = /\.(png|jpe?g|jfif)$/i;

const SKIP_DIRS = new Set(['node_modules', '.next', '.git']);

/** @type {Map<string, string>} web path -> web path */
const replacements = new Map();

function walk(dir, onFile) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue;
      walk(path.join(dir, ent.name), onFile);
      continue;
    }
    onFile(path.join(dir, ent.name));
  }
}

async function convertFile(absPath) {
  if (!RASTER.test(absPath)) return;
  const rel = path.relative(publicDir, absPath).split(path.sep).join('/');
  const webFrom = `/${rel}`;
  const webTo = webFrom.replace(RASTER, '.webp');
  const outAbs = absPath.replace(RASTER, '.webp');

  await sharp(absPath)
    .webp({ quality: 86, effort: 4 })
    .toFile(outAbs);

  replacements.set(webFrom, webTo);
  console.log('webp', rel);
}

async function main() {
  const files = [];
  walk(publicDir, (f) => files.push(f));
  for (const f of files) {
    await convertFile(f);
  }

  const textRoots = [root];
  const textExts = new Set(['.ts', '.tsx', '.css', '.mjs', '.json', '.md']);
  const skipFiles = new Set(['lighthouse-private-label.json', 'package-lock.json']);

  const sorted = [...replacements.entries()].sort((a, b) => b[0].length - a[0].length);

  function patchFile(filePath) {
    if (skipFiles.has(path.basename(filePath))) return;
    if (!textExts.has(path.extname(filePath))) return;
    if (filePath.includes('node_modules')) return;

    let text = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    for (const [from, to] of sorted) {
      if (text.includes(from)) {
        text = text.split(from).join(to);
        changed = true;
      }
    }
    if (changed) {
      fs.writeFileSync(filePath, text, 'utf8');
      console.log('patched', path.relative(root, filePath));
    }
  }

  walk(root, (f) => {
    if (path.relative(root, f).startsWith('public' + path.sep)) return;
    patchFile(f);
  });

  let removed = 0;
  for (const absPath of files) {
    if (!RASTER.test(absPath)) continue;
    const webFrom = `/${path.relative(publicDir, absPath).split(path.sep).join('/')}`;
    if (replacements.has(webFrom) && fs.existsSync(absPath)) {
      fs.unlinkSync(absPath);
      removed++;
    }
  }

  console.log(`Done: ${replacements.size} converted, ${removed} originals removed.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

import { cpSync, existsSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = join(process.cwd(), 'out');
const sourceDir = join(outDir, '_next');
const targetDir = join(outDir, 'next-assets');

if (!existsSync(sourceDir)) {
  console.error('Missing out/_next folder. Run "npm run build" first.');
  process.exit(1);
}

if (existsSync(targetDir)) {
  rmSync(targetDir, { recursive: true, force: true });
}

cpSync(sourceDir, targetDir, { recursive: true });

const replacements = [
  ['/_next/', '/next-assets/'],
  ['\\/_next\\/', '/next-assets/']
];

function patchFile(filePath) {
  const ext = filePath.split('.').pop();
  if (!['html', 'js', 'css', 'txt', 'json', 'xml'].includes(ext ?? '')) {
    return;
  }

  let content = readFileSync(filePath, 'utf8');
  let updated = content;

  for (const [from, to] of replacements) {
    updated = updated.replaceAll(from, to);
  }

  if (updated !== content) {
    writeFileSync(filePath, updated, 'utf8');
  }
}

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const filePath = join(dir, entry);
    const stats = statSync(filePath);

    if (stats.isDirectory()) {
      walk(filePath);
      continue;
    }

    patchFile(filePath);
  }
}

walk(outDir);

console.log('cPanel export ready: _next copied to next-assets and paths updated.');

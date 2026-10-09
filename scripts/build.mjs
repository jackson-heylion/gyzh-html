import { copyFile, mkdir, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';
const root = new URL('../', import.meta.url);
const output = new URL('../dist/', import.meta.url);
const names = ['index.html', 'game.js', 'style.css', 'favicon.svg'];
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const name of names) {
  const source = new URL(name, root);
  const meta = await stat(source);
  if (!meta.isFile() || meta.size === 0) throw new Error('Missing/empty asset: ' + name);
  await copyFile(source, new URL(name, output));
  console.log('Copied ' + name + ' (' + meta.size + ' bytes)');
}
console.log('Build complete. Deploy the dist/ directory.');

import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const source = resolve('dist/index.html');
const destination = resolve('dist/404.html');

await copyFile(source, destination);
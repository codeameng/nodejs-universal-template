import { R } from './index.ts';
import type { StringArrayMap } from '@global/types';
import path from 'path';

const fileExtensions = {
  js: ['*.js', '*.cjs', '*.mjs'],
  jsx: ['*.jsx', '*.cjsx', '*.mjsx'],
  ts: ['*.ts', '*.cts', '*.mts'],
  tsx: ['*.tsx', '*.ctsx', '*.mtsx'],
  vue: ['*.vue'],
} satisfies StringArrayMap;

function pickExtensions(keys: Array<keyof typeof fileExtensions>): string[] {
  return R.pipe(fileExtensions, R.pick(keys), R.values(), R.flat());
}

const fileTypes = {
  react: pickExtensions(['jsx', 'tsx']),
  vue: pickExtensions(['vue']),
  specialJSONC: [
    '.vscode/**/*.json',
    '.vscode/**/*.code-snippets',
    'tsconfig.json',
    'tsconfig.*.json',
  ],
} satisfies StringArrayMap;

interface CreateGlobsOptions {
  basePath?: string;
}
export function createGlobs(
  keys: Array<keyof typeof fileTypes>,
  options: CreateGlobsOptions = {},
): string[] {
  const { basePath = '' } = options;

  return R.pipe(
    fileTypes,
    R.pick(keys),
    R.values(),
    R.flat(),
    R.map((pattern) => path.posix.join(basePath, '**', pattern)),
  );
}

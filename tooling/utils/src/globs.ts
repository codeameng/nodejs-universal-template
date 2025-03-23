import type { StringArrayMap } from './types.ts';

export const fileExtensions = {
  js: ['js', 'cjs', 'mjs'],
  jsx: ['jsx', 'cjsx', 'mjsx'],
  ts: ['ts', 'cts', 'mts'],
  tsx: ['tsx', 'ctsx', 'mtsx'],
  vue: ['vue'],
} satisfies StringArrayMap;

export function createGlobs(extensions: string[], prefix = '**/*.'): string[] {
  return extensions.map((extension) => `${prefix}${extension}`);
}

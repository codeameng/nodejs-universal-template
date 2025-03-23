import type { Options } from 'tsup';

export const baseConfig: Options = {
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  minify: true,
};

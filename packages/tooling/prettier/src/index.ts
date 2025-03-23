import type { Config } from 'prettier';
import { createGlobs } from '@tooling/utils';

export const config: Config = {
  singleQuote: true,
  quoteProps: 'consistent',
  objectWrap: 'collapse',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: true,
  overrides: [
    { files: createGlobs(['specialJSONC']), options: { parser: 'jsonc' } },
    { files: createGlobs(['react', 'vue']), options: { singleAttributePerLine: true } },
  ],
};

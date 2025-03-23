import type { Config } from 'prettier';
import { fileExtensions, createGlobs } from '@tooling/utils';

export const config: Config = {
  singleQuote: true,
  quoteProps: 'consistent',
  objectWrap: 'collapse',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: true,
  overrides: [
    {
      files: createGlobs([...fileExtensions.jsx, ...fileExtensions.tsx, ...fileExtensions.vue]),
      options: { singleAttributePerLine: true },
    },
  ],
};

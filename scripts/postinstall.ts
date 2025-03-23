import { setupPackages, setupVscode } from './utils/index.ts';

const { npm_command } = process.env;

if (npm_command === 'install') {
  await Promise.all([setupPackages(), setupVscode()]);
}

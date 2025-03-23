import { execa } from 'execa';
import { getPackages } from '@manypkg/get-packages';
import path from 'path';
import editJsonFile from 'edit-json-file';

export const setupPackages = async () => {
  await execa('turbo', ['run', 'setup', '--ui=stream', '--output-logs=errors-only'], {
    stdout: 'inherit',
    env: { FORCE_COLOR: 'true' },
  });
};

export const setupVscode = async () => {
  const { rootDir } = await getPackages(import.meta.dirname);
  const settingsFile = editJsonFile(path.join(rootDir, '.vscode', 'settings.json'));

  settingsFile.set('typescript\\.enablePromptUseWorkspaceTsdk', true);
  settingsFile.set('typescript\\.tsdk', './node_modules/typescript/lib');

  settingsFile.save();
};

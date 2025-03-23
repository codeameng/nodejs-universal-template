import { PlopTypes } from '@turbo/gen';
import fs from 'fs';
import path from 'path';
import { getPackagesSync } from '@manypkg/get-packages';
import validateNpmPackageName from 'validate-npm-package-name';
import tsupPackageJson from '@tooling/tsup/package.json';

const { rootDir } = getPackagesSync(__dirname);
const packagesPath = path.join(rootDir, 'packages');
const scopes = fs
  .readdirSync(packagesPath)
  .filter((file) => fs.statSync(path.join(packagesPath, file)).isDirectory());

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator('tsup', {
    description: 'Creates a new tsup project in packages directory',
    prompts: [
      {
        type: 'list',
        name: 'scope',
        message: 'What scope should the package be created in?',
        choices: scopes.filter(
          (scope) => validateNpmPackageName(`@${scope}/name`).validForNewPackages,
        ),
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the package?',
        validate: (name: string) => {
          const { validForNewPackages, errors } = validateNpmPackageName(`@scope/${name}`);
          if (!validForNewPackages) {
            return errors?.join('\n') || 'Invalid name';
          }

          return true;
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: path.join(packagesPath, '{{ scope }}', '{{ name }}'),
        templateFiles: 'templates/tsup/**/*',
        base: 'templates/tsup',
        data: { tsupVersion: tsupPackageJson.dependencies.tsup },
      },
    ],
  });
}

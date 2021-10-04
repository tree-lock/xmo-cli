import { readFile, writeFile } from 'fs/promises';
import { cwd } from 'process';
import path from 'path';
import lg from './console.js';

/**
 * @param {string} dir路径
 * @returns { Promise<{
 *  name?: "string";
 *  version?: string;
 *  description?: string;
 *  keywords?: string[]; author?: string;
 *  main?: string;
 *  type?: string;
 *  license: string;
 *  scripts?: { [key: string]: string; prepare?: string; commit?: string; "docker:dev"?: string; "docker:build"?: string; "docker:deploy"?: string};
 *  bin?: { [key: string]: string };
 *  repository?: { [key: string]: string };
 *  dependencies: { [key: string]: string };
 *  devDependencies?: { [key: string]: string };
 *  config?: { [key: string]: { [keyInside: string]: } ; commitizen?: { [keyInside: string]:  } };
 *  "lint-staged"?: { [key: string]: { [keyInside: string]: string | string[] } };
 *  husky: any;
 * }> }
 */
export const getPackage = async (dir = cwd()) => {
  return JSON.parse(await readFile(path.join(dir, 'package.json')));
};

/**
 * 将对象写入package.json
 * @param {Object} pack
 * @param {string} dir
 */
export const writePackage = async (pack, dir = cwd()) => {
  await writeFile(
    path.join(dir, 'package.json'),
    JSON.stringify(pack, null, 2)
  );
};

/**
 * 将package.json部分对象用于修改
 * @param {Object} options
 * @param {string} dir
 */
const modPackage = async (options, dir = cwd()) => {
  const pack = await getPackage(dir);
  Object.assign(pack, options);
  await writePackage(pack, dir);
};

/**
 * @param  {...("lint-staged" | "prettier" | "eslint" | "eslint-plugin-vue" | "eslint-config-prettier" |
 * "@commitlint/cli" | "@commitlint/config-conventional" | "cz-conventional-changelog")} type
 */
export const addDevDependence = async (...type) => {
  const devDependency = {
    'lint-staged': '^11.1.2',
    prettier: '2.4.1',
    eslint: '^7.32.0',
    'eslint-plugin-vue': '^7.18.0',
    'eslint-config-prettier': '^8.3.0',
    '@commitlint/cli': '^13.1.0',
    '@commitlint/config-conventional': '^13.1.0',
    'cz-conventional-changelog': '^3.3.0',
  };
  const pack = await getPackage();

  let devDependencies = pack['devDependencies'] ?? {};

  type.forEach((value) =>
    Object.assign(devDependencies, {
      [value]: devDependency[value],
    })
  );

  Object.assign(pack, { devDependencies });
  await writePackage(pack);

  type.forEach((value) => {
    lg.createPackConfig('devDependency: ' + value);
  });
};

/**
 * @param {string} name
 * @param {string} value
 */
export const addScript = async (name, value) => {
  const pack = await getPackage();

  const scripts = pack['scripts'] ?? {};
  Object.assign(scripts, {
    [name]: value,
  });
  Object.assign(pack, { scripts });
  await writePackage(pack);
  lg.createPackConfig('scripts: ' + name);
};

/**
 * @param { string } name
 * @param { any } value
 */
export const addConfig = async (name, value) => {
  const pack = await getPackage();

  const config = pack['config'] ?? {};
  Object.assign(config, {
    [name]: value,
  });
  Object.assign(pack, { config });
  await writePackage(pack);
  lg.createPackConfig('config');
};

export default {
  get: getPackage,
  write: writePackage,
  mod: modPackage,
  add: {
    script: addScript,
    devDependency: addDevDependence,
    config: addConfig,
  },
};

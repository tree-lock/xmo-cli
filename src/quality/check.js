import fs from 'fs-extra';
import inquirer from 'inquirer';
import path from 'path';
import { getPackage } from '../utils/pkg.js';
import lg from './log.js';
import check from '../utils/check.js';

export const qualityFileList = [
  '.eslintrc.json',
  '.prettierrc.json',
  'commitlint.config.js',
  '.husky',
  'prettier.config.js',
  '.eslintrc.js',
  '.eslintrc',
];
export const qualityDevDependencies = [
  'lint-staged',
  'prettier',
  'eslint',
  'eslint-plugin-vue',
  'eslint-config-prettier',
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'cz-conventional-changelog',
  'husky',
];
export const qualityDevDependenciesMini = [
  'lint-staged',
  'prettier',
  '@commitlint/cli',
  '@commitlint/config-conventional',
  'cz-conventional-changelog',
  'husky',
];
const qualityFileListMini = [
  '.prettierrc.json',
  'commitlint.config.js',
  '.husky',
  'prettier.config.js',
];

/**
 * @param { "Typescript" | "Javascript" } language
 * @returns { Promise<boolean> } 是否可能已有配置
 */
const conflict = async (language = 'Javascript') => {
  const pack = await getPackage();
  let ans = false;
  // 检查package.json中是否包含会起冲突的依赖
  if (pack.devDependencies) {
    for (const item of language === 'Javascript'
      ? qualityDevDependencies
      : qualityFileListMini) {
      if (pack.devDependencies[item]) {
        ans = true;
      }
    }
  }
  // 检查package.json中是否包含会起冲突的配置
  if (
    pack['lint-staged'] ||
    pack['husky'] | (pack['config'] && pack['config']['commitizen'])
  ) {
    ans = true;
  }

  // 检查是否存在会对JavaScript配置安装起冲突的文件
  if (
    language === 'Javascript' &&
    qualityFileList.map((value) => fs.existsSync(value)).includes(true)
  ) {
    ans = true;
  }

  // 检查是否存在会对Typescript配置安装起冲突的文件
  if (qualityFileListMini.map((value) => fs.existsSync(value)).includes(true)) {
    ans = true;
  }
  if (ans) {
    lg.warnConflict(language);
  }
  return ans;
};

const git = () => {
  if (!fs.existsSync(path.join(process.cwd(), '.git'))) {
    lg.gitInit();
    return false;
  }
  return true;
};

/**
 * @returns {boolean} 是否已经有prettier的配置文件
 */
const prettier = () => {
  return (
    !fs.existsSync(path.join(process.cwd(), '.prettierrc.json')) ||
    !fs.existsSync(path.join(process.cwd(), 'prettier.config.js'))
  );
};

/**
 * 检查是否已经存在node_modules，如果不存在，需要提示用户安装整个项目的依赖可能需要一点时间。
 */
const nodeModules = () => {
  if (!fs.existsSync('node_modules')) {
    lg.nodeModules();
  }
};

/**
 * 判断是否存在eslint配置
 * @returns {boolean} 如果存在，返回true；如果不存在，返回false
 */
const eslint = () => {
  return (
    fs.existsSync('.eslintrc.json' || fs.existsSync('.eslintrc.js')) ||
    fs.existsSync('.eslintrc')
  );
};

/**
 * @returns { Promise<boolean> }
 */
const typescript = async () => {
  return await check.typescript();
};

/**
 * @returns { Promise<"Javascript" | "Typescript"> }
 */
const language = async () => {
  const language = (await typescript()) ? 'Typescript' : 'Javascript';
  lg.language(language);
  return language;
};

/**
 * @returns { Promise<boolean> }
 */
const confirm = async () => {
  return await check.confirm('确认在当前目录创建Vue3质量管理配置 🔧');
};

const qualityList = [
  ['Full', 'prettier + husky + lint-staged + commitlint + commitizen + eslint'],
  ['Primary', 'prettier + husky + lint-staged + eslint'],
  ['Mini', 'prettier + husky + lint-staged'],
  ['Default', 'prettier + husky + lint-staged + commitlint + commitizen'],
];
const typescriptInfo =
  ' (' + lg.printWaring('Typescript项目不推荐Eslint') + ')';

/**
 * @param { "Typescript" | "Javascript" } 语言类型
 * @returns { Promise<"Full" | "Primary" | "Mini" | "Default" }> } 确认质量管理配置类型
 */
const type = async (language = 'Javascript') => {
  let choices = qualityList.map(
    (value) => lg.printOption(value[0]) + ': ' + value[1]
  );
  if (language === 'Typescript') {
    choices = [choices[3], choices[2]];
  }
  const { type } = await inquirer.prompt([
    {
      type: 'list',
      name: 'type',
      message:
        '请选择质量管理类型' +
        (language === 'Typescript' ? typescriptInfo : ''),
      choices,
    },
  ]);
  return qualityList.find(
    (value) => lg.printOption(value[0]) === type.split(': ')[0]
  )[0];
};

export default {
  conflict,
  typescript,
  git,
  prettier,
  nodeModules,
  eslint,
  confirm,
  type,
  language,
};

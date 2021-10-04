import pkg from '../utils/pkg.js';
import { default as lg } from './log.js';

/**
 * @param { "eslint" | "prettier" | "both" } type
 */
const packageLintStaged = async (type) => {
  await pkg.add.devDependency('lint-staged');
  if (type === 'prettier') {
    await packageLintStagedConfig('prettier --write --ignore-unknown');
  } else if (type === 'eslint') {
    await packageLintStagedConfig('eslint --fix');
  } else {
    await packageLintStaged('prettier');
    await packageLintStaged('eslint');
  }
};

/**
 * 添加package.json中的lint-staged配置
 * @param {string} lint
 */
const packageLintStagedConfig = async (lint) => {
  const fileList = ['src/**/*.vue', 'src/**/*.js', 'src/**/*.ts'];
  const pack = await pkg.get();
  let lintStaged = pack['lint-staged'];
  if (!lintStaged) {
    lintStaged = {};
    fileList.forEach((ele) => {
      lintStaged[ele] = [lint];
    });
    lintStaged['*.{js,ts,css,md}'] = lint;
  } else {
    fileList.forEach((ele) => {
      if (lintStaged[ele]) {
        if (typeof lintStaged[ele] === 'string') {
          lintStaged[ele] = [lintStaged[ele]];
        }
        if (!lintStaged[ele].includes(lint)) {
          lintStaged[ele] = [lint, ...lintStaged[ele]];
          lg.createPackConfig('lint-staged: ' + ele + ':' + lint);
        }
      } else {
        lintStaged[ele] = [lint];
      }
    });
  }

  Object.assign(pack, { 'lint-staged': lintStaged });
  await pkg.write(pack);
};

const packagePrettier = async () => {
  await pkg.add.devDependency('prettier');
};

const packageHusky = async () => {
  const pack = await pkg.get();
  if (!pack.scripts.test) {
    await pkg.add.script('test', `echo "no specific test"`);
  }
};

const packageEslint = async () => {
  await pkg.add.devDependency(
    'eslint',
    'eslint-plugin-vue',
    'eslint-config-prettier'
  );
  await pkg.add.script(
    'lint:eslint',
    'eslint --cache --max-warnings 0  "{src}/**/*.{vue,js,ts,jsx,tsx}" --fix'
  );
};

const packageCommitlint = async () => {
  await pkg.add.devDependency(
    '@commitlint/cli',
    '@commitlint/config-conventional',
    'cz-conventional-changelog'
  );

  await pkg.add.config('commitizen', {
    path: 'node_modules/cz-conventional-changelog',
  });
  await pkg.add.script('commit', 'git add . && cz');
};

export default {
  lintStaged: packageLintStaged,
  prettier: packagePrettier,
  husky: packageHusky,
  eslint: packageEslint,
  commitlint: packageCommitlint,
};

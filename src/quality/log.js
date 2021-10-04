import { default as lg } from '../utils/console.js';

/**
 * @param { "Typescript" | "Javascript" } language
 */
const checkWarnConflict = (language = 'Javascript') => {
  console.log(
    lg.printWaring(
      '   [Warning]: xmo init -q 适用于初始化质量管理，如果项目中已有质量管理配置  '
    )
  );
  console.log(
    lg.printWaring(
      language === 'Javascript'
        ? '   [Warning]: ESLint，Prettier，husky，commitlint                           '
        : '   [Warning]: Prettier，husky，commitlint                                   '
    )
  );
  console.log(
    lg.printWaring(
      '   [Warning]: 则有可能引起冲突。                                            '
    )
  );
  console.log(
    lg.printWaring(
      '   [Warning]: 建议 xmo init -q -f 强制重新初始化质量管理配置                '
    )
  );
};

const checkCommitlintRecommend = () => {
  console.log(
    `你应当用 ${lg.printCommand('yarn commit')} 代替 ${lg.printCommand(
      'git add 和 git commit'
    )} 命令进行 git 提交`
  );
};

const checkGitInit = () => {
  console.log(lg.printError(' 请先对项目git初始化。'));
};

/**
 * @param { ...("prettier" | "eslint") } type 是否有eslint
 */
const checkRecommendWords = (...type) => {
  const strArr = [];
  if (type.includes('prettier')) {
    strArr.push('yarn prettier --write .');
  }
  if (type.includes('eslint')) {
    strArr.push('yarn lint:eslint');
  }
  console.log(' 推荐使用以下指令先对已有文件进行格式化');
  strArr.forEach((ele) => {
    console.log(`🚀  ${lg.printCommand(ele)}`);
  });
};

const checkNodeModules = () => {
  console.log(
    lg.printTip(
      '📦 由于项目没有安装本地依赖，因此会消耗一定时间安装所有本地依赖。'
    )
  );
  console.log(lg.printTip('如果遇到卡顿，说明yarn遇到网络问题'));
};

/** @param { "Typescript" | "Javascript" } language */
const checkLanguage = (language) => {
  console.log('   ' + lg.printTip(language + '项目'));
};

const checkHuskyInit = () => {
  lg.createInit('husky配置');
  lg.createDir('.husky');
  lg.createConfig('.husky/pre-commit lint-staged');
};

export default {
  warnConflict: checkWarnConflict,
  commitlintRecommend: checkCommitlintRecommend,
  gitInit: checkGitInit,
  recommendWords: checkRecommendWords,
  nodeModules: checkNodeModules,
  huskyInit: checkHuskyInit,
  language: checkLanguage,
  ...lg,
};

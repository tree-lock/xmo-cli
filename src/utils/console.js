/**
 * 该文件用于规范化console.log的输出
 */

import chalk from 'chalk';
import { isDir } from './utils.js';

/**
 * 输出文件夹，亮蓝色字体
 * @param {string} str
 * @returns {string}
 */
export const printDir = (str) => {
  return chalk.blueBright(str);
};

/**
 * 输出文件名，亮绿色字体
 * @param {string} str
 * @returns {string}
 */
export const printFile = (str) => {
  return chalk.greenBright(str);
};

/**
 * 输出命令，亮黄色字体
 * @param {string} str
 * @returns {string}
 */
export const printCommand = (str) => {
  return chalk.yellowBright(str);
};

/**
 * 输出选项，亮黄色字体
 * @param {string} str
 * @returns {string}
 */
export const printOption = (str) => {
  return chalk.greenBright(str);
};

/**
 * 输出配置项，黄色字体
 * @param {string} str
 * @returns {string}
 */
export const printConfig = (str) => {
  return chalk.yellow(str);
};

/**
 * 输出警告黄色背景加粗字体
 * @param {string} str
 * @returns {string}
 */
export const printWaring = (str) => {
  return chalk.bgYellow(chalk.bold(str));
};

/**
 * 输出错误，红色字体
 * @param {string} str
 * @returns {string}
 */
export const printError = (str) => {
  return chalk.red(str);
};

/**
 * 输出提示，加粗字体
 * @param {string} str
 * @returns {string}
 */
export const printTip = (str) => {
  return chalk.bold(str);
};

/**
 * 输出完成子任务提示，绿色字体
 * @param {string} str
 * @returns {string}
 */
export const printSuccess = (str) => {
  return chalk.green(str);
};

/**
 * 输出加载子任务提示，黄色字体
 * @param {string} str
 * @returns {string}
 */
export const printLoading = (str) => {
  return chalk.yellow(str);
};

/** @param {...string} name */
export const logCreateFile = (...name) => {
  name.forEach((item) => {
    console.log('➕ 创建文件 ' + printFile(item));
  });
};

/** @param {...string} name */
export const logCreateDir = (...name) => {
  name.forEach((item) => {
    console.log('➕ 创建文件夹 ' + printDir(item));
  });
};

/** @param {...string} name */
export const logCreateConfig = (...name) => {
  name.forEach((item) => {
    console.log('➕ 修改配置 ' + printConfig(item));
  });
};

/** @param {...string} name */
export const logCreatePackConfig = (...name) => {
  name.forEach((item) => {
    console.log('➕ 修改package.json配置 ' + printConfig(item));
  });
};

/** @param {...string} name */
export const logCreateInit = (...name) => {
  name.forEach((item) => {
    console.log('🔧 初始化 ' + item);
  });
};

/** @param {...string} name */
export const logDeletePackConfig = (...name) => {
  name.forEach((item) => {
    console.log('➖ 删除package.json配置 ' + printConfig(item));
  });
};

/** @param {...string} name */
export const logDeleteFile = (...name) => {
  name.forEach((item) => {
    if (isDir(item)) {
      logDeleteDir(item);
    } else {
      console.log('➖ 删除文件 ' + printFile(item));
    }
  });
};

/** @param {...string} name */
export const logDeleteDir = (...name) => {
  name.forEach((item) => {
    console.log('➖ 删除文件夹 ' + printDir(item));
  });
};

/** @param {...string} name */
export const logDeleteConfig = (...name) => {
  name.forEach((item) => {
    console.log('➖ 删除配置 ' + printConfig(item));
  });
};

/**
 * 提交Bug
 */
export const bugSubmitWarning = () => {
  console.log(
    `💬 你似乎遇到了问题，如果你认为该问题是程序Bug，或者错误提示不够详细，请到下面两个地址提交ISSUE`
  );
  console.log(
    `   ${printOption('Gitee')}: ${printTip('https://gitee.com/dXmo/xmo-cli')}`
  );
  console.log(
    `   ${printOption('Github')}: ${printTip(
      'https://github.com/darkXmo/xmo-cli'
    )}`
  );
};

export const logCreate = () => {
  console.log(printTip('Xmo-cli start creating project'));
};

export default {
  createConfig: logCreateConfig,
  createPackConfig: logCreatePackConfig,
  createFile: logCreateFile,
  createInit: logCreateInit,
  createDir: logCreateDir,
  deletePackConfig: logDeletePackConfig,
  deleteFile: logDeleteFile,
  deleteDir: logDeleteDir,
  deleteConfig: logDeleteConfig,
  printWaring,
  printOption,
  printSuccess,
  printTip,
  printLoading,
  printFile,
  printError,
  printDir,
  printConfig,
  printCommand,
  bugSubmitWarning,
  create: logCreate,
};

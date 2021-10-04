import { existsSync } from 'fs';
import { readdir } from 'fs/promises';
import { getPackage } from './pkg.js';
import fs from 'fs-extra';
import lg from './console.js';

/**
 * @param {string} dir
 * @returns {Promise<boolean>} dir目录是否为空
 */
export const checkDir = async (dir) => {
  lg.create();
  if (dir) {
    console.log(`📦 将在${lg.printDir(dir)}文件夹下创建项目。`);
    if (existsSync(dir) && !(await isDirEmpty(dir))) {
      console.log(`${lg.printDir(dir)}${lg.printError('目录不为空。')}`);
      throw new Error('DIR');
    }
  }
};

export async function isDirEmpty(dirname) {
  const files = await readdir(dirname);
  return files.length === 0;
}

/**
 * 检测当前目录项目是否是Typescript
 * @returns { Promise<boolean> }
 */
export const isTypescript = async () => {
  const pkg = await getPackage();
  if (
    existsSync('tsconfig.json') ||
    JSON.stringify(pkg.devDependencies).includes('typescript')
  ) {
    return true;
  }
  return false;
};

/**
 * 判断路径文件是否是文件夹
 * @param {string} str
 */
export const isDir = (str) => {
  if (!fs.existsSync('str')) {
    return false;
  }
  const st = fs.statSync(str);
  return st.isDirectory();
};

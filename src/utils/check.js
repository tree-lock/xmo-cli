import { getPackage } from './pkg.js';
import fs from 'fs-extra';
import inquirer from 'inquirer';

/**
 * 检测当前目录项目是否存在Typescript配置
 * @returns { Promise<boolean> }
 */
const typescriptConfig = async () => {
  const pkg = await getPackage();
  // 检查是否存在tsconfig和项目依赖里是否有typescript
  if (
    fs.existsSync('tsconfig.json') ||
    (pkg.devDependencies &&
      JSON.stringify(pkg.devDependencies).includes('typescript'))
  ) {
    return true;
  }
  return false;
};

/**
 * 确认是否是Typescript项目
 * @returns { Promise<boolean> }
 */
const typescript = async () => {
  if (await typescriptConfig()) {
    const { language } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'language',
        message: '检测到Typescript配置，该项目是否是Typescript项目',
        default: true,
      },
    ]);
    return language;
  }
};

/**
 * 确认执行操作
 * @param {string} message
 * @returns { Promise<boolean> }
 */
const confirm = async (message = '确认执行操作') => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message,
    },
  ]);
  return confirm;
};

/**
 * @param {string } dir 目录名称，作为初始名称
 * @returns { Promise<string> }
 */
const checkProjectName = async (dir) => {
  if (dir) {
    if (dir.startsWith('.')) {
      dir = dir.substring(1, dir.length);
    }
    if (dir.startsWith('/')) {
      dir = dir.substring(1, dir.length);
    }
  }
  const { name } = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      default: dir,
      validate(input) {
        if (!input) {
          return '请输入项目名称!';
        }
        return true;
      },
    },
  ]);
  return name;
};

export default {
  typescript,
  confirm,
  projectName: checkProjectName,
};

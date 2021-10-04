import inquirer from 'inquirer';
import { openGitDir } from '../config.js';
import { printOption } from '../utils/console.js';

/**
 * @returns { Promise<string> }
 */
export const projectAsk = async () => {
  const { project } = await inquirer.prompt([
    {
      type: 'list',
      name: 'project',
      message:
        '请选择开源项目，具体可参考 <https://github.com/vitejs/awesome-vite#templates> ',
      choices: openGitDir.map(
        (value) => printOption(value[0]) + ': ' + value[2]
      ),
    },
  ]);
  return openGitDir.find(
    (value) => printOption(value[0]) === project.split(': ')[0]
  )[0];
};

/**
 * @returns { Promise<false | "fastGit" | "cnpmjs"> }
 */
export const mirrorAsk = async () => {
  const { ifMirror } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ifMirror',
      message: '是否使用镜像下载',
      default: false,
    },
  ]);
  if (ifMirror) {
    const { mirror } = await inquirer.prompt([
      {
        type: 'list',
        name: 'mirror',
        message: '请选择镜像',
        choices: ['fastGit', 'cnpmjs'],
      },
    ]);
    return mirror;
  } else {
    return false;
  }
};

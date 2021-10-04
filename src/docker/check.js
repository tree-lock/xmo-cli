import inquirer from 'inquirer';
import fs from 'fs';
import lg from './log.js';
import pkg from '../utils/pkg.js';

const checkDocker = async () => {
  const pack = await pkg.get();
  if (pack.scripts) {
    if (pack.scripts['docker:deploy'] || fs.existsSync('.docker')) {
      return true;
    }
  }
  return false;
};

const confirm = async () => {
  let confirm = false;
  // 目录确认
  confirm = (
    await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `确认在该目录${lg.printDir(
          process.cwd()
        )}下生成Vue3 Docker配置文件`,
      },
    ])
  ).confirm;
  if (!confirm) {
    return confirm;
  }
  // 覆盖确认
  if (await checkDocker()) {
    confirm = (
      await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirm',
          message: '已有Docker配置，确认覆盖',
        },
      ])
    ).confirm;
  }
  return confirm;
};

/** @returns {'Gitee' | 'Github'} */
const checkGit = async () => {
  return (
    await inquirer.prompt([
      {
        type: 'list',
        name: 'git',
        message: '请选择配置模板下载来源',
        choices: ['Gitee', 'Github'],
      },
    ])
  ).git;
};

export default {
  docker: checkDocker,
  git: checkGit,
  confirm: confirm,
};

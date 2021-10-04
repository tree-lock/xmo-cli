import inquirer from 'inquirer';
import check from '../utils/check.js';
/**
 * @param {string} dir 目录
 * @param {boolean} yes 是否采用默认值
 * @returns { Promise<{
 *   name: string;
 *   description: string;
 *   language: "Javascript" | "Typescript";
 *   type: "primary" | "mini";
 *   git: "Gitee" | "Github";
 * }> }
 */
const checkInfo = async (dir, yes = false) => {
  const name = await check.projectName(dir);
  if (yes) {
    return {
      name,
      description: '',
      language: 'Typescript',
      type: 'primary',
      git: 'Gitee',
    };
  }
  const { description, language, type, git } = await inquirer.prompt([
    {
      type: 'input',
      name: 'description',
      message: '请输入项目描述',
    },
    {
      type: 'list',
      name: 'language',
      message: '请选择开发语言',
      choices: ['Typescript', 'Javascript'],
    },
    {
      type: 'list',
      name: 'type',
      message: '请选择项目类型',
      choices: ['primary', 'mini'],
    },
    {
      type: 'list',
      name: 'git',
      message: '你想从哪个仓库拉取代码（境内推荐Gitee，境外推荐Github）',
      choices: ['Gitee', 'Github'],
    },
  ]);
  return {
    name,
    description,
    language,
    type,
    git,
  };
};

export default {
  info: checkInfo,
};

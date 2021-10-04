import ora from 'ora';
import { bugSubmitWarning } from './console.js';
import { printLoading, printSuccess, printTip } from './console.js';
import { clone as gitClone } from 'git-repo-clone';

const giteeRemote = 'https://gitee.com/dXmo/xmo-cli.git';
const githubRemote = 'https://github.com/darkXmo/xmo-cli.git';
const fastGitRemote = 'https://hub.fastgit.org/';
const cnpmGitRemote = 'https://github.com.cnpmjs.org/';
const githubRaw = 'https://github.com/';

/**
 * clone xmo-cli 仓库
 * @param {string} repo 仓库
 * @param {string | undefined} branch 分支
 * @param {string} dir 本地地址
 */
const clone = async function (repo, branch, dir) {
  const oraProcess = ora(`开始下载 ${printTip(repo)} `);
  oraProcess.start();
  oraProcess.color = 'yellow';
  oraProcess.text = `正在下载..... ${printLoading(repo)} `;

  try {
    await gitClone(repo, branch, dir, true);
    oraProcess.color = 'green';
    oraProcess.text = `下载成功 ${printSuccess(repo)} `;
    oraProcess.succeed();
    return true;
  } catch (error) {
    console.log(error);
    oraProcess.color = 'red';
    oraProcess.text = '下载失败';
    oraProcess.fail();
    bugSubmitWarning();
    return false;
  }
};

/**
 * @param {'primary' | 'mini' | 'template'} branch
 * @param {'Github' | 'Gitee'} type
 */
const xmoClone = async (branch, type, dir) => {
  if (type === 'Github') {
    await clone(githubRemote, branch, dir);
  } else {
    await clone(giteeRemote, branch, dir);
  }
};

/**
 * clone开源代码
 * @param {string} repo
 * @param {string} dir
 * @param {undefined | 'fastGit' | 'cnpmjs'} mirror
 */
const openSourceClone = async (repo, dir, mirror) => {
  repo = githubRaw + repo;
  if (mirror) {
    if (mirror === 'cnpmjs') {
      repo = repo.replace('https://github.com/', cnpmGitRemote);
    } else {
      repo = repo.replace('https://github.com/', fastGitRemote);
    }
  }
  await clone(repo + '.git', undefined, dir);
};

export default {
  xmoClone,
  openSourceClone,
};

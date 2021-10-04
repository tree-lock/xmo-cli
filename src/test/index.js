import { execSync } from 'child_process';
import myExec from '../utils/exec.js';
import { clone } from 'git-repo-clone';

const doTest = async (param) => {
  execSync(`echo "xmo-cli test"`, { stdio: [0, 1, 2] });
  if (param === 'read') {
    await doTestReadline();
  } else if (param === 'exec') {
    await doTestExec();
  } else if (param === 'git') {
    await doTestGit();
  }
};

export const doTestReadline = async () => {
  await myExec('npx', ['husky-init']);
  await myExec(`npx`, [
    'husky',
    'add',
    '.husky/commit-msg',
    `npx --no-install commitlint --edit "$1"`,
  ]);
};

export const doTestExec = async () => {
  await myExec.xmocli(['init']);
};

export const doTestGit = async () => {
  await clone(
    'https://github.com/darkXmo/xmo-cli.git',
    'primary',
    'test',
    true
  );
};

export default doTest;

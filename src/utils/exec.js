import { spawn } from 'child_process';

export const yarn = async () => {
  await packagedExec('yarn');
};

export const huskyInit = async () => {
  await packagedExec('npx', ['husky-init']);
};

export const huskyAddCommitlint = async () => {
  await packagedExec(`npx`, [
    'husky',
    'add',
    '.husky/commit-msg',
    `npx --no-install commitlint --edit "$1"`,
  ]);
};

export const huskyAddLintStaged = async () => {
  await packagedExec(`npx`, [
    'husky',
    'add',
    '.husky/pre-commit',
    `npx lint-staged`,
  ]);
};

/**
 * @param {string[]} params
 */
export const execXmocli = async (params) => {
  await packagedExec(`xmo-cli`, params);
};

const execOutput = {
  yarn,
  huskyInit,
  huskyAddCommitlint,
  huskyAddLintStaged,
  xmocli: execXmocli,
};

export default execOutput;
export const execCommand = execOutput;

/**
 * @param {string} command
 * @param {string[]} params
 */
export const packagedExec = async (command, params) => {
  try {
    await new Promise(function initCommand(resolve, reject) {
      const e = spawn(command, params, {
        stdio: 'inherit',
        cwd: process.cwd(),
      });
      e.on('close', () => {
        resolve();
      });
      e.on('error', (data) => {
        reject(data);
      });
    });
  } catch (err) {
    console.log('Error', err);
  }
};

/**
 * 可对内容进行操作的exec
 * @param {(data: string) => void} func
 */
export const packagedExecCheck = async (func) => {
  try {
    await new Promise(function initCommand(resolve, reject) {
      const e = spawn('yarn', {
        stdio: 'pipe',
        cwd: process.cwd(),
      });
      e.stdout.on('data', function (/** @type {Buffer} */ data) {
        func(data.toString());
      });
      e.on('close', (code) => {
        resolve(code);
      });
      e.stderr.on('data', (/** @type {Buffer} */ err_data) => {
        reject(err_data);
      });
    });
  } catch (err) {
    console.log('Error', err);
  }
};

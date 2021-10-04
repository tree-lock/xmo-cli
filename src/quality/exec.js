import myExec from '../utils/exec.js';
import lg from './log.js';

const husky = async () => {
  await myExec.huskyInit();
  await myExec.yarn();
  await myExec.huskyAddLintStaged();
  lg.huskyInit();
};

const huskyCommitlint = async () => {
  await myExec.huskyAddCommitlint();
};

export default {
  husky,
  huskyCommitlint,
};

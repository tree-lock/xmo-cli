import check from "./check.js";
import pkg from "./pkg.js";
import file from "./file.js";
import exec from "./exec.js";

const prettier = async () => {
  await pkg.prettier();
  if (check.prettier()) {
    file.prettier();
  }
};

/**
 * @param { "eslint" | "prettier" | "both" } type
 */
const lintStaged = async (type) => {
  await pkg.lintStaged(type);
};

/**
 * @param  {...("commitlint")} extra
 */
const husky = async (...extra) => {
  check.nodeModules();
  await exec.husky();
  await pkg.husky();
  if (extra.includes("commitlint")) {
    await exec.huskyCommitlint();
  }
};

const eslint = async () => {
  await file.eslint();
  await pkg.eslint();
};

const commitlintConfig = async () => {
  await pkg.commitlint();
  await file.commitlint();
};

export default {
  lintStaged,
  prettier,
  husky,
  eslint,
  commitlintConfig,
};

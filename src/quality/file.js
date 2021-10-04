import fs from "fs-extra";
import path from "path";
import {
  prettierTemp,
  eslintTemp,
  eslintIgnoreTemp,
  commitlintTemp,
} from "../template.js";
import check from "./check.js";
import lg from "../utils/console.js";

const prettier = async () => {
  await fs.writeFile(
    path.join(process.cwd(), ".prettierrc.json"),
    prettierTemp
  );
};

/**
 * 创建eslint配置文件 .eslintrc.json 和 .eslintignore
 */
const eslint = async () => {
  if (!check.eslint()) {
    await fs.writeFile(path.join(process.cwd(), ".eslintrc.json"), eslintTemp);
    lg.createFile(".eslintrc.json");
  }
  if (!fs.existsSync(".eslintignore")) {
    await fs.writeFile(
      path.join(process.cwd(), ".eslintignore"),
      eslintIgnoreTemp
    );
    lg.createFile(".eslintignore");
  }
};

const commitlint = async () => {
  if (!fs.existsSync("commitlint.config.js")) {
    await fs.writeFile(
      path.join(process.cwd(), "commitlint.config.js"),
      commitlintTemp
    );
    lg.createFile("commitlint.config.js");
  }
};

export default {
  prettier,
  eslint,
  commitlint,
};

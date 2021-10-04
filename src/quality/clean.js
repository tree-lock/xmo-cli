/**
 * 用于删除配置，项目内容等
 */

/**
 * 删除所有质量管理配置
 * 包括 Prettier husky Eslint Prettier Commitlint Commitizen
 */
import fs from 'fs-extra';
import inquirer from 'inquirer';
import lg from '../utils/console.js';
import { getPackage, writePackage } from '../utils/pkg.js';
import { qualityFileList, qualityDevDependencies } from './check.js';

/**
 * @returns { Promise<boolean> }
 */
const confirm = async () => {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message: '确认删除所有本地配置',
    },
  ]);
  return confirm;
};

export const cleanQuality = async () => {
  const isConfirm = await confirm();
  if (isConfirm) {
    // 删除配置文件
    for (const file of qualityFileList) {
      if (fs.existsSync(file)) {
        await fs.remove(file);
        lg.deleteFile(file);
      }
    }

    const pack = await getPackage();
    for (const devDependency of qualityDevDependencies) {
      if (pack.devDependencies[devDependency]) {
        delete pack.devDependencies[devDependency];
        lg.deletePackConfig('devDependency: ' + devDependency);
      }
    }
    if (pack.config && pack.config.commitizen) {
      delete pack.config.commitizen;
      lg.deletePackConfig('package.commitizen');
    }
    if (pack['lint-staged']) {
      delete pack['lint-staged'];
      lg.deletePackConfig('package.lint-staged');
    }
    if (pack.scripts) {
      if (pack.scripts.prepare) {
        delete pack.scripts.prepare;
        lg.deletePackConfig('package.scripts.prepare');
      }
      if (pack.scripts.commit) {
        delete pack.scripts.commit;
        lg.deletePackConfig('package.scripts.commit');
      }
    }
    if (pack.husky) {
      delete pack.husky;
      lg.deletePackConfig('package.husky');
    }
    await writePackage(pack);
  }
  return isConfirm;
};

export default {
  quality: cleanQuality,
};

/**
 * 本文件用于拉取其它热门Vue3开源项目
 */
import clone from '../utils/clone.js';
import { openGitDir } from '../config.js';
import { mirrorAsk, projectAsk } from './check.js';
import { checkDir } from '../utils/utils.js';
import { bugSubmitWarning } from '../utils/console.js';
import lg from '../utils/console.js';
import pkg from '../utils/pkg.js';

class Creator {
  constructor() {}

  /**
   * @param { string } dir
   */
  initSuccess(dir) {
    console.log('(๑•̀ㅂ•́)و✧  ' + lg.printSuccess('Success!'));
    console.log(lg.printCommand('   cd ' + dir));
    console.log('📄 查看 README.md 文档，了解项目更多信息');
  }

  /**
   * @param {string} dir
   */
  async init(dir) {
    try {
      await checkDir(dir);
      const projectName = await projectAsk();
      let gitUrl = openGitDir.find((value) => value[0] === projectName)[1];
      dir = dir.length > 0 ? dir : projectName;
      const mirror = await mirrorAsk();
      if (mirror) {
        await clone.openSourceClone(gitUrl, dir, mirror);
      } else {
        await clone.openSourceClone(gitUrl, dir);
      }
      this.initSuccess(dir);
    } catch (error) {
      bugSubmitWarning();
      console.log(lg.printError(error));
    }
  }

  /**
   * @param {string} dir
   */
  async write(dir) {
    const pack = await pkg.get(dir);
    Object.assign(pack, this.options);
    await pkg.write(pack, dir);
  }
}

export default Creator;

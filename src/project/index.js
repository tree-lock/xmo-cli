import clone from '../utils/clone.js';
import { checkDir } from '../utils/utils.js';
import lg from './log.js';
import pack from '../utils/pkg.js';
import check from './check.js';

class ProjectCreator {
  constructor() {
    this.options = {
      name: '',
      description: '',
    };
  }

  /**
   * @param {string} dir
   * @param {boolean} yes
   */
  async init(dir, yes) {
    try {
      await checkDir(dir);
      // 拉取Xmo-Cli项目
      const { name, description, language, type, git } = await check.info(
        dir,
        yes
      );
      this.options.name = name;
      this.options.description = description;
      if (!dir) {
        dir = name;
        await checkDir(dir);
      }
      await clone.xmoClone(
        language === 'Typescript' ? 'ts/' + type : type,
        git,
        dir
      );
      await pack.mod(this.options, dir);
      lg.initSuccess(type, dir);
    } catch (error) {
      lg.bugSubmitWarning();
      console.log(lg.printError(error));
    }
  }
}

export default ProjectCreator;

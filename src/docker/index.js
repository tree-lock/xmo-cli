import lg from './log.js';
import init from './init.js';
import check from './check.js';

export class DockerCreator {
  constructor() {}
  /**
   * @param {boolean} force
   */
  async init(force = false) {
    try {
      if (!force && !(await check.confirm())) {
        return;
      }
      const git = await check.git();
      await init.dockerFile(git);
      lg.initDockerFile();
      await init.dockerScript();
      lg.success();
    } catch (err) {
      lg.bugSubmitWarning();
      console.log(err);
    }
  }
}

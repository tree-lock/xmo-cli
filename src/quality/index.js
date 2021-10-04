import ora from 'ora';
import { bugSubmitWarning } from '../utils/console.js';
import check from './check.js';
import init from './init.js';
import lg from './log.js';
import clean from './clean.js';

export class QualityCreator {
  constructor() {
    /** @type { "Javascript" | "Typescript" }  */
    this.language = 'Javascript';
    /** @type { "Default" | "Primary" | "Mini" | "Full" }  */
    this.type = 'Default';
  }

  /**
   * @param { boolean } force 是否强制覆盖配置
   * @returns { boolean } 是否执行init行为
   */
  async init(force = false) {
    try {
      if (!check.git()) {
        return false;
      }
      if (force) {
        // 如果选择强制覆盖，覆盖又未正常执行，视为拒绝执行
        if (!(await clean.quality())) {
          return false;
        }
      }
      this.language = await check.language();
      if (await this.qualityInit()) {
        await this.start();
      }
      return true;
    } catch (err) {
      console.log(err);
      bugSubmitWarning();
      return false;
    }
  }

  /**
   * 在启动前进行确认和分支选择
   * @returns { Promise<boolean> } 是否成功启动
   */
  async qualityInit() {
    await check.conflict(this.language);
    if (await check.confirm()) {
      return (this.type = await check.type(this.language));
    } else {
      return false;
    }
  }

  async start() {
    const process = ora();
    process.start();
    process.color = 'yellow';
    console.log('\n');
    try {
      if (this.type === 'Mini') {
        await this.initMiniQuality();
      } else if (this.type === 'Primary') {
        await this.initPrimaryQuality();
      } else if (this.type === 'Full') {
        await this.initFullQuality();
      } else if (this.type === 'Default') {
        await this.initDefaultQuality();
      }
      processOver(process);
    } catch (err) {
      processFail(process);
      throw err;
    }
  }

  /** Mini配置，无Eslint配置  */
  async initMiniQuality() {
    await init.prettier();
    await init.lintStaged('prettier');
    console.log('');
    await init.husky();
    lg.recommendWords('prettier');
  }

  /** Default配置，无Eslint */
  async initDefaultQuality() {
    await init.prettier();
    await init.lintStaged('prettier');
    await init.commitlintConfig();
    console.log('');
    await init.husky('commitlint');
    lg.recommendWords('prettier');
    lg.commitlintRecommend();
  }

  /** Primary配置，有Eslint配置  */
  async initPrimaryQuality() {
    await init.prettier();
    await init.lintStaged('both');
    await init.eslint();
    console.log('');
    await init.husky();
    lg.recommendWords('prettier', 'eslint');
  }

  /** Full配置，有Eslint配置  */
  async initFullQuality() {
    await init.prettier();
    await init.lintStaged('both');
    await init.eslint();
    await init.commitlintConfig();
    console.log('');
    await init.husky('commitlint');
    lg.recommendWords('prettier', 'eslint');
    lg.commitlintRecommend();
  }
}

/** @param {ora.Ora} process */
const processOver = (process) => {
  process.color = 'green';
  process.text = `处理完成`;
  process.succeed();
};

/** @param {ora.Ora} process */
const processFail = (process) => {
  process.color = 'red';
  process.text = '创建失败';
  process.fail();
};

export default QualityCreator;

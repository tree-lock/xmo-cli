import Creator from './project/index.js';
import { DockerCreator } from './docker/index.js';
import OpenCreator from './openSource/index.js';
import QualityCreator from './quality/index.js';
import test from './test/index.js';

export const init = async (dir, yes) => {
  const project = new Creator();
  await project.init(dir, yes);
};

export const initOpen = async (dir) => {
  const project = new OpenCreator();
  await project.init(dir);
};

/**
 * @param {boolean} force 强制覆盖
 */
export const initQuality = async (force) => {
  const project = new QualityCreator();
  await project.init(force);
};

/**
 *
 * @param {{
 *  read: boolean;
 *  exec: boolean;
 *  git: boolean;
 * }} options
 */
export const initTest = async (options) => {
  if (options.read) {
    await test('read');
  } else if (options.exec) {
    await test('exec');
  } else if (options.git) {
    await test('git');
  } else {
    test();
  }
};

export const initDocker = async (force) => {
  const project = new DockerCreator(force);
  await project.init();
};

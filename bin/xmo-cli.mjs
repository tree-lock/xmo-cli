#!/usr/bin/env node
import { Command } from 'commander';
import {
  init,
  initDocker,
  initOpen,
  initQuality,
  // initTest,
} from '../src/init.js';

const program = new Command();

program
  .command('init [dir]')
  .alias('i')
  .option('-y, --yes', '选择默认TS-Primary方案')
  .option('-q, --quality', '一键配置项目质量管理')
  .option('-d, --docker', '一键配置Docker配置')
  .option('-f, --force', '删除原始配置')
  .description('vue3 项目初始化工具')
  .action((dir, options) => {
    if (options.quality) {
      initQuality(options.force);
    } else if (options.docker) {
      initDocker(options.force);
    } else {
      init(dir, options.yes);
    }
  });

program
  .command('create <dir>')
  .description('vue3 开源模板下载工具')
  .action((dir) => {
    initOpen(dir);
  });

program
  .version('v0.5.0')
  .option('-v, --version', '版本号')
  .description('xmo-cli版本号');

// program
//   .command('test')
//   .option('-r, --read', 'Readline Test')
//   .option('-e, --exec', 'Exec Command')
//   .option('-g, --git', 'Git clone')
//   .action((options) => initTest(options));

program.parse(process.argv);

import { default as lg } from '../utils/console.js';

/**
 * @param {"mini" | "primary"} type
 * @param { string } dir
 */
export const logInitSuccess = (type, dir) => {
  console.log(
    '(๑•̀ㅂ•́)و✧  ' + lg.printSuccess('Success!') + '运行代码，请执行以下指令'
  );
  console.log(lg.printCommand('   cd ' + dir));
  console.log(lg.printCommand('   yarn'));
  console.log(lg.printCommand('   yarn dev'));

  if (type !== 'mini') {
    console.log(
      '当你初始化了git环境(' +
        lg.printCommand('git init') +
        ')后，请执行以下命令'
    );
    console.log(lg.printCommand('   yarn prepare'));
  }
};

export default {
  initSuccess: logInitSuccess,
  ...lg,
};

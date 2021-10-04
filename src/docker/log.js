import lg from '../utils/console.js';

const logInitDockerFile = () => {
  lg.createDir('.docker');
  lg.createFile('Dockerfile');
};

const logSuccess = () => {
  console.log('✅ 创建Vue3 Docker配置成功');
  console.log(
    `(ㆆᴗㆆ) 请查看${lg.printDir('.docker')}文件夹下的${lg.printFile(
      'README.md'
    )}以了解如何使用Docker一键部署`
  );
  console.log(
    '请先确定系统Docker已安装启动，若未启动，Linux用户请参照以下命令' +
      '[你可能需要添加sudo参数]'
  );
  console.log(
    '🚀  Docker无环境部署: ' +
      lg.printCommand('yarn docker:deploy') +
      lg.printTip(' [将端口4000]')
  );
};

export default {
  initDockerFile: logInitDockerFile,
  success: logSuccess,
  ...lg,
  lg,
};

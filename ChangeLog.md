# ChangeLog

## 0.2.1

1. 添加了Github和Gitee两种git仓库的拉取方案。
2. 添加了其它开源项目作为拉取的可选项。

## 0.2.2

1. 解决了开源项目因为目录问题报错而无法下载的bug。
2. 判断如果`main`分支下载失败则采用`master`分支进行下载。

## 0.3.0

1. 添加了`Full`分支（Docker一键开发、部署）；
2. 修复了部分分支的`package.json`的`name`字段错误；
3. 将下载开源项目抽离到了 `xmo-cli create <dir>` 中；
4. 代码重构；
5. 开源项目的下载可使用Github镜像；
6. 添加版本提示`xmo-cli -v`。

## 0.4.0

1. 添加一键添加 `Vue3` 项目管理 `xmo-cli init -q` （需要先项目初始化 `git`）；
2. 添加一键重新初始化 `Vue3` 项目管理配置 `xmo-cli init -qf`。（即添加 -f 或 --force 参数）。

## 0.4.1

1. 添加图标提示，使交互更加友好；
2. 更新版本号。

## 0.5.0

1. 添加一键添加 `Vue3` `Docker` 配置 `xmo-cli init -d`；
2. 添加 `xmo-cli init -q` 对项目是否是 `Vue3` 项目的检测，并提示；
3. 优化项目结构，将所有的 `chalk` 有色命令行输出统一到 `console` 文件中；
4. 项目大范围重构！！！
5. 极大地提升了交互体验。
6. 因为已经完成了 `xmo-cli init -d` 因此删除了full分支。

## 0.6.0 （计划中）

1. 提供修改 `npm` 镜像的功能；
2. 用 `Proxy` 封装 `Package` 的 `Json Object`。
3. 项目使用 Typescript 重构。

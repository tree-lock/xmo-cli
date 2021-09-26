# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Recommended Rules

所有的组件都采用驼峰命名（TemplateComponent），组件统一首字母大写，`js` / `ts` 文件统一首字母小写。所有接口统一首字母大写。所有 `style` 文件都采用 `sass` 语言。

## 主要页面

`About`：关于 `Vue3` 的最基础的功能。

`Login`：登录页面，演示了如何进行 `Vue3` 最基础的登录。

`Home` ：自适应页面，演示了如何调用 `services` 接口，如何使用 `@media` 进行项目页面自适应，如何对导航栏进行自适应，如何调用后端接口。

`404`：404页面

## 项目依赖

`axios`、 `pinia`、 `sass`、 `vue`、 `vue-router` 

## 功能点示例

| 功能                | 文件                             |
| ------------------- | -------------------------------- |
| 页面布局            | @/layouts                        |
| 项目分层            | @/api 、 @/services              |
| Vue-Router 的使用   | @/router、@/pages                |
| Pinia 的使用        | @/store                          |
| 异步 Axios 的封装   | @/api                            |
| proxy 开发代理设置  | vite.config.ts                   |
| prettier 配置       | .prettierrc.json                 |
| public 静态目录引用 | @/components/Page/Header(avatar) |
| 404 页面            | @/pages/NotFound、@/router       |
| 两栏布局            | @/layouts/Login                  |
| 侧边布局            | @/layouts/Default                |
| 自适应布局          | @/layouts/Default                |


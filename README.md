# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## 主要页面

`About`：关于 `Vue3` 的最基础的功能。

`Login`：登录页面，演示了如何进行 `Vue3` 最基础的登录。

`Home` ：自适应页面，演示了如何调用 `services` 接口，如何使用 `@media` 进行项目页面自适应，如何对导航栏进行自适应，如何调用后端接口。

`404`：404页面。

## 项目依赖

`axios`、 `pinia`、 `sass`、 `vue`、 `vue-router` 

## 功能点示例

| 功能             | 文件     |
| ---------------- | -------- |
| 页面布局         | @/layouts |
| 项目分层 | @/api 、 @/services |
| Vue-Router 的使用 | @/router、@/pages |
| Pinia 的使用 | @/store |
| 异步 Axios 的封装 | @/api |
| proxy 开发代理设置 | vite.config.ts |
| prettier 配置 | .prettierrc.json |
| 接口 interface 使用示例 | @/api |
| public 静态目录引用 | @/components/Page/Header(avatar) |
|  404 页面 | @/pages/NotFound、@/router |
| 两栏布局 | @/layouts/Login |
| 侧边布局 | @/layouts/Default |
| 自适应布局 | @/layouts/Default |

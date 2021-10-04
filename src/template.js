export const eslintTemp = `{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:vue/vue3-recommended", "prettier"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {},
  "globals": {
    "defineProps": "readonly",
    "defineEmits": "readonly",
    "defineExpose": "readonly",
    "withDefaults": "readonly"
  }
}
`;

export const eslintIgnoreTemp = `build/*
dist/*
**/*.js
!src/**/*.js
**/*.ts
!src/**/*.ts`;

export const prettierTemp = `{}`;

export const commitlintTemp = `module.exports = { extends: ["@commitlint/config-conventional"] };`;

export const commitMsgTemp = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit ""
`;

export const preCommitTemp = `#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
`;

export const ignoreTemp = `_`;

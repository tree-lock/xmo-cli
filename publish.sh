#!/usr/bin/env bash
set -e

# echo '登录'
# npm login 
npm config ser registry https://registry.npmjs.org

echo "发布中..."
npm publish

npm config set registry https://registry.npmmirror.com

echo -e "\n发布成功\n"
exit
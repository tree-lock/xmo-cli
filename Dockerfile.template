FROM node:lts
RUN mkdir -p /app
ENV HOST 0.0.0.0
WORKDIR /app
EXPOSE 3000
RUN (yarn config set registry https://registry.npm.taobao.org) && (yarn config set sass-binary-site https://npm.taobao.org/mirrors/node-sass)
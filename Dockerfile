FROM node:lts
RUN mkdir -p /app
ENV HOST 0.0.0.0
COPY . /app
WORKDIR /app
RUN (npm config set registry https://registry.npm.taobao.org) && (npm config set sass-binary-site https://npm.taobao.org/mirrors/node-sass) && (yarn)
EXPOSE 3000
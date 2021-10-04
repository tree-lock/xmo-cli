FROM node:lts
RUN mkdir -p /app
ENV HOST 0.0.0.0
COPY . /app
WORKDIR /app
RUN (yarn config set registry https://registry.npm.taobao.org) && (yarn config set sass-binary-site https://npm.taobao.org/mirrors/node-sass) && (yarn) && (yarn build)

FROM nginx
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80

FROM node:lts
RUN mkdir -p /app
ENV HOST 0.0.0.0
COPY . /app
WORKDIR /app
RUN (yarn config set registry https://registry.npm.taobao.org) && (yarn config set sass-binary-site https://npm.taobao.org/mirrors/node-sass) && (yarn) && (yarn build)

FROM nginx
RUN mkdir /app
COPY --from=0 /app/dist /app
COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
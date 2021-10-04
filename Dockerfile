FROM node:lts
RUN mkdir -p /app
ENV HOST 0.0.0.0
WORKDIR /app
EXPOSE 3000

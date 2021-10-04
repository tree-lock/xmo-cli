#!/bin/sh

docker-compose -f .docker/docker-compose.yml build
docker-compose -f .docker/docker-compose.yml up -d --remove-orphans
docker rmi -f  `docker images | grep '<none>' | awk '{print $3}'`
docker ps && docker image ls
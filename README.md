# .docker

该文件夹管理 Docker 一键打包部署的代码。

`docker-compose.yml` ：`node` 打包并且使用 `nginx` 进行代理，并默认暴露端口 `80` 并使用主机 `80` 端口。

## 启动命令

```bash
docker-compose -f ./docker/docker-compose.yml up
```

后台启动（开发模式下不要后台启动，会看不到实时日志）

```bash
docker-compose -f ./docker/docker-compose.yml up -d
```

`nginx` 日志保存在 `logs` 文件夹中，`nginx` 启动配置保存在 `conf` 和 `conf.d` 中，如果你修改了 `api` 的代理服务器，请勿忘记在 `conf.d` 中也做相应的修改。

!!! 请记得修改conf/nginx.conf
!!! 请记得修改conf/nginx.conf
!!! 请记得修改conf/nginx.conf

如果你不需要 `nginx` 做代理，请直接在 `docker-compose.yml` 中注释掉 `nginx` 字段的所有内容。如下所示

```yml
  # nginx:
  #   image: nginx:stable
  #   container_name: nginx
  #   restart: always
  #   ports:
  #     - 80:80
  #   volumes:
  #     - ../dist:/usr/share/nginx/html
  #     - ./logs:/var/log/nginx
  #     - ./conf.d:/etc/nginx/conf.d
  #     - ./conf/nginx.conf:/etc/nginx/nginx.conf
```

## 安装 Docker

请在 <https://yeasy.gitbook.io/docker_practice/install> 了解更多。

本部分提供 `ubuntu` 的安装方案。（如果你使用的是 `Windows` 系统，强烈建议你安装 `WSL2 + Ubuntu` 并学习有关 `Linux` 的简单知识，从零到一大概会耗费你一周的时间，但会极大地提升你的开发效率和知识面，详情可查阅 <https://docs.microsoft.com/en-us/windows/wsl/install>）

```bash
sudo apt-get remove docker \
               docker-engine \
               docker.io

sudo apt-get update

sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://mirrors.aliyun.com/docker-ce/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://mirrors.aliyun.com/docker-ce/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

sudo apt-get install docker-ce docker-ce-cli containerd.io

sudo groupadd docker

sudo usermod -aG docker $USER

newgrp docker
```

## 启动 docker

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

如果你使用的是 `WSL` ，则有可能需要使用 `service` 代替 `systemctl` ，例如

```bash
sudo service docker start
```

## 安装 docker-compose

```bash
sudo curl -L https://download.fastgit.org/docker/compose/releases/download/1.29.2/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

> 此处使用了 `fastgit` 来代替 `github` ，你也可以把 `download.fastgit.org` 改回 `github.com` 。
> 顺带一提，输入命令 `git config --global url."https://github.com.cnpmjs.org/".insteadOf "https://github.com/"` 可以使用镜像来加速境内 `github` 的使用。

## 关于 Docker

如果你不存在复杂的需求，直接使用本项目的 `Docker` 配置通常不会引发任何问题，但如果你需要 `Docker` 为你做更多事，请参阅 [Docker 从入门到实践](https://yeasy.gitbook.io/docker_practice/) 以了解更多有关 `Docker` 的知识。

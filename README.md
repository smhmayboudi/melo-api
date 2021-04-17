<p align="center">
  <a href="http://melobit.com/" target="blank"><img src="https://melobit.com/logo.svg" width="120" alt="Melobit Logo" /></a>
</p>
  <p align="center"><h1>MELO-API</h1></p>
  <a href="https://gitlab.3re.ir/melobit/melo-api/-/commits/develop"><img alt="pipeline status" src="https://gitlab.3re.ir/melobit/melo-api/badges/develop/pipeline.svg" /></a>
  <a href="https://gitlab.3re.ir/melobit/melo-api/-/commits/develop"><img alt="coverage report" src="https://gitlab.3re.ir/melobit/melo-api/badges/develop/coverage.svg" /></a>
</p>

# Description

Api based on [Nest](https://github.com/nestjs/nest).

# Tooling

## dev

### base

```Shell
$ brew cask install docker
$ brew cask install visual-studio-code
$ brew install gnupg
$ brew install node@12
$ brew install yarn
$ brew install zsh-syntax-highlighting
```

### console

```Shell
$ echo 'export ZSH=/Users/{USERNAME}/.oh-my-zsh' > ~/.zshrc
$ echo 'ZSH_THEME="robbyrussell"' >> ~/.zshrc
$ echo 'plugins=(bazel docker encode64 ssh-agent yarn)' >> ~/.zshrc
$ echo 'export PATH="/usr/local/opt/node@12/bin:$PATH"' >> ~/.zshrc
$ echo 'alias k=kubectl' >> ~/.zshrc
$ echo 'complete -F __start_kubectl k' >> ~/.zshrc
$ echo 'alias d=docker' >> ~/.zshrc
$ echo 'complete -F __start_docker d' >> ~/.zshrc
$ echo 'function gi() { curl -sLw n https://www.toptal.com/developers/gitignore/api/$@ ;}' >> ~/.zshrc
$ echo 'source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> ~/.zshrc
$ echo 'source /usr/local/opt/kube-ps1/share/kube-ps1.sh' >> ~/.zshrc
$ echo 'PROMPT="$(kube_ps1)"$PROMPT' >> ~/.zshrc
$ echo 'export PATH="/usr/local/sbin:$PATH"' >> ~/.zshrc
```

### bazel

```Shell
$ brew cask install java
$ brew install bazelisk
$ brew install buildifier
$ brew install python@3.8
``` 
### devspace

```Shell
$ brew install devspace
```

### tilt.dev

```Shell
$ brew install tilt-dev/tap/tilt
```

### xcode

```Shell
$ sudo rm -rf $(xcode-select -print-path)
$ xcode-select --install
```

### yarn

```Shell
$ yarn config set version-git-sign true
$ yarn config set version-git-tag true
$ yarn config set cache-folder .yarn
$ yarn config set yarn-offline-mirror ./yarn-packages-offline-cache
$ yarn config set yarn-offline-mirror-pruning true
$ cp ~/.yarnrc .
$ rm -rf node_modules/ yarn.lock
$ yarn install --cache .yarn --prefer-offline
```

### k8s cluster create

```Shell
# 1st WAY
$ brew install kind
$ ./kind-with-registry.sh

# 2nd WAY
$ Docker for Desktop

# 3rd WAY
$ brew install ubuntu/microk8s/microk8s
$ microk8s install

# 4th WAY
$ brew cask install virtualbox
$ brew install minikube
$ minikube start

# 5th WAY
$ brew install k3d
```

### k8s cluster working

```Shell
$ brew install helm
$ brew install kube-ps1
$ brew install kubectx
$ brew install kubernetes-cli
```

### k8s cluster working with UI !?

```Shell
$ brew cask install lens
$ brew cask install kui
```

### k8s cluster

```Shell
# docker buildkit
$ echo '{"debug":true,"experimental":false,"features":{"buildkit":true}}' > ~/.docker/daemon.json

# helm add repos
$ helm repo add bitnami https://charts.bitnami.com/bitnami

# kubectl namespace melo
$ kubectl create ns melo

# kubectl context
$ kubectx kind

# kubectl namespace
$ kubens melo
```

### ssh key

```Shell
$ ssh-keygen -t ed25519 -C "{EMAIL_ADDRESS}"
$ ssh-keygen -t rsa -b 4096 -C "{EMAIL_ADDRESS}"
$ cat ~/.ssh/id_rsa.pub
```

### gpg key

```Shell
$ gpg --full-generate-key
$ gpg --list-secret-keys --keyid-format LONG {EMAIL_ADDRESS}
$ gpg --armor --export {SEC_ID}
$ git config --global commit.gpgsign true
$ git config --global gpg.program gpg
$ git config --global user.email "{EMAIL_ADDRESS}"
$ git config --global user.name "{FIRST_NAME} {LAST_NAME}"
$ git config --global user.signingkey {SEC_ID}
```

## vscode extension

```Shell
$ code --install-extension amatiasq.sort-imports
$ code --install-extension coenraads.bracket-pair-colorizer-2
$ code --install-extension dbaeumer.vscode-eslint
$ code --install-extension eamodio.gitlens
$ code --install-extension esbenp.prettier-vscode
$ code --install-extension ms-azuretools.vscode-docker
$ code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
$ code --install-extension pkief.material-icon-theme
$ code --install-extension streetsidesoftware.code-spell-checker
$ code --install-extension tyriar.sort-lines
```

## tool

```Shell
$ brew cask install beyond-compare
$ brew cask install google-chrome
$ brew cask install insomnia
$ brew cask install mongodb-compass
$ brew cask install mysqlworkbench
$ brew cask install proxifier
$ brew cask install shadowsocksx-ng
$ brew cask install skype
```

# Enviroment

- For using personal, duplicate [.env.sample](.env.sample), rename it to `.env` and fillout it.
- For using docker-compose, duplicate [.env.sample](.env.sample), rename it to `.env.docker-compose` and fillout it.

```Shell
# generate UUID
$ uuidgen

# generate public & private keys
$ ssh-keygen -t rsa -b 4096 -m PEM -f jwtKey.key
$ openssl rsa -in jwtKey.key -pubout -outform PEM -out jwtKey.key.pub
```

# Docker

## Pull

```Shell
$ docker pull bitnami/elasticsearch:7.7.1
$ docker pull bitnami/kibana:7.7.1
$ docker pull bitnami/minio:2020.6.12
$ docker pull bitnami/mongodb:4.2.8
$ docker pull bitnami/mysql:5.7.25
$ docker pull bitnami/redis:6.0.5
$ docker pull busybox
$ docker pull darthsim/imgproxy:v2.13.1
$ docker pull dgraph/dgraph:v20.03.3
$ docker pull node:12.18.3
$ docker pull node:12.18.3-alpine
$ docker pull node:12.18.3-slim
$ docker pull registry:2.7.1
```

## Develpoment

### tilt.dev

```Shell
$ tilt ...
```

### docker.compose

```Shell
# melo-api service
$ docker-compose -f docker-compose/development/docker-compose.yml up melo-api -d
$ docker-compose -f docker-compose/development/docker-compose.yml stop melo-api

# all services
$ docker-compose -f docker-compose/docker-compose.yml up
$ docker-compose -f docker-compose/docker-compose.yml stop
```

# NPM

## Installation

```Shell
$ npm install
```

## Docker

```Shell
# docker run all in deployment mode
$ npm run docker-compose

# docker build in deployment mode
$ npm run docker-compose:build

# docker run all in development mode
$ npm run docker-compose:development

# docker build in development mode
$ npm run docker-compose:development:build
```

## Format

```Shell
$ npm run format
```

## Lint

```Shell
$ npm run lint

# Fix errors
$ npm run lint -- --fix
```

## Migration

It needs to generate migration files (`migration:create`, `migration:generate`).

```Shell
$ ./node_modules/.bin/typeorm --help

$ npm run migration:revert
$ npm run migration:run
```

## Start

```Shell
# development mode
$ npm run start

# debuging mode
$ npm run start:debug

# continuous development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```Shell
# unit tests
$ npm run test

# test coverage
$ npm run test:cov

# unit debug tests
$ npm run test:debug

# e2e tests
$ npm run test:e2e

# continuous unit tests
$ npm run test:watch
```

## Version

```Shell
# changelog
$ npm run version
```

# TODOs

See the [gitlab issues](https://gitlab.3re.ir/melobit/melo-api/issues).

# License

Api is [MIT licensed](LICENSE).

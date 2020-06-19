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
```Shell
$ brew cask install docker
$ brew cask install lens
$ brew cask install virtualbox
$ brew cask install visual-studio-code
$ brew install container-structure-test
$ brew install gnupg
$ brew install helm
$ brew install kind
$ brew install kubernetes-cli
$ brew install minikube
$ brew install node@12
$ brew install skaffold
$ brew install zsh-syntax-highlighting
```

```Shell
$ echo '{"debug":true,"experimental":false,"features":{"buildkit":true}}' > ~/.docker/daemon.json
```

## vscode extension
```Shell
$ code --install-extension amatiasq.sort-imports
$ code --install-extension coenraads.bracket-pair-colorizer-2
$ code --install-extension dbaeumer.vscode-eslint
$ code --install-extension eamodio.gitlens
$ code --install-extension esbenp.prettier-vscode
$ code --install-extension lunuan.kubernetes-templates
$ code --install-extension ms-azuretools.vscode-docker
$ code --install-extension ms-kubernetes-tools.vscode-kubernetes-tools
$ code --install-extension pkief.material-icon-theme
$ code --install-extension redhat.vscode-yaml
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

* For using personal, duplicate [.env.sample](.env.sample), rename it to `.env` and fillout it.
* For using docker-compose, duplicate [.env.sample](.env.sample), rename it to `.env.docker-compose` and fillout it.

```Shell
# generate UUID
$ uuidgen

# generate publiic & private keys
$ ssh-keygen -t rsa -b 1024 -m PEM -f jwtKey.key
$ openssl rsa -in jwtKey.key -pubout -outform PEM -out jwtKey.key.pub
```

# Docker

## Pull

```Shell
# need
$ docker pull bitnami/elasticsearch:7.7.1
$ docker pull bitnami/kibana:7.7.1
$ docker pull bitnami/minio:2020.6.12
$ docker pull bitnami/mongodb:4.2.8
$ docker pull bitnami/mysql:5.7.30
$ docker pull bitnami/redis:6.0.5
$ docker pull darthsim/imgproxy:v2.13.1
$ docker pull dgraph/dgraph:v20.03.3
$ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.7.1
$ docker pull docker.elastic.co/kibana/kibana:7.7.1
$ docker pull minio/minio:RELEASE.2020-06-12T00-06-19Z
$ docker pull mongo:4.2.7
$ docker pull mysql:5.7.30
$ docker pull node:12.18.1
$ docker pull node:12.18.1-alpine
$ docker pull node:12.18.1-slim
$ docker pull redis:6.0.5

# test
$ docker plugin install docker.elastic.co/beats/elastic-logging-plugin:7.7.1
$ docker pull docker.elastic.co/apm/apm-server:7.7.1
$ docker pull docker.elastic.co/app-search/app-search:7.6.2
$ docker pull docker.elastic.co/beats/auditbeat:7.7.1
$ docker pull docker.elastic.co/beats/filebeat:7.7.1
$ docker pull docker.elastic.co/beats/heartbeat:7.7.1
$ docker pull docker.elastic.co/beats/journalbeat:7.7.1
$ docker pull docker.elastic.co/beats/metricbeat:7.7.1
$ docker pull docker.elastic.co/beats/packetbeat:7.7.1
$ docker pull docker.elastic.co/enterprise-search/enterprise-search:7.7.1
$ docker pull docker.elastic.co/logstash/logstash:7.7.1
```

## Develpoment

```Shell
# run daemon dependencies
$ docker-compose -f docker-compose.development.yml up -d minio mongo mysql redis

# stop daemon dependencies
$ docker-compose -f docker-compose.development.yml stop minio mongo mysql redis

# run api background
$ docker-compose -f docker-compose.development.yml up -d melo-api

# stop api background
$ docker-compose -f docker-compose.development.yml stop melo-api
```

## Deployment

```Shell
# run all background
$ docker-compose -f docker-compose.yml up

# stop all
$ docker-compose -f docker-compose.yml stop
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

# Description

Api based on [Nest](https://github.com/nestjs/nest).

# Tooling

## dev
```Shell
$ brew cask install docker
$ brew cask install virtualbox
$ brew cask install visual-studio-code
$ brew install helm
$ brew install kind
$ brew install kubernetes-cli
$ brew install minikube
$ brew install node@12
$ brew install skaffold
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
* For using docker, duplicate [.env.sample](.env.sample), rename it to `.env.docker` and fillout it.

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
$ docker pull darthsim/imgproxy
$ docker pull dgraph/dgraph
$ docker pull minio/minio
$ docker pull mongo
$ docker pull mysql:5.6
$ docker pull node:12.18.0
$ docker pull node:12.18.0-alpine
$ docker pull node:12.18.0-slim
$ docker pull redis

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
$ docker pull docker.elastic.co/elasticsearch/elasticsearch:7.7.1
$ docker pull docker.elastic.co/enterprise-search/enterprise-search:7.7.1
$ docker pull docker.elastic.co/kibana/kibana:7.7.1
$ docker pull docker.elastic.co/logstash/logstash:7.7.1
```

## Develpoment

```Shell
# run daemon dependencies
$ docker-compose -f docker-compose.development.yml up -d minio mongo mysql redis

# stop daemon dependencies
$ docker-compose -f docker-compose.development.yml stop minio mongo mysql redis

# run api foreground
$ docker-compose -f docker-compose.development.yml up node

# run api background
$ docker-compose -f docker-compose.development.yml up -d node

# stop api background
$ docker-compose -f docker-compose.development.yml stop node

# show api background logs
$ docker-compose -f docker-compose.development.yml logs node

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

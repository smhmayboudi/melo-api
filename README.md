# 1st Time Run

* Run MySqlWorkbench
* Connect to 127.0.0.1
* Create a new schema with 'meloapp' name
* Run the api
* Inser a key into jwkss table

```bash
# generate UUID
$ uuidgen

# generate publiic & private keys
$ ssh-keygen -t rsa -b 1024 -m PEM -f jwtKey.key
$ openssl rsa -in jwtKey.key -pubout -outform PEM -out jwtKey.key.pub
```

# Description

Api based on [Nest](https://github.com/nestjs/nest).

# Tooling

```bash
$ brew cask install beyond-compare
$ brew cask install docker
$ brew cask install google-chrome
$ brew cask install insomnia
$ brew cask install mongodb-compass
$ brew cask install mysqlworkbench
$ brew cask install postman
$ brew cask install proxifier
$ brew cask install rocket-chat
$ brew cask install shadowsocksx-ng
$ brew cask install skype
$ brew cask install visual-studio-code
$ brew install tig
```

# Enviroment

* For using personal, duplicate [.env.sample](.env.sample), rename it to `.env` and fillout it.
* For using docker, duplicate [.env.sample](.env.sample) and rename it to `.env.docker` and fillout it.

# Installation

```bash
$ npm install
```

# Docker

## Pull

```bash
# need
$ docker pull darthsim/imgproxy
$ docker pull minio/minio
$ docker pull mongo
$ docker pull mysql@5.6
# latest lts node version which support microservice well
$ docker pull node@12.16.2
# latest lts slim node version which support microservice well
$ docker pull node@12.16.2-slim
$ docker pull redis

# test
$ docker pull docker.elastic.co/apm/apm-server@7.6.0
$ docker pull docker.elastic.co/app-search/app-search@7.6.0
$ docker pull docker.elastic.co/beats/auditbeat@7.6.0
$ docker pull docker.elastic.co/beats/filebeat@7.6.0
$ docker pull docker.elastic.co/beats/heartbeat@7.6.0
$ docker pull docker.elastic.co/beats/journalbeat@7.6.0
$ docker pull docker.elastic.co/beats/metricbeat@7.6.0
$ docker pull docker.elastic.co/beats/packetbeat@7.6.0
$ docker pull docker.elastic.co/elasticsearch/elasticsearch7.6.0
$ docker pull docker.elastic.co/kibana/kibana7.6.0
$ docker pull docker.elastic.co/logstash/logstash7.6.0
```

## Develpoment

```bash
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

```bash
# run all background
$ docker-compose -f docker-compose.yml up

# stop all
$ docker-compose -f docker-compose.yml stop
```

# NPM

### Docker
```bash
# docker run all in deployment mode
$ npm run docker-compose

# docker build in deployment mode
$ npm run docker-compose:build

# docker run all in development mode
$ npm run docker-compose:development

# docker build in development mode
$ npm run docker-compose:development:build
```

### Format
```bash
$ npm run format
```

### Lint
```bash
$ npm run lint

# Fix errors
$ npm run lint -- --fix
```

### Migration
It needs to generate migration files (`migration:create`, `migration:generate`).
```bash
$ ./node_modules/.bin/typeorm --help

$ npm run migration:revert
$ npm run migration:run
```

### Start
```bash
# development mode
$ npm run start

# debuging mode
$ npm run start:debug

# continuous development mode
$ npm run start:dev

# production mode
$ npm run start:prod
```



### Test
```bash
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

### Version
```bash
# changelog
$ npm run version
```

# TODOs

See the [gitlab issues](https://gitlab.3re.ir/melobit/melo-api/issues).

# License

Api is [MIT licensed](LICENSE).

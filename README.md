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
$ brew cask install shadowsocksx-ng
$ brew cask install visual-studio-code
$ brew cask install skype
```

# Installation

```bash
$ npm install
```

# Docker

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

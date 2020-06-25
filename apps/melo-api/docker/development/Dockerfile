FROM node:12.18.1 AS melo-api.development
WORKDIR /app
COPY ./jest.config.json \
     ./nest-cli.json \
     ./package.json \
     ./tsconfig.json \
     ./yarn.lock \
     ./
RUN yarn install
COPY ./type ./type
COPY ./libs ./libs
COPY ./apps/melo-api ./apps/melo-api
ENTRYPOINT ["./node_modules/.bin/nest","start","melo-api","--watch"]

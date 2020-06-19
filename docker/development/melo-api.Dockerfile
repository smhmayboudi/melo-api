FROM node:12.18.1 AS melo-api.development
WORKDIR /app
COPY ./libs ./libs
COPY ./type ./type
COPY ./jest.config.json \
     ./nest-cli.json \
     ./package.json \
     ./tsconfig.json \
     ./
RUN npm install \
    && npm fund \
    && npm audit fix --dry-run
COPY ./apps/melo-api ./apps/melo-api
RUN ./node_modules/.bin/nest build melo-api
CMD ["./node_modules/.bin/nest","start","melo-api","--watch"]

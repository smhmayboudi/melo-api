FROM node:12.18.1 AS relation.development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
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
COPY ./apps/relation ./apps/relation
ENTRYPOINT ["./node_modules/.bin/nest","start","relation","--watch"]

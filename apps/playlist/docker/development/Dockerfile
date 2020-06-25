FROM node:12.18.1 AS playlist.development
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
COPY ./apps/playlist ./apps/playlist
ENTRYPOINT ["./node_modules/.bin/nest","start","playlist","--watch"]

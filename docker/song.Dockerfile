FROM node:12.18.1 AS build_node_modules
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
WORKDIR /build
COPY ./package.json ./
RUN npm install \
    && npm fund \
    && npm audit fix --dry-run \
    && cp -r ./node_modules ./node_modules_development
RUN npm prune --production \
    && npm fund

FROM node:12.18.1 AS build_node_app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /build
COPY --from=build_node_modules /build/node_modules_development ./node_modules
COPY ./libs ./libs
COPY ./type ./type
COPY ./jest.config.json \
     ./nest-cli.json \
     ./package.json \
     ./tsconfig.json \
     ./
COPY ./apps/song ./apps/song
RUN ./node_modules/.bin/nest build song

FROM node:12.18.1-alpine AS build_node_song
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=build_node_modules /build/node_modules ./node_modules
COPY --from=build_node_app /build/dist/apps/song/main.js ./dist/apps/song/main.js
CMD ["node","./dist/apps/song/main.js"]
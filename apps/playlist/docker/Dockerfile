FROM node:12.18.1 AS build_node_modules
ARG NODE_ENV=development
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
COPY ./package.json ./
RUN yarn install \
    && cp -r ./node_modules ./node_modules_development
RUN npm prune --production

FROM node:12.18.1 AS build_node_app
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
COPY --from=build_node_modules /app/node_modules_development ./node_modules
COPY ./jest.config.json \
     ./nest-cli.json \
     ./package.json \
     ./tsconfig.json \
     ./yarn.lock \
     ./
COPY ./type ./type
COPY ./libs ./libs

COPY ./apps/playlist ./apps/playlist
RUN ./node_modules/.bin/nest build playlist

FROM node:12.18.1-alpine AS build_node_playlist
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
WORKDIR /app
COPY --from=build_node_modules /app/node_modules ./node_modules
COPY --from=build_node_app /app/dist/apps/playlist/main.js ./dist/apps/playlist/main.js
ENTRYPOINT ["node","./dist/apps/playlist/main.js"]

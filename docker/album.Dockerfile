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
COPY ./apps/album ./apps/album
RUN ./node_modules/.bin/nest build album

FROM node:12.18.1-alpine AS build_node_album
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=build_node_modules /build/node_modules ./node_modules
COPY --from=build_node_app /build/dist/apps/album/main.js ./dist/apps/album/main.js
CMD ["node","./dist/apps/album/main.js"]
FROM node:12.18.0 AS nodebuild
ARG NODE_ENV
WORKDIR /build
COPY ./package.json ./
RUN npm install \
    && npm fund \
    && npm audit fix --dry-run \
    && cp -r ./node_modules ./node_modules_development
RUN npm prune --production \
    && npm fund

FROM node:12.18.0 AS appbuild
ARG NODE_ENV
WORKDIR /build
COPY --from=nodebuild /build/node_modules_development ./node_modules
COPY ./libs ./libs
COPY ./type ./type
COPY ./jest.config.json \
     ./nest-cli.json \
     ./package.json \
     ./tsconfig.json \
     ./
COPY ./apps/at ./apps/at
RUN ./node_modules/.bin/nest build at

FROM node:12.18.0-alpine AS at
ARG NODE_ENV
WORKDIR /app
COPY --from=nodebuild /build/node_modules ./node_modules
COPY --from=appbuild /build/dist/apps/at/main.js ./dist/apps/at/main.js
CMD ["node", "./dist/apps/at/main.js"]

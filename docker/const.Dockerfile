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
COPY ./apps/const ./apps/const
RUN ./node_modules/.bin/nest build const

FROM node:12.18.0-alpine AS const
ARG NODE_ENV
WORKDIR /app
COPY --from=nodebuild /build/node_modules ./node_modules
COPY --from=appbuild /build/dist/apps/const/main.js ./dist/apps/const/main.js
CMD ["node", "./dist/apps/const/main.js"]

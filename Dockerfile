FROM node:latest AS nodebuild
COPY ./package.json /build/
WORKDIR /build
RUN apt update \
    && apt install python make -y
ARG NODE_ENV
RUN npm install \
    && cp -r /build/node_modules /build/node_modules_withdev
RUN npm prune --production

FROM node:latest AS build
RUN apt update \
    && apt install python make -y
COPY --from=nodebuild /build/node_modules_withdev /build/node_modules
COPY . /build
ARG NODE_ENV
WORKDIR /build
RUN npm run build || exit 0

FROM node:slim AS node
WORKDIR /app
ARG NODE_ENV
COPY --from=nodebuild /build/node_modules /app/node_modules
COPY --from=build /build/package.json /app/
COPY --from=build /build/dist /app/dist
CMD ["npm", "run", "start:prod"]

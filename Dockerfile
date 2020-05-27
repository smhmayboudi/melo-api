FROM node:12.16.3 AS nodebuild
COPY ./package.json /build/
WORKDIR /build
RUN apt update && apt install -y \
    make \
    python
ARG NODE_ENV
RUN npm install \
    && cp -r /build/node_modules /build/node_modules_withdev
RUN npm prune --production

FROM node:12.16.3 AS build
RUN apt update && apt install -y \
    make \
    python
COPY --from=nodebuild /build/node_modules_withdev /build/node_modules
COPY . /build
ARG NODE_ENV
WORKDIR /build
RUN npm run build || exit 0

FROM node:12.16.3-alpine AS node
WORKDIR /app
ARG NODE_ENV
COPY --from=nodebuild /build/node_modules /app/node_modules
COPY --from=build /build/package.json /app/
COPY --from=build /build/dist /app/dist
CMD ["npm", "run", "start:prod"]

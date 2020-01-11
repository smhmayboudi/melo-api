FROM node:8-slim AS build
RUN npm install typescript -g
COPY . /build
ARG NODE_ENV
RUN cd /build &&\
  npm run build || exit 0

FROM node:8-slim AS nodebuild
COPY --from=build /build/package.json /app/
WORKDIR /app
ARG NODE_ENV
RUN npm install --production

FROM node:8-slim
COPY --from=build /build/package.json /app/
WORKDIR /app
ARG NODE_ENV
COPY --from=build /build/dist /app
COPY --from=nodebuild /app/node_modules /app/node_modules

CMD ["node", "--require", "source-map-support/register", "index.js"]

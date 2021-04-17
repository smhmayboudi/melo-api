FROM node:12.18.3 AS build_node_rt_development
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
COPY ./libs ./libs
COPY ./apps/rt ./apps/rt
ENTRYPOINT ["./node_modules/.bin/nest","start","rt","--watch"]

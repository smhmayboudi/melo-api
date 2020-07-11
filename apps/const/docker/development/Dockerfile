FROM node:12.18.2 AS build_node_const_development
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
COPY ./apps/const ./apps/const
USER nonroot:nonroot
ENTRYPOINT ["./node_modules/.bin/nest","start","const","--watch"]

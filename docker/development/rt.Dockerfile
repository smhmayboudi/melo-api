FROM node:12.18.0 AS rt.development
WORKDIR /app
COPY ./libs ./libs
COPY ./type ./type
COPY ./jest.config.json \
     ./nest-cli.json \
     ./package.json \
     ./tsconfig.json \
     ./
RUN npm install \
    && npm fund \
    && npm audit fix --dry-run
COPY ./apps/rt ./apps/rt
RUN ./node_modules/.bin/nest build rt
CMD ["node", "./dist/apps/rt/main.js"]

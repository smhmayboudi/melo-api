FROM node:12.18.0 AS album.development
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
COPY ./apps/album ./apps/album
RUN ./node_modules/.bin/nest build album
CMD ["node", "./dist/apps/album/main.js"]

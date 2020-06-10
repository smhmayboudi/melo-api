FROM node:12.18.0 AS playlist.development
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
COPY ./apps/playlist ./apps/playlist
RUN ./node_modules/.bin/nest build playlist
CMD ["node", "./dist/apps/playlist/main.js"]

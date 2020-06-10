FROM node:12.18.0 AS artist.development
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
COPY ./apps/artist ./apps/artist
RUN ./node_modules/.bin/nest build artist
CMD ["node", "./dist/apps/artist/main.js"]

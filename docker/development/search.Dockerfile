FROM node:12.18.0 AS search.development
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
COPY ./apps/search ./apps/search
RUN ./node_modules/.bin/nest build search
CMD ["node", "./dist/apps/search/main.js"]

FROM node:12.18.0 AS relation.development
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
COPY ./apps/relation ./apps/relation
RUN ./node_modules/.bin/nest build relation
CMD ["node", "./dist/apps/relation/main.js"]

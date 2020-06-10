FROM node:12.18.0 AS jwks.development
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
COPY ./apps/jwks ./apps/jwks
RUN ./node_modules/.bin/nest build jwks
CMD ["node", "./dist/apps/jwks/main.js"]

FROM node:12.18.0 AS at.development
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
COPY ./apps/at ./apps/at
RUN ./node_modules/.bin/nest build at
CMD ["node", "./dist/apps/at/main.js"]

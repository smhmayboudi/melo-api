FROM node:12.18.0 AS download.development
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
COPY ./apps/download ./apps/download
RUN ./node_modules/.bin/nest build download
CMD ["node", "./dist/apps/download/main.js"]

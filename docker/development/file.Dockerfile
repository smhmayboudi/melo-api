FROM node:12.18.0 AS file.development
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
COPY ./apps/file ./apps/file
RUN ./node_modules/.bin/nest build file
CMD ["node", "./dist/apps/file/main.js"]

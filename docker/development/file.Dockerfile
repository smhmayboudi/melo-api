FROM node:12.18.1 AS file.development
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
CMD ["./node_modules/.bin/nest","start","file","--watch"]

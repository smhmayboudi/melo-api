FROM node:12.18.0 AS emotion.development
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
COPY ./apps/emotion ./apps/emotion
RUN ./node_modules/.bin/nest build emotion
CMD ["node", "./dist/apps/emotion/main.js"]

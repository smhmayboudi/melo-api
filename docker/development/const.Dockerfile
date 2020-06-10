FROM node:12.18.0 AS const.development
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
COPY ./apps/const ./apps/const
RUN ./node_modules/.bin/nest build const
CMD ["node", "./dist/apps/const/main.js"]

FROM node:12.18.0 AS auh.development
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
COPY ./apps/auth ./apps/auth
RUN ./node_modules/.bin/nest build auth
CMD ["node", "./dist/apps/auth/main.js"]

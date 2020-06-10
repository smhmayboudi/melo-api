FROM node:12.18.0 AS action.development
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
COPY ./apps/action ./apps/action
RUN ./node_modules/.bin/nest build action
CMD ["node", "./dist/apps/action/main.js"]

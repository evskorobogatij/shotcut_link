FROM node:17.9.0 AS development

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm install glob rimraf

RUN yarn install --only=development

COPY . .

RUN yarn build

FROM node:17.9.0 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

RUN yarn build
# COPY /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
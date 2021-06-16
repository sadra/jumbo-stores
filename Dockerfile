FROM node:15-alpine

RUN mkdir /app

WORKDIR /app

COPY package* ./

RUN npm i

COPY . .

ENV NODE_ENV production

CMD npm run start:prod
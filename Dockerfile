FROM node

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY ./dist .

COPY .env ./dist

EXPOSE 4000

CMD node server.js

FROM node:21-bullseye-slim

WORKDIR /usr/src/app

COPY package*.json app.js ./

RUN npm install

EXPOSE 3000

CMD ["node", "app.js"]
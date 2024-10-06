FROM node:22-bookworm-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install -y

EXPOSE 3001

CMD [ "node", "app.js" ]
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN rm -rf node_modules && npm install

COPY source/ /app/source

CMD ["npm", "start"]

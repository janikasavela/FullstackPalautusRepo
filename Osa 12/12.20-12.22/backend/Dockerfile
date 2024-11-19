FROM node:18

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

RUN npm run tsc

EXPOSE 8080

CMD ["node", "build/index.js"]

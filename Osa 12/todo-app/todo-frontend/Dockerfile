FROM node:20 AS test-stage 

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .

RUN npm test -- --watchAll=false

FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json .
RUN npm install

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

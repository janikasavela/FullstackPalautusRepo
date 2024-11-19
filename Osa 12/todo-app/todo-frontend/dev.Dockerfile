FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

CMD ["npm", "run", "dev", "--", "--host"]

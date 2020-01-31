FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY ./ ./

RUN npm run build-client
RUN npm run build-server

EXPOSE 3000
CMD [ "npm", "start" ]

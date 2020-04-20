FROM node:13-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY app.js .
COPY src ./src
EXPOSE 8080
CMD [ "npm", "start" ]

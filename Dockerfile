FROM node:lts-alpine

WORKDIR /app/back

COPY package.json .

RUN npm install nodemon -g --silent

RUN npm install --silent

EXPOSE 8080

CMD ["npm", "run", "dev"]

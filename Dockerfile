FROM node:lts-alpine

WORKDIR /app/back

ENV PATH /app/back/node_modules/.bin:$PATH

COPY package.json /app/back

RUN npm install nodemon -g --silent

RUN npm install --silent

EXPOSE 8080

COPY . /app/back

CMD ["npm", "run", "dev"]

FROM node:latest

WORKDIR /app/back

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]

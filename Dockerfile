FROM node:latest
RUN npm install nodemon -g
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 8080
CMD npm run dev

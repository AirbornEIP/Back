FROM node:latest
RUN npm install nodemon -g
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
EXPOSE 8080
CMD npm run dev

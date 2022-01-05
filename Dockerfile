FROM node:lts-alpine

WORKDIR /app/back

ARG ARG_STAGE

ARG ARG_COMMAND

ENV STAGE $ARG_STAGE

ENV COMMAND $ARG_COMMAND

ENV PATH /app/back/node_modules/.bin:$PATH

COPY package.json /app/back

RUN tsc -p .

RUN npm install nodemon -g --silent

RUN echo $STAGE

RUN echo $ARG_STAGE

RUN npm install --silent

EXPOSE 8080

COPY . /app/back

CMD [ "sh", "-c", "NODE_ENV=$STAGE $COMMAND dist/start.ts" ]

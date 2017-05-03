FROM node:6.10.2-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN mkdir dist
RUN npm install --unsafe-perm && npm cache clean

CMD node server.js
FROM node:boron

RUN npm install -g gulp

RUN mkdir -p /usr/src/album
COPY . /usr/src/album

WORKDIR /usr/src/album/client
RUN npm install

WORKDIR /usr/src/album/server
RUN npm install

EXPOSE 9090
CMD [ "npm", "start" ]
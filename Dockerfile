FROM node:boron

RUN npm install -g gulp yarn

RUN mkdir -p /usr/src/album
COPY . /usr/src/album

WORKDIR /usr/src/album/client
RUN yarn install
RUN gulp webpack

WORKDIR /usr/src/album/server
RUN yarn install

EXPOSE 9090
CMD [ "npm", "start" ]
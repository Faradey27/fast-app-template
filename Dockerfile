FROM node:10-alpine

ENV VERSION=v11.2.0 NPM_VERSION=6 YARN_VERSION=latest

RUN mkdir -p /usr/src/fast-app-template
WORKDIR /usr/src/fast-app-template

COPY . /usr/src/fast-app-template

RUN npm run build

EXPOSE 80
EXPOSE 443

CMD [ "npm", "run", "start" ]

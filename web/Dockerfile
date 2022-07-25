FROM node:14-alpine3.15
RUN apk update && apk upgrade && apk add python3
RUN apk add --no-cache --virtual .gyp \
        make \
        curl \
        g++
RUN apk add --no-cache bash
WORKDIR /pluang-mission-incentives
RUN npm set unsafe-perm true
COPY ./web .
RUN npm install
EXPOSE 3000

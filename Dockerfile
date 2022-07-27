FROM node:16.16.0-alpine as builder

RUN apk -U upgrade \
    && apk add --no-cache \
    git \
    openssh

ENV ARTIFACTORY_ADMIN_AUTH_TOKEN=${ARTIFACTORY_ADMIN_AUTH_TOKEN}

COPY . ./app
WORKDIR /app
RUN corepack enable
RUN yarn init -2
COPY package.json ./package.json
COPY .env ./.env
RUN yarn install
RUN yarn tsc
COPY src/public ./dist/public
EXPOSE ${PORT}

CMD [ "yarn", "docker-develop" ]

FROM node:20.9 AS base
LABEL org.opencontainers.image.source="https://github.com/jppradoleal/bnex_test"

FROM base AS build
WORKDIR /app
COPY package*.json /app/
RUN npm ci
COPY . .
EXPOSE 5173
ENTRYPOINT [ "./docker-entrypoint.sh" ]

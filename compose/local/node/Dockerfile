FROM docker.io/node:20-slim

WORKDIR /app

COPY ./package.json /app

# Установка альтернативного реестра и установка зависимостей с тайм-аутом и уменьшением количества одновременных соединений
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --verbose --timeout=60000 --maxsockets=5 --legacy-peer-deps --ignore-engines

RUN npm cache clean --force

ENV PATH=./node_modules/.bin/:$PATH

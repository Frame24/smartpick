FROM node:23-bookworm-slim

WORKDIR /app

# Copy package.json, package-lock.json, and yarn.lock
COPY package.json yarn.lock ./

# Очистка кеша npm
RUN npm cache clean --force
RUN yarn cache clean

# Включение corepack и использование Yarn для установки зависимостей
RUN corepack enable
RUN yarn install --verbose

# Очистка кеша npm
RUN npm cache clean --force
RUN yarn cache clean

# Установка PATH для запуска локально установленных инструментов
ENV PATH=./node_modules/.bin/:$PATH

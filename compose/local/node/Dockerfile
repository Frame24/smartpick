FROM node:22-bookworm-slim

WORKDIR /app

# Copy package.json, package-lock.json, and yarn.lock
COPY package.json yarn.lock ./

# Очистка кеша npm
RUN npm cache clean --force

# Включение corepack и использование Yarn для установки зависимостей
RUN corepack enable
RUN yarn install --verbose

# Очистка кеша npm (опционально)
RUN npm cache clean --force

# Установка PATH для запуска локально установленных инструментов
ENV PATH=./node_modules/.bin/:$PATH

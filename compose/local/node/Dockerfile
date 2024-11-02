FROM node:22-bookworm-slim

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --verbose --timeout=60000 --maxsockets=5 --legacy-peer-deps --ignore-engines --no-audit --no-fund --network-timeout=100000

# Clean npm cache
RUN npm cache clean --force

ENV PATH=./node_modules/.bin/:$PATH

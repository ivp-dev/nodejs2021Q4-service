# Install dependencies only when needed
FROM node:alpine

WORKDIR /plugins
COPY ./plugins .

WORKDIR /app
COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./src .
COPY ./types .

# Runner image, copy all the files and run node
FROM node:alpine AS runner
WORKDIR /app
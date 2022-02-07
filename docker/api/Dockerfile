FROM node:16.13-alpine3.15 AS deps
WORKDIR /app
COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm install

# Install dependencies only when needed
FROM node:16.13-alpine3.15 AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules /node_modules
RUN npm run build

FROM node:16.13-alpine3.15 AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/tsconfig.json ./tsconfig.json

# Copy source code
COPY --from=builder /app/src ./src

COPY --from=builder /app/test ./test
COPY --from=builder /app/build ./build

EXPOSE 4000

CMD [ "npm", "run", "start:dev" ]
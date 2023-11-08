# Build BASE
FROM node:16-alpine as BUILD
LABEL author="ductnn"

WORKDIR /app
COPY package.json yarn.lock ./
COPY . .
RUN apk add --no-cache git curl \
    && yarn --frozen-lockfile \
    && yarn cache clean \
    && yarn build \
    && cd .next/standalone

# Build production
FROM node:16-alpine AS PRODUCTION
LABEL author="ductnn"

WORKDIR /app

COPY --from=BUILD /app/public ./public
COPY --from=BUILD /app/next.config.js ./

COPY --from=BUILD /app/.next/standalone ./
COPY --from=BUILD /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]

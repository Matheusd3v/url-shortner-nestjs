FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .
RUN apk add --no-cache openssl
RUN npm ci
COPY . .
RUN npm run build:docker

FROM node:22-alpine AS prod

RUN apk update && apk add --no-cache openssl dumb-init
WORKDIR /app
COPY --chown=node:node . /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --chown=node:node .env .
RUN npm ci --omit=dev && npm cache clean --force
RUN npm run prisma:generate
ENV TZ=America/Sao_Paulo
EXPOSE 3000
USER node

# CMD ["dumb-init", "node", "main"] 


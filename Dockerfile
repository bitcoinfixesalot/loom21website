FROM node:24-slim AS build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:24-slim
WORKDIR /usr/app
COPY --from=build /app/src/dist/loom21website ./
RUN npm install express

EXPOSE 80

CMD ["node", "proxy-server.mjs"]
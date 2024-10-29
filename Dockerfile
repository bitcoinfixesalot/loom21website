FROM node:18-alpine as build
WORKDIR /app/src
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:18-alpine
WORKDIR /usr/app
COPY --from=build /app/src/dist/loom21website ./
RUN npm install express

EXPOSE 80

CMD ["node", "proxy-server.mjs"]
FROM node:20.11.0

WORKDIR /app
COPY . .

RUN apt-get update 
RUN apt-get install curl gnupg -y
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get install nodejs -y
RUN node -v
RUN npm -v
#Angular build
#FROM node as nodebuilder
# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH


# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli

# add app

COPY . /usr/src/app

RUN npm run build

#End Angular build

WORKDIR /app
#COPY --from=publish /app/publish .
RUN mkdir -p /app/dist
COPY /usr/src/app/dist/. /app/dist/

RUN rm -rf node_modules

EXPOSE 4000

CMD ["node", "dist/loom21website/proxy-server.mjs"]
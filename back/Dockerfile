FROM node:10.14
WORKDIR /usr/src/app
COPY package.json package.json
RUN npm install --silent
COPY . .
EXPOSE 80
CMD [ "npm", "start" ]

#FROM httpd:latest
#COPY APP /usr/local/apache2/htdocs/
# specify the node base image with your desired version node:<version>
#FROM node:16
# replace this with your application's default port
#EXPOSE 80
FROM node:18.12-alpine

WORKDIR .

COPY package*.json ./

RUN npm install


COPY . /

WORKDIR /

RUN DEVENV=dev /docker/99-url-replacement.sh

EXPOSE 3000
CMD [ "node", "app.js" ]

FROM node:14.17.3-alpine


# Create app directory
RUN mkdir -p /usr/src/user-service
WORKDIR /usr/src/user-service

COPY package.json /usr/src/user-service/
RUN apk update && apk upgrade \
	&& apk add --no-cache git \
	&& apk --no-cache add --virtual builds-deps build-base python \
	&& npm install -g nodemon gulp node-gyp node-pre-gyp && npm install\
	&& npm rebuild bcrypt --build-from-source

# Bundle app source
COPY . /usr/src/user-service

EXPOSE 3023

CMD ["npm", "start"]


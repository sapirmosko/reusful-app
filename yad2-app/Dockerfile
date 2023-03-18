#select the base image to start from 
FROM node:18.13-alpine3.16

#set the directory of our application
WORKDIR /reusful

#copy all of the files from our machine to the image
COPY . /reusful/

#install all the packages inside package.json
RUN npm i

ENTRYPOINT npm start

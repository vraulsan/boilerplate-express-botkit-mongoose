# use latest official node container
FROM node
# define our directory varible so that we dont have to re-type it further down
ARG dir=/usr/src/boilerplate-express-botkit-mongoose
# create app directory
RUN mkdir -p ${dir}
# moving to directory
WORKDIR ${dir}
# copy local package.json file to image
COPY package.json package.json
# install all npm dependencies
RUN npm install -y 
# copy contents of the repo to the app directory
COPY . ${dir}
# expose port 3000 because this is the one we used for express
EXPOSE 3000
# start the app
CMD ["node", "app.js"]


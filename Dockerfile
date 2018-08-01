# Big thanks to this article https://goo.gl/7f3Xdr

# Add NodeJS and specify it's version
FROM node:10.6.0

# Makes the directory where the code is hosted
RUN mkdir -p /usr/src/backend-wasabi

# Specify where every command in the rest of this file will e executed
WORKDIR /usr/src/backend-wasabi

# Install all the dependencies with the package.json file
COPY package.json /usr/src/backend-wasabi
COPY package-lock.json /usr/src/backend-wasabi
RUN npm cache verify && npm install

# Copy the code of this project to the server
COPY . /usr/src/backend-wasabi

# Port where the container will listen to
EXPOSE 5001

# The command to execute our container
CMD [ "npm", "run", "deploy" ]
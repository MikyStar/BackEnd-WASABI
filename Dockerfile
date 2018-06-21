# Big thanks to this article https://goo.gl/7f3Xdr

# Add NodeJS and specify it's version
FROM node:9.3.0

# Specify where every command in the rest of this file will e executed
WORKDIR /usr/src/backend-wasabi

# Install all the dependencies with the package.json file
COPY package.json /usr/src/backend-wasabi
RUN npm install

# Copy the code of this project to the server
COPY . /usr/src/backend-wasabi

# Port where the container will listen to
EXPOSE 5001

# The command to execute our container
CMD npm start
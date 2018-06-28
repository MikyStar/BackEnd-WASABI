# BackEnd-WASABI

This is the repository containing the backend code for the PedalBoard of WASABI's team research project.

# Technologies used

## Server

- [Docker](https://www.docker.com/)
- [MongoDB](https://www.mongodb.com/)
- [AdminMongo](https://github.com/mrvautin/adminMongo)

## JS APIS

- [Express](http://expressjs.com/fr/)
- [Body-Parser](https://github.com/expressjs/body-parser)
- [Mongoose](http://mongoosejs.com/)
- [Swagger UI](https://swagger.io/tools/swagger-ui/)
- [JWT](https://github.com/auth0/node-jsonwebtoken)
- [Passport](http://www.passportjs.org/)

## Passport strategies

- Gogle OAuth 2.0

# Usefull links

- [Docker + NodeJS + MongoDB](https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f)
- [MongoDB](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb)
- [How Mongo stores datad](https://www.slideshare.net/mdirolf/inside-mongodb-the-internals-of-an-opensource-database)

# Tutorial

## Initialization

1. cd [ Path of the project ]
2. npm install
3. git clone https://github.com/mrvautin/adminMongo.git && cd adminMongo
4. npm install
5. Modify /config/app.json with :
```json
{
	"app":
	{
		"host": "127.0.0.1",
		"port": 1234
	}
}
```
6. cd ..
7. mkdir database
8. sudo chown -R `id -u` database
9. mongod --dbpath database
10. cd database
11. mongo --host 127.0.0.1:27017
12. $ use [ name of the database in sensibleInformations.js ]
13. $ db.createUser( { user : "name of the user in sensibleInformations.js", pwd : "database password in sensibleInformations.js", roles : [ "readWrite", "dbAdmin" ] } )

## Working

```sh
screen -S "mongod"
mongod --dbpath database
Ctrl + A + D
screen -S "adminMongo"
cd adminMongo && npm start
Ctrl + A + D
screen -S "nodeServer"
npm start

# To go back to a screen, type screen -r nameOfTheScreen
# To view all the screen type screen -ls
```

# API Documentation

## Access

Just add /api-docs to the URL of the server and you'll find the documentation

## Modify

Just update src/api-documentation.js using [those conventions.](https://editor.swagger.io/)

<br />
<hr />
<br />

# What I've learnt

## Docker

### Dockerfile

The Dockerfile is basically the file that "parse" my local version of the code to the future folder on the server where my code will be executed. It contains instruction to setting up the environment.

`Note :` The WORDIR command only change the working directory for RUN commands, otherwise, ADD, COPY and so on are not impacted.

### docker-compose.yml

It's the file containing containers of my project (if I'm using multiple containers) such as NodeJS, PHP, MongoDB, MySQL, Python ...
It's will link them together to create our final Docker Image

### Creating a Docker Machine to run your image

For Mac
```sh
docker-machine create --driver virtualbox [ name of the machine ] # If there is no machine on your system, call your first one default
docker-machine env [ name of the machine]
eval "$(docker-machine env default)" # To connect your shell to the new machine
```

### Listing all the machines on your system

```sh
docker-machine ls
```

### Building a container

```sh
docker-compose build
```

### Reinitializing an image

```sh
docker-compose rm
```

### Get a list of all containers

```sh
# Only running containers
docker ps

# All containers
docker ps -a
```

### Get a list of all the images stored

```sh
docker images
```

### Run a container

```sh
docker run [ image name ][optional ":"tag name]
```

### Run a container

```sh
docker-compose up
```

### Launch a docker machine

```sh
docker-machine start [ name of machine ]
```

### Get the IP address of the images running on the machine

```sh
docker-machine ip [ name of the image ]
```

### Deleting images

```sh
# Delete an image
docker rmi [ name of the image ]

# Delete all images
docker rmi $(docker images -q)
```

### Pushing an image to a Docker Cloud repository

```sh
docker login
docker tag [ image ] [ Docker ID ]/[ image ][:tag]
docker push [ Docker ID ]/[ image ][:tag]
```

`Note :` The tag is what is going to be visible in the Docker Cloud to identify your commit

### Browsing inside a container just like an OS

```sh
docker exec -it [ name of container ] bash
# Then you are inside the container and to exit just use 'exit'
```

## MondoDB

### Create the environment

```sh
mongod --dbpath [ Path of the folder where I want my DB ]
```

### Launch the shell

```sh
mongod --dbpath [ Path of the folder where I want my DB ]
mongo --host [ Adress and port where mongod listens on ]
```

### Stop the server

```sh
mongod --dbpath [ Path of the database ] --shutdown
```

### Create a database

`Once in the MongoDB shell`
```sh
use [ Name of the database ]
db # Just to check
```

### Manually add datas

`Once in the MongoDB shell`
```sh
db.[table].insert([ JSON format informations ])
```

`Note `:
- "db" is the keyword that we will use, that's why we have to use the _use_ command before, just to select the database
- The table (which is not really a table because NoSQL) doesn't has to be defined, it will then be added automatically

<h2><bold>OR</bold></h2>

```sh
[name of the variable] = [JSON format informations, that can be an array of course]
db.[table].insert([name of the variable]);
```

### To display what is inside a _table_

```sh
db.[table].find().pretty()
```
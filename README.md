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
- [Bcrypt](https://www.npmjs.com/package/bcrypt)

## Passport strategies

- Gogle OAuth 2.0
- GitHub

# Usefull links

- [Docker + NodeJS + MongoDB](https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f)
- [MongoDB](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb)
- [How Mongo stores datad](https://www.slideshare.net/mdirolf/inside-mongodb-the-internals-of-an-opensource-database)
- [The Net Ninja's YouTube channel (NodeJS ; MongoDB ; Passport)](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
- [Peter Fisher (Docker)](https://www.youtube.com/channel/UCjFs9wBGz4HlEJGUB6jzUmw)

# Tutorial

## Initialization

`REQUIRE : MongoDB & Mongod & NodeJS`

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
		"port": 1234,
		"pawssword" : "A password",
		"context" : "AdminMongo"
	}
}
```
6. cd ..
7. mkdir database
8. sudo chown -R \`id -u\` database
9. mongod --dbpath database
10. cd database
11. mongo --host 127.0.0.1:27017
12. [PROMPT MongoDB] use [ name of the database in sensibleInformations.js ]
13. [PROMPT MongoDB] db.createUser( { user : "name of the user in sensibleInformations.js", pwd : "database password in sensibleInformations.js", roles : [ "readWrite", "dbAdmin" ] } )

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

Just update api-documentation.js using [those conventions.](https://editor.swagger.io/)

<br />
<hr />
<br />

# What I've learnt

## Docker

### Basic knowledge

- An Image is a snapshot of one or multiple Containers

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

### Create a container out of an image

```sh
docker run [ image name ][optional ":"tag name]
```

### Rename a container

```sh
docker rename [ previous name ] [ new name ]
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

### Delete a container

```sh
docker rm [ name or ID of the container ]
```

### Pushing an image to a Docker Cloud repository

```sh
docker login
docker tag [ image ] [ Docker ID ]/[ image ][:tag]
docker push [ Docker ID ]/[ image ][:tag]
```

`Note :` The tag is what is going to be visible in the Docker Cloud to identify your commit

### Interacting with what's encapsulated inside a container

```sh
# If the container is running
docker exec -it [optional --name 'name I want to give'] [optional -u 'user' to launch the command like a specific user] [ name of container ] [ the command I want to launch ]
# NB : If we enter exit to leave the container, it will still be running in the background

# OR

# If the container is not running
docker run -it [optional --name 'name I want to give'] [ id of the container ] [ the command I want to launch ]
# NB : If we enter exit to leave the container, it will be stopped as well
```

> With the command 'bash' we open a shell inside the container, and we can browse, edit, install stuffs ...

### Launching a container

```sh
docker start [ name or ID of the container ]
```
> For example if we want to launch a service

```sh
docker stop [ name or ID of the container ]
```

```sh
# You can also restart it
docker restart [ name or ID of the container ]
```

### Creating an image out of a container

```sh
docker commit [ container name or ID ] [ how I want my image to be named ]
```

### Copy files between Docker container and machine
```sh
docker cp [location] [destination] # Path within a container = [container]:[path of the file]
```

### Exposing ports

```sh
docker run -td --name [name I want to give] -p [ports I\'m exposing] [ name of the image ]
```

### Mounting folder to a container

```sh
docker run -it --name [name I want to give] -v [absolute path of what I want to mount]:[absolute path where I want to mount it in the container]
```

### Volumes

_If we mount a volume to a container and we delete this container, the volume will still exists, so we can create an other container and mounting the volume to it, this way we make persistance_

```sh
# Listing all volumes
docker volume ls

# Mounting a volume to a container
docker run -it --name [name I want to give] -v [name we want to call it]:[absolute path where I want to mount it in the container]

# Mounting the volumes from a container to an other that that they can 'exchange' datas
docker run -it --name [name I want to give] --volumes-from [container where volumes are]
```

### Getting informations on the configuration of a container

```sh
docker inspect [container]
```

### Injecting environment variables to the container

```sh
docker run -it --name [name I want to give] -e [KEY]=[VALUE] [optional -e [KEY]=[VALUE]]

# Or with a file
docker run -it --env-file [path of the file]

# If we want to change a value at the fly like passing from dev to prof
docker run -it --env-file [path of the file] -e [KEY_I_WANT_TO_CHANGE]=[NEW_VALUE]
```

<br/>
<br/>


## MondoDB

### Create the environment

```sh
mongod --dbpath [ Path of the folder where I want my DB ]
```

### Launch the shell

```sh
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
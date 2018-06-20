# BackEnd-WASABI

This is the repository containing the backend code for the PedalBoard of WASABI's team research project.

# Technologies used

## JS APIS

- Express

## Server

- Docker
- MongoDB

## Tutorials followed

- [Docker + NodeJS + MongoDB](https://medium.com/statuscode/dockerising-a-node-js-and-mongodb-app-d22047e2806f)
- [MongoDB](https://closebrace.com/tutorials/2017-03-02/the-dead-simple-step-by-step-guide-for-front-end-developers-to-getting-up-and-running-with-nodejs-express-and-mongodb)

## What I've learnt

### Docker

#### Dockerfile

The Dockerfile is basically the file that "parse" my local version of the code to the future folder on the server where my code will be executed. It contains instruction to setting up the environment.

#### docker-compose.yml

It's the file containing containers of my project (if I'm using multiple containers) such as NodeJS, PHP, MongoDB, MySQL, Python ...
It's will link them together to create our final Docker Image

### MondoDB

#### Create the environment

```sh
mongod --dbpath [ Path of the folder where I want my DB ]
```

#### Launch the shell

```sh
mongod --dbpath [ Path of the folder where I want my DB ]
mongo --host [ Adress and port where mongod listens on ]
```

#### Create a database

`Once in the MongoDB shell`
```sh
use [ Name of the database ]
db # Just to check
```

#### Manually add datas

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

#### To display what is inside a _table_

```sh
db.[table].find().pretty()
```
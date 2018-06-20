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

#### Create a database

```sh
mongod --dbpath [ Path of the folder where I want my DB ]
```

#### Launch the database

```sh
mongo --host [ Adress and port where mongod listens on ]
```
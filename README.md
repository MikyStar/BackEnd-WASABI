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
- [CORS](https://www.npmjs.com/package/cors)

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

## Deal with Docker

### Run the project

```sh
docker-compose up
```

### Access Mongo within Docker

```sh
docker ps # List containers
docker exec -it [ mongo container ] /bin/bash # Attach a shell to the container
cd data/db # Browse where the database folder is
mongo admin -u [ username ] -p # It will ask to prompt your password

# You are now using the Mongo Shell
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

Please go to [this](https://gist.github.com/MikyStar/2aca6274c27b440773d176d8c7cde217) GitHub Gist to check it out, feel free to make some revisions to correct or add some more knowledge !

## MondoDB

Please go to [this](https://gist.github.com/MikyStar/55384452cbd8add1d54ab4b7432357ea) GitHub Gist to check it out, feel free to make some revisions to correct or add some more knowledge !

## OAuth2

Please go to [this](https://gist.github.com/MikyStar/2d9a8878cdcdc99a37d67f79851c0a6f) GitHub Gist to check it out, feel free to make some revisions to correct or add some more knowledge !
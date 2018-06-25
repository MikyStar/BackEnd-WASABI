const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const sensibleInformations = require('./sensibleInformations');
const database = require('./model/database');
const swaggerDocumentation = require('./api-documentation.json');
const mongooseSchemas = require('./model/mongooseSchemas');

const app = express();

app.use( bodyParser.json() );
app.use( '/api-docs', swaggerUI.serve, swaggerUI.setup( swaggerDocumentation ) );

app.listen( sensibleInformations.SERVER_PORT, () =>
{
	console.log( chalk.blue( `NodeJS server running on port ${ sensibleInformations.SERVER_PORT }`) );
	database.initializeMongo();
} );

app.get('/', (request, response) =>
{
	response.send(`The server receiver a GET request`);
});

app.get('/user', (request, response) =>
{
	let idOfUserIMLookingFor = request.query.id;

	mongooseSchemas.User.findById(idOfUserIMLookingFor, (error, result) =>
	{
		if( error )
			return response.status( 400 ).send( error);
		else
			return response.json( result );
	});
});

app.post('/user', (request, response) =>
{
	let result = database.addUser(request.body);

	if(result instanceof Error)
		return response.status(400).send(result.message)
	else
		return response.status(200).send("User added to the database");
});

app.get('/user/list', (request, response) =>
{
	mongooseSchemas.User.find( ( error, result ) =>
	{
		if ( error )
			return response.status(400).send(error);

		console.log( result );

		response.json( result );
	} )
});
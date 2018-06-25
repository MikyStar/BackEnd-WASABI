const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const sensibleInformations = require('./sensibleInformations');
const database = require('./model/database');
const swaggerDocumentation = require('./api-documentation.json');

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

	database.User.findById(idOfUserIMLookingFor, (error, result) =>
	{
		if( error )
			return response.status( 400 ).send( "Element not found" );
		else
			return response.json( result );
	});
});

app.post('/user', (request, response) =>
{
	console.log( "/user received : " + request.body );

	let result = database.addUser(request.body);

	if(result instanceof Error)
		return response.status(500).send(result)
	else
		return response.status(200).send("User added to the database");
});

app.get('/user/list', (request, response) =>
{
	database.User.find( ( error, result ) =>
	{
		if ( error )
			return response.status(400).send(error);

		console.log( result );

		response.json( result );
	} )
});
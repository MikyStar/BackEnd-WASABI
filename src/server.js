const express = require('express');
const chalk = require('chalk');
const swaggerUI = require('swagger-ui-express');
const SensibleInformations = require('./sensibleInformations');
const database = require('./model/database');
const swaggerDocumentation = require('./api-documentation.json');

const app = express();


app.listen( SensibleInformations.PORT, () =>
{
	console.log( chalk.red(`NodeJS server running on port ${SensibleInformations.PORT}`) );
} );

database.initializeMongo();

app.get('/', (request, response) =>
{
	response.send(`The server receiver a GET request`);
});

app.get('/testFind', (request, response) =>
{
	database.User.find( (error, result) =>
	{
		if(error)
			return response.error(error);

		console.log(result);

		response.json(result);
	})
});

app.post('/user', (request, response) =>
{
	console.log( "/user received" );
	try
	{
		let result = database.addUser(request);

		if(result != "ok")
			throw new Error(result);
	}
	catch(error)
	{
		response.status(400).send(error);
	}
});

app.get('/user', (request, response) =>
{
	database.User.find( ( error, result ) =>
	{
		if ( error )
			return response.status(400).send(error);

		console.log( result );

		response.json( result );
	} )
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
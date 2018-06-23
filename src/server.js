const express = require('express');
const SensibleInformations = require('./sensibleInformations');
const Database = require('./Database');
const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('./api-documentation.json');

const app = express();


app.listen( SensibleInformations.PORT, () =>
{
	const redConsoleDisplayCode = '\x1b[31m';
	const resetConsoleColorDisplayCode = "\x1b[0m"

	console.log( redConsoleDisplayCode, `NodeJS server running on port ${SensibleInformations.PORT}`, resetConsoleColorDisplayCode );
} );

Database.initializeMongo();

app.get('/', (request, response) =>
{
	response.send(`The server receiver a GET request`);
});

app.get('/testFind', (request, response) =>
{
	Database.User.find( (error, result) =>
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
		let result = Database.addUser(request);

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
	Database.User.find( ( error, result ) =>
	{
		if ( error )
			return response.status(400).send(error);

		console.log( result );

		response.json( result );
	} )
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));
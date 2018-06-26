const express = require('express');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const sensibleInformations = require('./Utilities/sensibleInformations');

const app = express();

// Middlewares
app.use( bodyParser.json() ); // JSON request handling
app.use( '/api-docs', swaggerUI.serve, swaggerUI.setup( require('./Utilities/api-documentation.json'))); // Documentation
app.use( '/api', require( './routes/userRoutes' ) ); // Routing
app.use( (error, request, response, next) => // Errors handling
{
	response.status(400).send( {error : error.message});
});

app.listen( process.env.port || sensibleInformations.SERVER_PORT, () =>
{
	console.log( `NodeJS server running on port ${ sensibleInformations.SERVER_PORT }` );
	require( './model/database' ).initializeMongo();
} );

app.get('/', (request, response) =>
{
	response.send(`The server receiver a GET request`);
});
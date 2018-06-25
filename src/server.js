const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const sensibleInformations = require('./Utilities/sensibleInformations');

const app = express();

app.use( bodyParser.json() );
app.use( '/api-docs', swaggerUI.serve, swaggerUI.setup( require( './Utilities/api-documentation.json' ) ) );
app.use( '/api', require( './routes/userRoutes' ) );

app.listen( process.env.port || sensibleInformations.SERVER_PORT, () =>
{
	console.log( chalk.blue( `NodeJS server running on port ${ sensibleInformations.SERVER_PORT }`) );
	require( './model/database' ).initializeMongo();
} );

app.get('/', (request, response) =>
{
	response.send(`The server receiver a GET request`);
});
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileSystem = require('fs');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const sensibleInformations = require('./assets/sensibleInformations');

//////////////////////////////////////////////////////////////////////////////////////////

const app = express();

//////////////////////////////////////////////////////////////////////////////////////////

app.use( bodyParser.json() ); // JSON request handling
app.use( '/api-docs', swaggerUI.serve, swaggerUI.setup( require('./assets/api-documentation.json'))); // Documentation

(function setUpRoutes()
{
	const realtiveToNpmPathOfRoutes = './src/routes/';
	const relativeToFolderPathOfRoutes = './routes/';
	fileSystem.readdir( realtiveToNpmPathOfRoutes, ( error, files ) =>
	{
		if ( !error )
		{
			files.forEach( file =>
			{
				app.use( '/api', require(`${relativeToFolderPathOfRoutes}${file}`));
			} );
		}
		else console.log( "Error setting up routes" + error );
	} );
})()

app.use( passport.initialize() );
app.use( passport.session() );
app.use(cors());

//////////////////////////////////////////////////////////////////////////////////////////

app.listen( process.env.port || sensibleInformations.SERVER_PORT, () =>
{
	console.log( `NodeJS server running` );
	require( './model/database' ).initializeMongo();
} );

//////////////////////////////////////////////////////////////////////////////////////////

app.get('/', (request, response) =>
{
	response.send(`The server receiver a GET request`);
});
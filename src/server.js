const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileSystem = require('fs');
const cookieSession = require('cookie-session');
const swaggerUI = require('swagger-ui-express');
const sensibleInformations = require('./assets/sensibleInformations');
const passportSetup = require('./model/passportSetup');

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

app.use(cookieSession(
{
	maxAge : 10 * 1000, // 10 seconds
	keys : sensibleInformations.SESSION.cookieKeys
}));

app.use( passport.initialize() );
app.use( passport.session() );

//////////////////////////////////////////////////////////////////////////////////////////

app.listen( process.env.port || sensibleInformations.SERVER_PORT, () =>
{
	console.log( `NodeJS server running on port ${ sensibleInformations.SERVER_PORT }` );
	require( './model/database' ).initializeMongo();
} );

//////////////////////////////////////////////////////////////////////////////////////////

app.get('/', (request, response) =>
{
	response.send(`The server receiver a GET request`);
});
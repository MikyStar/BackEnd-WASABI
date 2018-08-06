const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const fileSystem = require('fs');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
const exec = require( 'child_process' ).exec;
const sensibleInformations = require('./assets/sensibleInformations');
const npmController = require( './controller/npmController' );

//////////////////////////////////////////////////////////////////////////////////////////

const app = express();

//////////////////////////////////////////////////////////////////////////////////////////

allowJSONBodyHandling();
setupDocumentation( '/api-docs' );
setupRoutes();
setupPassport();
enableCrossOriginResourceSharing();
createPedalDirectoryForNPMInstalls( sensibleInformations.NPM_PEDALS_LOCATION );
launchServerAndConnectToDB();
serveFolder( '/pedals', '/../pedals' );
setupTestRoute();

//////////////////////////////////////////////////////////////////////////////////////////

function allowJSONBodyHandling()
{ app.use( bodyParser.json() ); }

function setupDocumentation( path )
{ app.use( path, swaggerUI.serve, swaggerUI.setup( require( './assets/api-documentation.json' ) ) ); }

function setupRoutes()
{
	const realtiveToNpmPathOfRoutes = './src/routes/';
	const relativeToFolderPathOfRoutes = './routes/';
	fileSystem.readdir( realtiveToNpmPathOfRoutes, ( error, files ) =>
	{
		if ( !error )
		{
			files.forEach( file =>
			{
				app.use( '/api', require( `${relativeToFolderPathOfRoutes}${file}` ) );
			} );
		}
		else console.log( "Error setting up routes" + error );
	} );
}

function setupPassport()
{
	app.use( passport.initialize() );
	app.use( passport.session() );
}

function enableCrossOriginResourceSharing()
{ app.use( cors() ); }

async function createPedalDirectoryForNPMInstalls( location )
{
	exec( `mkdir -p ${location}`, ( stdout, stderr ) =>
	{
		if ( stderr )
		{
			console.error( `Error while creating the pedal folder : ${stderr}` );
			process.exit();
		}
	} );

	await npmController.initPackageJSON( location ).then(
		() => { },
		() => { }
	)
}

function launchServerAndConnectToDB()
{
	app.listen( process.env.port || sensibleInformations.SERVER_PORT, () =>
	{
		console.log( `NodeJS server running in ${process.env.NODE_ENV} mode.` );
		require( './model/database' ).initializeMongo();
	} );
}

function serveFolder( route, folderLocation )
{ app.use( route, express.static( __dirname + folderLocation ) ); }

function setupTestRoute()
{
	app.get( '/', ( request, response ) =>
	{
		response.send( `The server receiver a GET request` );
	} );
}
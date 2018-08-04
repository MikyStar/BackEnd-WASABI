const router = require( 'express' ).Router();
const pedalController = require( '../controller/pedalController' );

// TODO after the WAC make it use tokenAnalyzerMiddleware
router.post( '/pedal/:npmPedal', (request, response) =>
{
	let npmPedalName = request.params.npmPedal;

	pedalController.addPedal( npmPedalName ).then(
		( resolve ) =>
		{
			if ( resolve.hasBeenUpdated )
				response.redirect( `../../test/publication.html?pedal=${npmPedalName}`);
			else if ( resolve.hasBeenInstalled )
				response.send( `Your pedal has been installed` );
		},
		( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
	)
});

// TODO after the WAC make it use tokenAnalyzerMiddleware
router.delete( '/pedal/:npmPedal', (request, response) =>
{
	let npmPedalName = request.params.npmPedal;

	pedalController.removePedal(npmPedalName).then(
		( ) => response.send( 'Pedal removed' ),
		( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
	);
});

module.exports = router;
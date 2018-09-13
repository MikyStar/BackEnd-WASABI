const router = require( 'express' ).Router();
const pedalController = require( '../controller/pedalController' );

// TODO after the WAC make it use tokenAnalyzerMiddleware
router.post( '/pedal/:npmPedal', (request, response) =>
{
	let npmPedalName = request.params.npmPedal;

	pedalController.addPedal( npmPedalName ).then(
		() => { response.status( 301 ).json( { 'redirect' : `https://wasabi.i3s.unice.fr/WebAudioPluginBank/testers/publication?pedal=${npmPedalName}` } ); },
		( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
	)
});

// TODO after the WAC make it use tokenAnalyzerMiddleware
router.delete( '/pedal/:npmPedal', (request, response) =>
{
	let npmPedalName = request.params.npmPedal;

	pedalController.removePedal(npmPedalName).then(
		( ) => response.send( 'Pedal removed' ),
		( error ) =>
		{
			error.message == "This pedal doesn't exists" ? statusCode = 404 : statusCode = 400;

			response.status( statusCode ).send( `An unexpected error occured : ${ error }` );
		}
	);
});

module.exports = router;
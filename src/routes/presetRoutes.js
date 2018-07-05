const router = require( 'express' ).Router();
const tokenController = require( '../controller/tokenController' );
const presetController = require('../controller/entities/presetController');
const bankController = require('../controller/entities/bankController');

router.post( '/preset/:bankID', tokenController.tokenAnalyzerMiddleware, ( request, response ) =>
{
	tokenController.verifyTokenAndRetrieveUser( request.token ).then(
		( user ) =>
		{
			bankController.findById(user, request.params.bankID).then(
				(bank) =>
				{
					presetController.addPreset(user, bank, request.body ).then(
						( user ) => { response.send( "Preset added to user" ); },
						( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
					)
				},
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
} );

router.put('/preset/:presetID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			presetController.update(user, request.params.presetID, request.body).then(
				(bank) => { response.send("Preset updated"); },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			);
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
});

router.delete('/preset/:presetID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			presetController.remove(user, request.params.presetID).then(
				(user) => { response.send("Preset deleted"); },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			);
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
});

module.exports = router;
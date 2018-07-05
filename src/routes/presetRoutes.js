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

router.get('/preset/:bankID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			bankController.findById(user, request.params.bankID).then(
				(bank) =>
				{
					presetController.getAll(bank).then(
						(presets) => { response.send(presets) },
						( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
					)
				},
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

module.exports = router;
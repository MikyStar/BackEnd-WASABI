const router = require( 'express' ).Router();
const tokenController = require( '../controller/tokenController' );
const serverManager = require('../controller/serverManager');

// TODO after the WAC make it use tokenAnalyzerMiddleware
router.post( '/pedal', /* tokenController.tokenAnalyzerMiddleware, */ (request, response) =>
{
	/* tokenController.verifyTokenAndRetrieveUser(request.token).then(
		( user ) =>
		{

		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);*/


	let npmPackageName = request.body.npmPackageName;

	serverManager.checkIfNPMPackageAlreadyInstalled( npmPackageName ).then(
		( resolve ) => response.send( resolve ),
		( reject ) => response.status( 400 ).send( reject )
	);
});

module.exports = router;
const router = require( 'express' ).Router();
const tokenController = require( '../controller/tokenController' );
const presetController = require('../controller/entities/presetController');
const connexionController = require('../controller/entities/connexionController');

router.post('/connexion/:presetID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			presetController.findById( user, request.params.presetID).then(
				( preset ) =>
				{
					connexionController.addConnexion(user, preset, request.body).then(
						(user) => { response.send("Connexion added"); },
						( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
					)
				},
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			);
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

module.exports = router;
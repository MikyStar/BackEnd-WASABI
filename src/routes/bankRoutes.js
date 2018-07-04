const router = require('express').Router();
const tokenController = require( '../controller/tokenController' );
const userController = require('../controller/entities/userController');

router.post( '/bank', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		( user ) =>
		{
			userController.addBank(user, request.body).then(
				(user) => { response.send("Bank added to user"); },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

module.exports = router;
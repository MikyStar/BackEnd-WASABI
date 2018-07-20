const router = require('express').Router();
const tokenController = require( '../controller/tokenController' );
const bankController = require('../controller/entities/bankController')

router.post( '/bank', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		( user ) =>
		{
			if(Array.isArray(request.body))
			{
				bankController.addMultipleBanks(user, request.body).then(
					( ) => { response.send("Banks added to user"); },
					( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
				);
			}
			else
			{
				bankController.addBank(user, request.body).then(
					() => { response.send( "Banks added to user" ); },
					( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
				);
			}
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

router.get( '/bank', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			bankController.getAll(user).then(
				(banks) => { response.send(banks); },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
});

router.get('/bank', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			bankController.getAll(user).then(
				(banks) => { response.send(banks); },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

router.get('/bank/:id', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			bankController.findById(user, request.params.id).then(
				(bank) => { response.send(bank) },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

router.put('/bank/:id', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			let newInfos = request.body;

			if( !newInfos.dateCreation && !newInfos.presets && !newInfos.id && !newInfos._id )
			{
				bankController.update(user, request.params.id, request.body).then(
					(bank) => { response.send("Bank updated"); },
					( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
				);
			}
			else
				response.status(400).send("You have no permission to change these fields");

		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

router.delete('/bank/:id', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			bankController.remove(user, request.params.id).then(
				(user) =>  { response.send("Bank removed") },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

module.exports = router;
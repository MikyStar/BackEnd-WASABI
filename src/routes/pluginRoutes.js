const router = require( 'express' ).Router();
const tokenController = require( '../controller/tokenController' );
const pluginController = require('../controller/entities/pluginController');

router.get('/plugin', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			pluginController.getAll(user).then(
				(plugins) => { response.send(plugins); },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

router.post('/plugin/:presetID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			pluginController.addPlugin(user, request.params.presetID, request.body).then(
				(result) => { response.send("Plugin added") },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	)
});

router.put('/plugin/:pluginID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		( user ) =>
		{
			pluginController.update(user, request.params.pluginID, request.body).then(
				(plugin) => { response.send("Plugin updated"); },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
});

router.delete('/plugin/:pluginID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			pluginController.removePlugin(user, request.params.pluginID).then(
				( bank ) => { response.send("Plugin deleted") },
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
});

module.exports = router;
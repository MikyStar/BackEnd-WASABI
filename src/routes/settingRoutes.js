const router = require('express').Router();
const tokenController = require('../controller/tokenController');
const settingController = require('../controller/entities/settingController');

router.get('/setting', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			settingController.getAll(user).then(
				(settings) => response.send(settings),
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
});

router.post('/setting/:pluginID', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyTokenAndRetrieveUser(request.token).then(
		(user) =>
		{
			settingController.addSetting(user, request.params.pluginID, request.body).then(
				( ) => response.send("Setting added"),
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ); }
			);
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
});

module.exports = router;
const jwt = require('jsonwebtoken');
const sensibleInformations = require('../assets/sensibleInformations');
const userController = require('../controller/entities/userController');

module.exports =
{
	// see -> https://goo.gl/Ce9hfh
	tokenAnalyzerMiddleware : ( request, response, next ) =>
	{
		const bearerHeader = request.headers['authorization'];

		if ( typeof bearerHeader !== 'undefined' )
		{
			const bearer = bearerHeader.split( ' ' );
			const bearerToken = bearer[1];

			// Injects on attribute token in the request that contains the token
			// (the next() part of the middleware can now access it trough the request object)
			request.token = bearerToken;

			next();
		}
		else response.status( 403 ).send( "Token undefined" );
	},

	createToken : ( jsonToTokenize ) =>
	{
		return new Promise( (resolve, reject ) =>
		{
			jwt.sign( jsonToTokenize, sensibleInformations.JWT_SECRET, { expiresIn: "1d" }, ( error, token ) =>
			{
				if ( !error )
					resolve(token);
				else
					reject( error );
			});
		});
	},

	verifyToken : async (token) =>
	{
		return new Promise( (resolve, reject ) =>
		{
			jwt.verify( token, sensibleInformations.JWT_SECRET, ( error, user ) =>
			{
				if ( !error )
					resolve( user );
				else
					reject( error );
			});
		});
	},

	verifyTokenAndRetrieveUser : async (token) =>
	{
		return new Promise( (resolve, reject) =>
		{
			module.exports.verifyToken(token).then(
				(user) =>
				{
					userController.findByID(user.id).then(
						(user) => { resolve(user) },
						(error) => { reject(error); }
					)
				},
				(error) => { reject(error) ;}
			)
		});
	}
}
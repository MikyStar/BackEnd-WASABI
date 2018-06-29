const jwt = require('jsonwebtoken');
const sensibleInformations = require('../assets/sensibleInformations');

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

			request.token = bearerToken;

			next();
		}
		else response.status( 403 ).send( "Token undefined" );
	},

	createToken : ( jsonToTokenize ) =>
	{
		return new Promise( (resolve, reject) =>
		{
			jwt.sign( jsonToTokenize, sensibleInformations.JWT_SECRET, { expiresIn: 60 }, ( error, token ) =>
			{
				if ( !error )
					resolve(token);
				else
					reject( error );
			} );
		});

	}
}
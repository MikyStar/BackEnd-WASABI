const express = require( 'express' );
const jwt = require( 'jsonwebtoken' );
const User = require( '../model/schemas/user' );
const sensibleInformations = require( '../utilities/sensibleInformations.js');

const router = express.Router();

router.get( '/login', (request, response) =>
{
	const inputedMail = request.query.mail;
	const inputedPassword = request.query.password;

	User.findOne( { mail : inputedMail }, (error, user) =>
	{
		if( error )
			response.status( 400 ).send( error );
		else if( !user )
			response.status( 400 ).send( "There's no user signed in with that email" );
		else
		{
			if( user.password === inputedPassword)
			{
				jwt.sign( { user }, sensibleInformations.JWT_SECRET, (error, token) =>
				{
					response.send(token);
				});
			}
			else
				response.status( 403 ).send( "Password incorrect")
		}
	});

	//jwt.sign
});

module.exports = router;
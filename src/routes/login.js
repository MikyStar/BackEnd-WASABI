const express = require( 'express' );
const jwt = require( 'jsonwebtoken' );
const User = require( '../model/schemas/user' );
const sensibleInformations = require( '../assets/sensibleInformations.js');
const tokenHandler = require('../model/tokenHandler');

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
				tokenHandler.createToken( { "id": user.id, "name": user.name, "surname": user.surname } ).then(
					( token ) => { response.send( token ); },
					( error ) => { response.status( 400 ).send( `An error occured : ${error}` ); }
				);
			}
			else response.status( 403 ).send( "Password incorrect")
		}
	});

});

module.exports = router;
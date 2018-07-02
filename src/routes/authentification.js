const router = require('express').Router();
const passport = require('passport');
const User = require( '../model/schemas/user' );
const tokenHandler = require( '../model/tokenHandler' );

router.get( '/auth/local', (request, response) =>
{
	const inputedMail = request.query.mail;
	const inputedPassword = request.query.password;

	User.findOne( { mail: inputedMail }, ( error, user ) =>
	{
		if ( error )
			response.status( 400 ).send( error );
		else if ( !user )
			response.status( 400 ).send( "There's no user signed in with that email" );
		else
		{
			if ( user.password === inputedPassword )
			{
				tokenHandler.createToken( { "id": user.id, "name": user.name, "surname": user.surname } ).then(
					( token ) => { response.send( token ); },
					( error ) => { response.status( 400 ).send( `An error occured : ${error}` ); }
				);
			}
			else response.status( 403 ).send( "Password incorrect" )
		}
	} );
});

router.get( '/auth/logout', (request, response) =>
{
	request.logOut();
	response.send("Logged out");
});

router.get( '/auth/google', passport.authenticate('google',
{
	scope: ['profile', 'email']
}));

router.get( '/auth/google/redirect', passport.authenticate('google'), (request, response) =>
{
	tokenHandler.createToken( { "id": request.user.id, "name": request.user.name, "surname": request.user.surname } ).then(
		( token ) => { response.send( token ); },
		( error ) => { response.status( 400 ).send( `An error occured : ${error}` ); }
	);
});

module.exports = router;
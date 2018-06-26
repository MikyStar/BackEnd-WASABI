const express = require('express');
const User = require( '../model/schemas/user' );
const validation = require('../utilities/validation');

const router = express.Router();

router.get( '/user', ( request, response ) =>
{
	User.find( ( error, result ) =>
	{
		if ( error )
			return response.status( 400 ).send( error );
		else
			return response.json( result );
	} )
} );

router.get( '/user/:id', ( request, response ) =>
{
	let idOfUserIMLookingFor = request.params.id;

	User.findById( idOfUserIMLookingFor, ( error, result ) =>
	{
		if ( error )
			return response.status( 400 ).send( error );
		else
			return response.json( result );
	} );
} );

router.post( '/user', ( request, response, next ) =>
{
	let json = request.body;

	if ( !validation.checkAlphaNumeric( json.name ) )
		next(new Error( "Name not alphanumeric, try to remove accents." ));

	if ( !validation.checkAlphaNumeric( json.surname ) )
		next(new Error( "Surname not alphanumeric, try to remove accents." ));

	if ( !validation.checkEmail( json.mail ) )
		next(new Error( "Email type not valid." ));

	User.create( { name: json.name, surname: json.surname, mail: json.mail } ).catch(next).then( () =>
	{
		response.send("User added to the database");
	}).catch(next);
} );

router.put( '/user/:id', (request, response) =>
{
	//TODO
});

router.delete( '/user/:id', (request, response) =>
{
	// TODO
});

module.exports = router;
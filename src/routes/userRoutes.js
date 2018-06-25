const express = require('express');
const user = require( '../model/schemas/user' );
const database = require( '../model/database' );

const router = express.Router();

router.get( '/user', ( request, response ) =>
{
	user.User.find( ( error, result ) =>
	{
		if ( error )
			return response.status( 400 ).send( error );

		console.log( result );

		response.json( result );
	} )
} );

router.get( '/user/:id', ( request, response ) =>
{
	let idOfUserIMLookingFor = request.params.id;

	user.User.findById( idOfUserIMLookingFor, ( error, result ) =>
	{
		if ( error )
			return response.status( 400 ).send( error );
		else
			return response.json( result );
	} );
} );

router.post( '/user', ( request, response ) =>
{
	let result = database.addUser( request.body );

	if ( result instanceof Error )
		return response.status( 400 ).send( result.message )
	else
		return response.status( 200 ).send( "User added to the database" );
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
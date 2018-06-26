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

router.post( '/user', ( request, response ) =>
{
	let json = request.body;

	if ( !validation.checkAlphaNumeric( json.name ) )
		response.status( 400 ).send( "Name not alphanumeric, try to remove accents.");
	else if ( !validation.checkAlphaNumeric( json.surname ) )
		response.status( 400 ).send( "Surname not alphanumeric, try to remove accents." );
	else if( !validation.checkEmail( json.mail ) )
		response.status( 400 ).send( "Email type not valid." );
	else if (!validation.checkPassword(json.password) )
		response.status( 400 ).send( "Bad password, it should contain : \n- Two uppercase letters\n- One special caracter (!@#$&*)\n- Two digits\n- Three lower case letters\n- Have a length between 6 and 20" );
	else
		User.create( { name: json.name, surname: json.surname, mail: json.mail, password : json.password }, (error) =>
		{
			if(error)
			{
				switch(error.code)
				{
					case 11000 :
						response.status( 400 ).send( "This mail already exits, choose an other one." );
						break;
					default :
						response.status( 400 ).send( `An unexpected error occured, please contact us.\n\n${error}` );
				}
			}
			else
				response.send("User added");
		});
} );

router.put( '/user/:id', (request, response) =>
{
	let userToUpdate = request.params.id;
	let elementToUpdate = request.body;

	User.findByIdAndUpdate( { _id: userToUpdate }, elementToUpdate, (error) =>
	{
		if ( error )
		{
			switch ( error.code )
			{
				case 11000:
					response.status( 400 ).send( "This mail already exits, choose an other one." );
					break;
				default:
					response.status( 400 ).send( `An unexpected error occured, please contact us.\n\n${error}` );
			}
		}
		else
			response.send("User updated");
	}).then();
});

router.delete( '/user/:id', (request, response) =>
{
	let userToDelete = request.params.id;

	User.findByIdAndRemove({ _id : userToDelete }, (error) =>
	{
		if(error)
			response.status( 400 ).send( `An eunexpected error occured, please contact us.\n\n${error}` );
	}).then( response.send("User removed") );
});

module.exports = router;
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require( '../model/schemas/user' );
const tokenHandler = require('../model/tokenHandler');
const sensibleInformations = require('../assets/sensibleInformations');

const router = express.Router();

router.get( '/user', tokenHandler.tokenAnalyzerMiddleware, ( request, response ) =>
{
	jwt.verify(request.token, sensibleInformations.JWT_SECRET, (error, authentification) =>
	{
		if( error ) response.status( 403 ).send("Authentification failed");
		else
		{
			User.find( ( error, result ) =>
			{
				if ( error )
					response.status( 400 ).send( error );
				else
				{
					let safeResponse = new Array();

					result.forEach( ( element ) =>
					{
						safeResponse.push( { 'id': element._id, 'name': element.name, 'surname': element.surname } );
					} );

					response.send( safeResponse );
				}
			} );
		}
	});
} );

router.get( '/user/:id', tokenHandler.tokenAnalyzerMiddleware, ( request, response ) =>
{
	jwt.verify( request.token, sensibleInformations.JWT_SECRET, ( error, authentification ) =>
	{
		if ( error ) response.status( 403 ).send( "Authentification failed" );
		else
		{
			let idOfUserIMLookingFor = request.params.id;

			User.findById( idOfUserIMLookingFor, ( error, result ) =>
			{
				if ( error )
					response.status( 400 ).send( error );
				else
					response.send( {'id' : result._id, 'name' : result.name, 'surname' : result.surname} );
			} );
		}
	});
} );

router.post( '/user', ( request, response ) =>
{
	let json = request.body;

	if ( !tokenHandler.checkAlphaNumeric( json.name ) )
		response.status( 400 ).send( "Name not alphanumeric, try to remove accents.");
	else if ( !tokenHandler.checkAlphaNumeric( json.surname ) )
		response.status( 400 ).send( "Surname not alphanumeric, try to remove accents." );
	else if( !tokenHandler.checkEmail( json.mail ) )
		response.status( 400 ).send( "Email type not valid." );
	else if (!tokenHandler.checkPassword(json.password) )
		response.status( 400 ).send( "Bad password, it should contain : \n- Two uppercase letters\n- Two digits\n- Three lower case letters\n- Have a length between 6 and 20\n- It can not contains ' \" & ? +");
	else
		User.create( { name: json.name, surname: json.surname, mail: json.mail, authentificationMethod: json.authentificationMethod, password : json.password }, (error) =>
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

router.put( '/user/:id', tokenHandler.tokenAnalyzerMiddleware, (request, response) =>
{
	jwt.verify( request.token, sensibleInformations.JWT_SECRET, ( error, authentification ) =>
	{
		if ( error ) response.status( 403 ).send( "Authentification failed" );
		else
		{
			let userToUpdate = request.params.id;
			let elementToUpdate = request.body;

			if(authentification.user._id === userToUpdate)
			{
				User.findByIdAndUpdate( { _id: userToUpdate }, elementToUpdate, ( error ) =>
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
						response.send( "User updated" );
				} ).then();
			}
			else response.status( 403 ).send("You can not update an other user's informations.")

		}
	});
});

router.delete( '/user/:id', tokenHandler.tokenAnalyzerMiddleware, (request, response) =>
{
	jwt.verify( request.token, sensibleInformations.JWT_SECRET, ( error, authentification ) =>
	{
		if ( error ) response.status( 403 ).send( "Authentification failed" );
		else
		{
			let userToDelete = request.params.id;

			User.findByIdAndRemove( { _id: userToDelete }, ( error ) =>
			{
				if ( error )
					response.status( 400 ).send( `An eunexpected error occured, please contact us.\n\n${error}` );
			} ).then( response.send( "User removed" ) );
		}
	});
});

module.exports = router;
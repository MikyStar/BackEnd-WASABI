const express = require('express');
const User = require( '../model/schemas/user' );
const tokenController = require('../controller/tokenController');
const regex = require('../controller/regex');
const userController = require('../controller/userController');

const router = express.Router();

router.get( '/user', tokenController.tokenAnalyzerMiddleware, ( request, response ) =>
{
	tokenController.verifyToken(request.token).then(
		( user ) =>
		{
			userController.getAllSafely().then(
				(users) => { response.send(users) },
				( error ) => { response.status( 400 ).send(`An unexpected error occured : ${error}`) }
			)
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
} );

router.get( '/user/:id', tokenController.tokenAnalyzerMiddleware, ( request, response ) =>
{
	tokenController.verifyToken( request.token ).then(
		( user ) =>
		{
			let idOfUserIMLookingFor = request.params.id;

			User.findById( idOfUserIMLookingFor, ( error, result ) =>
			{
				if ( error )
					response.status( 400 ).send( error );
				else
					response.send( { 'id': result._id, 'name': result.name, 'surname': result.surname } );
			} );
		},
		( error ) => { response.status( 403 ).send( `Authentification failed : ${error}` ); }
	);
} );

router.post( '/user', ( request, response ) =>
{
	let json = request.body;

	if ( !regex.checkAlphaNumeric( json.name ) )
		response.status( 400 ).send( "Name not alphanumeric, try to remove accents.");
	else if ( !regex.checkAlphaNumeric( json.surname ) )
		response.status( 400 ).send( "Surname not alphanumeric, try to remove accents." );
	else if ( !regex.checkEmail( json.mail ) )
		response.status( 400 ).send( "Email type not valid." );
	else if ( !regex.checkPassword(json.password) )
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

router.put( '/user', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyToken( request.token ).then(
		( user ) =>
		{
			let elementToUpdate = request.body;

			if( !(elementToUpdate.id || elementToUpdate._id) )
			{
				User.findByIdAndUpdate( { _id: user.id }, elementToUpdate, ( error ) =>
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
			else
				response.status( 403 ).send("You can not change the id");
		},
		( error ) => { response.status( 403 ).send( "Authentification failed" ); }
	);
});

router.delete( '/user', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyToken( request.token ).then(
		( user ) =>
		{
			let userToDelete = user.id;

			User.findByIdAndRemove( { _id: userToDelete }, ( error ) =>
			{
				if ( error )
					response.status( 400 ).send( `An eunexpected error occured, please contact us.\n\n${error}` );
			} ).then( response.send( "User removed" ) );
		},
		( error ) =>{ response.status( 403 ).send( "Authentification failed" ); }
	);
});

module.exports = router;
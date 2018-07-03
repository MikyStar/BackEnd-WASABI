const express = require('express');
const tokenController = require('../controller/tokenController');
const regex = require('../controller/regex');
const userController = require('../controller/entities/userController');

const router = express.Router();

router.get( '/user', tokenController.tokenAnalyzerMiddleware, ( request, response ) =>
{
	tokenController.verifyToken(request.token).then(
		( user ) =>
		{
			userController.getAll().then(
				(users) =>
				{
					let safeResponse = new Array();

					users.forEach( ( element ) =>
					{
						safeResponse.push( { 'id': element._id, 'name': element.name, 'surname': element.surname } );
					} );

					response.send(safeResponse)
				},
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

			userController.findByID(idOfUserIMLookingFor).then(
				(user) =>
				{
					response.send( { 'id': user._id, 'name': user.name, 'surname': user.surname })
				},
				( error ) => { response.status( 400 ).send( `An unexpected error occured : ${error}` ) }
			)
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
		userController.create( { name: json.name, surname: json.surname, mail: json.mail, authentificationMethod: json.authentificationMethod, password: json.password }).then(
			(user) =>
			{
				response.send( "User added" );
			},
			(error) =>
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
		)
} );

router.put( '/user', tokenController.tokenAnalyzerMiddleware, (request, response) =>
{
	tokenController.verifyToken( request.token ).then(
		( user ) =>
		{
			let elementToUpdate = request.body;

			if( !(elementToUpdate.id || elementToUpdate._id) )
			{
				userController.update(user.id, elementToUpdate).then(
					(user) => { response.send( "User updated" ); },
					( error ) =>
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
				)
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

			userController.remove(userToDelete).then(
				(user) =>
				{
					if(user)
						response.send("Removed successfully");
					else
						response.status( 400 ).send( `An unexpected error occured, please contact us.\n\n${error}` );
				},
				( error ) => response.status( 400 ).send( `An unexpected error occured, please contact us.\n\n${error}` )
			)
		},
		( error ) =>{ response.status( 403 ).send( "Authentification failed" ); }
	);
});

module.exports = router;
const User = require('../../model/schemas/user');
const passwordEncryption = require('../../controller/passwordEncryption');

module.exports =
{
	getAll : () =>
	{
		return new Promise( (resolve, reject) =>
		{
			User.find( ( error, result ) =>
			{
				if ( error )
					reject(error)
				else
					resolve(result);
			} );
		});
	},

	findByID : ( id ) =>
	{
		return new Promise( (resolve, reject) =>
		{
			User.findById( id, ( error, result ) =>
			{
				if ( error )
					reject(error);
				else
					resolve( result );
			} );
		});
	},

	findOne : async ( jsonCarateristicInformation ) =>
	{
		return new Promise( (resolve, reject) =>
		{
			User.findOne( jsonCarateristicInformation, ( error, user ) =>
			{
				if( error )
					reject( error );
				else
					resolve( user );
			} );
		});
	},

	create : async ( json ) =>
	{
		let password, name, surname;

		if(json.password)
		{
			await passwordEncryption.encrypt( json.password ).then(
				( hash ) => { password = hash; },
				( error ) => { password = new Error(error) }
			);
		}

		function uperCaseFirstLetter( string ) { return string.charAt( 0 ).toUpperCase() + string.slice( 1 ); }

		return new Promise( ( resolve, reject ) =>
		{
			if ( json.name == null || json.name == '' ) reject("You should provide a name")
			else
			{
				name = uperCaseFirstLetter( json.name );
				json.name = name;
			}

			if ( json.surname != 'undefined' )
			{
				surname = json.surname.toUpperCase();
				json.surname = surname;
			}
			else
			{
				json.surname = '';
			}

			if(typeof password != Error)
				json.password = password;
			else
				reject(password);

			User.create( json, ( error, user ) =>
			{
				if ( error )
					reject( error );
				else
					resolve( user );
			} );
		} );
	},

	update : (id, jsonUpdate) =>
	{
		return new Promise( (resolve, reject) =>
		{
			User.findByIdAndUpdate( { _id: id }, jsonUpdate, ( error, user ) =>
			{
				if ( error )
					reject(error);

				if(user)
					resolve(user);
			});
		});
	},

	remove : (id) =>
	{
		return new Promise( (resolve, reject) =>
		{
			User.findByIdAndRemove( { _id: id }, ( error, user ) =>
			{
				if ( error )
					reject( error );
				else
					resolve(user);
			});
		});
	},

	saveChanges : async (user) =>
	{
		return new Promise( (resolve, reject) =>
		{
			user.save( (error) =>
			{
				if(error)
					reject(error);
				else
					resolve(user);
			});
		});
	}
}
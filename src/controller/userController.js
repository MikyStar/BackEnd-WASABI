const User = require('../model/schemas/user');
const passwordEncryption = require('../controller/passwordEncryption');

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

	findOne : ( jsonCarateristicInformation ) =>
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
	}
}

async function create( json )
{
	let password, name, surname;

	await passwordEncryption.encrypt( json.password ).then(
		( hash ) => { password = hash; },
		( error ) => { return new Error( error ) }
	);

	function uperCaseFirstLetter( string )
	{
		return string.charAt( 0 ).toUpperCase() + string.slice( 1 );
	}

	surname = json.surname.toUpperCase();
	name = uperCaseFirstLetter( json.name );

	json.password = password;
	json.name = name;
	json.surname = surname;

	return new Promise( ( resolve, reject ) =>
	{
		User.create( json, ( error, user ) =>
		{
			if ( error )
				reject( error );
			else
				resolve( user );
		} );
	} );
}

module.exports.create = create;
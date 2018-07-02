const User = require('../model/schemas/user');

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

	create : ( json ) =>
	{
		return new Promise( (resolve, reject) =>
		{
			User.create( json, ( error, user ) =>
			{
				if( error )
					reject(error);
				else
					resolve(user);
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

	}
}
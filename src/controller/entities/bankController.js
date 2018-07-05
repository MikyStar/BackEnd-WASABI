const userController = require('../entities/userController');

module.exports =
{
	addBank: async ( user, bankJSON ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			user.banks.push( bankJSON );

			userController.saveChanges( user ).then(
				( user ) => { resolve( user ); },
				( error ) => { reject( error ); }
			)
		} );
	},

	getAll : async (user) =>
	{
		return new Promise( (resolve, reject) =>
		{
			resolve(user.banks);
			reject(null);
		});
	},

	findById : async (user, id) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let found = false;

			module.exports.getAll( user ).then(
				( banks ) =>
				{
					banks.forEach( bank =>
					{
						if ( bank.id == id )
						{
							found = true;
							resolve( bank );
						}
					} );

					if ( !found )
						reject( "Bank not found" );
				},
				( error ) => { reject( error ); }
			)
		} );
	},

	update : async (user, id, jsonUpdate) =>
	{
		return new Promise( (resolve, reject) =>
		{
			module.exports.findById(user, id).then(
				(bank) =>
				{
					bank.set(jsonUpdate);

					userController.saveChanges(user).then(
						(user) => { resolve(bank); },
						(error) => { reject(error); }
					)
				},
				(error) => { reject(error); }
			)
		});
	},

	remove : async (user, id) =>
	{
		return new Promise( (resolve, reject) =>
		{
			module.exports.findById(user, id).then(
				( bank ) =>
				{
					user.banks.pull(id);

					userController.saveChanges(user).then(
						(user) => { resolve(user); },
						(error) => { reject(error); }
					)
				},
				( error ) => { reject( error ); }
			)
		});
	}
}
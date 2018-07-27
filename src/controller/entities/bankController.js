const entitiesController = require('./entitiesController');
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

	addMultipleBanks : async (user, banksJSON) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			if( Array.isArray(banksJSON) )
			{
				banksJSON.forEach( element =>
				{
					user.banks.push( element );
				});

				userController.saveChanges( user ).then(
					( user ) => { resolve( user ); },
					( error ) => { reject( error ); }
				)
			}
			else
				reject('Not an array of banks');
		});
	},

	findById : async (user, id) =>
	{
		return await entitiesController.findByID(entitiesController.EntityType.BANK, user, id)
	},

	update : async (user, id, jsonUpdate) =>
	{
		return await entitiesController.update(entitiesController.EntityType.BANK, user, id, jsonUpdate);
	},

	remove : async (user, id) =>
	{
		return new Promise( (resolve, reject) =>
		{
			module.exports.findById(user, id).then(
				( ) =>
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
	},

	removeAll : async (user) =>
	{
		let allBanks;
		let sizeBefore;
		let sizeAfter;
		let errors = [];

		await module.exports.getAll( user ).then(
			( banks ) =>
			{
				allBanks = banks;
				sizeBefore = banks.length;
			},
			( reject ) => errors.push( reject )
		);

		for ( let i = 0; i < allBanks.length; i++ )
		{
			await module.exports.remove( user, allBanks[i].id ).then(
				( resolve ) => {},
				( reject ) => { errors.push(reject) }
			);
		}

		await module.exports.getAll( user ).then(
			( banks ) => sizeAfter = banks.length,
			( reject ) => errors.push( reject )
		);

		return new Promise( (resolve, reject) =>
		{
			if ( ( sizeBefore == 0 || sizeAfter != sizeBefore) && ( sizeAfter == 0) )
				resolve();
			else
				reject( errors );
		});
	}
}
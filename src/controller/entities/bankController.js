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
		return new Promise( (resolve, reject) =>
		{
			let found = false;

			user.banks.forEach( element =>
			{
				if(element.id == id)
				{
					found = true;
					resolve(element)
				}
			});

			if(!found)
				reject("Bank not found");
		});
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

	}
}
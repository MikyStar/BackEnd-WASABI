module.exports =
{
	addBank: async ( user, bankJSON ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			user.banks.push( bankJSON );

			module.exports.saveChanges( user ).then(
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

	findOne : async (user, id) =>
	{

	},

	update : async (user, id) =>
	{

	},

	remove : async (user, id) =>
	{

	}
}
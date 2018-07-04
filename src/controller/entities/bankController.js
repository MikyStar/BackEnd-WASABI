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
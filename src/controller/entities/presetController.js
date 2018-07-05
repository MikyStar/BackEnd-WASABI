const userController = require( '../entities/userController' );

module.exports =
{
	addPreset : async (user, bank, jsonPreset) =>
	{
		return new Promise( (resolve, reject) =>
		{
			bank.presets.push( jsonPreset );

			userController.saveChanges( user ).then(
				( user ) => { resolve( user ); },
				( error ) => { reject( error ); }
			);
		});
	},

	getAll : async (bank) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			resolve( bank.presets );
			reject( null );
		} );
	},

	findById: async (user,  id ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let found = false;

			user.banks.forEach( bank =>
			{
				bank.presets.forEach( preset =>
					{
						if(preset.id == id)
						{
							resolve(preset);
							found = true;
						}
					}
				);
			});

			if(!found)
				reject("Preset not found");
		} );
	},

	update: async (user, id, jsonUpdate ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			module.exports.findById( user, id ).then(
				( preset ) =>
				{
					preset.set( jsonUpdate );

					userController.saveChanges( user ).then(
						( user ) => { resolve( preset ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	},

	remove: async (user, bank, id ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			module.exports.findById( bank, id ).then(
				( bank ) =>
				{
					bank.presets.pull( id );

					userController.saveChanges( user ).then(
						( user ) => { resolve( user ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	}
}
const userController = require( './userController' );
const bankController = require('./bankController');

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

	findById : async (user,  id ) =>
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

	getAll : async (user) =>
	{
		return new Promise( (resolve, reject) =>
		{
			let arrayPresets = [];

			bankController.getAll(user).then(
				(banks) =>
				{
					banks.forEach( bank =>
					{
						bank.presets.forEach( preset => { arrayPresets.push(preset); } )
					});

					resolve(arrayPresets);
				},
				(error) => { reject(error); }
			);
		});
	},

	remove: async (user, id ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let found = false;

			bankController.getAll( user ).then(
				( banks ) =>
				{
					for(let i = 0; i < banks.length; i++)
					{
						for(let j = 0; j < banks[i].presets.length; i ++)
						{
							if( banks[i].presets[j].id == id )
							{
								user.banks[i].presets.pull(id);
								found = true;

								userController.saveChanges(user).then(
									(user) => { },
									(error) => { reject(error); }
								)
							}
						}
					}

					if(found)
						resolve(banks);
					else
						reject("Preset not found");
				},
				( error ) => { reject( error ); }
			);
		} );
	}
}
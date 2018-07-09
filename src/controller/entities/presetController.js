const userController = require( './userController' );
const bankController = require('./bankController');
const entitiesController = require('./entitiesController');

module.exports =
{
	addPreset : async (user, bankID, jsonPreset) =>
	{
		return new Promise( (resolve, reject) =>
		{
			bankController.findById(user, bankID).then(
				(bank) =>
				{
					bank.presets.push( jsonPreset );

					userController.saveChanges( user ).then(
						( user ) => { resolve( user ); },
						( error ) => { reject( error ); }
					);
				},
				(error) => reject(error)
			);
		});
	},

	findById : async (user, id ) =>
	{
		return await entitiesController.findByID(entitiesController.EntityType.PRESET, user, id);
	},

	update: async (user, id, jsonUpdate ) =>
	{
		return await entitiesController.update(entitiesController.EntityType.PRESET, user, id, jsonUpdate);
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
									( ) => { },
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
const userController = require( './userController' );
const presetController = require( './presetController' );
const entitiesController = require('./entitiesController');
const bankController = require('./bankController');

module.exports =
{
	addConnexion : async (user, preset, jsonCreation) =>
	{
		return new Promise( (resolve, reject) =>
		{
			preset.connexions.push(jsonCreation);

			userController.saveChanges(user).then(
				( user ) => { resolve( user ); },
				( error ) => { reject( error ); }
			);
		});
	},

	getAll : async (user) =>
	{
		return new Promise( (resolve, reject) =>
		{
			let arrayConnexions = [];

			presetController.getAll(user).then(
				(presets) =>
				{
					presets.forEach( preset =>
					{
						preset.connexions.forEach(connexion => arrayConnexions.push(connexion) )
					});

					resolve(arrayConnexions);
				},
				(error) => { reject(error); }
			)
		});
	},

	findByID : async (user, id) =>
	{
		return await entitiesController.findByID(entitiesController.EntityType.CONNEXION, user, id);
	},

	update : async (user, id, jsonUpdate) =>
	{
		return await entitiesController.update(entitiesController.EntityType.CONNEXION, user, id, jsonUpdate);
	},

	remove : async(user, id) =>
	{
		bankController.getAll( user ).then(
			( banks ) =>
			{
				mainLoop:

				for ( let i = 0; banks.length; i++ )
				{
					let theBank = banks[i];

					if ( theBank.presets.length != 0 )
					{
						for ( let j = 0; banks[i].presets.length; j++ )
						{
							let thePreset = theBank.presets[j];

							if ( thePreset.connexions.length != 0 )
							{
								for ( let k = 0; theBank.presets[j].connexions.length; k++ ) // Too deep bro
								{
									if ( thePreset.connexions[k].id == id )
									{
										thePreset.connexions.pull( id );

										found = true;

										userController.saveChanges( user ).then(
											() => { },
											( error ) => { reject( error ); }
										);

										break mainLoop;
									}
								}
							}
						}
					}
				}
				found ? resolve( user ) : reject( "Connexion not found" )
			},
			( error ) => reject( error )
		);
	}
}
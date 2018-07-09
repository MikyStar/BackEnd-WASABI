const entitiesController = require('./entitiesController');
const userController = require('./userController');
const pluginController = require('./pluginController');
const bankController = require('./bankController');

module.exports =
{
	getAll : async(user) =>
	{
		return new Promise( (resolve, reject) =>
		{
			let arraySettings = [];

			pluginController.getAll(user).then(
				(plugins) =>
				{
					plugins.forEach( plugin =>
					{
						if(plugin.settings)
						{
							plugin.settings.forEach( setting =>
							{
								arraySettings.push(setting);
							});
						}
					});

					resolve(arraySettings);
				},
				(error) => reject(error)
			);
		});
	},

	addSetting : async (user, pluginID, jsonCreation) =>
	{
		return new Promise( (resolve, reject) =>
		{
			pluginController.findByID(user, pluginID).then(
				(plugin) =>
				{
					plugin.settings.push( jsonCreation );

					userController.saveChanges( user ).then(
						( user ) => { resolve( user ); },
						( error ) => { reject( error ); }
					);
				},
				(error) => reject(error)
			)
		});
	},

	findByID : async (user, id) =>
	{
		return await entitiesController.findByID(entitiesController.EntityType.SETTINGS, user, id);
	},

	update : async (user, id, jsonUpdate) =>
	{
		return await entitiesController.update(entitiesController.EntityType.SETTINGS, user, id, jsonUpdate);
	},

	remove : async (user, id) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			bankController.getAll( user ).then(
				( banks ) =>
				{
					mainLoop :

					for ( let i = 0; banks.length; i++ )
					{
						let theBank = banks[i];

						if ( theBank.presets.length != 0 )
						{
							for ( let j = 0; banks[i].presets.length; j++ )
							{
								let thePreset = theBank.presets[j];

								if ( thePreset.plugins.length != 0 )
								{
									for ( let k = 0; theBank.presets[j].plugins.length; k++ ) // Too deep bro
									{
										let thePlugin= thePreset.plugins[k];

										if( thePlugin.settings.length != 0 )
										{
											for(let l = 0; thePlugin.settings.length; l++)
											{
												if ( thePlugin.settings[l].id == id )
												{
													thePlugin.settings.pull( id );

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
						}
					}
					found ? resolve( user ) : reject( "Setting not found" )
				},
				( error ) => reject( error )
			);

		} );
	}
}
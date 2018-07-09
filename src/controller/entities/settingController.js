const entitiesController = require('./entitiesController');
const userController = require('./userController');
const pluginController = require('./pluginController');

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
	}
}
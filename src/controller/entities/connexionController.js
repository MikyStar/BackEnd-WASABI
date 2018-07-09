const userController = require( './userController' );
const presetController = require( './presetController' );
const entitiesController = require('./entitiesController');

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
	}
}
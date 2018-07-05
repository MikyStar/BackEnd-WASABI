const userController = require( './userController' );
const presetController = require( './bankController' );
const presetController = require( './presetController' );

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

	}
}
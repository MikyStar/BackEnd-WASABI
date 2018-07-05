const userController = require( './userController' );
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

	findByID : async (user, id) =>
	{
		return new Promise( (resolve, reject) =>
		{
			let found = false;

			module.exports.getAll(user).then(
				(connexions) =>
				{
					connexions.forEach(connexion =>
					{
						if(connexion.id == id)
						{
							found = true;
							resolve(connexion);
						}
					});

					if(!found)
						reject("Connexion not found");
				},
				(error) => { reject(error); }
			)
		});
	},

	update : async (user, id, jsonUpdate) =>
	{
		return new Promise( (resolve, reject) =>
		{
			module.exports.findByID(user, id).then(
				(connexion) =>
				{
					connexion.set(jsonUpdate);

					userController.saveChanges( user ).then(
						( user ) => { resolve( connexion ); },
						( error ) => { reject( error ); }
					)
				},
				(error) => { reject(error); }
			)
		});
	}
}
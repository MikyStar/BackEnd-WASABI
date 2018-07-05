const userController = require( './userController' );
const presetController = require( './bankController' );

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
	}
}
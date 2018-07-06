const userController = require( './userController' );
const presetController = require('./presetController');

module.exports =
{
	getAll : async (user) =>
	{
		return new Promise( (resolve, reject) =>
		{
			let arrayPlugin = [];

			presetController.getAll( user ).then(
				( presets ) =>
				{
					presets.forEach( preset =>
					{
						preset.plugins.forEach( plugin => { arrayPlugin.push( plugin ); } )
					} );

					resolve( arrayPlugin );
				},
				( error ) => { reject( error ); }
			);
		});
	},

	addPlugin : async (user, presetID, jsonCreation) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			presetController.findById(user, presetID).then(
				(preset) =>
				{
					preset.plugins.push( jsonCreation );

					userController.saveChanges( user ).then(
						( user ) => { resolve( user ); },
						( error ) => { reject( error ); }
					);
				},
				(error) => { reject(error); }
			);
		} );
	}
}
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
	},

	findByID: async ( user, id ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let found = false;

			module.exports.getAll( user ).then(
				( plugins ) =>
				{
					plugins.forEach( plugin =>
					{
						if ( plugin.id == id )
						{
							found = true;
							resolve( plugin );
						}
					} );

					if ( !found )
						reject( "Plugin not found" );
				},
				( error ) => { reject( error ); }
			)
		} );
	},

	update: async ( user, id, jsonUpdate ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			module.exports.findByID( user, id ).then(
				( plugin ) =>
				{
					plugin.set( jsonUpdate );

					userController.saveChanges( user ).then(
						( user ) => { resolve( plugin ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	},
}
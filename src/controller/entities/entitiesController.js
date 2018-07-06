const bankController = require('./bankController');
const connexionController = require('./connexionController');
const pluginController = require('./pluginController');
const presetController = require('./presetController');
const userController = require('./userController');

module.exports =
{
	EntityType : Object.freeze({
		CONNEXION : "connexionController",
		PLUGIN : "pluginController",
		PRESET : "presetController",
		USER : "userController",
		BANK : "bankController",
		SETTINGS : "settings"
	}),

	update : async (entityType, user, id, jsonUpdate ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			eval(entityType).findByID( user, id ).then(
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
	}
}
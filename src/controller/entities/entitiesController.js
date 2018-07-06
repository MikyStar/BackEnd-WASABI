module.exports =
{
	EntityType : Object.freeze({
		CONNEXION: "require('./connexionController')",
		PLUGIN: "require('./pluginController')",
		PRESET: "require('./presetController')",
		USER: "require('./userController')",
		BANK: "require('./bankController')",
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

					eval(module.exports.EntityType.USER).saveChanges( user ).then(
						( user ) => { resolve( plugin ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	}
}
module.exports =
{
	EntityType : Object.freeze({
		CONNEXION: "require('./connexionController')",
		PLUGIN: "require('./pluginController')",
		PRESET: "require('./presetController')",
		USER: "require('./userController')",
		BANK: "require('./bankController')",
		SETTINGS : "require('./settingController')"
	}),

	findByID : async (entityType, user, id ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let found = false;

			eval(entityType).getAll( user ).then(
				( entities ) =>
				{
					entities.forEach( entity =>
					{
						if ( entity.id == id )
						{
							found = true;
							resolve( entity );
						}
					} );

					if ( !found )
						reject( "Element not found" );
				},
				( error ) => { reject( error ); }
			)
		} );
	},

	update : async (entityType, user, id, jsonUpdate ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			module.exports.findByID(entityType, user, id ).then(
				( entity ) =>
				{
					entity.set( jsonUpdate );

					eval(module.exports.EntityType.USER).saveChanges( user ).then(
						( ) => { resolve( entity ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	},

	generateRandomPedalBoardID : ( length ) =>
	{
		length = length != null ? length : 25;

		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for ( var i = 0; i < length; i++ )
			text += possible.charAt( Math.floor( Math.random() * possible.length ) );

		return text;
	}
}
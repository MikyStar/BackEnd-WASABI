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

	findByID: async (entityType, user, id ) =>
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
						reject( "Connexion not found" );
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
						( user ) => { resolve( entity ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	}
}
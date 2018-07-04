const userController = require( '../entities/userController' );

module.exports =
{
	addPreset : async (user, bank, jsonPreset) =>
	{
		return new Promise( (resolve, reject) =>
		{
			bank.presets.push( jsonPreset );

			userController.saveChanges( user ).then(
				( user ) => { resolve( user ); },
				( error ) => { reject( error ); }
			);
		});
	},

	getAll : async (bank) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			resolve( bank.presets );
			reject( null );
		} );
	},

	findById: async ( bank, id ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let found = false;

			bank.preset.forEach( element =>
			{
				if ( element.id == id )
				{
					found = true;
					resolve( element )
				}
			} );

			if ( !found )
				reject( "Bank not found" );
		} );
	},

	update: async ( bank, id, jsonUpdate ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			module.exports.findById( bank, id ).then(
				( preset ) =>
				{
					preset.set( jsonUpdate );

					userController.saveChanges( user ).then(
						( user ) => { resolve( bank ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	},

	remove: async ( bank, id ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			module.exports.findById( bank, id ).then(
				( bank ) =>
				{
					bank.presets.pull( id );

					userController.saveChanges( user ).then(
						( user ) => { resolve( user ); },
						( error ) => { reject( error ); }
					)
				},
				( error ) => { reject( error ); }
			)
		} );
	}
}
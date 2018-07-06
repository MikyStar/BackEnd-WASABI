const userController = require( './userController' );
const presetController = require('./presetController');
const bankController = require('./bankController');

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

	removePlugin : async (user, id) =>
	{
		return new Promise( (resolve, reject) =>
		{
			bankController.getAll(user).then(
				( banks ) =>
				{
					mainLoop :
					for(let i = 0; banks.length; i++)
					{
						let theBank = banks[i];

						if(theBank.presets.length != 0)
						{
							for(let j = 0; banks[i].presets.length; j++)
							{
								let thePreset = theBank.presets[j];

								if(thePreset.plugins.length != 0)
								{
									for(let k = 0; theBank.presets[j].plugins.length; k++) // Too deep bro
									{
										if ( thePreset.plugins[k].id == id)
										{
											thePreset.plugins.pull(id);

											found = true;

											userController.saveChanges( user ).then(
												( user ) => { },
												( error ) => { reject( error ); }
											)
										}
									}
								}

							}
						}
					}

					if ( !found )
						reject( "Plugin not found" );
					else
						resolve(user)
				},
				( error ) => reject(error)
			);
		});
	}
}
const npmController = require( '../controller/npmController' );

module.exports =
{
	/**
	 * @async
	 *
	 * @description To add a NPM pedal module to the server
	 *
	 * @param {string} npmPedalName The NPM pedal module we want to add
	 *
	 * @returns {Promise} Resolve : An object containing two attributes : hasBeenUpdated and hasBeenInstalled, both booleans. It will give you information on what operation has been made. If an error occured, it will be shown in the reject.
	 */
	addPedal : async ( npmPedalName ) =>
	{
		let errors = [];
		let whatWeShouldDo;
		let success =
		{
			hasBeenUpdated : false,
			hasBeenInstalled : false,
		};

		await npmController.isModuleAlreadyInstalled( npmPedalName ).then(
			( resolve ) =>
			{
				if( resolve )
					whatWeShouldDo = 'update';
				else
					whatWeShouldDo = 'install';
			},
			( reject ) => errors.push( reject )
		);

		if( ( errors.length == 0 ) && whatWeShouldDo )
			await npmController.runNPMCommand( whatWeShouldDo, npmPedalName ).then(
				() => success.hasBeenUpdated = true,
				( reject ) => errors.push( reject )
			);

		return new Promise( ( resolve, reject ) =>
		{
			if( errors.length == 0 )
				resolve(success);
			else
				reject(errors);
		});
	},

	/**
	 * @async
	 *
	 * @description Check if the given pedal is installed and remove it if it is.
	 *
	 * @param {string} npmPedalName The name of the NPM pedal we want to remove
	 *
	 * @returns {Promise} If everything went ok, it will resolve (resolve will not contain anything), otherwise, if the pedal was previously not installer or if an error occured, it will reject.
	 */
	removePedal : async (npmPedalName) =>
	{
		let error;

		await npmController.isModuleAlreadyInstalled(npmPedalName).then(
			( resolve) =>
			{
				if( !resolve )
					error = new Error('This pedal doesn\'t exists');
			},
			( reject ) => error = reject
		);

		if( !error )
			await npmController.runNPMCommand( 'uninstall', npmPedalName ).then(
				( ) => {},
				( reject ) => error = reject
			);

		return new Promise( ( resolve, reject ) =>
		{
			if( !error )
				resolve();
			else
				reject( error );
		});
	}
}
const util = require( 'util' );
//const exec = util.promisify( require( 'child_process' ).exec );
const exec = require( 'child_process').exec ;
const sensibleInformations = require('../assets/sensibleInformations');

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

		await module.exports.isPedalAlreadyInstalled( npmPedalName).then(
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
			await module.exports.runNPMCommand( whatWeShouldDo, npmPedalName ).then(
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
	 * @description Search in the server if the npm package is already installed
	 *
	 * @param {string} npmPedalName The name of the package we want to check
	 *
	 * @returns {Promise} If the package is on the server, it will return through resolve true, otherwise it will resolve false. If an error occured, it will reject with the error.
	 */
	isPedalAlreadyInstalled: async ( npmPedalName ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			exec( `npm list --prefix ${sensibleInformations.NPM_PEDALS_LOCATION} | grep ${npmPedalName}`, ( error, stdout, stderr ) =>
			{
				// I intentionally not check the error variable because it allways says 'Command failed' even if it works ...
				if ( !stderr )
				{
					if( stdout )
						resolve(true);
					else
						resolve(false);
				}
				else
					reject( stderr );
			} );
		} );
	},

	/**
	 * @async
	 *
	 * @description Either install, update or uninstall an NPM package
	 *
	 * @param {string} type Can be 'install', 'update' or 'uninstall'
	 * @param {string} npmPackage The NPM package on which we want the action to be done
	 *
	 * @returns {Promise} If everything went ok, it will resolve (resolve will not contain anything), otherwise it will reject with the error.
	 */
	runNPMCommand: async ( type, npmPackage ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			if ( ( type == 'install' ) || ( type == 'update' ) || ( type == 'uninstall'))
			{
				exec( `npm ${type} --prefix ${sensibleInformations.NPM_PEDALS_LOCATION} ${npmPackage}`, ( theError, stdout, stderr ) =>
				{
					if( !stderr.includes('ERR!') ) // Because NPM prints warning and errors to the same output
						resolve();
					else
						reject( stderr );
				} );
			}
			else
				reject( new Error( 'Wrong type provided' ) )
		} );
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

		await module.exports.isPedalAlreadyInstalled(npmPedalName).then(
			( resolve) =>
			{
				if( !resolve )
					error = new Error('This pedal doesn\'t exists');
			},
			( reject ) => error = reject
		);

		if( !error )
			await module.exports.runNPMCommand( 'uninstall', npmPedalName ).then(
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
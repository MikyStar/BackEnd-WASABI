const exec = require( 'child_process' ).exec;
const sensibleInformations = require( '../assets/sensibleInformations' );

module.exports =
{
	/**
	 * @async
	 *
	 * @description Create the package.json to the path provided.
	 *
	 * @param {path} [location] Where we want it to be
	 *
	 * @returns {Promise} Can only resolve (with nothing in resolve) : seems like the NPM team wrote the verbosification of the creation in stderr so can't distinguish ....
	 */
	initPackageJSON : async ( location ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let command;

			if( location )
				command = `cd ${location} && npm init -y && npm i`;
			else
				command = `npm init -y && npm i`;

			exec( command, ( stdout, stderr ) =>
			{
				resolve();
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
			if ( ( type == 'install' ) || ( type == 'update' ) || ( type == 'uninstall' ) )
			{
				exec( `npm ${type} --prefix ${sensibleInformations.NPM_PEDALS_LOCATION} ${npmPackage}`, ( theError, stdout, stderr ) =>
				{
					if ( !stderr.includes( 'ERR!' ) ) // Because NPM prints warning and errors to the same output
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
	 * @description Search in the server if the npm package is already installed
	 *
	 * @param {string} npmModule The name of the package we want to check
	 *
	 * @returns {Promise} If the package is on the server, it will return through resolve true, otherwise it will resolve false. If an error occured, it will reject with the error.
	 */
	isModuleAlreadyInstalled: async ( npmModule ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			exec( `npm list --prefix ${sensibleInformations.NPM_PEDALS_LOCATION} | grep ${npmModule}`, ( error, stdout, stderr ) =>
			{
				// I intentionally not check the error variable because it allways says 'Command failed' even if it works ...
				if ( !stderr )
				{
					if ( stdout )
						resolve( true );
					else
						resolve( false );
				}
				else
					reject( stderr );
			} );
		} );
	},
}
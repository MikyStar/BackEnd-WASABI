const exec = require( 'child_process' ).exec;

module.exports =
{
	/**
	 * @async
	 *
	 * @description Create the package.json to the path provided.
	 *
	 * @param {path} [location] Where we want it to be
	 *
	 * @returns {Promise} Resolve returning nothing if everything is ok ; Reject with the error if an error occured.
	 */
	initPackageJSON : async ( location ) =>
	{
		return new Promise( ( resolve, reject ) =>
		{
			let command;

			if( location )
				command = `cd ${location} && npm init -y`;
			else
				command = `npm init -y`;

			exec( command, ( stdout, stderr ) =>
			{
				// I intentionally not check the error variable because it allways says 'Command failed' even if it works ...
				if ( !stderr )
					resolve();
				else
					reject( stderr );
			} );
		} );
	},
}
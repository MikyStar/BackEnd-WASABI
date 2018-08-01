const exec = require('child_process').exec;

module.exports =
{
	/**
	 * @description Search in the server if the npm package is already installed
	 *
	 * @param {string} npmPackageName The name of the package we want to check
	 *
	 * @returns {string} If the package is on the server, it will return trough resolve its Symver
	 */
	checkIfNPMPackageAlreadyInstalled : async ( npmPackageName ) =>
	{
		return new Promise( (resolve, reject) =>
		{
			exec( `npm list | grep ${npmPackageName}`, ( error, stdout, stderr ) =>
			{
				if(stdout && (stderr != null) )
					resolve( stdout.split( '@' )[1]);
				else
					reject(stderr);
			} );
		});
	},
}
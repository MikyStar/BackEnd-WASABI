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
}
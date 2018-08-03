const regex = require('../controller/regex');
const fileSystem = require('fs');
const util = require('util');

module.exports =
{
	createNPMTestContainer : async( location, npmName, npmVersion ) =>
	{
		let dockerfileCompleted;
		let errors = [];

		await createContentConfigFile( npmName, npmVersion ).then(
			( content) => dockerfileCompleted = content,
			( reject ) => errors.push(reject)
		);

		return new Promise( (resolve, reject) =>
		{
			if( errors.length == 0 )
				resolve(dockerfileCompleted);
			else
				reject( errors );
		});

		//////////////////////////////

		async function createConfigFile( location, npmName, npmVersion )
		{

		}

		async function createContentConfigFile( npmName, npmVersion )
		{
			const readFile = util.promisify(fileSystem.readFile);

			if( !regex.checkSymVer( npmVersion ) )
				npmVersion = '10.6.0'

			let content = await readFile( './src/assets/templateDockerfileJSStyle.txt', 'utf8');

			return new Promise( ( resolve, reject ) =>
			{
				if(content)
					resolve( eval( content ));
				else
					reject( new Error('Can not readFile()'))
			});
		}
	},
}
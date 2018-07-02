const bcrypt = require('bcrypt');
const sensibleInformations = require('../assets/sensibleInformations');

module.exports =
{
	encrypt : (password) =>
	{
		return new Promise( (resolve, reject) =>
		{
			bcrypt.hash(password, sensibleInformations.BCRYPT.SALT_ROUNDS, (error, hash) =>
			{
				if(error)
					reject(error);
				else
					resolve(hash);
			});
		});
	},

	compare : (inputed, hashInDB) =>
	{
		return new Promise( (resolve, reject) =>
		{
			bcrypt.compare(inputed, hashInDB, (error, result) =>
			{
				if(error)
					reject(error)
				else
					resolve(result);
			});
		});
	}
}
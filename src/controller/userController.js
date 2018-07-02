const User = require('../model/schemas/user');

module.exports =
{
	getAllSafely : () =>
	{
		return new Promise( (resolve, reject) =>
		{
			User.find( ( error, result ) =>
			{
				if ( error )
					reject(error)
				else
				{
					let safeResponse = new Array();

					result.forEach( ( element ) =>
					{
						safeResponse.push( { 'id': element._id, 'name': element.name, 'surname': element.surname } );
					} );

					resolve(safeResponse);
				}
			} );
		});
	},

	findByID : ( id ) =>
	{

	},

	create : ( json ) =>
	{

	},

	update : (id, jsonUpdate) =>
	{

	},

	remove : (id) =>
	{

	}
}
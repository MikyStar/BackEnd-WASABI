const mongoose = require( 'mongoose' );

const User = mongoose.model( 'user', new mongoose.Schema(
{
	name :
	{
		type : String,
		trim: true,
		required : [ true, 'A name required' ]
	},
	surname :
	{
		type : String,
		trim: true,
		required : [true, 'A surname required' ]
	},
	mail :
	{
		type : String,
		required : [true, 'A mail required' ],
		trim : true,
		unique : true
	},
	authentificationMethod :
	{
		type : String,
		trim: true,
		required: [true, 'You need to provide the authentification method.']
	},
	googleID :
	{
		type : String,
		unique : true,
		trim: true,
		sparse : true // To allow having multiple null entries
	},
	password :
	{
		type : String
	}
}));

module.exports = User;
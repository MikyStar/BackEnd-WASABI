const mongoose = require( 'mongoose' );

const User = mongoose.model( 'user', new mongoose.Schema(
{
	name :
	{
		type : String,
		required : [ true, 'A name required' ]
	},
	surname :
	{
		type : String,
		required : [true, 'A surname required' ]
	},
	mail :
	{
		type : String,
		required : [true, 'A mail required ' ],
		unique : true
	},
	authentificationMethod :
	{
		type : String,
		required: [true, 'You need to provide the authentification method.']
	},
	googleID :
	{
		type : String
	},
	password :
	{
		type : String,
	}
}));

module.exports = User;
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
	password :
	{
		type : String,
		required : [ true, 'A password is required' ]
	}
}));

module.exports = User;
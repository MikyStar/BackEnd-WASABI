const mongoose = require( 'mongoose' );

exports.User = mongoose.model( 'user', new mongoose.Schema(
{
	name :
	{
		type : String,
		required : [ true, 'Name required' ]
	},
	surname :
	{
		type: String,
		required: [true, 'Surname required']
	},
	mail :
	{
		type: String,
		required: [true, 'Name required']
	}
}));
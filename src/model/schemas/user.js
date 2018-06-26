const mongoose = require( 'mongoose' );

const User = mongoose.model( 'user', new mongoose.Schema(
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
		required: [true, 'Name required'],
		unique : true
	}
}));

module.exports = User;
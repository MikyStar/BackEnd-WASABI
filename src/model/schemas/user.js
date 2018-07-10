const mongoose = require( 'mongoose' );
const Bank = require('./bank');

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
		trim: true
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
		default : 'local'
	},
	googleID :
	{
		type : String,
		unique : true,
		trim: true,
		sparse : true // To allow having multiple null entries
	},
	password: String,
	banks : [ Bank.schema ]

}));

module.exports = User;
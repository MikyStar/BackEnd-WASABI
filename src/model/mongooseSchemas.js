const mongoose = require( 'mongoose' );

const userSchema = mongoose.Schema(
	{
		name: String,
		surname: String,
		mail: String
	} );

exports.User = mongoose.model( 'User', userSchema );

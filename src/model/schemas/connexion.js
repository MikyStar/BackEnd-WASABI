const mongoose = require( 'mongoose' );

const Connexion = mongoose.model( 'connexion', new mongoose.Schema(
	{
		in :
		{
			id : String,
			inputnumber : Number
		},
		out: String
	},
	{ _id: false } ) );

module.exports = Connexion;
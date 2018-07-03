const mongoose = require( 'mongoose' );

const Connexion = mongoose.model( 'connexion', new mongoose.Schema(
	{
		in :
		{
			id : String,
			inputNumber : Number
		},
		out: String
	} ) );

module.exports = Connexion;
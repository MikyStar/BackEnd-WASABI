const mongoose = require( 'mongoose' );
const Plugin = require('./plugin');
const Connexion = require('./connexion');

const Preset = mongoose.model( 'preset', new mongoose.Schema(
	{
		label :
		{
			type: String,
			trim: true
		},
		date:
		{
			type: Date,
			trim: true
		},
		plugins : [ Plugin ],
		connexions : [ Connexion ]
	}));

module.exports = Preset;
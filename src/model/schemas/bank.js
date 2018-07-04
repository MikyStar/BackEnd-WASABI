const mongoose = require( 'mongoose' );
const Preset = require('./preset');

const Bank = mongoose.model( 'bank', new mongoose.Schema(
	{
		label:
		{
			type: String,
			trim: true,
			required : true
		},
		dateCreation:
		{
			type : Date,
			default : Date.now
		},
		presets: [ Preset.schema ]
	} ) );

module.exports = Bank;
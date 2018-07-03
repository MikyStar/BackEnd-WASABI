const mongoose = require( 'mongoose' );
const Preset = require('./preset');

const Bank = mongoose.model( 'bank', new mongoose.Schema(
	{
		label:
		{
			type: String,
			trim: true
		},
		dateCreation:
		{
			type : Date,
			required : true
		},
		presets: [ Preset ]
	} ) );

module.exports = Bank;
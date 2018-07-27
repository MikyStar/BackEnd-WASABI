const mongoose = require( 'mongoose' );
const Setting = require('./setting');

const Plugin = mongoose.model( 'plugin', new mongoose.Schema(
	{
		type:
		{
			type: String,
			trim: true
		},
		position :
		{
			x : Number,
			y : Number
		},
		settings : Object,
		id : String
	},
	{ _id: false } ) );

module.exports = Plugin;
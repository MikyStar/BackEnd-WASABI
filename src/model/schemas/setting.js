const mongoose = require( 'mongoose' );

const Setting = mongoose.model( 'setting', new mongoose.Schema(
	{
		buttonName : String,
		valueButton : String
	},
	{ _id: false } ) );

module.exports = Setting;
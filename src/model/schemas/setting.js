const mongoose = require( 'mongoose' );

const Setting = mongoose.model( 'setting', new mongoose.Schema(
	{
		buttonName : String,
		valueButton : Number
	} ) );

module.exports = Setting;
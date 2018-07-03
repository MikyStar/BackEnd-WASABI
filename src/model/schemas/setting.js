const mongoose = require( 'mongoose' );

const Setting = mongoose.model( 'setting', new mongoose.Schema(
	{
		buttonName : String,
		valueButoon : Number
	} ) );

module.exports = Setting;
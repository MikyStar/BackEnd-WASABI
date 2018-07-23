const mongoose = require( 'mongoose' );
const Preset = require('./preset');
const entitiesController = require( '../../controller/entities/entitiesController' );

const Bank = mongoose.model( 'bank', new mongoose.Schema(
	{
		pedalBoardID:
		{
			type: String,
			trim: true,
			required : true,
			default: () => { return entitiesController.generateRandomPedalBoardID(); }
		},
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
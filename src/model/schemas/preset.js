const mongoose = require( 'mongoose' );
const Plugin = require('./plugin');
const Connexion = require('./connexion');
const entitiesController = require('../../controller/entities/entitiesController');

const Preset = mongoose.model( 'preset', new mongoose.Schema(
	{
		pedalBoardID:
		{
			type: String,
			trim: true,
			required: true,
			default: () => { return entitiesController.generateRandomPedalBoardID(); }
		},
		label :
		{
			type: String,
			trim: true,
			required : true
		},
		date:
		{
			type: Date,
			trim: true,
			default : Date.now
		},
		plugins : [ Plugin.schema ],
		connexions : [ Connexion.schema ]
	}));

module.exports = Preset;
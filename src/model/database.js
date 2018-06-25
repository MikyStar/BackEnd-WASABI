const mongoose = require('mongoose');
const chalk = require('chalk');
const validation = require('../Utilities/validation');
const sensibleInformations = require('../Utilities/sensibleInformations');
const User = require('./schemas/user');

const DATABASE_CONNECTION = `mongodb://${sensibleInformations.DATABASE_USER}:${sensibleInformations.DATABASE_PASSWORD}@${sensibleInformations.SERVER_ADRESS}:${sensibleInformations.DATABASE_PORT}/${sensibleInformations.DATABASE_NAME }`;

exports.initializeMongo = () =>
{
	console.log( chalk.blue(`Trying to connect to MongoDB (${ DATABASE_CONNECTION })`) );

	mongoose.connect(DATABASE_CONNECTION);
	mongoose.Promise = global.Promise;

	const database = mongoose.connection;

	database.on('error', console.error.bind(console, 'Connection error'));

	database.once('open', () =>
	{
		console.log( chalk.blue("Connected to MongoDB") );
	});
}

exports.addUser = (JSON) =>
{
	if ( !validation.checkAlphaNumeric(JSON.name) )
		return new Error("Name not alphanumeric, try to remove accents.");

	if ( !validation.checkAlphaNumeric( JSON.surname ) )
		return new Error( "Surname not alphanumeric, try to remove accents." );

	if ( !validation.checkEmail( JSON.mail ) )
		return new Error( "Email type not valid." );

	User.create({ name: JSON.name, surname: JSON.surname, mail : JSON.mail }, (error) =>
	{
		if( error )
			return new Error( error );
	});
}
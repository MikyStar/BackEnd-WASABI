const mongoose = require('mongoose');
const chalk = require('chalk');
const validation = require('../Utilities/validation');
const sensibleInformations = require('../Utilities/sensibleInformations');
const mongooseSchemas = require('./mongooseSchemas');

const DATABASE_CONNECTION = `mongodb://${sensibleInformations.DATABASE_USER}:${sensibleInformations.DATABASE_PASSWORD}@${sensibleInformations.SERVER_ADRESS}:${sensibleInformations.DATABASE_PORT}/${sensibleInformations.DATABASE_NAME }`;

exports.initializeMongo = () =>
{
	console.log( chalk.blue(`Trying to connect to MongoDB (${ DATABASE_CONNECTION })`) );

	mongoose.connect(DATABASE_CONNECTION);
	const database = mongoose.connection;

	database.on('error', console.error.bind(console, 'Connection error'));

	database.once('open', () =>
	{
		console.log( chalk.blue("Connected to MongoDB") );
	});
}

exports.addUser = (JSON) =>
{
	let name, surname, mail;

	if ( validation.checkAlphaNumeric(JSON.name) )
		name = JSON.name;
	else
		return new Error("Name not alphanumeric, try to remove accents.");

	if ( validation.checkAlphaNumeric( JSON.surname ) )
		surname = JSON.surname;
	else
		return new Error( "Surname not alphanumeric, try to remove accents." );

	if ( validation.checkEmail( JSON.mail ) )
		mail = JSON.mail;
	else
		return new Error( "Email type not valid." );

	const newUser = new mongooseSchemas.User(
	{
		name: name,
		surname : surname,
		mail : mail
	});

	newUser.save( (error) =>
	{
		if(error)
		{
			console.error(error);
			return new Error(error);
		}
		else
		{
			console.log("addRandomUser success");
		}
	});
}
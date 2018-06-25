const mongoose = require('mongoose');
const chalk = require('chalk');
const validation = require('../Utilities/validation');
const sensibleInformations = require('../sensibleInformations');

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

const userSchema = mongoose.Schema(
	{
		name: String,
		surname: String,
		mail: String
	} );

User = exports.User = mongoose.model( 'User', userSchema );


exports.addUser = (JSON) =>
{
	let name, surname, mail;

	if ( validation.checkAlphaNumeric(JSON.name) )
		name = JSON.name;
	else
		return new Error("Name not alphanumeric");

	if ( validation.checkAlphaNumeric( JSON.surname ) )
		surname = JSON.surname;
	else
		return new Error( "Surname not alphanumeric" );

	if ( validation.checkEmail( JSON.mail ) )
		mail = JSON.mail;
	else
		return new Error( "Name not alphanumeric" );

	const user = new User(
	{
		name: name,
		surname : surname,
		mail : mail
	});

	user.save( (error) =>
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
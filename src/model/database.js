const mongoose = require('mongoose');
const chalk = require('chalk');
const validation = require('../Utilities/validation');

const DATABASE_CONNECTION = 'mongodb://mongo/test';

exports.initializeMongo = () =>
{
	console.log( chalk.blue(`Trying to connect to MongoDB (${ DATABASE_CONNECTION })`) );

	mongoose.connect(DATABASE_CONNECTION);
	const database = mongoose.connection;

	database.on('error', console.error.bind(console, 'Connection error'));

	database.once('open', () =>
	{
		console.log("Connected to MongoDB");
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
		throw new Error("Name not alphanumeric");

	if ( validation.checkAlphaNumeric( JSON.surname ) )
		surname = JSON.surname;
	else
		throw new Error( "Surname not alphanumeric" );

	if ( validation.checkEmail( JSON.mail ) )
		mail = JSON.mail;
	else
		throw new Error( "Name not alphanumeric" );

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
			return error;
		}
		else
		{
			console.log("addRandomUser success");
			return "ok"
		}
	});
}
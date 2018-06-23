const mongoose = require('mongoose');
const Validation = require('./model/Validation');

const DATABASE_CONNECTION = 'mongodb://mongo/test';
exports.initializeMongo = () =>
{
	const redConsoleDisplayCode = '\x1b[31m';
	const resetConsoleColorDisplayCode = "\x1b[0m";

	console.log( redConsoleDisplayCode, `Trying to connect to MongoDB (${ DATABASE_CONNECTION })`, resetConsoleColorDisplayCode );

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

	if ( Validation.checkAlphaNumeric(JSON.name) )
		name = JSON.name;
	else
		throw new Error("Name not alphanumeric");

	if ( Validation.checkAlphaNumeric( JSON.surname ) )
		surname = JSON.surname;
	else
		throw new Error( "Surname not alphanumeric" );

	if ( Validation.checkEmail( JSON.mail ) )
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
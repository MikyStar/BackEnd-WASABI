const mongoose = require('mongoose');

const DATABASE_CONNECTION = 'mongodb://mongo/test';

const userSchema = mongoose.Schema(
{
	name : String,
	surname : String,
	mail : String
});

User = exports.User = mongoose.model('User', userSchema);

exports.initializeMongo = () =>
{
	mongoose.connect(DATABASE_CONNECTION);

	const redConsoleDisplayCode = '\x1b[31m';
	const resetConsoleColorDisplayCode = "\x1b[0m"

	console.log( redConsoleDisplayCode, `Trying to connect to MongoDB (${ DATABASE_CONNECTION })`, resetConsoleColorDisplayCode );

	const database = mongoose.connection;

	database.on('error', console.error.bind(console, 'Connection error'));

	database.once('open', () =>
	{
		console.log("Connected to MongoDB");
		addRandomUser();
	});
}

function addRandomUser()
{
	const randomUser = new User(
	{
		name: 'Jean',
		surname : 'TEST',
		mail : 'jean.test@test.com'
	});

	randomUser.save( (error) =>
	{
		if(error)
			return console.error(error);

		console.log("addRandomUser success");
	});
}
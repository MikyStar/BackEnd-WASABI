const mongoose = require('mongoose');
const sensibleInformations = require('../assets/sensibleInformations');

const DATABASE_CONNECTION = `mongodb://${sensibleInformations.DATABASE_USER}:${sensibleInformations.DATABASE_PASSWORD}@${sensibleInformations.SERVER_ADRESS}:${sensibleInformations.DATABASE_PORT}/${sensibleInformations.DATABASE_NAME }`;

exports.initializeMongo = () =>
{
	console.log(`Trying to connect to MongoDB`);

	mongoose.connect(DATABASE_CONNECTION);
	mongoose.Promise = global.Promise;

	const database = mongoose.connection;

	database.on('error', console.error.bind(console, 'Connection error'));

	database.once('open', () =>
	{
		console.log("Connected to MongoDB\n");
	});
}
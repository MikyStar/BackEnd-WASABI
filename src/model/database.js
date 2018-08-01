const mongoose = require('mongoose');
const sensibleInformations = require('../assets/sensibleInformations');

let DATABASE_CONNECTION;
let options;

if( process.env.NODE_ENV == 'dev')
{
	DATABASE_CONNECTION = `mongodb://${sensibleInformations.DATABASE_USER}:${sensibleInformations.DATABASE_PASSWORD}@${sensibleInformations.SERVER_ADRESS}:${sensibleInformations.DATABASE_PORT}/${sensibleInformations.DATABASE_NAME}`;

	options = { useNewUrlParser: true }
}
else if( process.env.NODE_ENV == 'prod')
{
	DATABASE_CONNECTION = `mongodb://mongo:${sensibleInformations.DATABASE_PORT}`;

	options =
	{
		useNewUrlParser : true,
		user : sensibleInformations.DATABASE_USER,
		pass : sensibleInformations.DATABASE_PASSWORD,
		dbName : sensibleInformations.DATABASE_NAME,
		auth : { authdb: 'admin' }
	};
}

exports.initializeMongo = () =>
{
	console.log(`Trying to connect to MongoDB`);

	mongoose.connect( DATABASE_CONNECTION, options );
	mongoose.Promise = global.Promise;

	const database = mongoose.connection;

	database.on('error', console.error.bind(console, 'Connection error'));

	database.once('open', () =>
	{
		console.log("Connected to MongoDB\n");
	});
}
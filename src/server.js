const express = require('express');
const SensibleInformations = require('./sensibleInformations');
const database = require('./database');
const swaggerUI = require('swagger-ui-express');
const swaggerDocumentation = require('./api-documentation.json');

const app = express();
/* database.initializeMongo(); */

app.get('/', (request, response) =>
{
	response.send('Get request received');
});

app.get('/testFind', (request, response) =>
{
	database.User.find( (error, result) =>
	{
		if(error)
			return response.error(error);

		console.log(result);

		response.json(result);
	})
});

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocumentation));

app.listen(SensibleInformations.PORT, () =>
{
	const redConsoleDisplayCode = '\x1b[31m';
	const resetConsoleColorDisplayCode = "\x1b[0m"

	console.log( redConsoleDisplayCode, `NodeJS server running on http://${ SensibleInformations.HOST }:${ SensibleInformations.PORT }`, resetConsoleColorDisplayCode);
});

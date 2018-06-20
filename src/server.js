'use strict';

const express = require('express');
const sharedVariables = require('./sharedVariables');
const app = express();

app.get('/', (request, response) =>
{
	response.send('Get request received');
});

app.listen(sharedVariables.PORT, sharedVariables.HOST);

console.log(`NodeJS server running on http://${sharedVariables.HOST}:${sharedVariables.PORT}`);
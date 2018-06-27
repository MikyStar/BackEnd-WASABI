const express = require('express');
const jwt = require('jsonwebtoken');
const User = require( '../model/schemas/user' );

module.exports =
{
	checkAlphaNumeric : (string) =>
	{
		return /^[a-z0-9]+$/i.test(string);
	},

	checkEmail : (email) =>
	{
		return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
	},

	checkPassword : (password) =>
	{
		return /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,20}$/.test( password ); //https://goo.gl/Z4et2X
	},

	// see -> https://goo.gl/Ce9hfh
	tokenAnalyzerMiddleware: ( request, response, next ) =>
	{
		const bearerHeader = request.headers['authorization'];

		if(typeof bearerHeader !== 'undefined')
		{
			const bearer = bearerHeader.split(' ');
			const bearerToken = bearer[1];

			request.token = bearerToken;

			next();
		}
		else response.status( 403 ).send("Token undefined");
	}
}
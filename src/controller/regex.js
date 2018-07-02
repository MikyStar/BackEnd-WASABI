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
		// https://www.regextester.com/3319 ; https://goo.gl/Z4et2X
		const containsWhatWeAsked = /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,20}$/.test( password );

		const containsCharacterWeDontWant = /\'|\"|\&|\?|\s|\+/.test( password );

		return ( containsWhatWeAsked && !containsCharacterWeDontWant )
	},
}
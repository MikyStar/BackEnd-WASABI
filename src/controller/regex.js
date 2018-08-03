const express = require('express');
const jwt = require('jsonwebtoken');
const User = require( '../model/schemas/user' );

module.exports =
{
	checkAlphaNumeric : ( string ) =>
	{
		return /^[a-z0-9]+$/i.test(string);
	},

	checkEmail : ( email ) =>
	{
		return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
	},

	checkPassword : ( password ) =>
	{
		// https://www.regextester.com/3319 ; https://goo.gl/Z4et2X
		const containsWhatWeAsked = /^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{6,20}$/.test( password );

		const containsCharacterWeDontWant = /\'|\"|\&|\?|\s|\+|#/.test( password );

		return ( containsWhatWeAsked && !containsCharacterWeDontWant )
	},

	/**
	 * @description Check if string matches a SymVer of three numbers separated by dots.
	 *
	 * @example True = '1.0.0' ; 999.999.999' ; '123.45.6'
	 * @example False = 'a.0.0' ; '12.0' ; '122.098.O'
	 *
	 * @param {string} symVer The SymVer we want to check
	 *
	 * @returns {boolean} True if is a valid SymVer, false otherwise
	 */
	checkSymVer : ( symVer ) =>
	{
		return /^[0-9]?[0-9]?[0-9]\.[0-9]?[0-9]?[0-9]\.[0-9]?[0-9]?[0-9]$/.test( symVer);
	}
}
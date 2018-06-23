module.exports = class Validation
{
	static checkAlphaNumeric(string)
	{
		return /^[a-z0-9]+$/i.test(string);
	}

	static checkEmail(email)
	{
		return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
	}
}
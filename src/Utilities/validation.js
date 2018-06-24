module.exports =
{
	checkAlphaNumeric : (string) =>
	{
		return /^[a-z0-9]+$/i.test(string);
	},

	checkEmail : (email) =>
	{
		return /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(email);
	}
}
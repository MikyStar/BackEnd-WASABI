const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const sensibleInformations = require('../assets/sensibleInformations');

passport.use( new GoogleStrategy(
{
	callbackURL : '/api/auth/google/redirect',
	clientID : sensibleInformations.GOOGLE_STRATEGY.CLIENT_ID,
	clientSecret : sensibleInformations.GOOGLE_STRATEGY.CLIENT_SECRET
}, () =>
{

}));
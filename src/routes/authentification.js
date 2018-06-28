const router = require('express').Router();
const passport = require('passport');

router.get( '/auth/login', (request, response) =>
{

});

router.get( '/auth/logout', (request, response) =>
{
	// TODO w/ passport
});

router.get( '/auth/google', passport.authenticate('google',
{
	scope : ['profile']
}));

router.get( '/auth/google/redirect', (request, response) =>
{
	response.send("Callback Google");
});

module.exports = router;
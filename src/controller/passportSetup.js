const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const GitHubStrategy = require('passport-github').Strategy;
const sensibleInformations = require('../assets/sensibleInformations');
const User = require('../model/schemas/user');
const userController = require('../controller/entities/userController')

passport.use( new GoogleStrategy(
	{
		callbackURL : '/api/auth/google/redirect',
		clientID : sensibleInformations.GOOGLE_STRATEGY.CLIENT_ID,
		clientSecret : sensibleInformations.GOOGLE_STRATEGY.CLIENT_SECRET
	},
	(accessToken, refreshToken, profile, done) =>
	{
		let email;
		(function retrieveEmail()
		{

			profile.emails.forEach( element =>
			{
				if( element.type == "account")
					email = element.value;
			});
		})()

		let name = profile.name.givenName;
		let surname = profile.name.familyName;
		let googleID = profile.id;

		userController.findOne( { googleID } ).then(
			(user) =>
			{
				if(user != null)
				{
					done(null, user);
				}
				else
				{
					userController.create( { name, surname, mail: email, authentificationMethod: 'google', googleID } ).then(
						( user ) =>
						{
							done( null, user );
						},
						( error ) =>
						{
							switch ( error.code )
							{
								case 11000:
									return new Error( "This mail already exits, choose an other one." );
								default:
									return new Error( `An unexpected error occured, please contact us.\n\n${error}` );
							}
						}
					)
				}
			},
			(error) =>
			{
				done(error, null);
			}
		);
	}
));

passport.use(new GitHubStrategy(
	{
		callbackURL: '/api/auth/github/redirect',
		clientID : sensibleInformations.GITHUB_STRATEGY.CLIENT_ID,
		clientSecret : sensibleInformations.GITHUB_STRATEGY.CLIENT_SECRET
	},
	(accessToken, refreshToken, profile, done) =>
	{
		userController.findOne( { githubID : profile._json.id } ).then(
			( user ) =>
			{
				if(user != null)
				{
					done(null, user);
				}
				else
				{
					userController.create( { name : profile._json.name, surname : "", mail : profile._json.email, authentificationMethod: 'github', githubID : profile._json.id } ).then(
						( user ) =>
						{
							done( null, user );
						},
						( error ) =>
						{
							switch ( error.code )
							{
								case 11000:
									done(new Error( "This mail already exits, choose an other one." ), null);
									break;
								default:
									done(new Error( `An unexpected error occured, please contact us.\n\n${error}` ), null);
									break;
							}
						}
					)
				}
			},
			( error ) =>
			{
				done(error, null);
			}
		)
	}
))

passport.serializeUser( ( user, done ) =>
{
	done(null, user.id);
});

passport.deserializeUser( ( id, done ) =>
{
	userController.findByID(id).then(
		( user ) => { done( null, user.id ); },
		( error ) => { done( error, null ); }
	);
} );

module.exports = passport
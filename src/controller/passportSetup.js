const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const sensibleInformations = require('../assets/sensibleInformations');
const User = require('../model/schemas/user');
const userController = require('../controller/userController')

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

		User.findOne( { googleID }, (error, user) =>
		{
			if( !user )
			{
				User.create( { name, surname, mail: email, authentificationMethod: 'google', googleID }, ( error, user ) =>
				{
					if ( error )
					{
						switch ( error.code )
						{
							case 11000:
								return new Error( "This mail already exits, choose an other one." );
							default:
								return new Error( `An unexpected error occured, please contact us.\n\n${error}` );
						}
					}

					done(null, user);
				} );
			}
			else
				done(null, user);
		});
	}
));

passport.serializeUser( ( user, done ) =>
{
	done(null, user.id);
});

passport.deserializeUser( ( id, done ) =>
{
	userController.findByIDSafely(id).then(
		( user ) => { done( null, user.id ); },
		( error ) => { done( error, null ); }
	);
} );
import passport from "passport";
import { Strategy as FacebookStrategy } from 'passport-facebook';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import Accounts from "../model/Accounts";
export const facebookPassportConfig = () => {
  
    return passport.use(
        new FacebookStrategy(
          {
            clientID: process.env.FACEBOOK_CLIENT_ID as string,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
            callbackURL: 'https://ebe9-2001-ee0-5321-4c10-ed8c-8b48-54bc-9568.ap.ngrok.io/auth/facebook/callback',
            // profileFields: ['id', 'displayName', 'photos', 'email'],
            // passReqToCallback: true,
          },
          function (accessToken, refreshToken, profile, done) {
            try {
              if (profile) {
                  
                // req.user = profile
                done(null, profile)
              }
            } catch (error) {
              done(error)
            }
          }
        ),
      );

}

export const googlePassportConfig = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "https://890c-116-109-196-38.ap.ngrok.io/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    if (profile) {
      console.log(profile)    
      // req.user = profile
      done(null, profile)
    }
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
  }
));

}
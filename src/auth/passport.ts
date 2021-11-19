import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {signIn} from 'src/auth/signIn';
import {serverEnv} from 'src/generated/serverEnv';
import type {Request} from 'src/utils/Context';

passport.use(
  new GoogleStrategy(
    {
      clientID: serverEnv.GOOGLE_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_CLIENT_SECRET,
      callbackURL: `${serverEnv.URL}/api/signin/google/callback`,
      passReqToCallback: true,
    },
    (req, _, __, profile, done) => {
      signIn(req as unknown as Request, profile)
        .then(user => done(undefined, user))
        .catch(done);
    }
  )
);

export {passport};

import {NextApiRequest} from 'next';
import nextConnect from 'next-connect';
import passport from 'passport';
import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
import {signIn} from 'src/auth/signIn';
import {databaseMiddleware} from 'src/database/databaseMiddleware';

const config = {
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
  URL: process.env.URL!,
};

Object.entries(config).forEach(([key, value]) => {
  if (value == null) throw `process.env.${key} can not be falsy.`;
});

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_CLIENT_SECRET,
      callbackURL: `${config.URL}/api/signin/google/callback`,
      passReqToCallback: true,
    },
    (req, _, __, profile, done) => {
      signIn(req as unknown as NextApiRequest, profile, done).catch(done);
    }
  )
);

export const getSignHandler = () => {
  const handler = nextConnect();

  handler.use(databaseMiddleware);
  handler.use(passport.initialize());

  handler.get<NextApiRequest>((req, res, next) => {
    const provider = req.query.provider;
    if (!provider) throw new Error('req.query.provider can not be falsy.');

    passport.authenticate(req.query.provider, {
      scope: ['email'],
      session: false,
    })(req, res, next);
  });

  return handler;
};

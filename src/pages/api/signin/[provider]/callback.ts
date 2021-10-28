import nextConnect from 'next-connect';
import passport from 'passport';
import {signInMiddleware} from 'src/auth/signInMiddleware';
import {databaseMiddleware} from 'src/database/databaseMiddleware';

const handler = nextConnect();
handler.use(databaseMiddleware);
handler.use(passport.initialize());
handler.get(signInMiddleware);
export default handler;

import passport from 'passport';
import {signInMiddleware} from 'src/auth/signInMiddleware';
import {getDefaultHandler} from 'src/utils/getDefaultHandler';

const handler = getDefaultHandler();
handler.use(passport.initialize());
handler.get(signInMiddleware);

export default handler;

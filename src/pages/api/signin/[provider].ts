import passport from 'passport';
import {signInMiddleware} from 'src/auth/signInMiddleware';
import {handler} from 'src/utils/handler';

handler.use(passport.initialize());
handler.get(signInMiddleware);
export default handler;

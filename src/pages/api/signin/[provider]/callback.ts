import {createSession} from 'src/auth/createSession';
import {passport} from 'src/auth/passport';
import {Request, Response} from 'src/utils/Context';
import {getDefaultHandler} from 'src/utils/getDefaultHandler';

const handler = getDefaultHandler();
handler.use(passport.initialize());

handler.get<Request, Response>(
  (req, res, next) => {
    const provider = req.query.provider;
    if (!provider) throw new Error('req.query.provider can not be falsy.');

    passport.authenticate(provider, {
      failureRedirect: '/',
      session: false,
    })(req, res, next);
  },
  (req, res, next) => {
    const user = req.user;
    if (!user) throw new Error('req.user is falsy.');

    createSession(res, user);
    res.redirect('/');
    next();
  }
);

export default handler;

import {passport} from 'src/auth/passport';
import {Request, Response} from 'src/utils/Context';
import {getDefaultHandler} from 'src/utils/getDefaultHandler';

const handler = getDefaultHandler();
handler.use(passport.initialize());

handler.get<Request, Response>((req, res, next) => {
  const provider = req.query.provider;
  if (!provider) throw new Error('req.query.provider can not be falsy.');

  passport.authenticate(provider, {
    scope: ['email'],
    session: false,
  })(req, res, next);
});

export default handler;
